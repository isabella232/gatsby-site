---
type: post
title:  "Potentiële Magento killers onder de loep: Sylius"
date:   2013-12-12
categories: magento
permalink: /blog/magento-killers-onder-de-loep-sylius/
author: Elias Zerrouq
---
*Af en toe nemen we bij elgentos één potentiële Magento-killer onder de loep. Niet omdat we geen toekomst zien in Magento, maar omdat wij geloven dat e-commerce niet gebonden moet zijn aan één specifiek platform; vandaag is de ideale oplossing Magento, maar morgen misschien niet meer.*


### Introductie
Na een weekje van afwezigheid, staat deze tweede editie van "Potentiële Magento killers onder de loep" in het teken van "Sylius". Sylius, geschreven in PHP, prijst zichzelf aan als een 100% open source, modern e-commerce platform. Met een leeftijd van ruim twee jaar, is Sylius nog steeds hevig in ontwikkeling. Er is een stabiele versie, maar een beta of zelfs alpha label is nog niet binnen handbereik.

Daar waar Magento haar roots vindt in het Zend framework, is Sylius volledig gebouwd op het [Symfony2 framework][symfony2-framework-link]. De vergelijking tussen Zend en Symfony2 is buiten de scope van dit artikel, maar speerpunt is dat Symfony2 kan worden aangeschouwd als het moderne, jongere en stukken lenigere broertje van Zend. Dit zie je vooral terug in het gebruik van moderne tooling, zoals dependency management met behulp van Composer, maar ook in het feit dat Sylius, door gebruik te maken van Symfony bundles, volledig modulair is opgebouwd.

Sylius is erg gericht op het opbouwen van een sterke [community][sylius-community-link] en dit resulteert in een grote groep vrijwilligers die daadwerkelijk meehelpen met de ontwikkeling door het bijdragen van code en suggesties. Alles wijst er dan ook op dat wanneer Sylius een kant-en-klare release naar buiten brengt, dit een grote stimulans zal zijn voor verdere community inspanningen.


### Functionaliteiten
Net als met [Forward][elgentos-forward-link] geldt dat Sylius veel tijd steekt in het opzetten van een degelijke fundering. Hierdoor zitten weer alle basis elementen van een e-commerce platform er meer dan prima in, maar is het de vraag of je goed uit de voeten kan wanneer je bijvoorbeeld meer dan een naam, een plaatje en een omschrijving aan een categorie wil toewijzen.

En dit geldt in principe voor elke nieuwe concurrent van Magento: ze dienen een enorme inhaalslag te maken. We moeten niet vergeten dat Magento al ruim vijf jaar in ontwikkeling is. Hierbij heeft Magento ook al een jaar of twee flinke resources van e-commerce gigant eBay ter beschikking, wat de snelheid van de ontwikkeling alleen maar ten goede komt.

Over de jaren heen is Magento echter wel log geworden en het is juist hier waar de potentiële Magento killers flinke klappen kunnen uit kunnen delen. Zo heeft Sylius bijvoorbeeld standaard een front- én backend die 100% responsive is en daarbij een interface met een duidelijke, heldere structuur die érg gebruiksvriendelijk is.


### Technische opbouw
Sylius is modulair. Alle relevante functionaliteit is onderverdeeld in volledig van elkaar losstaande componenten - [bundles][symfony-bundle-link] genaamd. Op het moment van schrijven bestaat Sylius uit een stuk of tien bundles. Denk hierbij aan een "SyliusShippingBundle" of een "SyliusCartBundle". Dit toont overeenkomst met de module opbouw van Magento, bijvoorbeeld "Mage_Checkout_Cart", maar het grote verschil is dat het bij Magento interne modules zijn. Bij Sylius zijn het Lego blokjes die figuurlijk in elkaar worden geklikt.

Hoewel PHP in sommige kringen nog steeds berucht staat als rommel taaltje, is de afgelopen jaren door inzet van de community en nieuwere PHP versies grote stappen gemaakt naar een moderner PHP. Een grote speler hierin is Composer, een dependency manager voor PHP. In plaats van software te ontwikkelen wat totaal niet herbruikbaar is, bevordert Composer, door gebruik te maken van [open standaarden][php-fig-link], het schrijven van decoupled software. Sylius is hier een groot voorstander van en dit zie je terug in het feit dat elke bundle volledig los te gebruiken is in welke applicatie gebruikmakend van Composer dan ook.


### Behavior-driven Development
Het "Behavior-driven Development"-model (BDD) wordt bij Sylius als uitgangs punt gebruikt. Dit model bouwt voort op "Test-driven Development" (eerst de tests, dan de bijbehorende code). Scenarios worden geschreven en met behulp van tooling zal hier automatisch skeleton-code voor worden opgebouwd. Om dit proces te ondersteuenen maakt Sylius gebruik van [Behat][behat-link] en [PHPspec][php-spec-link]. Een scenario ziet er als volgt uit:

