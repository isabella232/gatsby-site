---
layout: post
title:  "Magento indexer versnellen"
date:   2016-02-11
categories: magento
permalink: /blog/magento-indexer-versnellen/
author: Peter Jaap Blaakmeer
---
### Indexer versnellen
Magento gebruikt een uitgebreide structuur van database tabellen om zijn data in op te slaan en uit op te halen. Dit heeft vele voordelen maar ook nadelen. Een van de grootste nadelen is dat Magento erg veel database queries nodig heeft om alle benodigde data voor één product weer te geven, omdat deze verspreid staan over vele tabellen.

Met een kleine aanpassing in de code is voor een aantal shops de indexer echter sterk te versnellen. Dit komt omdat niet altijd alle producten zichtbaar zijn op de webshop; de niet-zichtbare producten kunnen worden overgeslagen door de indexer.

Hiervoor heeft Magento een trucje bedacht; de Indexer. Deze indexer doet eigenlijk niets anders dan vooraf alle relevanten data voor een product bij elkaar te verzamelen en in één tabel te plaatsen. Hierdoor heeft Magento een heel stuk minder queries nodig op het moment dat het product daadwerkelijk door een bezoeker wordt opgevraagd; snelheidswinst!

Eén van die indexers is de Catalog URL Rewrites indexer. Deze zoekt de URL's van alle producten bij elkaar en maakt er rewrites voor aan (te vinden onder Catalog > URL Rewrite Management). Als je erg veel producten hebt hebt kan deze indexer veel tijd in beslag nemen. Bij een testshop van ons met 38.500 producten duurde deze indexer ongeveer 9 minuten.


### Code aanpassing
Afgelopen week heeft Alan Storm een [blog][1] geschreven waarin hij een idee aanhaalt om deze indexer te versnellen voor een aantal stores. De indexer haalt namelijk alle producten op die in de database staan en maakt daar een URL Rewrite voor aan. Maar dit is in feite alleen nodig voor producten die zelf een product pagina hebben - simpele producten die onder een configureerbaar producten vallen (zoals maat- en kleurvariaties bij kleding) vallen hier dus niet onder.

Wij hebben daarom op aanwijzing van Alan Storm een aanpassing gemaakt in de functie _getProducts() in de Mage_Catalog_Model_Resource_Url class (in Magento >1.6, Magento 1.5 gebruikt nog een andere structuur qua classes). Deze aanpassing zorgt er voor dat de indexer alleen URL's aanmaakt voor producten die daadwerkelijk zichtbaar zijn in de shop.


### Resultaten
In het voorbeeld van onze test shop (met voornamelijk kleding) met 38.500 producten gaf dit een aanzienlijke snelheidswinst; van de 38.500 producten zijn er namelijk maar zo'n 1200 een configureerbaar product; de rest is dus niet zichtbaar. Vóór de aanpassing deed de indexer er bijna 9 minuten over, na de aanpassing nog maar 20 seconden!

Samenvattend; als je shop veel producten heeft die op 'Niet individueel zichtbaar' staan qua Zichtbaarheid, dan kan deze aanpassing veel tijd schelen in de indexer.

[Deze Gist][2] bevat de aangepaste functie. Pas deze functie echter niet zomaar in de core aan! Kopieer op zijn minst de core file naar de local codepool maar het netste is om een kleine extensie te maken met een class rewrite zodat alleen deze functie wordt aangepast.

Deze aangepaste functie werkt vanaf Magento 1.6. Voor Magento 1.5, zie [deze Gist][3].

**Zoals altijd; test deze wijzigingen eerst op een testomgeving!**

[1]: http://alanstorm.com/scaling_magento_at_copious
[2]: https://gist.github.com/peterjaap/7231825
[3]: https://gist.github.com/peterjaap/7250262
