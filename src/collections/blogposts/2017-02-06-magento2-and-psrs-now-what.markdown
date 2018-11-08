---
type: post
title:  "Magento 2 & PSR’s; now what?"
date:   2017-03-08
categories: magento
permalink: /blog/magento-2-and-PSRs-now-what/
author: Peter Jaap Blaakmeer
---
*Magento 2 has been with us for a while now. There's been a lot of discussion about it and mostly I've taken my place on the side lines. But I feel like I have something to say. And it concerns interoperability.*

### Framework vs platform
Definition ambiguity here. Magento calls itself an e-commerce platform. Laravel, for example, calls itself a PHP framework. Where does the one end and the other start? There's a thin line between platform and framework. You can't call Laravel a platform, just as you can't call Shopify a framework. But where does Magento sit in this spectrum? In the past years, I've seen Magento used for a bunch of different implementations, including but not limited to a stand alone ERP, a pure product catalog, a CMS and an accounting software package. This attests to Magento's flexibility but opens the door for misuse and abuse from developers who aren't well versed in Magento's ways.

The ambiguity itself isn't the problem; that is merely semi-interesting food for a definition discussion. The problem is that a lot of aspiring developers who start out with Magento don't know what its best practices are and how they should go about things. Their usual fallbacks and gut feeling to build software might be wrong since the way it's done in framework X doesn't always mean it's done that way in Magento (or any other framework).

