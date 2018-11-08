---
type: post
title:  "Our development process uncovered"
date:   2017-06-30
categories: magento
permalink: /blog/our-development-process-uncovered/
author: Peter Jaap Blaakmeer
---

When we started with elgentos back in 2011, a large part of our development and deployment process was manual. At that time, most of the tools we use today were not available. Over the years, we realized that processes take a rather large amount of our time, while we're in the business of automating things! Gradually, we started implementing industry standards aside from adopting cutting-edge technology and, well, cutting ourselves.

This is an overview of our journey from back in 2011 to where we are today, which technology stack we're using to automate our internal processes and where we want go from here.

#### Development process

Our development process changed a lot over the years, growing with our company as it increased in team members. At the start, we were with 2 developers and pretty much the only tool we used was Git. We used some servers we had laying around as our development servers and synced the codebase on our local machine to the development servers, which we accessed over the Internet. The main advantage of this was that our clients could look in on our development process. The main disadvantage of this was that the shops usually were in a state of disrepair since we were actively developing on them, causing panicked clients to call all day long.

We later realized this did not scale. We decided to move from developing on a development server to developing locally and only pushing the develop branch to the development server. Since most of us ran OS X, but a few (sometimes) ran Linux (in its ever-changing varieties), we couldn't standardize on a development environment. Pretty much every dev was on its own when it came to installing and maintaining the LAMP/MAMP stack. Needless to say, version numbers were all over the place and only by sheer coincidence matched the production versions. We've always outsourced our hosting since the beginning (we've fully switched to Byte's Hypernode offering by now) so we didn't have full control over what ran there.

Along come Vagrant and it was all the rage. Unfortunately, Vagrant is slow and bulky. So it didn't run well on our i5 128GB SSD Mac's. We decided to ignore Vagrant; although we sometimes had issues with differing versions, it wasn't that big of a problem to make us want to work with Vagrant.

Fast-forward a few years and suddenly Docker appeared! Lightweight, containerized and native to Linux, but uh-oh, not to Mac. We dabbled with it for a while but it was too cumbersome (especially with the MySQL volumes at first and later also with syncing files from guest to host) and abandoned it. Thankfully by this time Homebrew had come onto the scene and made our life working with Mac's a lot easier. We could kinda keep our differing versions in check and generally, we were pleased.

#### Composer & Packagist

