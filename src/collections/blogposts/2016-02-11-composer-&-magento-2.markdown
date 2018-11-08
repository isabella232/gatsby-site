---
type: post
title: "Composer & Magento 2"
date: 2016-02-11
categories: magento
permalink: /blog/composer-and-magento-2/
author: Peter Jaap Blaakmeer
---

*Met de komst van Magento 2 zal je de term vast vaker voorbij hebben zien komen. Wellicht heb je met andere PHP projecten er al mee gewerkt en misschien heb je zelfs net als wij je Magento 1.x shops er al in draaien; Composer. Maar wat is het, wat doet het en waarom moet je het gaan gebruiken?*


### Wat is Composer
Composer is een dependency management tool voor PHP. Het is, in tegenstelling tot wat veel developers denken, geen *package* manager maar een *dependency* manager. Dit subtiele verschil uit zich in het feit dat je met composer (over het algemeen) een package (zij het een extensie/module, library of externe tool) op project-niveau installeert ipv globally en dat Composer ook de packages waarvan elke package zélf afhankelijk is installeert.


### Waarom Composer
Het grootste voordeel van Composer is dat je al je afhankelijkheden binnen je project op een eenduidige manier beheert en kan inzien. De file die je hiervoor gebruikt (composer.json) staat in je project. Je streven moet zijn om alle code die **herbruikbaar is binnen meerdere projecten** in een *composerized module* oftewel *composer package* te krijgen. Voor Magento 1 gaat het dan om de extensies in app/code/community. Extensies in app/code/local zijn project specifiek en worden dus maar één keer gebruikt (alleen binnen het betreffende project) en lenen zich dus niet voor de voordelen die Composer biedt.