### PHP-FIG
The [PHP Framework Interoperability Group](http://www.php-fig.org/) was founded in 2009 to get the biggest PHP frameworks together to decide on commonalities between projects and make everybody's life easier. PHP-FIG is the driving body behind what we now know as PSR's (PHP Standard Recommendations). Magento is dutifully represented in PHP-FIG by Magento's Chief Evangelist [Ben Marks](http://twitter.com/benmarks), after [applying in Dec 2015](https://groups.google.com/forum/?fromgroups#!msg/php-fig/mStRWUyZYkU/HkyZjOpPCgAJ;context-place=forum/php-fig) and [being voted on and accepted](https://groups.google.com/forum/?fromgroups#!msg/php-fig/hAi1szgC1Fc/5FQMyeQ4HwAJ;context-place=msg/php-fig/mStRWUyZYkU/HkyZjOpPCgAJ) in Feb 2016.

## PSR's
[PSR's](http://www.php-fig.org/psr/) come about after a PHP community member brings forth a common problem that is shared by multiple frameworks (usually represented in PHP-FIG). They make it easier for PHP devs to start working in a certain framework without having to re-learn everything they know (or worse; learn how stuff is done that is not considered best practice). I'll quickly go over a few PSR's and how they relate to Magento. I'd like to point out that PSR's are (as the name implies) recommendations, not rules. They can also become deprecated later on; like everything in programming, PSR's evolve too.

### Coding Styles; PSR-1 & PSR-2
[PSR-1](http://www.php-fig.org/psr/psr-1/) and [PSR-2](http://www.php-fig.org/psr/psr-2/) are about coding standards and coding guidelines. These go about how PHP should be written syntaxically, such as spaces instead of tabs, 120 character line limit, property visibility, where parenthesis and braces go, how classnames should be written (StudlyCaps), how method names should be written (methodsShouldGoLikeThis), etc. This makes it easier for developers to read and understand each other's code and cuts down on all those hours spent on tabs vs spaces debates (spaces). Magento 1 and Magento 2 largely adhere to PSR-1 and PSR-2, but definitely not 100%. If you have [phpcs set up in your PhpStorm](https://www.jetbrains.com/help/phpstorm/2016.3/using-php-code-sniffer-tool.html), you'll see what I mean.

### Autoloading: PSR-0 and its successor PSR-4
On to [PSR-4](http://www.php-fig.org/psr/psr-4/), the big one. PSR-4 is about autoloading. Autoloading allows us to place a library in a certain location in our codebase and the framework will automatically recognize it and you'll be able to use it anywhere in the codebase. No more `includes`, `requires`, or convoluted `extend`'s to pull in functionality. PSR-4 is an evolution on PSR-0, which now is deprecated. PSR-4 allows us to use composer to pull in a library and immediately use it anywhere in our code, especially when the framework leverages Dependency Injection (DI). Magento 1 didn't use DI or composer but the community worked around it and made it possible with the [magento-composer-installer](https://github.com/Cotya/magento-composer-installer).

### Interfaces: PSR-3, PSR-6 & PSR-7
This is where start to get interesting. [PSR-3](http://www.php-fig.org/psr/psr-3/) is a standard on how to implement logging in frameworks. It's basically an interface (Psr\Log\LoggerInterface) that tells use which verbs we can use in our code to log stuff. If everybody uses the same verbs as methods, the actual logging library (that implements (Psr\Log\LoggerInterface) can be swapped out without having to rewrite the code. PSR-3 obviously wasn't around in Magento 1, which is why we have `Mage::log` in M1. Thankfully, Magento 2 is PSR-3 compliant and comes bundled with the de-facto PSR-3 logger, Monolog. Great news, everyone.

I won't go into too much detail about [PSR-6](http://www.php-fig.org/psr/psr-6/) and [PSR-7](http://www.php-fig.org/psr/psr-7/), but the former relates to a standard caching interface (Psr\Cache) and the latter to a HTTP Message interface (Psr\Http).

### Upcoming PSR's
I personally think [PSR-14](https://github.com/php-fig/fig-standards/blob/master/proposed/event-manager.md) about a standard for event management will be an interesting one to see come about, especially for the heavy event-driven framework that Magento is. Also [PSR-15](https://github.com/php-fig/fig-standards/tree/master/proposed/http-middleware), which deals with middleware is a very interesting one. Go forth and read.

## Magento's custom implementation and alternatives

Now that we've covered the basics about PSR's, how can they help make Magento better? And by 'better' I mean, 'easier to start with ánd work with'. I am (as you've probably noticed) a huge fan of [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) and [KISS](https://en.wikipedia.org/wiki/KISS_principle) principles and best practices. Reinventing the wheel is a terrible, terrible sin.

So this is my little plead on swapping out Magento's custom implementation of certain parts of the framework with an industry-vetted, tried & true, well-known and supported package that does pretty much the same thing (and probably better).

Magento 1 leveraged Zend Framework a little bit. Over the years, I've seen a lot of Magento job descriptions mention Zend but in reality, I've worked with it very little. The components you actually work with tend to be Magento's own, whether or not depending on an underlying Zend component. I've come across Zend\_Pdf, Zend\_Currency, Zend\_Db and Zend\_Json pretty frequently but usually we're working with Magento itself, which we had to learn from scratch. Wouldn't it be nice to swap out Magento's custom implementations of certain parts of the framework with libraries we already know from, for example, Laravel or Symfony?

What follows is a short (and definitely not complete) list of parts of Magento 1 or 2 that I feel could be swapped out with a PSR compliant library that does the same thing but is vetted by the PHP community. A number of them I've used personally, and a few of them I've found by searching [Packagist.org](http://www.packagist.org) [on](https://packagist.org/search/?tags=caching) [certain](https://packagist.org/search/?tags=mail) [tags](https://packagist.org/search/?tags=templating) and checking out the most popular packages.

### Collections
Pretty much all objects you deal with in Magento 1 are deep down a Varien_Object, which is an extension on PHP's own stdObject. When working with models and their collections, these objects offer useful methods like `addFieldToFilter`, `getFirstItem` or `addAttributeToSelect`. When working with data containers like collections, it would be very useful to have them extend a class that has a bunch more helper functions.

My recommendation would be an implementation of [Illuminate\Database\Eloquent\Collection](https://github.com/illuminate/database/tree/master/Eloquent) (and thus [Illuminate\Support\Collection](https://laravel.com/docs/5.4/collections), which offers a [wide range of very useful helper method](https://laravel.com/docs/5.4/eloquent-collections#available-methods) and allows us to chain commands to create data pipelines, which are more friendly to read than PHP's own functions and their parameter order idiosyncrasies to avoid writing loops ([booktip: read Adam Wathan's Refactoring to Collections](https://adamwathan.me/refactoring-to-collections/)).

### Storage
Storage is hard, especially when dealing with a lot of files, big files, multiple webservers or worse, all three. 'Slow storage' like backups can and should be off-sited, logs should be accessible to a system that can analyze them accurately and to-be-imported-images should be accessible without having to be uploaded to a production or staging server. To make this possible, it would be wise to abstract away the file system so we can use a common interface to, for example, place logs in an ELK stack, backups in an S3 bucket and images for product upload in a Dropbox folder. Right now, there is no easy way to do this on the application level.

My recommendation would be an implementation of [League\Flysystem](https://flysystem.thephpleague.com/) or [Gaufrette](https://github.com/KnpLabs/Gaufrette), which makes storing & retrieving files from third party systems a breeze.

### Logging
With the advent of PSR-3, we have a unified way to utilize logging libraries. Swapping out Monolog for a different logging lib is the de facto example in Magento 2 for Dependency Injection.

Monolog does a perfectly fine job. This is the one example where the application of a third party library into Magento 2 is a perfect fit, both in theory and practice.

### Dates & Times
Handling dates & times, especially internationally, is no fun. Magento has its own implementations, like `Mage_Core_Model_Date` in Magento 1 (which uses Zend\_Date) or `\Magento\Framework\Stdlib\DateTime\DateTime` in Magento 2 (which uses PHP's DateTime). Although PHP's DateTime has become more useful since its introduction in 5.2.0, it does not compare to the functionality of some date & time packages that are available. On a related note, within Magento, the way times are manipulated, read and saved is not consistent and sometimes even relies on server settings. All dates should always be read and saved in UTC format and manipulated to represent different timezones.

My recommendation would be to either implement [League\Period](http://period.thephpleague.com/) or [Carbon\Carbon](http://carbon.nesbot.com/docs/) to simplify working with days, years, months, hours, timezones, etc.

### Event System (& PSR-14)
Magento is an event-driven framework. In both Magento 1 and 2, events are dispatched throughout the system, which allow third party extensions to extend its core functionality. In Magento 2, this ability is further extended by introducing the concept of plugins and is made easier by introducing dependency injection. However, in many cases, events are still the way to go. The event system used by Magento has some shortcomings (such as stopping the dispatching of certain events at certain times) which can be overcome by implementing other libraries.

My recommendation would be to either implement [League\Event](http://event.thephpleague.com/2.0/) or the slightly simpler [Illuminate\Events](https://github.com/illuminate/events).

Also take a look at ReactPHP, which is great for a event system, Magento has a lot of writes, I think it could benefit from a non-io blocking package as well.

### Images
Image handling in both Magento 1 and 2 is all over the placed. In Magento 2, the class `Magento\Catalog\Model\Product` takes care of retrieving & saving image references to the product, as well as image manipulation (rotating, resizing, watermarking, etc). Although the image processor itself is swappable (ImageMagick or GD), the library for manipulating the images isn't.

My recommendation would be to introduce a layer of abstraction here so we can make use a library that introduces a whole new range of possibilities for images pretty easily. I'd suggest [League\Glide](http://glide.thephpleague.com/) which leverages the excellent [Intervention\Image](http://image.intervention.io/) library and supports both ImageMagick and GD.

### Mailing
Magento is a mail-heavy framework. A customer lifecycle with registering, ordering, invoicing, possibly crediting quickly involves half a dozen emails. Magento has been using Zend_Mail since the early days. Unfortunately, Zend_Mail is pretty hard-wired into Magento and Magento never provided a sturdy API developers could use to send emails, thereby usually relying on Zend_Mail directly. In recent years, the industry standard has become [SwiftMailer](http://swiftmailer.org/), which is a modern library that easily allows you to integrate third party services like Mandrill, Mailgun or SendGrid.

My recommendation would be to implement SwiftMailer instead of Zend_Mail to make handling emails a lot less complicated than it should be.

### CSV generation
Magento's ImportExport module relies heavily on CSV files. Any import will internally be converted to a CSV file that Magento will understand. Reading and writing these CSV files now relies on a custom implemenation by Magento, found in Magento 2 under `Magento\ImportExport\Model\Import\Source\Csv` and `Magento\ImportExport\Model\Export\Adapter\Csv`.

My recommendation would be to swap this implementation with [League\Csv](http://csv.thephpleague.com/) or [Box\Spout](https://github.com/box/spout), both highly maintained and very well written and tested libraries for CSV handling.

[//]: # (### Caching)
[//]: # (#### Doctrine\Cache)
[//]: # (#### Symfony\Cache)
[//]: # (### Templating)
[//]: # (#### Twig / Blade / Smarty)
[//]: # (#### League\Plates)
## Future
I certainly hope Magento will continue on the path they took with Monolog; using industry-vetted packages for reproducable parts of code instead of rolling their own. It will make the barrier to entry a lot lower and will make working with multiple frameworks a lot easier. The chances of having vulnerabilities in the code also decreases by not introducing code that is only used by the Magento world but by code that is used throughout the PHP world.

My recommendations are just that; recommendations. Some of these recommendations you can fairly easily do on your own, some other recommendations might need work from the core developers to make them possible by decoupling code that is currently still coupled.

### Magento packages in other frameworks?
My opinion on Magento's packages is that in the long term, I think that modules should consist of Packages/Interfaces (they core developers already doing a great job with this).

Next to the actual implemenation of the modules that the Magento framework consists of, all packages should rely on interfaces which describe the functionality. Who knows, maybe PSR-4202 will be about how a product in an e-commerce context would behave and we'll have multiple packages that can handle it.

At a certain point, Magento modules should be decoupled from the Magento framework itself in such an extent that you can pull in Magento packages in Laravel/Symfony projects and start using them there.

I know this is maybe a bridge to far for now, but it is a nice discussion and I think this makes it easier to get other frameworks involved in making Magento even better than it already is.

Thanks for reading!