Installing extensions in Magento has always been a bit weird. There are a lot of edge cases you need to keep in mind while installing and especially when removing an extension. Composer was the new hot thing in PHP-land and Magento 1 developers started adopting it. This helped us keep extension versions and constraints in control and facilitated adding and removing extensions to and from Magento. Right now, we run a private Packagist repository on [Packagist.com](http://packagist.com) with our extensions, which are hosted in our [Gitlab](http://gitlab.com) installation.

#### Codebase as our project management system

Since our start, we worked with Codebase for our project and Git repository management. What we liked about Codebase was the combination of Git repository and ticketing in one system, a feature pretty standard nowadays but pretty unique at that time (a lot of companies were using Beanstalk for Git and Zendesk for ticketing at the time, for example).

Codebase gradually developed new features over the years but our preferences and tastes concerning development also changed. We felt Codebase didn't keep up with our methodologies, which become more and more agile (scrum) based as time went on.

 About two years ago we decided to introduce code reviewing. At first, it was asking a colleague over to your desk to look at pieces of code you just wrote. Gradually, we started implementing code reviews for all our code using Merge Requests (exactly the same as Github's Pull Requests but with a better descriptive name).

 We told the developers to create a merge request in Codebase and assign it to a colleague. The workflow was like this;

 - Merchant creates ticket with a feature request or bug
 - Developer goes to his terminal, checks out the project and creates a new branch
 - Developer does the work
 - Developer pushes the branch upstream
 - Developer creates a merge request, assigns it to a colleague
 - Developer assigns ticket to colleague, gives status 'Needs Merge'
 - Colleague does code review, maybe assigning and reassigning ticket to original developer
 - Colleague merges branch
 - Colleague closes ticket
 - Colleague removes branch
 - Colleague tells developer it's merged
 - Developer deploys functionality

 There were a number of manual actions that were open to human error, sometimes resulting in an accidentally abandoned ticket or branch. We needed to, and could, do better.

#### Deployment process

Initially, everything concerning deployment was manual. Log in to SSH server, `git pull origin master`, run database updates, clear caches, reindex indexers, etc. Because all of those steps were manual and sometimes optional (purging Varnish, purging CDN cache, deploying to multiple web servers, etc) these were open to human error and unavoidably resulted in unforeseen (and always ill-timed) downtime.

We decided to implement an automated deployment process that begin with simple shell scripts but we quickly switched to Capistrano. This is a deployment system written in Ruby. It suited us well but since we are PHP developers, writing deployments in Ruby didn't go as fast or easy as we wished.

We then ran into [Deployer](http://deployer.org). Deployer is basically a Capistrano clone in PHP. It uses the same structure for deployments as we were used to (with releases, shared and current folders and symlinks) so swapping [Capistrano](http://capistranorb.com/) with Deployer was pretty easily done. By now, we have pretty much all of our clients in a Deployer setup, eliminating human error in our deployment process. Deployer also fires our functional testing suite powered by [Ghostinspector](http://www.ghostinspector.com).

#### GrumPHP

In an effort to raise code quality on a purely syntactically basis, we implemented [GrumPHP](https://github.com/phpro/grumphp). This is a tool written by our Belgian neighbours at PHPro to run automated checks on a per-commit basis. We have it configured to run the following tests;

- PHP Code Sniffer with Magento's EQP standards (based on PSR-2);
- PHP7 Compatibility Checker to ensure we don't use deprecated functions;
- SecurityChecker to check for vulnerabilities in our composer modules;
- Git Blacklist to prevent committing blacklisted words or functions such as var_dump, exit or die;
- Composer validate to make sure our composer files are valid;
- XMLLint to check our XML files are syntactically valid;
- JSONLint to check our JSON files are syntactically valid.

### Docker development environment

When Jeroen joined our company, he made it very clear to us he is a big [Docker](https://www.docker.com/) fan. He also convinced us that by then, Docker was a feasible environment for our development needs, although Mac support still is a bit slow and/or sketchy. The majority of developers by now had moved to Linux though.

We now make extensive use of Jeroen's [Docker development environment](https://github.com/JeroenBoersma/docker-compose-development). This allows our developers to use exactly the same environment. We can instantly and effortlessly switch between PHP5.6, PHP7.0 and PHP7.1 just by changing the hostname. We can also set the hostname to include .magento. or .magento2. to have it set the correct environment variables. The environment also includes Redis, Varnish, [Mailhog](https://github.com/mailhog/MailHog), Percona, Xdebug and [Blackfire](http://blackfire.io), all ready to go.

#### Gitlab

Now that we had a formalized deployment process up and running, we wanted to go a bit further and dive into this whole Continuous Integration / Continuous Delivery concept. We tried Jenkins and Travis a few times but it didn't really stick for various reasons. Then we found Gitlab-CI, the Continuous Integration toolset built into Gitlab. The more we looked into Gitlab, the more excited we got. Gitlab solved a lot of issues we ran into with Codebase and was a more robust and feature-rich project and Git management system than Codebase was (and was likely to become in the short term). Extra bonus; Gitlab is originally a Dutch company!

We spent a few months writing a Codebase to Gitlab migration tool which migrated over all our projects, tickets, attachments, users, Git repositories (client projects, internal projects and extensions) and all the other little details. Now we could unleash the power of Gitlab to streamline our processes.

#### Merge Request flow in Gitlab

Gitlab considerably improved our merge request flow by automating several steps. The biggest change is the ability to create a new branch from Gitlab, straight from the issue page. When viewing an issue, we now click the 'Create new branch' button to immediately created a branch with the issue's name.

After pushing code to this branch, a developer can create a merge request by clicking the URL Gitlab gives us right in the terminal. Thirdly, after a colleague approves the merge request, the branch is automatically deleted. These may seem incremental changes and they are, but it really adds up when you do 30 merge requests a week, per developer.

We also use a Chrome plugin called [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) to inject a custom created 'Track Time' button on the issue page. When clicked, a pop-up opens that allows us to start a timer in [Harvest](http://harvestapp.com), our time tracking and invoicing tool. The project is automatically selected and the issue name is inserted as the time entry's description.

#### Protected branches

Gitlab offers a feature called protected branches. We use the default Gitlab approach; the master branch is protected, which means no-one (not even Masters, the highest role in Gitlab) can push to the master branch. Only Masters can merge a merge request into master. Our project leads are the Masters for every project. This way, the project lead ensures quality by checking all code that comes into the master branch through merge requests. Usually, developers create a merge request for their feature branch into the current release branch. At the end of a sprint, the project lead will merge the release branch into master.

This allowed us to have a better control of the flow of code through releases and minimize code breakages or bugs.

#### Gitlab CI & Pipelines

Then we set up Gitlab CI to automatically deploy code that is merged into master to the production environment. We booted up a few Digital Ocean droplets with the one-click Docker install and registered them as a 'runner' in Gitlab. A runner is a server that can execute any code you tell it to through your CI configuration. In Gitlab, CI configuration is done by adding a `.gitlab-ci.yaml` file to the root of the project. When the pipeline is run, the Git repository is automatically checked out and your commands are run on the runner. We use the pipeline for Magento 1 to run code checks such as linting, PHP Code Sniffer (with Magento's Extension Quality Program (EQP) standards), composer Security Checker and more (we also use GrumPHP to run these on a per-commit basis locally).

Back to Docker! Gitlab has a Container Registry built into every project; we can build Docker images locally and push them to the Container Registry for them to be used by our runners. These Docker containers are the basis for our pipelines; they contain all prerequisites for building, testing & deploying a Magento 1 or Magento 2 installation.

After the testing stage has finished, Deployer will be invoked on the runner just as we did on our local machine to deploy to production. When the pipeline is finished, the new release will be live. Most of our clients are in a separate channel in our Slack, through which way they are notified of a new deployment (with the latest commit messages) so they know exactly what is deployed and when.

For Magento 2, we also do SASS generation on the runner, as well as static content deployment and DI compilation. We then upload the generated files to the production server. The test stage is where we run Magento 2's unit tests as well.

For our extensions, we have a separate pipeline that runs PHP CodeSniffer on our code to make sure it complies to [Magento's EQP standards](https://github.com/magento/marketplace-eqp).

#### Dynamic Environments

All the things we talked about in this blog were done to finally culminate in our grand vision; dynamic environments. This is a term Gitlab uses and we were very happy to find out Gitlab actually has built in support for this. Dynamic environments are the basis for what Gitlab calls 'Review Apps'. In short, it's an automatic deployment on branch level, which feeds the URL of the temporary environment for a specific branch back into the Merge Request.

This allows a developer to create a merge request, and another developer that will review it to click a link and immediately see the work the developer has done in a fully fledged copy of the shop with this specific branch checked out. These environments run in a Docker container on a Digital Ocean droplet which we automatically spin up. This also allows us to have our QA team test our merge requests much, much faster. Since it automatically deploys the branch, it doesn't discriminate in what it deploys; small textual changes or big refactors; everything gets its own test environment.

When the reviewing developer approves the merge request, the code is merged into the release branch and the dynamic environment is automatically deleted, along with the DNS record that pointed to it.

We will be rolling out Dynamic Environments to all our projects in the upcoming weeks.

#### Future

We continue on our mission to create a better development and deployment process for both our developers and our customers. We are planning to integrate Docker more and more in our daily life since it allows us to easily and quickly replicate dependable environments. We also would like to expand on using GrumPHP and writing custom tasks for it to ward off common mistakes that are not caught by the default tasks.

Magento 2 is taking a more and more prominent role in our company; right now we're at about 50/50 Magento 1 and Magento 2 and aim to be at 25/75 by the end of the year. This also makes writing and running unit, functional and integration tests a lot easier so we are taking a more BDD/DDD approach to writing our software. 

On to better software!