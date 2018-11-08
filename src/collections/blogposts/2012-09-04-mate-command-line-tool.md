---
type: post
title:  "Mate - command line tool voor Magento"
date:   2012-09-04
categories: magento
permalink: /blog/mate-magento-command-line-tool/
author: Peter Jaap Blaakmeer
---
*Let op; vlak na het uitkomen van `mate` heeft het Duitse bedrijf Netz98 hun `magerun` ontwikkeld. Dit is een soortgelijke tool die ondertussen door de gehele community gebruikt wordt, zie ook [onze eigen blog over magerun](/magento-shop-via-de-command-line/). Wij raden dus ook sterk aan [magerun](http://www.magerun.net) te gebruiken.*

### Magento command line tool ‘mate’

Tijdens het ontwikkelen binnen Magento komen bepaalde handelingen voor ontwikkelaars erg vaak voor. Bijvoorbeeld; na elke wijziging binnen het design of een aanpassing aan XML configuratiebestanden dient telkens de cache geleegd te worden. En na het aanpassen van veel producten qua naam, prijs of andere attributen is het verstandig om de shop te herindexeren. Maar zo kan je ook denken aan het aan en uitzetten van de template hints, waarmee ontwikkelaars makkelijk kunnen vinden welke onderdelen van de shop bij welke blocks en dus modules horen.

Om dit te vergemakkelijken hebben wij een command line tool voor Magento geschreven; mate. Mate helpt je met deze repeterende taken en biedt shortcuts voor deze veel voorkomende taken. Mate is geschreven in PHP en haakt op bepaalde plekken in in het Magento framework om gebruik te maken van de functies die het framework biedt. Voor andere functies wordt een directe SQL call gemaakt en nog weer andere functies doen alleen wijzigingen binnen het bestandssysteem. Zoals altijd bij Magento geldt; gebruik op eigen risico en zorg dat je altijd backups van zowel bestandssysteem als database hebt. Hieronder zullen alle huidige functies binnen mate worden uitgelegd.

- `mate index/indexer` - roept ‘shell/indexer.php’ aan en stuurt de arguments gewoon door naar dat bestand
- `mate compiler` - roept ‘shell/compiler.php’ aan en stuurt de arguments gewoon door naar dat bestand
- `mate connect` - roept ‘mage’ aan en stuurt de arguments gewoon door naar dat bestand
- `mate mod/modules` - geeft een lijst weer van alle geinstalleerde modules en geeft aan of ze ingeschakeld of uitgeschakeld zijn
- `mate enable Package_Module` - schakel een module in
- `mate disable Package_Module` - schakel een module uit
- `mate toggle Package_Module` - wisselt tussen module in/uit schakelen
- `mate skeleton Package Module Version` - bouwt een ‘skelet’ voor een nieuwe Magento module
- `mate backup` - maakt een database dump van de huidige database en slaat die op in database.sql in de Magento root
- `mate import filename.sql` - importeer een SQL bestand in de huidige database
- `mate events` - geeft een lijst weer van alle events die gebruikt kunnen worden bij observers
- `mate cc/cache` - leegt de cache (verwijdert alles in var/cache)
- `mate cs` - leegt de sessions als er gebruik wordt gemaakt van het filesystem voor sessions (verwijdert alles in var/session)
- `mate cron` - draait cron.php
- `mate log` - bekijk de laatste 50 regels van var/log/system.log
- `mate install channelName packageName` - installeer packages vanuit Magento Connect
- `mate user` - creeër een admin account; deze zal vragen naar gebruikersnaam, naam, wachtwoord en email adres
- `mate minstall {version}` - installeert een Magento installatie in de huidige directory. Gebruik ‘1702’ of ‘1.7.0.2’ notatie voor de versie
- `mate resetmods` - reset all permissies voor bestanden naar 664 en voor alle directories naar 775
- `mate devurl` - zet de unsecure en secure base URL voor de Magento installatie naar {{base_url}}. Let op; gebruik dit alleen in een ontwikkelomgeving.
- `mate hints {admin/scope id/leeglaten}` - schakel de template hints in/uit voor een bepaalde winkel of de admin
- `mate conflicts` - zoekt door alle third party modules om te kijken of er eventuele conflicten zijn. Conflicten duiken op wanneer meerdere modules dezelfde core class proberen te extenden; één module zal voorrang krijgen waardoor de andere helemaal niet werkt of functionaliteiten mist.

Omdat wij geloven in de kracht van de community hebben wij mate geopensourced op Github. Dat houdt in dat je gratis gebruik kunt maken van mate en verbeteringen/toevoegingen kan doorvoeren in je eigen versie. Mocht je verbeteringen/toevoegingen hebben waar anderen ook iets aan hebben, vraag dan een pull request aan op de Github pagina.

Installatie van mate is vrij makkelijk; download het bestand (danwel door het clonen van de repository, danwel door het opslaan van het raw bestand) en sla deze op op een handige plek, zoals /var/scripts/mate.php. Maak hem vervolgens uitvoerbaar; chmod +x /var/scripts/mate.php’ En voeg dan een alias toe aan je .bashrc zodat je hem makkelijk kunt aanroepen; echo “alias mate=/var/scripts/mate.php” >> ~/.bashrc; source ~/.bashrc

Mate is te gebruiken binnen elke map van de Magento installatie. 

De Github URL is [https://github.com/peterjaap/mate](https://github.com/peterjaap/mate)
