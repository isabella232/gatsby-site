---
type: post
title:  "Potentiële Magento killers onder de loep: django SHOP"
date:   2013-12-21
categories: magento
permalink: /blog/magento-killers-onder-de-loep-django-shop/
author: Elias Zerrouq
---
*Af en toe nemen we bij elgentos één potentiële Magento-killer onder de loep. Niet omdat we geen toekomst zien in Magento, maar omdat wij geloven dat e-commerce niet gebonden moet zijn aan één specifiek platform; vandaag is de ideale oplossing Magento, maar morgen misschien niet meer.*


### Introductie
In deze derde editie van "Potentiële Magento killers onder de loep" hebben we een vreemde eend in de bijt. Waar we tot dusver alleen hebben gekeken naar Magento-killers geschreven in PHP, is het deze week de beurt aan Python om een potentiële Magento killer af te leveren.

Met [django][django-link] als framework en [django CMS][django-cms-link] als uitgangspunt heeft [django SHOP][django-shop-link] een stukken hoger instap niveau dan Magento. Dit heeft deels te maken met het feit dat Python nog niet dezelfde adoptie op het gebied van webdevelopment heeft als PHP, maar ook omdat django SHOP een hele andere insteek heeft dan Magento.

Daar waar Magento bedoeld is als volledig dekkend e-commerce platform, is django SHOP meer gericht op het leveren van een framework om een e-commerce platform te bouwen die, wanneer wenselijk, erg eenvoudig in het django CMS geklikt kan worden.


### Functionaliteiten
Omdat django SHOP een totaal andere insteek heeft dan Magento, is het eigenlijk niet eerlijk om de functionaliteiten van beide systemen tegen elkaar op te laten wegen. Zo is een schone django SHOP installatie niet veel meer dan een CRUD-systeem met producten, categorieën en orders gebruikmakende van het django framework.

Het hele idee is dan ook meer dat django SHOP zou moeten dienen als een plugin voor het django CMS in plaats van een kant-en-klare oplossing die geschikt is voor alle activiteiten die komen kijken bij een e-commerce platform.


### Typisch django
Over de gehele linie is er dan ook niet heel veel bijzonders te vertellen over django SHOP met betrekking tot de technische opbouw. Het is een doorsnee django applicatie waarin de models en views de boventoon voeren en de controllers slechts als doorgeef-luik dienen.

Door gebruik te maken van de django structuur is django SHOP standaard al modulair opgebouwd. Op het moment van schrijven zijn er een aantal add-ons beschikbaar die gebruikt kunnen worden om de minimale functionaliteit van django SHOP enigzins uit te breiden. Denk hierbij bijvoorbeeld aan [een plugin][django-plugin-link] om django SHOP de functionaliteit te geven om producten in categorieën onder te verdelen.

Al deze add-ons zijn niet zo zeer modules zoals we gewend zijn van Magento. Het zijn eigenlijk gewoon django-applicaties die je kunt koppelen aan je al bestaande django SHOP applicatie. Dit vereist vooral veel handmatige configuratie en aardig wat Python kennis wat vanuit een gebruikersvriendelijke optiek, niet echt optimaal is.


### Conclusie
We zouden nog een aantal paragrafen kunnen wijden aan de minimale tot niet bestaande [documentatie][django-shop-docs-link] en community, maar dat zou niet heel veel toevoegen. django SHOP staat eigenlijk nog in de kinderschoenen.

Een kant-en-klare oplossing is django CMS daarom absoluut niet. Wanneer we django SHOP als e-commerce framework beanderen is het eigenlijk meer "django" dan "SHOP". Gezien de [minimale activiteit][django-github-commits-link] die we vernemen op het gebied van ontwikkeling van django SHOP, hebben wij niet het idee dat deze situatie in een nabije toekomst gaat veranderen.

Tenzij je de intentie hebt om vanaf scratch een e-commerce platform te ontwikkelen in Python waarvoor al een minimale basis is gelegd, is django SHOP niet interessant. Waar we hoopten op een e-commerce platform van hetzelfde kaliber als django CMS, zijn wij van django SHOP niet onder de indruk.


[Officiële website][django-shop-link]
[django SHOP op Github][django-github-link]


**Geschreven door Elias Zerrouq - Elias is stagiaire webdeveloper bij elgentos op de afdeling Research & Development**


[django-link]: https://www.djangoproject.com/
[django-cms-link]: https://www.django-cms.org/
[django-shop-link]: https://djangopackages.org/packages/p/django-shop/
[django-plugin-link]: https://github.com/chrisglass/django-shop-simplecategories
[django-shop-docs-link]: http://django-shop.readthedocs.io/en/latest/index.html
[django-github-commits-link]: https://github.com/awesto/django-shop/commits/master
[django-github-link]: https://github.com/awesto/django-shop
