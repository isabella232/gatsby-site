---
layout: post
title:  "Building a VR shop - Part 3: Bringing products into the VR world"
date:   2017-07-04
categories: magento
permalink: /blog/building-a-vr-shop-part-3/
author: Thijs Kuilman
---
### Building a VR shop - Part 3: Bringing products into the VR world
In the first blog, we learned about applying VR technologies to the web browser. In the second blog we took a look at designing a VR world that adapts to the active VR device. However, a shop isn't really useful if it lacks products. In this blog, we will take a look at bringing products into the VR world by using a technique called 'photogrammetry'.

#### Blog parts
* Part 1: [Bringing VR to the Web](/blog/building-a-vr-shop-part-1/)
* Part 2: [Building an interactive VR World](/blog/building-a-vr-shop-part-2/)
* Part 3: [Bringing products into the VR world](/blog/building-a-vr-shop-part-3/)
* Part 4: [Use the VR module in your Magento shop](/blog/building-a-vr-shop-part-4/)

#### Photogrammetry introduction
In short, photogrammetry is the process of creating 3d models from multiple photos of the same object taken from different angles. This technique was widely used as part of mapping/geodetic toolset, but thanks to the processing power of modern consumer machines this technique became viable for other markets like VFX and game development.

Nowadays, there are even mobile applications that allows you to make 3d scans of objects. [This article compares three different free 3d scanning apps.](http://3dscanexpert.com/3-free-3d-scanning-apps/). We have tried Scann3D and Recap 360 for Android. Based on our experiences we think Recap 360 generates the best quality 3d models.

#### Photogrammetry in practise
Let's say we want to the following shoe to the 3d world, what would this process look like?

|  !['Shoe'](/assets/images/blogs/vrshop3/shoe.png) |  !['Make photos of product'](/assets/images/blogs/vrshop3/makephotos.png) |
|  The shoe we want to convert |  We are using a turntable to easily rotate the product |



First of all, we'd need to take pictures from all angles. We are using an IKEA turntable called [Lazy Susan (SNUDDA)](http://www.ikea.com/nl/nl/catalog/products/90074483/) to easily rotate the product without changing its position. The more photos you make, the better the end result will look. For this shoe, we made around 40 photos. After that, we submitted the photos to the Recap cloud service and we had to wait for around 30 minutes. When this process was done, we could download the 3d model. The result (with textures disabled) looked like this:

!['Result 3d model'](/assets/images/blogs/vrshop3/resultrecap.png)

A 3d model consist out of faces. A face is one triangle or rectangle in a 3d model. The total amount of faces in this 3d model was **297.313**. That is a huge amount of faces for a simple object and it will definitely have a big impact on the performance of the VR application. It's time to enter the optimisation phase.

#### Optimisation of 3d model
The goal of the optimisation phase is to reduce the amount of faces to an acceptable level, without losing the details of the 3d object. We need to ensure the shape and textures of the model stays the same. In order to achieve this, we used a technique called 'retopology'. We used the 3d modeling software [Blender](http://blender.org) to execute this process. We took the following steps:

1. Duplicate the original 3d model
2. Position the duplicated model at the exact same position as the original
3. Mark sharp edges with the pencil tool
4. Reduce the amount of faces with the inbuilt Blender tools
5. Bake the texture of the original 3d onto the low poly model

After this process, we succesfully managed to reduce the amount of faces to **6941** while mostly retaining the original details. As you can see in the pictures below, this is quite a difference. The model itself also looks a lot cleaner. Now the 3d model is ready to use in the VR application.

|  !['New 3d model'](/assets/images/blogs/vrshop3/shoe_lowpoly.png) |  !['Difference in faces](/assets/images/blogs/vrshop3/shoe_stats.png) |
|---|---|
|  The optimized 3d model | Comparison amount of faces original and optimized 3d model |

#### Disadvantages of this workflow
Unfortunately, photogrammetry isn't the  always the best choice; it has some downsides as well. The photogrammetry software can't really handle objects that contain few details or has a repetitive texture. For example, we tried to convert our ElePHPant to a 3d model, but the plush doesn't have a detailed texture. This resulted in an interesting 3d model.

|  !['New 3d model'](/assets/images/blogs/vrshop3/elephant1.png) |  !['Difference in faces](/assets/images/blogs/vrshop3/elephant2.png) |
|---|---|
|  Our happy ElePHPant plush | Our - not so - happy ElePHPant plush |

There is also work that has to be done when an object is succesfully converted to a 3d model. Most of the times, it contains little errors which has to be fixed by an experienced 3d modeler. The generated 3d model from Recap 360 also contains way too much faces, so an optimisation phase is essential.

#### Conclusion
We conclude that photogrammetry might not always be the best solution. It is prone to errors and it can take quite some time to get a good looking 3d model. You also need someone who has experience with 3d modeling software like Blender or Maya.

However, photogrammetry can work wonderful with detailed objects like the shoe. We had generated a 3d model of the shoe in a short period of time and we think it looks quite nice in the VR application.


#### Next topic: the Magento extension
In the next blog, we will talk about the Magento VR extension and explain how to use it in your own webshops. We will also make the code open-source, so people can tinker with it and contribute to the project. Until next time!