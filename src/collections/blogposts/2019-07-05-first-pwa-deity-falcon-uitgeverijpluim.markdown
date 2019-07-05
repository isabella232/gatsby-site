---
type: post
title:  "The first PWA on Deity Falcon for Uitgeverij Pluim"
date:   2019-07-04
categories: magento
permalink: /blog/first-pwa-deity-falcon-uitgeverij-pluim/
author: Peter Jaap Blaakmeer
---

#### Introduction

Yesterday, we launched our first PWA project for a Magento 2 project. In this blogpost, we will detail why and how we built this cutting-edge and lighting-fast webshop. If you can't wait to see the result (we totally understand!) you can visit the webshop here; [uitgeverijpluim.nl](https://uitgeverijpluim.nl).

In the Magento PWA scene there has been a lot of talk and not a very large amount of action concerning actually building shops. We've seen proof of concepts but that only gets you so far. So when we had the opportunity to build a PWA shop, we decided to just go for and see where we'd end up. We were in the lucky position to run into a client that was willing to take this adventure with us!

#### Client wishes

When the client approached us, they had no idea what a PWA was and what it entails. Uitgeverij Pluim is a Dutch publishing company that started in 2018. They publish literary fiction and non-fiction books focused on the Dutch market. We pitched them PWA and explained what this could mean for them. Two of the main benefitsof PWA are the speed of the webshop and the high Google Pagespeed Insight scores that are relatively easy attainable versus a standard Magento 2 frontend implementation.

The requirements were fairly straightforward, which gave us the confidence to start building a PWA. At this point in time, PWA offerings aren't as feature-rich as the standard Magento 2 frontend and feature parity is still a long way off. The main initial requirements for phase 1 were;

- Ability to show authors
- Ability to show books
- Ability to show upcoming agenda items
- Ability to show news items
- Easily maintainable
- Fast website

The subsequent requirements for phase 2 were;

- Ability to sell products
- Ability to use iDeal as payment method
- Ability to do some basic email marketing

Due to the relatively small amount of books on the shop (about 20 to 50 at any given time), we could do without filtering options and search. Due to the restriction on the Dutch-speaking world, we could also do without internationalisation and complex tax settings etc.

We then started looking for ways to separate these two phases and get the content site (without e-commerce functionality) online as fast as possible. 

#### React

First we'll talk about our underlying tech stack. We've historically been a PHP agency - we've always worked with Magento and a few years ago we started developing microservices and supporting tools for e-commerce in Laravel, which is also a PHP framework (though not specifically geared to a certain type of webapps). Our frontend stack has always been pretty plain vanilla HTML/JS/CSS (and XML with regards to Magento). 

