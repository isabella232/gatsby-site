---
type: post
title:  "Building a VR shop - Part 1: Bringing VR to the Web"
date:   2017-04-04
categories: magento
permalink: /blog/building-a-vr-shop-part-1/
author: Thijs Kuilman
---

In the past few years, developments in Virtual Reality (VR) technologies has skyrocketed. Big companies like Google, Facebook and Sony have all joined the race to make the best VR products and experiences. Thanks to this fierce competition, a nice VR setup has never been more accessible for consumers. 

Virtual Reality is currently mainly used in the entertainment industry, for example in games and movies. However, there are many other promising use cases for virtual reality. At elgentos, we are exploring the possibilities for applying VR technologies to webshops. The ultimate goal is to create a Magento extension which will instantly extend any Magento webshop with a VR webshop.

One of the first things we asked ourselves is how we can make VR webshops accessible for anyone. There are many game engines out there which are great for creating VR content. However, the biggest drawback is that these can only export to a dedicated application. This means VR applications are hard to maintain. Besides, users have to manually download VR applications for each webshop they visit. Accessibility takes a big nosedive here.

Luckily, there is another option. In this first part of the blog series we are going to take a look at bringing VR experiences directly to the web browser.

#### Blog parts
* Part 1: [Bringing VR to the Web](/blog/building-a-vr-shop-part-1/)
* Part 2: [Building an interactive VR World](/blog/building-a-vr-shop-part-2/)
* Part 3: [Bringing products into the VR world](/blog/building-a-vr-shop-part-3/)
* Part 4: [Use the VR module in your Magento shop](/blog/building-a-vr-shop-part-4/)

#### WebVR
WebVR is an Javascript API and an open standard which makes it possible to experience VR directly in the web browser. WebVR provides support for a wide variety of virtual reality devices, such as HTC Vive, Oculus Rift, Google Cardboard and Gear VR. Something really cool is that WebVR unlocks the full feature set of each VR device. For example, with the HTC Vive it will be able to track the motion controllers as well as let you walk around in VR.

The biggest disadvantage of WebVR right now is that it is still is an experimental API. WebVR on a desktop is currently only available in experimental builds of Chrome and Firefox. Before you can dive into a VR application, you also have to manually enable some flags in the browser. On the other side, WebVR on mobile devices are mostly consumer friendly, since you can use the WebVR Polyfill to provide support for Cardboard mobile devices (such as for iOS and Android).

For VR Webshops, we think WebVR is a great choice. The end user doesn't have to download anything; they can jump right into the VR world. It is only a matter of time before WebVR reaches a stable state.

!['Web VR'](../../assets/images/blogs/vrshop/webvr.jpg)

#### A-frame
A-Frame is an open-source web framework for building virtual reality experiences. This framework makes WebVR content creation an absolute breeze. A-Frame lets you build VR application with just HTML, while having unlimited access to JavaScript, three.js and all existing Web API's. With only a few lines of code, you can create a VR-ready world in which you can walk around:


```html
<html>
  <head>
    <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box color="#6173F4" opacity="0.8" depth="2"></a-box>
      <a-sphere radius="2" color="red" position="2 1 5"></a-sphere>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```

!['A-Frame example'](../../assets/images/blogs/vrshop/aframe-example.png)

A-Frame provides all the building blocks you need to create a VR application. There are many built-in components that you can use, such as:

* lights and shadows
* positional sound
* fogs
* 360° videos and photos

Since the framework is open source, there are many contributors to the project. The features and possibilities of A-frame are constantly growing thanks to the community.

#### Our progress so far
We have experimented with WebVR and A-frame for the past few weeks. We have tinkered and played around with stuff like motion controls, UI interaction and Magento integration. We are now fully prepared to start working on the VR shop application.

The first shopping environment is starting to get some shape. You can examine shoes in a space city while a huge zeppelin flies around you!

!['VR Shop Wip'](../../assets/images/blogs/vrshop/vrshop-wip.png)

#### Next topic: Building an interactive VR World
We have some exciting topics left for this blog series. In the next part we'll take a look at **creating an interactive VR world**. For example, the user should be able to walk around, pick up products and navigate through menus. There are some really fun possibilities but also some challenges regarding VR interaction, so we will definitely talk about that.

In the third part, we will talk about another exciting technique called **photogrammetry**. This allows us to transform real products to the virtual world. So stay tuned!
