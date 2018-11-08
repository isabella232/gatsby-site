---
type: post
title:  "Potentiële Magento killers onder de loep: Forward"
date:   2013-11-29
categories: magento
permalink: /blog/magento-killers-onder-de-loep-forward/
author: Elias Zerrouq
---
*Af en toe nemen we bij elgentos één potentiële Magento-killer onder de loep. Niet omdat we geen toekomst zien in Magento, maar omdat wij geloven dat e-commerce niet gebonden moet zijn aan één specifiek platform; vandaag is de ideale oplossing Magento, maar morgen misschien niet meer.*


### Introductie
In deze eerste editie van “Potentiële Magento killers onder de loep” kijken we naar het open source platform [Forward][forward-link] waarbij meteen opvalt dat als database-model is gekozen voor MongoDB. MongoDB is een document-georiënteerd NoSQL database systeem zonder relationele database structuur. Een complete technische beschrijving over het hoe-en-wat van [MongoDB][mongodb-link] zullen we niet behandelen. Wat wel interessant is, is hoe een e-commerce platform voor- of nadeel ondervindt van een dergelijk database-model.

Forward is net als Magento geschreven in PHP. Het geheel is al ruim een jaar in ontwikkeling, maar verkeert op het moment van schrijven nog in een alpha versie. Dit heeft met verschillende dingen te maken, zoals een ontwikkelteam met veel minder mankracht dat Magento, maar de voornaamste reden is dat recentelijk het concept achter Forward een nieuwe richting is ingeslagen. Hier later meer over.


### Functionaliteiten
Omdat er veel tijd is gestoken in het opzetten van een degelijke architectuur voor Forward, presteert de functionaliteit ruim onder die van Magento. Alle basis functionaliteit van een e-commerce platform zit er standaard in - het is alleen niet erg uitgebreid.

Waar je in Magento bijvoorbeeld met een paar klikken een attribuut aan een product kan toevoegen, zal je met Forward vooralsnog zelf in de code moeten duiken. Zoiets staat dan ook vrijwel bovenaan op de “[Development Roadmap][forward-roadmap-link]”, maar ook hier valt op dat eigenlijk alles wat op deze lijst staat, al standaard in Magento zit.

Waar Forward wel punten scoort, is dat alles wat er wel in zit, gewoon lekker werkt. Waar Magento door haar complexiteit en steile leercurve veel gebruikers verliest, zal Forward door haar intuïtieve en minimalistische interface hier minder moeite mee hebben. Op de frontend is dit deels afhankelijk van het ontwerp, maar op de backend ben je meestal volledig overgeleverd aan wat door de ontwikkelaars wordt opgeleverd qua beheer. Bij Forward is dit wel het laatste waar je over zal klagen. Alles werkt lekker eenvoudig en zonder poespas en streelt het oog.


### Technische opbouw
[REST][rest-wiki-link], REST en nog eens REST. De gehele architectuur van Forward is gebaseerd op een REST API. Dit betekent dat elk data punt, zoals een “Order”, te benaderen is via een REST interface. Al deze communicatie gebeurt in JSON formaat. Dit, in combinatie met MongoDB, resulteert in een razendsnelle web applicatie vergeleken met het complexe EAV-model van Magento.

Omdat ook intern van deze API gebruik wordt gemaakt om tussen modules en models datastromen te beheren ontstaat een erg voor zichzelf sprekende opbouw. Models extenden het basis model en kunnen zich alleen intern openstellen door middel van een REST API en bijbehorende hooks. Omdat ook MongoDB erg eenvoudig is in benadering met haar platte document-structuur, sluit dit perfect aan bij het gehele REST verhaal.

De keuze voor MongoDB is enigszins opmerkelijk omdat deze uitgaat van een platte document structuur waar onderlinge relaties niet tot de basis functionaliteit behoort. Het voordeel hiervan is dat je qua database-structuur gelimiteerd bent. Een voordeel is de ongekende snelheid en eenvoud waarmee je data kan beheren. Hoewel by-design het af te raden is om MongoDB te gebruiken voor relationale database structuren - zoals een webshop - draait Forward hier toch om heen door gebruik te maken van callbacks.

Wanner je bijvoorbeeld van een “account” een bepaalde “order” wilt ophalen, zal intern $account->orders->count zich vertalen naar een callback naar het “orders” model die aan de hand van refrentiële indexes de juiste documenten zal ophalen. Het hele idee hiervan is dus MongoDB semi-relationale functionaliteit te geven. Een voordeel is dat je de snelheid en eenvoud van MongoDB behoudt. Een nadeel is dat alle logica zelf geïntroduceerd zal moeten worden (denk aan indexes bijhouden, de integriteit hiervan garanderen etcetera).

Nu zal je hier met basis elementen geen last van hebben (orders, accounts, producten etcetera) aangezien Forward dat intern allemaal al geregeld heeft, maar zal het vooral lastig worden wanneer je als ontwikkelaar nog niet bestaande functionaliteit wil introduceren. Of een NoSQL model als primaire database voor een e-commerce systeem dé oplossing is? Volgens de ontwikkelaars zijn er op het moment webshops met grote omzet-stromen (zoals [jellyfishart.com][jellyfishart-link]) die draaien op Forward, maar of het zich qua schaalbaarheid kan meten met Magento is met een paar gelimiteerde use cases natuurlijk niet veel over te zeggen.


