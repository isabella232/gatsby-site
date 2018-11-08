---
layout: post
title:  "Building a VR shop - Part 2: Building an interactive VR World"
date:   2017-06-13
categories: magento
permalink: /blog/building-a-vr-shop-part-2/
author: Thijs Kuilman
---
### Building a VR shop - Part 2: Building an interactive VR World

In the first blog, we learned about applying VR technologies to the web browser. In this blog, we will take a look at creating interesting and interactive VR worlds.

#### Blog parts
* Part 1: [Bringing VR to the Web](/blog/building-a-vr-shop-part-1/)
* Part 2: [Building an interactive VR World](/blog/building-a-vr-shop-part-2/)
* Part 3: [Bringing products into the VR world](/blog/building-a-vr-shop-part-3/)
* Part 4: [Use the VR module in your Magento shop](/blog/building-a-vr-shop-part-4/)

#### One world to fit them all

Since we want to support desktop VR headsets as well as mobile VR headsets, we need to take into account the limitations and unique features of each device. For example, it is currently not possible to walk around in mobile VR and there isn't a universal input device. However, the HTC Vive has room-scale which allows the user to freely walk around and use a set of motion controllers.
 
With this in mind, we have come up with the following concept art for our VR world template.

!['Concept VR template'](/assets/images/blogs/vrshop2/concept.png)

We believe this template provides a nice balance between the mobile and desktop VR experience. The world is adaptive, in the sense that it will adapt itself to the unique features of the active VR device. Let's break this down.

#### Adaptive locomotion

The world size is pretty small, which is great for mobile users since they cannot walk around. The user will be placed at the center of the circle and will only be able to look around. 

Desktop VR users will be presented with some nifty additions. The circle is approximately 5 by 5 meters, so there is enough space for the user to walk around.

#### Adaptive product interaction

Viewing products is a lot more interactive on desktop VR thanks to the motion controls. Products are being equiped with a physics component; the user is be able to pick up products, resize them or throw them away.

On mobile devices, the product interaction is more limited. The product will be showcased in front of the user. We have added a constant rotation to the product, so the user can take a look at all sides.

| Mobile        | Desktop       |
| ------------- |:-------------:|
| !['Concept VR template'](/assets/images/blogs/vrshop2/sofa.gif)      | !['Concept VR template'](/assets/images/blogs/vrshop2/keyboard.gif) |

#### Adaptive UI interaction

Interacting with UI components was a bit tricky. There is no universal input device for mobile VR; most mobile users probably don't have a controller at all. However, one thing all mobile users have is access to is tracking head movement. When you are in mobile VR, a crosshair will appear at the center of the screen. This allows the user to interact with buttons by looking at them for a few seconds.

On the desktop, things are a bit easier to control. You simply point your motion controller at a button and click to activate a button. 


| Mobile        | Desktop       |
| ------------- |:-------------:|
| !['Concept VR template'](/assets/images/blogs/vrshop2/inputmobile.gif)      | !['Concept VR template'](/assets/images/blogs/vrshop2/inputvive.gif) |


#### Personalise your world

There is a lot of potential in the creation of virtual environments; your imagination is the limit. How about showcasing camping products on the top of the Himalaya? Or showcase your diving gear in the deep ocean? You name it.

Besides the creation of VR worlds, we also think there is a lot of potential in sharing VR worlds. It is pretty easy to import new 3D worlds into the Magento extension; you simply add a world file and change the active world in the Magento dashboard. In the future, we could even build a community library where you can upload and download VR worlds. 

In order to really personalise your 3D world, you can upload promotion banners in the Magento dashboard. This will apply the images to certain places in the world. For example, we have uploaded an elgentos logo which is being displayed underneath a zeppelin.

!['Concept VR template'](/assets/images/blogs/vrshop2/zeppelin.png)

#### Next topic: Photogrammetry

The next big challenge is to bring real world products into the 3D world. Let’s say that we wanted to bring the following shoe to the VR world. How would we approach this?

!['Concept VR template'](/assets/images/blogs/vrshop2/shoephoto.jpg)

In the next blogpost we'll dive into it!

