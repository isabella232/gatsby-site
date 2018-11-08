---
layout: post
title:  "Beheer je Magento shop via de command line - n98-magerun"
date:   2014-02-20
categories: magento
permalink: /blog/magento-shop-via-de-command-line/
author: Peter Jaap Blaakmeer
---
## n98-wat?
[n98-magerun][1] (voorts 'magerun') is een command line (SSH) tool ontwikkeld door o.a. [Christian Münch][2] van het Duitse [netz98][3]. Deze tool is gebouwd om het beheren van en ontwikkelen voor Magento shops prettiger te maken door vaak voorkomende taken via one-line SSH commands uit te voeren. Ook een groot aantal minder vaak voorkomende maar moeilijkere taken kunnen via magerun worden gestart.

Er zijn meerdere command line tools voor Magento ontwikkeld, zoals bijvoorbeeld [wiz][4] of mijn eigen (ter grave gebrachte) [mate][5]. Magerun heeft echter door zijn vele functies, goede opbouw & code en doorlopende ontwikkeling een grote aanhang gekregen binnen de Magento community en kan ondertussen als de de facto Magento command line tool gezien worden.


### Een paar functionaliteiten voor webshop beheerders
De hele functielijst van magerun is te vinden op o.a. hun [Github pagina][6] maar ik zal een aantal veelgebruikte toelichten.



`$ n98-magerun.phar cache:flush`

Met deze optie kan je snel de gehele cache flushen. De hele Magento XML configuratie wordt geflushed, niet alleen de bestanden in var/cache.

`$ n98-magerun.phar admin:user:create [username] [email] [password] [firstname] [lastname] [role]`

Hiermee maak je een admin user aan. Handig als je geautomatiseerd meerdere users toegang wilt geven.

`$ n98-magerun.phar sys:cron:list`

Deze optie geeft een lijst van alle cronjobs en wanneer deze worden gestart. Normaal zou je in de database de map cron_schedule moeten openen, maar dan nog zie je alleen de ingeplande teken en niet waneer ze eigenlijk gestart worden. Onmisbare feature om goed overzicht in je shop te houden.

`$ n98-magerun.phar sys:url:list --add-products 4`

Deze optie geeft alle product URL's in je webshop. Handig om bijvoorbeeld crawlers mee te cheken of om een bot aan te sturen voor (Varnish/Redis) cache warming. De sys:url:list optie geeft ook mogelijkheden om dit te doen voor categorieën en CMS pages.
Een paar functionaliteiten voor ontwikkelaars

`$ n98-magerun.phar install`

Met deze functie kan je snel en simpel een Magento installatie neer zetten. Alle benodigde informatie zal aan je worden gevraagd tijdens dit proces. Draai eerst even n98-magerun.phar self-update om de laatste versie binnen te halen zodat de meest recente Magento versie beschikbaar is.

`$ n98-magerun.phar sys:setup:incremental`

Deze functie draait alle setup scripts één voor één. Dit geeft je meer transparantie in het update proces, vooral handig bij grootschalige updates (van bijv CE 1.6 naar CE 1.8). Als het update proces fout gaat, weet je precies wáár.

`$ n98-magerun.phar dev:template-hints [store_code]`
`$ n98-magerun.phar dev:template-hints-blocks [store_code]`

Met deze functies kan je de template (block) hints in en uit schakelen voor verschillende stores.

`$ n98-magerun.phar dev:theme:duplicates theme [originalTheme]`

Hiermee kan je duplicate files vinden binnen je themes, om zo cascading templates op te sporen.

`$ n98-magerun.phar dev:module:rewrite:conflicts`

Met deze functie zoekt magerun naar conflicten binnen je Magento shop; extensies die dezelfde classes en/of blocks overriden worden zo makkelijk en snel inzichtelijk.

Zo zijn er nog veel meer opties, zoals het maken van een database dump, het snel neerzetten van een extensie skelet, het listen en installeren van extensies, openen van een MySQL console, etc.
Mocht je lokaal ontwikkelen en met de IDE phpStorm werken, dan kan je magerun vanuit je IDE gebruiken. Kijk op de [magerun.net site][7] voor meer informatie over hoe dit in te stellen.


### n98-magerun uitbreiden met eigen extensies
Je kan magerun zelf makkelijk uitbreiden met eigen of third party extensies in de vorm van Symfony2 commands. Een mooi voorbeeld hiervan is de 'Create dummy order' extensie van [Kalen Jordan][8] waarmee je een test order kan inschieten vanaf de command line. Hoe je dit zelf kan doen valt [hier te lezen][9]. Ook heeft Magento goeroe Alan Storm hier een mooie blog over geschreven; [Developing Commands for n98-magerun][10].

In de develop branch in de Github repository zit ondertussen een versie van magerun (geschreven door Byte) waar bash completion in zit, zodat je met de tab toets command names kan aanvullen; een welkome aanvulling gezien de soms lange commands.


### Adoptie door Byte
Byte heeft magerun standaard beschikbaar gemaakt op hun servers. Draait je shop niet op een Byte server, bekijk dan de [Github pagina][11] of de [magerun.net pagina][12] hoe magerun te installeren op jouw server (of verhuis je shop naar Byte ;-)).

Deze blog is bedoeld om een korte introductie te geven tot magerun. Ben je geinteresseerd in hoe de specifieke commands werken, wat ze doen en wat je er allemaal mee kan, kijk dan eens naar Alan Storm's [n98-magerun blog series][13].


  [1]: http://magerun.net/
  [2]: http://blog.muench-worms.de/
  [3]: http://www.netz98.de/
  [4]: http://www.classyllama.com/magento/introducing-wiz-a-cli-tool-magento
  [5]: https://github.com/peterjaap/mate
  [6]: https://github.com/netz98/n98-magerun
  [7]: http://magerun.net/quick-tip-phpstorm-command-line-tool-support/
  [8]: https://github.com/kalenjordan/magerun-addons
  [9]: https://github.com/netz98/n98-magerun/wiki/Add-custom-commands
  [10]: http://alanstorm.com/developing_commands_for_n98-magerun
  [11]: https://github.com/netz98/n98-magerun
  [12]: http://magerun.net/installation/
  [13]: http://magento-quickies.alanstorm.com/tagged/n98magerun