```
Scenario: Seeing empty cart
Given I am on the store homepage
When I follow "View cart"
Then I should be on the cart summary page
And I should see "Your cart is empty"
```

Een dergelijke test kan misschien als overdreven worden bestempeld, maar het schrijven van tests voor elke uitgangs situatie is dé sleutel tot stabiele software. Wanneer er nieuwe functionaliteit wordt ingebouwd of oude verbeterd, kan direct gezien worden of het hele plaatje nog werkt door alle scenarios geautomatiseerd door te lopen. Door gebruik te maken van BDD en een modulaire opbouw heeft Sylius een zeer elegante code base die tot in de fijne puntjes volledig te testen is.


### Magento 2
Met deze moderne aanpak loopt Sylius ver voor op Magento. Daar waar Magento jaren geleden hoge ogen gooide in ogen van PHP developers met een strak gebruik van OOP, het Zend framework als fundering en een goed doordachte software architectuur, is de complexiteit en grootte van het systeem nu een obstakel aan het worden. Zo zijn er nauwelijks tot geen tests en is Magento alles behalve decoupled.

De bedoeling is dan ook dat dit is waar [Magento 2][magento2-link] verbetering in gaat brengen door grote stukken van Magento te refactoren. In de recentelijke [officiële webinar][magento2-yt-link] van Magento die in het teken stond van het geven van development updates, zijn veel van bovengenoemde punten opgenomen als "Platform Goals" voor Magento 2.


## Documentatie
Dankzij de grote gebruikersgroep van Magento is er een overvloed aan [tutorials][magento-tutorials-link] en [hulpbronnen][magento-stackexchange-link] van derde partijen over uiteenlopende onderwerpen te vinden op het Internet. Wat echter ontbreekt, is een gestroomlijnde developers guide wat als naslagwerk of introductie materiaal gebruikt kan worden. Hierdoor is er vaak niet één manier om dingen op te lossen en de vraag is altijd maar wat de juiste is.

Bij Sylius ziet dit er een stuk beter uit. Er is een [duidelijke documentatie][sylius-docs-link] in heldere taal; van [installatie][sylius-install-link] tot een compact overzicht van waar de verschillende bundles voor staan. Toegegeven, er zitten hier en daar gaten in, maar volledig dekkende documentatie is duidelijk een groot streefpunt van Sylius.

Ook op het vlak van officiële documentatie voor ontwikkelaars moet Magento nog grote stappen maken. Hoewel de source code zelf vrijwel [volledig gedocumenteerd][magento-docs-link] is, is het onbegonnen werk om dit als naslagwerk te gebruiken. Er is daarnaast ook een [wiki][magento-docs-link] met een verzameling aan informatie, maar het is ongeorganiseeerd en vrij vaak gedateerde informatie. Dit komt mede doordat er inderdaad vaak verschillende wegen naar Rome leiden, maar ook omdat documentatie nooit echt een prioriteit is geweest.


## Conclusie
Dat er na twee jaar nog steeds geen alpha of beta release is, heeft vooral te maken met de tijd die wordt gestoken in het neerzetten van een degelijk product; het doel is namelijk nooit geweest om zo snel mogelijk nóg een matig alternatief voor Magento op de markt te brengen. Ondersteundend hierin is dat Sylius al rijp is voor productie, de stabiele versie wordt zelfs al mondjesmaat in productie gebruikt.

Een glazenbol hebben wij helaas niet, maar wat wel kristalhelder is, is dat Magento veel kan leren van Sylius. Het is dan vooral een kwestie van tijd voordat we zien of Magento sneller leert dan dat Sylius volwassen wordt.


[Officiële website][sylius-link]
[Sylius op Github][sylius-github-link]


**Geschreven door Elias Zerrouq - Elias is stagiaire webdeveloper bij elgentos op de afdeling Research & Development**


[symfony2-framework-link]: http://symfony.com/
[sylius-community-link]: http://sylius.org/community
[elgentos-forward-link]: https://www.elgentos.nl/blog/potenti%C3%ABle-magento-killers-onder-de-loep-forward
[symfony-bundle-link]: http://symfony.com/doc/current/bundles.html
[php-fig-link]: http://www.php-fig.org/
[behat-link]: http://behat.org/en/latest/
[php-spec-link]: http://www.phpspec.net/en/stable/
[magento2-link]: https://github.com/magento/magento2
[magento2-yt-link]: https://www.youtube.com/watch?v=7xZCgTjw3M0
[magento-tutorials-link]: http://alanstorm.com/category/magento/
[magento-stackexchange-link]: http://magento.stackexchange.com/
[sylius-docs-link]: http://docs.sylius.org/
[sylius-install-link]: http://docs.sylius.org/en/latest/components/general/using_components.html
[magento-docs-link]: https://magento.com/resources/technical
[sylius-link]: http://sylius.org/
[sylius-github-link]: https://github.com/sylius