However, PWA offerings aren't built in PHP. They are written in Javascript and more specifically, in a Javascript frontend framework. There are two key players here; [Vue](https://vuejs.org/) and [React](https://reactjs.org/). We considered both and ultimatly choose React. I'm not going into depth about why we choose React over Vue, [you](https://programmingwithmosh.com/javascript/react-vs-vue-a-wholesome-comparison/) [can](https://www.monterail.com/blog/vue-vs-react-2019) [read](https://mentormate.com/blog/react-vs-vue-the-core-differences/) [up](https://skywell.software/blog/vue-vs-react-what-to-choose-in-2019/) [about](https://vuejs.org/v2/guide/comparison.html) [that](https://medium.com/fundbox-engineering/react-vs-vue-vs-angular-163f1ae7be56) [choice](https://www.codica.com/blog/react-vs-vue-2019/) [yourself](https://hackr.io/blog/react-vs-vue). It ultimately boils down to personal preference (and discussing it often sound like a religious debate).

#### Gatsby

After we decided to work with React a while ago, we started playing with building pure React apps (like our [tableratesgenerator.com](https://www.tableratesgenerator.com/)) and building sites using [Gatsby[(https://www.gatsbyjs.org/), which is a React-based static site generator. In fact, the site you'r reading this on is built on Gatsby. Gatsby enables us to efficiently and quickly build extremely fast sites in a relatively short amount of time and without a lot of developer training. React components are at the end of the day just little bundles of Javascript, which makes it fairly easy for anyone with some Javascript experience to digest what is happening in such a framework. Besides, the [Gatsby docs](https://www.gatsbyjs.org/docs/) are just excellent and the its community is very welcoming (hi there Jason!).

Since the first milestone was to get a content site up and running, we decided to go with Gatsby to get the site up and running. We had a design in pure HTML/JS/CSS and rewrote this to a [Gatsby theme](https://www.gatsbyjs.org/docs/themes/what-are-gatsby-themes/), which is basically a collection of React components. This allowed us to move these components over with relative ease to our PWA solution down the line, since we also settled on React when going the PWA route concerning e-commerce. 

The Gatsby site is still accessible [here](http://kind-jepsen-2ed2ec.netlify.com).

#### Prismic

By now it's time to introduce [Prismic](https://prismic.io). Prismic is one of the many interesting headless CMS offerings. A headless CMS is a content management system that allows you to manage your content without being opinionated about how that content is presented on the frontend. For example, if you'd use Wordpress without its frontend but uses the Wordpress API to pull your data from the Wordpress backend and show it in your own custom frontend, you're basically using it as a headless CMS.

We did a fairly in-depth comparison between a number of headless CMS providers such as [Prismic](https://prismic.io), [Sanity](https://www.sanity.io), [Contentful](https://www.contentful.com/), [ButterCMS](https://buttercms.com/) and [Cockpit](https://getcockpit.com). This comparison could be a blog post in its own right but summarized we choose Prismic because of its price point (cheap but not too cheap), feature set (fairly complete) and their responsiveness to our questions (very fast). We also wanted to have a hosted SaaS solution (to minimize overhead) so self-hosted solutions weren't considered. Contentful is a great option but insanely pricey.

Setting up Prismic is a very pleasant process; their backend is fast and aesthetically pleasing to the eye. Their [documentation](https://prismic.io/docs) is comprehensive and in-depth and above all, the [library and tools](https://prismic.io/docs/rest-api/prismic-api-client/libraries-and-tools) they offer in a wide variety of languages and frameworks is unrivaled. This seems to be a typical French thing since the [Algolia integrations](https://www.algolia.com/integrations/) are just as endless. Especially the NodeJS and React components for Prismic.io were real time-savers during our project.

Prismic also offers a GraphQL API endpoint which we leveraged to pull data from it.

When we had Prismic set up, we asked the client to input all data. We created custom types for a number of entities;

!['Prismic custom types'](../../assets/images/blogs/falcon/prismic-types.png)

We then hooked up Prismic to Gatsby through the [gatsby-source-prismic](https://github.com/angeloashmore/gatsby-source-prismic) package to make all data available in our Gatsby site. Since Gatsby builds a static site and doesn't need a server after its deployed, we used [Netlify](https://www.netlify.com) for (free!) hosting of the site.

#### Magento 2

On to e-commerce! By this time, we had the content site almost up and running, but we needed to show the products on the site, albeit without any e-commerce functionality. We set up a pretty default Magento 2 instance and configured it for the client to be able to add products to it. After they uploaded their products into Magento we could use the [gatsby-source-magento2](https://www.gatsbyjs.org/packages/gatsby-source-magento2/) to fetch product data from Magento 2.3 through GraphQL.

!['Prismic custom types'](../../assets/images/blogs/falcon/magento2-products.png)

#### Deity Falcon

This is where the magic happens. We've set up all the prerequisites to get going on the PWA implementation; we had a Magento 2 instance with product data and a Prismic instance with all other content such as authors, agenda items, news items and content pages. We wanted to work in React so we could port the components we had already written in Gatsby over to the PWA solution. We had a number of pleasant talks with Eindhoven-based [Deity](https://deity.io), who develop a range of products for e-commerce amongst others [Falcon](https://falcon.deity.io) and [PushPro](https://www.pushpro.io).

!['Deity demo shop'](../../assets/images/blogs/falcon/deity-demo-shop.png)

Their Falcon product is a PWA solution written in React which comprises of two main parts; [Falcon Server](https://falcon.deity.io/docs/falcon-server/basics) and [Falcon Client](https://falcon.deity.io/docs/falcon-client/basics). Falcon Server functions as the glue between our backend systems (such as Magento and Prismic) and the frontend. The frontend in this case is Falcon Client but the system is set up independently - we could have opted to use our Gatsby site as the frontend and use Falcon Server to introduce e-commerce functionality in our project.

So why did we decide to go with implementing our design into Falcon Client instead of implementing e-commerce functionality in the form of a Falcon Server implementation in Gatsby? Since we already had a lot of custom React components written in Gatsby, it was fairly easy to port this over. We also didn't have a dependency concerning data since this was abstracted away into Magento and Prismic. We guessed this was less work than writing our own implementation of Falcon Server for Gatsby and in hindsight, it looks like we made the right choice, in any case time-wise. Note that we didn't use [Falcon UI](https://falcon-ui.docs.deity.io/), which is a UI-component library for React. This is because we didn't build the design from scratch; we already had it converted into plain HTML/JS/CSS. Falcon UI would be an option to use when we still had to conver the design from Figma into code, alongside other UI component library such as [Storybook](https://storybook.js.org/).

##### Custom work in Falcon

##### API providers

So far, the only big chunk of custom development work had to do with the frontend. But pulling in Prismic data to Falcon Server was something that hadn't been done before; we needed to write our own sourcing packages. We ended up writing 5 [API providers](https://falcon.deity.io/docs/falcon-server/api-providers) to source the 5 custom content types from Prismic (Agenda, Author, Homepage, News, Page). Books were already sourced from Magento by Falcon's [Magento 2 module][(https://falcon.deity.io/docs/backend/installing-magento2) although we did have to write an extension to be able to pass through custom fields from Magento through Falcon Server to Falcon Client (see the [Deity Falcon data flow schema](https://falcon.deity.io/docs/getting-started/intro#overall-deity-falcon-data-flow-schema)):

!['Falcon Data Flow Schema'](../../assets/images/blogs/falcon/falcon-data-flow.png)

##### Sitemap generator

We also wrote a sitemap generator in Falcon Server. We couldn't use the Magento 2 sitemap since it would give us the Magento URLs for the products instead of the Falcon URLs and it would only have URLs for the books, but we have 5 other content types we need indexed as well. Falcon Server is the place to do this; this is the only system that knows of all routes that are available within the site. We'll be open-sourcing this sitemap generator shortly so keep an eye out on our [Github page](http://github.com/elgentos).


##### Images CDN

Then we had the issue of images; we had images coming in from Magento and we had images coming in from Prismic. This would work fine in essence, but we wanted a single repository to manage these images and wanted to implement a CDN for images. We decided to go for [Cloudinary](https://cloudinary.com) since we'd heard good things and they have a great [Magento 2 extension](https://github.com/cloudinary/cloudinary_magento2). By using this extension, Magento would return us the Cloudinary version of the product image, but Prismic does no such things. We therfore wrote our `@elgentos/cloudinary-automatic-image-uploader` package for Falcon Server. When we receive an image URL from Prismic, we hash it and check whether a corresponding file exists in Cloudinary. If it does, we return that URL. If it doesn't, we upload it to Cloudinary and fetch the resulting Cloudinary URL. One of the (many) cool things is that we are able to apply the [face image transformation](https://cloudinary.com/documentation/image_transformations) for the author photos so Cloudinary automatically crops to the face of the author.

!['Cloudinary face transformation'](../../assets/images/blogs/falcon/cloudinary-face-transformation.png)

###### iDeal payment method integration

Falcon out of the box offers a PayPal and an Adyen integration. Unfortunately the Adyen integration only offers a credit card implementation and not an iDeal integration, which we needed. We wanted to go for a simple iDeal payment implementation and decided on Mollie because of their extremely simple API and their great [Magento 2 extension](https://github.com/mollie/magento2). The Magento 2 extension actually does all the heavy lifting; we only had to extend the extension a little bit to be able to pass back a different redirect URL. This is because we have to redirect the client back to the Falcon frontend instead of the default Magento 2 frontend. You can find our at our Github page; [Falcon Mollie implementation for Magento 2](https://github.com/elgentos/FalconMollie).


###### Pagespeed Insights optimization

We wanted a fast site, and a fast site is what we got! We spent a lot of time optimizing the code and the Webpack bundles that comprise our eventual site, but here's the result (and yes, we're pretty proud of that!);

!['Pagespeed 5x100'](../../assets/images/blogs/falcon/pagespeed-100.png)

#### Hosting 

We are a long-time fan of Byte's [Hypernode](https://www.hypernode.com/) offering and run all our Magento webshops on that platform. Since this is a relatively light-weight site, we wanted to be able to run the whole stack on a single Hypernode. This had its challenges since obviously we were the first ones trying this. Hypernode is a managed platform so we didn't have completely free reign to set everything up according to our wishes. But we had great help from Hypernode's support team and we got it running. In short, here are some of the work we had to to make our Hypernode compatible with Falcon;

- Install node and yarn (or npm)
- Set up crons that will start the Falcon client and server when they aren't running
- Configure Nginx so it will proxy pass port 80/443 to port 3000 (on which Falcon Client runs)
- Configure Nginx so the Magento site will be available at a sub-subdomain (magento.projectname.hypernode.io)
- Redirect www to non-www
- Redirect http to https

#### Hours

So how long did all of this take us? We had a ramp-up period where the client defined whishes, created content, etc. We started building the Gatsby site mid-april, started building the Falcon shop mid-may and launched the shop at the 4th of July. Here's a visual overview;

!['Project time graph'](../../assets/images/blogs/falcon/project-graph.png)

Here's a breakdown of the main project components we've discussed;

| Component  |  Sub-component | Hours  |
|---|---|---|
| Magento 2 set-up  | | 9  |
| Prismic set-up  | | 17 |
| Gatsby implementation  | | 48  |
| Falcon implementation total |   | 250 |
| | Prismic | 65 | 
| | Cloudinary | 32 |
| | Mollie | 16 |
| | Hosting set-up | 7 |
| | CI/CD set-up | 4 |
| | Sitemap generator | 2 |
| | Misc | 124 |
| Project management | | 20 |
| Total | | 344 |

#### Conclusion

We are altogether very happy with our process and how the webshop turned out. We learned A TON and feel we could do a similar project in about half the time (please don't hold this against us ;-)). Developing in Falcon/React took a bit of a learning curve since we came from the PHP world. Falcon isn't bug-free or feature-complete yet but the team is working hard and they are very responsive on Slack. They listen to feedback and implement suggested changes fairly quick. We're excited to see what the future holds!