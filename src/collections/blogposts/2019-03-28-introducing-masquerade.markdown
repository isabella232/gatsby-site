---
type: post
title:  "Anonymizing databases - introducing Masquerade"
date:   2019-03-28
categories: magento
permalink: /blog/anonymizing-databases-introducing-masquerade/
author: Peter Jaap Blaakmeer
---

#### Retrospective

A bit less than a year ago, we wrote about [our deployment pipeline with Kubernetes](/blog/disposable-magento-testing-environments-with-k8s). That blogpost details how we leverage Gitlab CI with Docker & Kubernetes to create disposable Magento testing environments. 

I ended that blog with a few bullet points for future implementation, of which one was:

- Anonymize database so we have near-production data available

We now have tackled this issue and in this blogpost I'll explain the why and the how.

#### Why anonymize the database ?

When we set up a review environment for our clients, we download the database from our backup location on Amazon S3. We store three versions of the database there; the full backup including all customer and order data, a stripped version without any customer or order data and recently, also an anonymized version where all personally identifiable information has been anonymized, that is; replaced with fake data.

When working with customer data, we feel it is our duty to handle these as carefully as possible to avoid data leakage (not to mention GDPR). The best way to avoid data leakage is to avoid using the data in the first place, which is why we decided to only ever use the production data when it is absolutely necessary. For development and testing purposes, we usually use the stripped database. Sometimes however, this empty database isn't enough; we need some actual data to test certain features or bugfixes. This is where the anonymized version comes in.

#### What were the options?

We started by looking at the systems that were available to anonymize databases. We found two that looked interesting, we'll discuss them here.

[integer-net/Anonymizer](https://github.com/integer-net/Anonymizer)

This Magento extension does actually what we want; it uses the popular fake data generation package [fzaninotto/Faker](https://github.com/fzaninotto/Faker) to replace the actual values with fake data. However, this is a Magento 1 extension and we migrated (almost) all our clients to Magento 2. Porting it would've been an option but we felt like a Magento extension wasn't the most flexible way to do this; we'd actually need a Magento installation up and running to anonymize the database and we didn't want to do that.

[DivanteLtd/anonymizer](https://github.com/DivanteLtd/anonymizer)

This project looked a lot more promising and indeed, it is a pretty impressive package. Even so impressive, that we felt the large plethora of options were a bit too much. We had a hard time getting it up and running, mainly because it's written in Ruby, which most of the devs at our company aren't too familiar with. We feel more at home with PHP-based packages. We worked with Ruby in the past when we used Capistrano and when we moved to its PHP-based clone Deployer, we were better off since everybody could work on the project instead of just the people with enough Ruby experience.

We decided to write our own. We're developers after all!

#### Introducing Masquerade

We had a few demands for our own anonymizer;
- It needed to be platform-agnostic;
- It needed to have Magento 2 configuration files out of the box;
- It needed to be configurable to a certain extent;
- It needed to be a standalone PHAR application (no extension or package for a certain framework).

This is why we built [Masquerade](https://github.com/elgentos/masquerade). Masquerade can anonymize a MySQL database for you following a set of rules configured in YAML files. Each YAML file refers to a group, which can contain multiple database tables, each with multiple columns. 

![Masquerade](https://user-images.githubusercontent.com/431360/42574650-30e8d186-851f-11e8-9693-c23b426c43f2.png)

An example of a YAML file for Magento 2 is this (part of) `customer.yaml`;

```yaml
customer:
  customer_entity:
    columns:
      email:
        formatter: email
        unique: true
        nullColumnBeforeRun: true
      prefix:
        formatter:
          name: fixed
          value:
      firstname:
        formatter:
          name: firstName
      middlename:
        formatter:
          name: fixed
          value:
      lastname:
        formatter: lastName
      suffix:
        formatter:
          name: fixed
          value:
```

It uses Faker formatters for most data that needs to be generated and you can add your own `Provider` with a `Formatter` (or several) to generate custom data. This is a pretty simple PHP class that you can place in `~/.masquerade` or in the relative dir `.masquerade` from where you run Masquerade. The PHP class looks like this;

```php
<?php

namespace Custom;

use Faker\Provider\Base;

class WoopFormatter extends Base {

    public function woopwoop() {
        $woops = ['woop', 'wop', 'wopwop', 'woopwoop'];
        return $woops[array_rand($woops)];
    }
}
```

If we were to use this formatter for the firstname column in the customer_entity table in the customer group, we'd configure it like this;

```yaml
customer:
  customer_entity:
    columns:
      firstname:
        provider: \Custom\WoopFormatter
        formatter: 
          name: woopwoop
```

You can find more information about how to download, install and run Masquerade on [the Masquerade Github page](https://github.com/elgentos/masquerade).

#### Running it nightly

We wanted to have our anonymized databases readily available at the tip of our fingers (or for our review app deployments) so we needed a way to anonymize the production database nightly. We were hesitant to run this on the production server since that would increase the chance we'd mistakenly anonymize the production database. After some testing with different approaches, we settled on using Gitlab CI to run this process. We already had Gitlab CI set up with runners that were idle during the night anyway, so why not leverage those to do the hard work?

For every client in our Gitlab instance, we created an `anonymize` project with just one `.gitlab-ci.yml` file. This runs the anonymization script, which boils down to;

1. Configure AWS credentials to be able to access the clients' S3 bucket containing the database dumps;
1. Downloading the database from the bucket;
1. Importing it into a MySQL database;
1. Running Masquerade on said database;
1. Dumping the anonymized database back out to a SQL file;
1. Uploading the dumped database to the S3 bucket.

We based this on a Docker container which we created to include the AWS CLI utility, MySQL and Masquerade. Here's the Dockerfile in full;

```
FROM romeoz/docker-apache-php:7.1
MAINTAINER Peter Jaap Blaakmeer <peterjaap@elgentos.nl>

RUN apt-get update

# Install awscli
RUN apt-get install -y libpython-dev python-dev libyaml-dev python-pip
RUN pip install awscli --upgrade --user

# Install mysql-client
RUN apt-get install -y mysql-client

# Install masquerade
RUN curl -LO https://github.com/elgentos/masquerade/releases/download/0.1.9/masquerade.phar
RUN chmod +x ./masquerade.phar && mv ./masquerade.phar /usr/bin/masquerade

# Run original image's entrypoint manually
CMD ["/sbin/entrypoint.sh"]
```

#### Conclusion

Masquerade allows us to anonymize databases quickly and easily and it does this for multiple frameworks. We also build Laravel applications to support our Magento webshops in various ways and also use Masquerade there to create anonymized databases.

Allowing our clients to have a testing/review environment with anonymized data enabled them to quickly test new features without taking an unnecessary risk concerning data leakage. 