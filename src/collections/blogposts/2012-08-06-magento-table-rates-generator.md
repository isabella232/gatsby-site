---
type: post
title:  "Magento Table Rates Generator"
date:   2012-08-06
categories: magento
permalink: /blog/magento-table-rates-generator/
author: Peter Jaap Blaakmeer
---
### Table Rates Generator

Een van de eerste taken die wij altijd doen bij het opzetten van een nieuwe Magento shop is het volgen van een zelf opgestelde checklist. Onder het kopje “Checkout (Shipping)” in de PDF vind je het puntje “Shipping Methods”. Daaronder hoort bij veel shops het instellen van de table rates. Table rates zijn verzendkosten gekoppeld aan gewicht, aantal bestelde producten of het subtotaal van de bestelling. Zo is het mogelijk per land verschillende prijzen in te stellen aangaande verzending. Handig voor als je zoals veel Nederlandse shops ook aan het buitenland levert.

Maar het instellen van deze table rates is niet altijd even duidelijk voor iedereen. Ten eerste zijn er, zoals genoemd, drie condities om ze op te configureren; op gewicht, op aantal producten en op subtotaal van de bestelling. Deze instellingen kan je vinden onder Systeem > Configuratie > Verzendwijzen > Table Rates. Om de landen en prijzen op te geven dien je een CSV bestand te maken die je ook in dit scherm kan uploaden. Hiervoor dien je wel eerst de “Scope huidige configuratie” op je website (en niet winkelzicht) te zetten.

Dit CSV bestand aanmaken is echter handmatig nogal een klus, vooral als je niet gewend bent om met CSV bestanden te werken. Ook dien je de exacte lettercodes voor alle landen op te zoeken. Om dit te vergemakkelijken hebben wij een Table Rates Generator gemaakt waarmee je landen kan aanvinken, verzendkosten kan opgeven en de conditie kan aangeven. Ook kan je per land meerdere rijen opgeven waarmee het mogelijk is om bijvoorbeeld gratis verzendkosten vanaf een vastgesteld orderbedrag in te stellen. Binnen een paar minuten heb je je table rates bestand al klaar. De generator is te vinden op [/tablerates](/tablerates).