### Extensie systeem
Waar in Magento extensies niet bestaan zonder complexe XML documenten, is een plugin in Forward een simpel PHP bestand waarin aan de hand van event-hooks functionaliteit kan worden toegevoegd. Dit betekent dat je met minimale kennis in huis functionalitieit aan het systeem kan toevoegen. Tegelijkertijd ontstaat hierdoor een gevaar dat het een zooitje wordt omdat er totaal geen container- of andere controle-omgeving voor plugins bestaat. Daar waar Magento ontwikkelaars lichtelijk forceert om van de harde kern (‘core’) af te blijven door elk systeem element overerfbaar of uitbreidbaar te maken, heeft Forward hier geen harde restricties op. Dit brengt mogelijke complicaties met zich mee wanneer er meerdere ontwikkelaars aan een webshop werken, of wanneer onervaren webshopbouwers zonder de code te controleren allerlei extensies implementeren.

In de Alpha release worden een aantal plugins meegeleverd (zoals memcache en Stripe-functionaliteit voor de checkout-procedure) maar daar is ook alles mee gezegd. De Forward website bevat een “Extensions” sectie, maar veel meer dan een “Coming Soon” bericht is daar (nog) niet te vinden.


### Community
Omdat er nog niet veel meer is dan een alpha release, is er nog geen echte community zoals Magento dat heeft. Het enige wat een beetje als maatstaf gebruikt kan worden, is het forum op de Forward website. Hier wordt nu misschien dagelijks een handvol berichten gepost, maar bij de aankondiging van het project “to make e-commerce creative again” werd het met veel enthousiasme ontvangen.

Om vandaag de dag te spreken over bruisende activiteit qua community-input in het ontwikkeltraject gaat eigenlijk al te ver. Wat wel positief is, is dat de hoofd ontwikkelaar ondersteuning of commentaar biedt op alle vragen en opmerkingen die binnen komen.

Op [Forward haar Github pagina][forward-github-link], waar het echte werk gebeurd, is de originele [fwdcommerce][forward-commerce-github-link] repository bijna honderd keer gestarred en een een tiental keer geforked. De laatste commit is hier echter een paar maanden geleden. Wat wel opvalt, zijn een aantal vrij nieuwe repositories die een beter beeld geven over de nieuwe richting die Forward is ingeslagen.


### API As A Service
De reden waarom Forward zich zo lang in de alpha-fase bevindt, is omdat het team achter Forward ergens op de helft heeft besloten om het roer volledig om te gooien. In plaats van een volledig e-commerce platform vrij beschikbaar te stellen en als verdienmodel “support” te nemen, hebben ze besloten om als verdienmodel de “API” te nemen.

Waar je nu Forward vrij kan downloaden en in zijn geheel kan draaien, is het in de toekomst de bedoeling dat alleen de client open source beschikbaar zal zijn. De eigenlijke backend, dus de database en de harde logica, zal plaats nemen “in de cloud”. Het komt er dus op neer dat je als ontwikkelaar vrij bent om de voorkant van je systeem in te richten, maar qua provider vast zit aan Forward.

Dit heeft als bijkomend effect dat de client implementatie language-agnostic zal zijn. Het is dus om het even of je jouw producten ophaalt met [PHP][forward-phpclient-link] of in [NodeJS][forward-nodejs-link]. Dit betekent een scala aan mogelijkheden en neemt een boel werk uit handen, zoals het beheren van resources en investeren in hosting.

De vraag is natuurlijk of dit een goede implementatie is van een e-commerce platform. Je bent immers gebonden aan een derde partij die de data van bijvoorbeeld de product catalogus beheert. Qua kosten plaatje zal je waarschijnlijk volledig afhankelijk worden van het aantal API-requests per x tijd dat je webshop nodig heeft en hoeveelheid data dat jouw webshop met zich meebrengt. Het probleem van schaalbaarheid wordt je volledig uit handen genomen omdat je slechts API-requests hoeft uit te voeren en zelf geen harde crunching hoeft te doen.


### Conclusie
Voor mensen die nu al interesse hebben in Forward als e-commerce platform, staan er vrij in om aan de slag te gaan met de alpha-release. Het is een degelijk systeem waarmee je in weinig tijd een webshop op kan zetten waarmee je goed uit de voeten kan qua beheer. Voor eindklanten zal je net als met elk ander systeem tijd moeten investeren in het opzetten van een goede en unieke frontend-layout aangezien de layout die Forward standaard met zich meebrengt, alles behalve spanned is.

Voor degenen die interesse hebben in de uitvoering van het API As A Service model en alles wat hierbij komt kijken, zullen nog even moeten wachten: de geplande beta versie van Forward die hiervan gebruik gaat maken zal pas rond eind-februari uit moeten komen. Of dit model het einde van het Magento tijdperk zal inluiden? Ons lijkt het sterk. Wat wel zo maar zou kunnen, is dat Forward door de unieke aanpak, frisheid en een sterke service een groot publiek zal aanspreken die met weinig moeite een snel, no-nonsense e-commerce platform willen.


[getfwd.com][forward-link]
[github.com/getfwd][forward-github-link]


**Geschreven door Elias Zerrouq - Elias is stagiaire webdeveloper bij elgentos op de afdeling Research & Development**


[forward-link]: http://getfwd.com/
[mongodb-link]: https://www.mongodb.com/
[forward-roadmap-link]: https://github.com/getfwd/fwdcommerce-docs/blob/master/roadmap/index.md
[rest-wiki-link]: https://en.wikipedia.org/wiki/Representational_state_transfer
[jellyfishart-link]: https://www.jellyfishart.com/
[forward-github-link]: https://github.com/getfwd
[forward-commerce-github-link]: https://github.com/getfwd/fwdcommerce
[forward-phpclient-link]: https://github.com/getfwd/fwd-php-client
[forward-nodejs-link]: https://github.com/getfwd/fwd-node-client
