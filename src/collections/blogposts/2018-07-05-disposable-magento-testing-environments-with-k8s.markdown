---
type: post
title:  "Disposable Magento testing environments with Kubernetes"
date:   2018-07-05
categories: magento
permalink: /blog/disposable-magento-testing-environments-with-k8s/
author: Peter Jaap Blaakmeer
---

### Disposable Magento testing environments with Kubernetes

In this blog we'll be talking about how we set up disposable testing environments ('Review Apps' in Gitlab terminology) using amongst other tools Gitlab, Docker, Google Cloud Platform (GCP) and Kubernetes (k8s). We are now using the disposable testing environments in our daily flow, which enables us to push out a certain branch, tag or specific commit to a testing environment that is automatically built up on push and tore down on merge, together with a database and all media files.

!['Gitlab+Kubernetes+Docker'](../../assets/images/blogs/k8s/gitlab-k8s-docker.png)

#### Retrospective

Just a little over a year ago, we wrote about [our internal development process](https://elgentos.nl/blog/our-development-process-uncovered/). I'm really happy I wrote that blog since it sparked a lot of interest and discussions, both online and offline. In that process, nothing major has changed. We did a few tweaks here and there, but overall it is still the same.

I ended that blog with the note that we'll be rolling out Review Apps for all our clients over the coming weeks. Technically that turned out to be true, if you consider 52 weeks later 'coming weeks'. I also said we hoped to be at 75/25 Magento 2 / Magento 1 and thankfully, that did turn out to be true. I'd say right now we're at 90/10 and fully invested in being Magento 1-free by the end of the year.

#### Prerequisites

There are a few reasons why it took us 52 weeks to roll this out. Obviously we weren't working on it full time but there were some developments that made us invest some time in this project again after it had been laying low for a while. These were our prerequisite building-blocks to make the Review Apps a pragmatic reality.

##### Databases & media files

The first big hurdle we had to overcome was to decide where we should get our databases from. While technically feasible, we didn't want to log in to the production server to fetch a database dump every time we would spin up a Review App. That would force us to keep a private key that had access to our production server stored somewhere where we didn't want it to be stored.

We decided that pushing a stripped version of the production database at the quietest moment in the day of a shop (usually our night) to an Amazon S3 instance would be the best way. We thought about pushing it to another service (DigitalOcean Storage, Google Cloud Storage, Google Drive, Dropbox, etc) but we felt Amazon had the most granular IAM controls to restrict access to the database dumps. We have separate roles set up for pushing dumps to specific file locations and for retrieving the dumps from those specific file locations.

The same story applies to media; we push a tarred media file to an S3 bucket where the Review App deployment process can retrieve it from.

We also bought a top level domain and set the name servers to those of DigitalOcean. That way, we can leverage the DigitalOcean API through doctl to add and remove A records automatically. We might in the future move this to Google Cloud DNS to eliminate the doctl dependency.

##### Kubernetes

When we started building this, we first used the DigitalOcean API to create droplets with a pre-configured image. While this worked okay, we wanted to leverage Docker to have a resilient and easily maintainable image. We then decided to run the Docker image on the DigitalOcean droplets and deploy our Docker image to that droplet.

The problem with running a DO droplet with Docker and a Docker container running inside the droplet is that you need to pass through the droplet itself to get to the Docker container, or open up non-standard secondary ports for every service. This proved to be both troublesome and headache-inducing since we had to mentally keep track of where we were in the proces; did we run a certain command on the runner (which itself also is a Docker image on a pod in a node in a Kubernetes cluster on GCP), in the DigitalOcean droplet or in the Docker container running on that droplet? We therefore decided to run our Docker containers on Kubernetes, eliminating the intermediary droplet and reducing the mental complexity of the process. 

##### hypernode-docker

Another pre-requisite was using a Docker image that as closely as possible resembled our production servers. Thankfully (and entirely not coincidentally) all our clients run on Byte's [Hypernode](https://www.hypernode.com) offering. This means that all our production servers are initially set up and managed in the exact same way. We started out by building our Docker image based on [equit/gitlab-ci-magento2](https://hub.docker.com/r/equit/gitlab-ci-magento2/) and went from there. Thankfully, Hypernode's [Rick van de Loo](https://twitter.com/vdloo_) created a Hypernode Docker image for local development and for CI/CD purposes; [hypernode-docker](https://github.com/ByteInternet/hypernode-docker). Hooray! We took this image and created our own Docker image to add/set a few things;

- Remove the default Hypernode insecure key
- Add our own public keys for SSH
- Disable password login for SSH
- Enable basic auth with a default user/pass (mainly to block bots from accidentally indexing testing envs)
- Allow Let's Encrypt challenges through the basic auth
- Install gcloud tool to manage the GCP
- Install awscli tool to be able to retrieve our database & media dumps
- Install kubectl tool to be able to orchestrate our k8s clusters
- Install doctl tool to be able to add DNS records to our testing domain name
- Install Deployer to be able to deploy

We push this Docker image to our internal Gitlab Container Registry. While the Hypernode-docker is specifically geared towards Magento, we also use it as a basis to build, test & deploy this site with, which is built using the static site generator Jekyll (written in Ruby).

##### Runners

Starting from version 10.6, Gitlab offers a native k8s integration. While this made us very excited in the beginning, it turns out it is still in its infancy. Gitlab makes it easy to create a cluster on GCP using the Google Kubernetes Engine (GKE). But this is a cluster that is always running and thus not suitable for our disposable environments. 

The upside; it is now very easy to create this cluster and use it as a runner for your project. We used to have DigitalOcean droplets with Docker running for this purpose but we killed those off in favor of Runners running on GCP through Gitlab's native k8s integration. Added bonus; we can run those runners on Google's `europe-west4` location, which is the newly opened datacenter in the Eemshaven, only 30km north of us!

#### Setting up Review Apps

This is what we're aiming at;

!['Succesful Review App pipeline'](../../assets/images/blogs/k8s/pipeline-success.png)

The main file we're using to set up Review Apps is `.gitlab-ci.yml`. We've already been using this to deploy our shops to our production and staging servers but we need to a add a bunch of commands to deploy to our disposable environments.

Generally speaking, these are the steps that we need to take in our `create-cluster-job-review` job;

1. Authenticate gcloud
1. Create k8s cluster
1. Create k8s namespace
1. Create secret to access our Gitlab Container Registry
1. Create new deployment with the Hypernode image
1. Apply service to expose the deployment (web & ssh ports)
1. Retrieve IP address of deployment
1. Authenticate doctl
1. Create A record in our domain (using doctl)

Then we deploy in our `deploy-job-review` job;

1. Update review yaml file for Deployer
1. Deploy!

We also add a `stop-job-review` job which runs when a merge request is merged;

1. Authenticate doctl
1. Remove A record from domain
1. Authenticate glcoud
1. Remove cluster (this will also remove the deployment and the service attached to it)

The reason why we have a create-cluster and a deploy job is so we can exit the create-cluster job when the cluster already exists. The deploy job subsequently deploys a new release on the same cluster.

In these jobs, we make use of a number of environment variables that are either set by [Gitlab itself](https://docs.gitlab.com/ee/ci/variables/) or by us manually. Here is the list of environment variables we use and what they do. If we have a Magento 1 and a Magento 2 project for a client, certain variables can be set at the group level.

|Variable|Description|Can be set on group level?|
|--- |--- |--- |
|`AWS_ACCESS_KEY_ID`|Projects’ AWS credentials|No|
|`AWS_SECRET_ACCESS_KEY`|Projects’ AWS credentials|No|
|`AWS_DEFAULT_REGION`||Yes|
|`COMPOSER_AUTH`|gitlab-ci composer key|No|
|`DO_ACCESS_TOKEN`|Create access token per project at [DigitalOcean](https://cloud.digitalocean.com/settings/api/tokens)|Yes|
|`GCLOUD_MACHINE_TYPE`|See [Google Cloud Machine Types](https://cloud.google.com/compute/docs/machine-types)|Yes|
|`GCLOUD_NUM_NODES`|1 is fine for testing purposes|Yes|
|`GCLOUD_PROJECT_ID`|Find project ID in [Gcloud console](https://console.cloud.google.com/)|Sometimes|
|`GCLOUD_SA_JSON`|Create JSON file from [IAM](https://console.cloud.google.com/iam-admin/serviceaccounts/) (Actions > Create key) and paste contents here|Sometimes (dependent on GCLOUD_PROJECT_ID)|
|`GCLOUD_ZONE`|See [Google Cloud Regions & Zones](https://cloud.google.com/compute/docs/regions-zones/)|Yes|
|`REVIEW_BACKEND_FRONTNAME`|Your admin URL|Yes|
|`REVIEW_CRYPT_KEY`|Per-project cryptkey|No|
|`REVIEW_DB_HOST`|Your database host|Yes|
|`REVIEW_DB_NAME`|Your database name|Yes|
|`REVIEW_DB_USER`|Your database user|Yes|
|`REVIEW_DB_PASS`|Do not set manually; it is random generated per Hypernode container and will be fetched from Hypernode’s .my.cnf.|No|
|`REVIEW_DB_PREFIX`|Your database prefix|No|
|`SSH_PRIVATE_KEY`|Project-specific deployment-only SSH key|Yes|

### Slack notification

Because we use stripped database dumps without personal information, the admin users are also stripped. In our Deployer recipe, we generate a random user/pass combination and save those values. We later on use the Slack recipe to pull those variables and pass them on to a shared channel with our client, who can then use the credentials to log in to the admin.

!['Deployer Slack notification with auto-generated user/pass combo'](../../assets/images/blogs/k8s/deployer-slack.png)

### File templates

The following file templates are for Magento 2. Some paths and file templates would be a little bit different for Magento 1, but I'm sure you'll figure it out.

##### Dockerfile

```dockerfile
FROM docker.hypernode.com/byteinternet/hypernode-docker:latest
MAINTAINER Peter Jaap Blaakmeer <peterjaap@elgentos.nl>

# Add public key
ADD key.pub /tmp/key.pub
RUN cat /tmp/key.pub > /root/.ssh/authorized_keys
RUN cat /tmp/key.pub > /data/web/.ssh/authorized_keys
RUN rm -f /tmp/deployment.pub

# Disable password login
RUN sed -i 's/PasswordAuthentication\ yes/PasswordAuthentication\ no/g' /etc/ssh/sshd_config

# Enable passwordless sudo for app user (see https://github.com/ByteInternet/hypernode-docker/issues/6)
RUN echo "app     ALL = (ALL) NOPASSWD: ALL" >> /etc/sudoers

# Enable basic auth
RUN echo "user:encodedpassword" > /data/web/htpasswd
RUN sed -i 's/#auth_basic/auth_basic/g' /data/web/nginx/server.basicauth

# Allow Lets Encrypt challenges
RUN printf '\nlocation ^~ /.well-known/acme-challenge/ {\n\tauth_basic off;\n}\n' >> /data/web/nginx/server.basicauth
# Remove default *.hypernode.local certificate to avoid nginx errors when using LE
RUN rm -rf /etc/nginx/ssl

# Install gcloud
RUN export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)" && \
    echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update -y && apt-get install google-cloud-sdk -y

# Install awscli
RUN apt-get install -y libpython-dev python-dev libyaml-dev python-pip
RUN pip install awscli --upgrade --user
RUN echo "export PATH=~/.local/bin:$PATH" >> ~/.bash_profile

# Install kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.10.5/bin/linux/amd64/kubectl
RUN echo "dbe431b2684f8ff4188335b3b3cea185d5a9ec44 kubectl" > checksum.txt && sha1sum -c checksum.txt
RUN chmod +x ./kubectl && mv ./kubectl /usr/bin/kubectl

# Install doctl - use version 1.8.0, newer version has bugs
RUN curl -sL https://github.com/digitalocean/doctl/releases/download/v1.8.0/doctl-1.8.0-linux-amd64.tar.gz | tar -xzv
RUN mv doctl /usr/local/bin/doctl

# Install Deployer through composer globally - use version 6.0.5 for PHP 7.0
RUN composer global require deployer/deployer:6.0.5
RUN alias dep=/root/composer/vendor/bin/dep
```

##### .gitlab-ci.yml

```yaml
image: <place your Docker container image url here>

before_script:
  - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
  - eval $(ssh-agent -s)
  - ssh-add <(echo "$SSH_PRIVATE_KEY")
  - mkdir -p ~/.ssh
  - echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa
  - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'

  # Switch back to PHP 7.0 if needed
  #- sed -i 's/php7.1/php7.0/g' /etc/my_init.d/60_restart_services.sh
  #- update-alternatives --set php $(which php7.0)
  #- bash /etc/my_init.d/60_restart_services.sh

  # Set gcloud variables
  - export GCLOUD_CLUSTER_NAME=$(echo ${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME} | cut -c 1-40 | sed 's/-$//') # strip to 40 characters (max for cluster names) and remove dash if that is the last character

stages:
  - build
  - test
  - create-cluster
  - deploy

## PLACE PRODUCTION JOBS HERE

create-cluster-job-review:
  stage: create-cluster
  only:
    - /^review-.*$/
  script:
    # Authenticate gcloud
    - echo $GCLOUD_SA_JSON >> google_sa.json
    - gcloud auth activate-service-account --key-file google_sa.json
    - export GOOGLE_APPLICATION_CREDENTIALS=google_sa.json
    # Check if cluster is running
    - STATUS=$(gcloud beta container --project "${GCLOUD_PROJECT_ID}" clusters  list | grep ${GCLOUD_CLUSTER_NAME} | awk '{print$8}')
    - if [ "${STATUS}" = "RUNNING" ]; then exit 0; fi
    # Create Kubernetes cluster
    - gcloud beta container --project "${GCLOUD_PROJECT_ID}" clusters create "${GCLOUD_CLUSTER_NAME}"
            --zone "${GCLOUD_ZONE}"
            --username "admin"
            --cluster-version "1.8.10-gke.0"
            --machine-type "${GCLOUD_MACHINE_TYPE}"
            --image-type "COS"
            --disk-type "pd-standard"
            --disk-size "100"
            --scopes "https://www.googleapis.com/auth/compute","https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append"
            --num-nodes "${GCLOUD_NUM_NODES}"
            --enable-cloud-logging --enable-cloud-monitoring
            --network "default" --subnetwork "default"
            --addons HorizontalPodAutoscaling,HttpLoadBalancing,KubernetesDashboard
            --no-enable-autoupgrade
            --enable-autorepair
    # Create namespace
    - kubectl create namespace gitlab-managed-apps
    # Create secret for Gitlab Container Registry
    - kubectl create secret docker-registry gitlab-container-registry --docker-server=$CI_REGISTRY --docker-username=$CI_REGISTRY_USER --docker-password=$CI_REGISTRY_PASSWORD --docker-email=$GITLAB_USER_EMAIL
    # Create new deployment with the Hypernode image
    - kubectl apply -f config/kubernetes/hypernode-deployment.yaml
    # Add label for deployment
    - kubectl label deployments hypernode-deployment app=${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME} --overwrite
    # Wait for it to become available
    - sleep 60
    # Apply service to expose the image
    - kubectl expose deployment hypernode-deployment --type=LoadBalancer --name=hypernode-service
    # Wait for it to become available
    - sleep 60
    # Add label for service
    - kubectl label services hypernode-service app=${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME} --overwrite
    # Get & save IP address
    - while [ "${IP_ADDRESS}" = "" ]; do IP_ADDRESS=$(kubectl get service hypernode-service | grep hypernode-service | awk '{print$4}'); done
    - echo "IP address found; ${IP_ADDRESS}"
    # Authenticate doctl
    - doctl auth init --access-token ${DO_ACCESS_TOKEN}
    # Create hostname entry in DigitalOcean Networking
    - doctl compute domain records create testdomain.tld --record-data ${IP_ADDRESS} --record-name ${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME} --record-type A
    
deploy-job-review:
  stage: deploy
  only:
    - /^review-.*$/
  environment:
    name: review/${CI_COMMIT_REF_NAME}
    url: https://${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME}.testdomain.tld
    on_stop: stop-job-review
    # Update review yaml file for Deployer
    - mv config/servers/template.yaml.example config/servers/review.yaml
    - sed -i s/HOST/${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME}.testdomain.tld/g config/servers/review.yaml
    - sed -i s/ENVIRONMENT/review/g config/servers/review.yaml
    - sed -i s/STAGE/review/g config/servers/review.yaml
    - sed -i s/PORT/22/g config/servers/review.yaml
    - sed -i s/DBNAME/magento/g config/servers/review.yaml
    # Deploy
    - /root/.composer/vendor/bin/dep deploy review -n -vvv

stop-job-review:
  stage: deploy
  only:
    - /^review-.*$/
  variables:
    GIT_STRATEGY: none
  script:
    # Authenticate doctl
    - doctl auth init --access-token ${DO_ACCESS_TOKEN}
    # Remove A record from domain testdomain.tld
    - DNS_RECORD_ID=$(doctl compute domain records list testdomain.tld | grep ${CI_PROJECT_NAME}-${CI_COMMIT_REF_NAME} | awk '{print$1}')
    - doctl compute domain records delete testdomain.tld ${DNS_RECORD_ID} --force; true
    # Authenticate gcloud
    - echo $GCLOUD_SA_JSON >> google_sa.json
    - gcloud auth activate-service-account --key-file google_sa.json
    - export GOOGLE_APPLICATION_CREDENTIALS=google_sa.json
    # Check if cluster is running
    - STATUS=$(gcloud beta container --project "${GCLOUD_PROJECT_ID}" clusters  list | grep ${GCLOUD_CLUSTER_NAME} | awk '{print$8}')
    - if [ "${STATUS}" != "RUNNING" ]; then exit 0; fi
    # Remove cluster
    - gcloud beta container clusters delete ${GCLOUD_CLUSTER_NAME} --zone ${GCLOUD_ZONE} --project ${GCLOUD_PROJECT_ID} --async --quiet
  when: manual
  environment:
    name: review/${CI_COMMIT_REF_NAME}
    action: stop
```

##### env_template.php

```php
<?php
return array (
   'backend' =>
       array (
           'frontName' => '{% raw %}{{REVIEW_BACKEND_FRONTNAME}}{% endraw %}',
       ),
   'crypt' =>
       array (
           'key' => '{% raw %}{{REVIEW_CRYPT_KEY}}{% endraw %}',
       ),
   'session' =>
       array (
           'save' => 'files',
       ),
   'db' =>
       array (
           'table_prefix' => '{% raw %}{{REVIEW_DB_PREFIX}}{% endraw %}',
           'connection' =>
               array (
                   'default' =>
                       array (
                           'host' => '{% raw %}{{REVIEW_DB_HOST}}{% endraw %}',
                           'dbname' => '{% raw %}{{REVIEW_DB_NAME}}{% endraw %}',
                           'username' => '{% raw %}{{REVIEW_DB_USER}}{% endraw %}',
                           'password' => '{% raw %}{{REVIEW_DB_PASS}}{% endraw %}',
                           'model' => 'mysql4',
                           'engine' => 'innodb',
                           'initStatements' => 'SET NAMES utf8;',
                           'active' => '1',
                       ),
               ),
       ),
   'resource' =>
       array (
           'default_setup' =>
               array (
                   'connection' => 'default',
               ),
       ),
   'x-frame-options' => 'SAMEORIGIN',
   'MAGE_MODE' => 'production',
   'cache_types' =>
       array (
           'config' => 1,
           'layout' => 1,
           'block_html' => 1,
           'collections' => 1,
           'reflection' => 1,
           'db_ddl' => 1,
           'eav' => 1,
           'customer_notification' => 1,
           'full_page' => 1,
           'config_integration' => 1,
           'config_integration_api' => 1,
           'translate' => 1,
           'config_webservice' => 1,
       ),
   'install' =>
       array (
           'date' => 'Tue, 1 Jan 2018 13:33:37 +0000',
       ),
);
```

##### Deployer recipes

```php
<?php

task('authenticate:aws', function () {
    $awsCredentials = tempnam('/tmp', 'tmp');
    $awsConfig = tempnam('/tmp', 'tmp');

    file_put_contents($awsCredentials, "[default]\naws_secret_access_key = " . getenv('AWS_SECRET_ACCESS_KEY') ."\naws_access_key_id = " . getenv('AWS_ACCESS_KEY_ID'));
    file_put_contents($awsConfig, "[default]\nregion = " . getenv('AWS_DEFAULT_REGION'));

    run('mkdir -p ~/.aws');

    upload($awsConfig, '~/.aws/config');
    upload($awsCredentials, '~/.aws/credentials');

    unlink($awsCredentials);
    unlink($awsConfig);
});

task('magento:create:env', function () {
    $stage = input()->getArgument('stage');
    if ($stage != 'review') {
        return;
    }

    // Get REVIEW_DB_PASS from .my.cnf
    $reviewDbPass = run('cat /data/web/.my.cnf  | grep pass | awk \'{print$3}\'');

    $envFileContent = file_get_contents('config/env_template.php');

    $envVariables = [
        'REVIEW_BACKEND_FRONTNAME',
        'REVIEW_DB_HOST',
        'REVIEW_DB_NAME',
        'REVIEW_DB_USER',
        'REVIEW_DB_PASS',
        'REVIEW_CRYPT_KEY',
        'REVIEW_DB_PREFIX',
    ];

    $defaults = [
        'REVIEW_BACKEND_FRONTNAME' => 'beheer',
        'REVIEW_DB_HOST'           => 'Please define me in Gitlab CI Secret Variables',
        'REVIEW_DB_NAME'           => 'Please define me in Gitlab CI Secret Variables',
        'REVIEW_DB_USER'           => 'Please define me in Gitlab CI Secret Variables',
        'REVIEW_CRYPT_KEY'         => 'Please define me in Gitlab CI Secret Variables',
        'REVIEW_DB_PASS'           => (string) $reviewDbPass,
        'REVIEW_DB_PREFIX'         => '',
    ];

    foreach ($envVariables as $envVariable) {
        $envFileContent = str_replace('{% raw %}{{' . $envVariable . '}}{% endraw %}', (empty(getenv($envVariable)) ? $defaults[$envVariable] : getenv($envVariable)), $envFileContent);
    }

    $envFilename = 'env.php';
    file_put_contents($envFilename, $envFileContent);
    upload($envFilename, '{% raw %}{{release_path}}{% endraw %}/app/etc/env.php');
    unlink($envFilename);
});

task('magento:create:admin-user', function () {
    $stage = input()->getArgument('stage');
    if ($stage != 'review') {
        return;
    }

    function generateRandomString($length = 12, $abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", $digits = '0123456789')
    {
        return substr(str_shuffle($abc), 0, ceil(($length / 2))) . substr(str_shuffle($digits), 0, ceil(($length / 2)));
    }

    $user = generateRandomString();
    $pass = generateRandomString();
    $email = 'info@example.com';
    $firstname = 'Review';
    $lastname = 'Admin';

    run(sprintf('/usr/local/bin/magerun2 --root-dir={% raw %}{{release_path}}{% endraw %} admin:user:create --admin-user=%s --admin-password=%s --admin-email=%s --admin-firstname=%s --admin-lastname=%s', $user, $pass, $email, $firstname, $lastname));

    // We set these in variables so we can for example use the Slack recipe to pass these on
    set('review_admin_user', $user);
    set('review_admin_pass', $pass);
});

task('magento:create:public:symlink', function () {
    $stage = input()->getArgument('stage');
    if ($stage != 'review') {
        return;
    }

    run('rm -rf public && ln -s /data/web/current/pub/ /data/web/public');
});

task('magento:request:ssl', function () {
    $stage = input()->getArgument('stage');
    if ($stage != 'review') {
        return;
    }

    // We need to add the app user to the passwordless sudo list in our Docker image to be able to run nginx_config_reloader
    // See https://github.com/ByteInternet/hypernode-docker/issues/6
    run('echo "' . get('host') . '" > /data/web/.dehydrated/domains.txt && dehydrated -c --create-dirs && hypernode-ssl-config-generator && /usr/bin/nginx_config_reloader');
});

task('magento:config:set', function () {
    $stage = input()->getArgument('stage');
    if ($stage != 'review') {
        return;
    }

    $config = [
        'dev/debug/debug_logging' => 1,
    ];

    foreach ($config as $path => $value) {
        run(sprintf('mysql magento -e "UPDATE core_config_data SET value = \'%s\' WHERE path = \'%s\';"', $value, $path));
    }
});

// Review hooks
before('magento:maintenance:enable', 'authenticate:aws');
before('magento:maintenance:enable', 'magento:create:env');
after('magento:maintenance:enable', 'import:database');
after('magento:maintenance:enable', 'import:media');
after('import:database', 'magento:create:admin-user');
after('deploy:symlink', 'magento:create:public:symlink');
after('deploy:symlink', 'magento:request:ssl');
before('magento:cache:flush', 'magento:config:set');

```

### Future

Using Review Apps has already proven to be a great productivity booster. Clients are able to review & test new features quicker than before we implemented Review Apps. There are some improvements to be done in the future, such as;

- Automatically updating the Gitlab issue with the user/pass combination;
- Automatically applying a QA label following some trigger to let the QA team know they can start testing it;
- Anonymize database so we have near-production data available;
- Seed the stripped database with specified testing data.

I hope you liked this blog. If you have any questions, hit me up on Twitter.

Ps. interested in a workshop to implement this for your company? Contact me.