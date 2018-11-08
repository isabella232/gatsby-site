---
type: post
title:  "Potentiële Magento killers on de loep: Sellvana"
date:   2014-02-20
categories: magento
permalink: /blog/magento-killers-on-de-loep-sellvana/
author: Peter Jaap Blaakmeer
---
*Af en toe nemen we bij elgentos één potentiële Magento-killer onder de loep. Niet omdat we geen toekomst zien in Magento, maar omdat wij geloven dat e-commerce niet gebonden moet zijn aan één specifiek platform; vandaag is de ideale oplossing Magento, maar morgen misschien niet meer.*

### Introductie
Deze vierde editie van "Potentiële Magento killers onder de loep" staat in het teken van een abrupte verassing. Met [opeens 5 miljoen dollar][selivana-crunchbase-link], zo een 3,6 miljoen euro, aan anonieme investeringen, springt Sellvana in het oog van menig e-commerce vakman.

Dat Sellvana de aanval gaat openen op Magento is de eerste ingeving. Dit wordt ondersteund door de rol van Boris Gurvic, een mede-oprichter van Sellvana die voorheen jaren actief was als [hoofd technische dienst](http://www.linkedin.com/in/unirgy#profile-experience) van Magento maar tegenwoordig veel frustratie vindt in het draaien van een Magento geörienteerd [consultancy en ontwikkeling bedrijf](https://secure.unirgy.com/).

Sellvana opent groot met de belofte om het plezier in e-commerce terug te brengen voor zowel ontwikkelaars als verkopers. Dit, met behulp van PHP en een zelf-ontwikkeld framework genaamd [Fulleron](https://github.com/fulleron) (voorheen bekend als Buckyball). De licentie zal in de toekomst OSL 3.0 zijn, maar voor nu zullen diegenen die geïnteresserd zijn zich moeten [registreren](https://www.sellvana.com/customer/register) voor de developer preview.


### Verrassend verfrissend (en snel)
Met behulp van Bootstrap 3, heeft Sellvana standaard een responsive frond- en back-end. Daar waar Magento haar default interface voelt als een standaard template die snel vervangen moet worden, kan de Sellvana front-end het prima op eigen houtje redden.

Wat vaak te zien is met nieuwe e-commerce platformen die zich richten op de monopoly-positie van Magento (bijvoorbeeld [Sylius](/blog/potentiele-magento-killers-onder-de-loep-sylius) of [Forward](/blog/potentiele-magento-killers-onder-de-loep-forward)), is dat ze veel sterke punten hebben maar vaak nog niet volwassen zijn of bepaalde standaard dingen nog missen. Met Sellvana is dit niet het geval. Natuurlijk heeft Magento door haar vele jaren een grote voorsprong, maar met zelfs iDeal integratie nu al ingebakken, is het volkomen mogelijk om nu een webshop met Sellvana te beginnen.

Voor ontwikkelaars [belooft Sellvana](https://www.sellvana.com/blog/soon-you-will-enjoy-e-commerce-why) modulariteit, sterke performance, gemak van uitbreiding en een zwakke leercurve. Qua performance kan gezegd worden dat op dezelfde machine Sellvana al stukken sneller aanvoelt terwijl de gemiddelde gebruiker niet teleurgesteld zal zijn qua functionaliteit - integendeel.

Voor verkopers gaat dit natuurlijk oook op, maar daarbij kunnen ze "superieure SEO functionaliteit" en andere krachtige functionaliteiten verwachten. Op het eerste oog zijn wij dik tevreden met de back-office die een stuk innovatiever overkomt dan die van Magento. En inderdaad, SEO-checklists zijn prima af te strepen op de instellingen die Sellvana biedt.


### Architectuur
Met Boris als mede-oprichter is het geen verassing dat de architectuur van Sellvana haar roots vindt in Magento. Is dit een kopie met flink wat marketing? Integendeel: Sellvana maakt wel degelijk flinke verbeteringen.

#### Twig
Veel front-enders zijn gefrustreerd met het feit dat Magento geen templating engine heeft. Helaas zal ook Magento 2 zonder moeten doen. Sellvana is daarintengen gebundeld metSymfony's Twig. PHP tussen de HTML (of andersom) is voorgoed verleden tijd. Twig heeft syntax die specifiek is gericht voor het werken met templates - dit zonder tussenkomst van één XML bestand.

#### Fulleron
Met Fulleron in plaats van Zend, heeft Sellvana een stukken elegantere en minder abstracte basis. Fulleron is een los framework en kan nu al zonder Sellvana gebruikt worden; zie [Github](https://github.com/fulleron/buckyball). Een groot verschil is dat in plaats van een groot ORM-systeem zoals Magento haar Varien, Fulleron de compacte [Paris](https://github.com/j4mie/paris/) Active Record implementatie op basis van [Idiorm](https://github.com/j4mie/idiorm/) gebruikt.

Net als Magento is Sellvana modulair en event-driven. Wat wel opvalt is dat Sellvana tot op het bot modulair is. Letterlijk alle componenten kunnen uitgezet of vervangen worden. Een blik werpend op standaard meegeleverde modules doet direct geloven dat er geen steile leercurve is om zelf aan de slag te gaan met custom modules.

#### EAV maar dan versimpeld
Een entity-attribute-value structuur is erg geschikt voor online e-commerce door het natuurlijke verschil in producten, categorieën en andere entiteiten. Hoewel deze structuur erg complex kan worden, bewijst Sellvana dat je geen abstracte-abstracte-abstracte klasses nodig hebt.

Zelfs zonder uren uitpluis werk wordt al snel duidelijk hoe Sellvana haar EAV-systeem inelkaar zit. Door gebruik te maken van logische standaarden (producten hebben bijvoorbeeld standaard een SKU en een naam) en simpele veld-collecties, blijft de EAV-structuur in stand zonder veel performance of flexibiliteit te verliezen.


### Punten voor Magento?
Theoretisch gezien is Magento simpelweg beter omdat deze langer in productie gebruikt wordt. De developer preview doet aardig wat stof opwaaien, maar we kunnen niet ontkennen dat Sellvana nog geen bewezen platform is. Er zullen ongetwijfeld kinderziektes zijn net zoals dat er punten komen waar Sellvana direct beter is dan Magento.

Hoewel Magento een paar flinke klappen moet incasseren, blijft het idee staan dat zodra voltooid, Magento 2 de meeste van deze klappen kan opvangen. Echter, Magento 2 is nog niet compleet. Sellvana ook niet, maar hoewel de code elegant en expressief is, zien we geen teken van namespaces, PSR- of Composer-compatibiliteit. Magento 2 heeft deze al of is hard op weg om dit te implementeren.


### Conclusie
Onvermijdelijk is dat iets wat al jaren in gebruik is, een stukken grotere en diverse adoptie heeft dan iets wat alleen bestaat als developer preview. Sellvana is hoogstwaarschijnlijk ver van een publieke release, maar zelfs met de developer preview gaan sommige dingen beter dan bij Magento.

Is Sellvana een Magento killer? Dit zal grotendeels afhangen van timing. Op het moment is er aardig wat ontevredenheid over de laksheid van progressie door het Magento team. Als Sellvana vóór Magento 2 een sterke community aan zich kan binden, kan het zeker een gevaar worden voor eBay's Magento.

Of, Magento 2 heelt de bestaande wonden en Sellvana wordt niets meer dan een sterk Magento-alternatief. Wat er ook gebeurt, Sellvana is iets om in de gaten te houden. Niet omdat het 5 miljoen dollar aan investeringen achter zich heeft, maar omdat het wel degelijk specifieke pijnpunten van Magento aanpakt.

[selivana-crunchbase-link]: https://www.crunchbase.com/organization/sellvana#/entity