Stel je voor dat je een extensie hebt die vaker wordt gebruikt. Deze wordt onderhouden door één of meerdere developers en ontwikkelt zich verder over tijd. Wanneer je nu deze extensie in een project zet en de extensie wordt ondertussen geupdate, dan biedt Composer een eenvoudige manier om de nieuwere versie binnen te halen. Je past het versienummer aan binnen je composer.json file, draait *composer.phar update* en de update is binnen. Geen gedoe met zips downloaden, uitpakken, handmatig files overschrijven, oude niet meer gebruikte files verwijderen, etcetera. Composer regelt het allemaal voor je. (Tip; als je dan ook nog de spiksplinternieuwe [Magerun Hypernode addons](https://github.com/Hypernode/hypernode-magerun) gebruikt heb je ook nog eens snel door voor welke extensies er updates zijn).


### Wat heeft dit met Magento 2 te maken?
Magento 2 leunt volledig op Composer. Als je Magento 2 downloadt vanaf [Github](https://github.com/magento/magento2-community-edition) zal je zien dat er in deze versie erg weinig code zit. Dat komt omdat Magento 2 veel gebruikt maakt van bestaande libraries zoals bijvoorbeeld Zend Framework 2 modules, Symfony components, PHPUnit, PHPMD, OAuth, [etcetera](https://packagist.org/packages/magento/community-edition). Deze hoef je niet in één keer te downloaden vanaf magento.com maar worden door Composer gedownload en op de juiste plek geplaatst wanneer je *composer.phar install* draait. Zelfs de core modules van Magento zijn composer packages geworden, zoals je ook op [Magento's Packagist pagina](https://packagist.org/packages/magento/community-edition) kunt zien onder 'replace'.


### Hoe werkt het nou in de praktijk?
Composer bestaat eigenlijk uit drie onderdelen; twee files (composer.json & composer.lock) en één binary (composer.phar). In je composer.json geef je de packages aan die jouw project nodig heeft. Je downloadt daarna deze packages door *composer.phar update* te draaien. Dit downloadt niet alleen de packages maar maakt ook een zgn. lockfile aan, namelijk composer.lock. In deze lockfile staat exact welke commit van de Git repository de benodigde code voor die specifieke versie van de door jou gewenste package bevat. Je dient beide files aan je Git repository te committen. Pull je dan vervolgens je repository naar je productieserver, dan kan je daarna met een gerust hart *composer.phar install* draaien. Deze command kijkt namelijk alleen naar composer.lock en niet naar composer.json waardoor hij dus alleen door jou geteste code live zet en je niet voor onaangename verrassingen komt te staan omdat de package tussentijds is geupdate.


### Waar vind ik die packages?
Dé site voor packages voor Compser is [Packagist](http://www.packagist.com). Hier staan vrijwel alle open source extensies voor Magento op. De Packagist repository is standaard toegevoegd aan Composer en daarom kan je vele extensies simpel installeren door *composer.phar require vendorname/packagename* te draaien. Hier kan je ook je eigen open source extensies aan toevoegen.

Een andere veelgebruikte repository in Magento 1-land is die van de Duitse Magento community Firegento; [Firegento Packages](http://packages.firegento.com). Hier kan je ook je eigen open source extensies aan toevoegen maar deze worden nog wel door Firegento gecheckt en kunnen dus afgekeurd worden om diverse redenen.

Maar wat als je veel interne extensies hebt die je niet open en bloot op Github wil hebben? Dan heb je twee opties; je kunt je interne Git repository gewoon aan compser.json toevoegen. Je kunt ook een eigen repository server draaien die je vervolgens toevoegt aan je composer.json. Composer zal dan bij een require ook binnen die server gaan zoeken. Je kan die server opzetten met behulp van het open source pakket Satis [[1]](https://getcomposer.org/doc/articles/handling-private-packages-with-satis.md) [[2]](http://code.tutsplus.com/tutorials/setting-up-a-local-mirror-for-composer-packages-with-satis--net-36726) [[3]](http://blog.servergrove.com/2015/04/29/satis-building-composer-repository/).


### Hoe weet Composer welke files bij mijn extensie horen?
Hier zijn 3 manieren voor; de meest gebruikte manier is door middel van een modman file. [Modman](https://github.com/colinmollenhour/modman) is een tool specifiek geschreven voor de Magento community om het ontwikkelen van extensies te vergemakkelijken. Composer neemt hier eigenlijk de volgende stap in. Als je composer gaat gebruiken dien je de [Magento Composer Installer package](https://github.com/Cotya/magento-composer-installer) installeren. Deze installer verwerkt o.a. een modman file en weet op die manier welke bestanden bij jouw extensie horen en waar die geplaatst moeten worden.

De tweede manier is door gebruik te maken van een package.xml zoals die bij voor Connect gepackagede extensies zit.

De derde en meest omslachtige manier is om deze mapping in de composer.json file zelf aan te geven door de extra.map list te vullen.

Lees voor uitgebreidere informatie over deze opties [deze blog van Magebase](http://magebase.com/magento-tutorials/how-to-make-magento-extensions-work-with-composer/).


### Terug naar Magento 2
Binnenkort zal Magento een nieuwe 'Magento Connect' lanceren, die Magento Marketplace gaat heten. Dit heet niet zomaar zo; via deze nieuwe Marketplace kan een merchant extensies aanschaffen. Deze aangeschafte extensies worden gekoppeld aan een Magento.com account. Je kan vervolgens je Composer toegang geven tot dit account. Composer zal dan automatisch zien welke extensies je hebt aangeschaft, welke updates er zijn en zal zelfs patches kunnen downloaden en installeren! Hoe dit in de praktijk gaat werken ben ik zeer benieuwd naar maar het Magento 2 team is er zelf erg enthousiast over.


### Tips
Draai je Magento 1 en wil je ook Composer gaan gebruiken? Je zal dan kunnen beginnen met je eigen extensies in Composer packages te zetten. Kijk dan eens naar de [Magento Extension File Finder](https://github.com/tegansnyder/meff). Hoewel in beta fase, werkt deze tool erg goed om alle files binnen een Magento installatie te vinden die bij jouw extensie horen.

Vervolgens kan je die files kopieren naar een aparte directory en met de [generate-modman](https://github.com/mhauri/generate-modman) tool de modman file genereren. Draai vervolgens *composer.phar init* om interactief je composer.json file aan te maken met de benodigde informatie.

Push deze data dan naar een aparte Git repository en hang hier een version tag aan (bijv *git tag -a 1.0.0 -m "Version 1.0.0"*). Hou je hierbij aan de richtlijnen van [Semantic Versioning](http://semver.org).

Vervolgens kan je in de composer.json file van je Magento project jouw Git repository plaatsen en *composer update* draaien om de code binnen te halen. In het geval van een update hang je een nieuwe versie tag aan je commit en pas je je Magento project zijn composer.json file aan naar de nieuwe versie.

Gebruik binnen je Magento project zijn composer.json altijd een specifieke versie tag of maak gebruik van de caret notatie (^1.0.0) en gebruik zeker nooit 'dev-master' of '*' als versieaanduiding. Zo voorkom je dat je ongewild code in je project krijgt die breaking kan zijn (niet backwards compatible is).


### Help, wat een termen!
Het is inderdaad vrij veel om in één keer te bevatten als je nog nooit met Composer hebt gewerkt. Kijk goed naar hoe andere Magento extensies het doen en lees je even in. Het is de moeite zeker waard en zal er voor zorgen dat de ontwikkeling en deployment van je Magento projecten een stuk robuuster en gestroomlijnder wordt.
