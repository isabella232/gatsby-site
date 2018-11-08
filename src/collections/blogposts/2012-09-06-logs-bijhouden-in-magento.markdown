---
type: post
title:  "Logs bijhouden in Magento"
date:   2012-09-06
categories: magento
permalink: /blog/logs-bijhouden-in-magento/
author: Peter Jaap Blaakmeer
---
### Logs bijhouden in Magento

Magento heeft uitgebreide log functionaliteiten, hoewel die niet altijd op de meest logische plekken te vinden zijn en standaard niet heel makkelijk bij te houden zijn. In deze blog leggen we uit welke opties er zijn en noemen we enkele handige manieren om je shop beter in de gaten te houden.

#### De var/log directory
In deze map in de Magento root komen de standaard log bestanden. De standaard log functie zit in Magento onder System > Configuration > Advanced > Developer > Log settings. Als deze is ingeschakeld komen systeem meldingen en alles wat een developer door de functie Mage::log() laat loggen terecht. De uitzonderingen log is een bestand met daarin wat er mis is gegaan en een stack trace waardoor je kan zien waar het precies mis ging. De standaard bestandsnaam voor het systeem log bestand is system.log en voor de exceptions exception.log.

Exceptions worden door Magento vaak weergegeven in het bekende en gevreesde Magento foutmeldingenscherm;

![Exception](../../assets/images/blogs/magento-logging/1-exception.png "Exception")

In dit geval heeft de ontwikkelaar het weergeven van een foutmelding uitgeschakeld, iets dat op elke productieserver zo ingesteld zou moeten zijn. Op het moment dat dit niet is uitgeschakeld, bijvoorbeeld op een ontwikkelomgeving, ziet het scherm er bijvoorbeeld zo uit;

![Exception](../../assets/images/blogs/magento-logging/2-exception-with-trace.png "Exception")

Dit valt in te schakelen door het bestand errors/local.xml.sample te kopieren naar errors/local.xml.

Wat veel ontwikkelaars echter niet weten is dat Magento ook de mogelijkheid biedt om bezoekers die tegen een dergelijk scherm aan lopen de mogelijkheid te geven om direct contact op te nemen met de webshopeigenaar c.q. de webshop ontwikkelaar, zoals je hier kan zien;

![Exception](../../assets/images/blogs/magento-logging/3-exception-contact.png "Exception")

Deze manier oogt meteen een stuk vriendelijker voor de bezoeker. Je bent echter nog wel afhankelijk van de gebruiker om de fout te melden, of je moet zelf regelmatig de logs in de gaten houden. Om dit te vergemakkelijken kan je error mailing, Graylog2 of Codebase Exceptions gebruiken (zie verderop).

#### De /var/log/apache2 of /var/log/httpd directory
Errors die niet worden opgevangen door Magento omdat ze op PHP/webserver niveau worden afgevangen (zoals een incorrecte PHP syntax door het missen van een komma of een bracket) komen in de Apache error log terecht. Deze is afhankelijk van het besturingssysteem vaak te vinden in /var/log/apache2/errorlog of in /var/log/httpd/errorlog.

#### Error mailing
Als je het bovengenoemde bestand errors/local.xml opent staan hier een aantal opties in om je error meldingen te configureren. Je kan hier bijvoorbeeld een ‘skin’ instellen om zo je error pagina in je eigen huisstijl te maken. Voor een uitgebreide omschrijving over hoe je dat kan doen kan je op Magebase.com kijken. Wij focusen ons nu op de inhoud van <report>. In de tag <email> staat standaard ‘print’. Als je dit verandert in ‘email’ en in de tag <email_address> je email adres invoert, zullen foutmeldingen die normaal op het scherm getoond worden naar het opgegeven email adres geemaild worden. Zo kan je alles goed in de gaten houden.

Als je veel webshops in je beheer hebt waar meerdere ontwikkelaars mee bezig zijn, kan deze manier echter ook omslachtig zijn; alle meldingen komen in 1 box terecht en je email box kan overspoeld raken door deze meldingen. Daarvoor zijn er tools zoals Graylog2 en Codebase Exceptions.

#### Graylog2
Graylog2 is een open source tool die je op je eigen server kan installeren. Je kunt hiermee gemakkelijk web-based inzage krijgen in allerlei logs die je naar Graylog2 stuurt. Hier is een screenshot van Greylog2;

![Graylog2](../../assets/images/blogs/magento-logging/4-graylog2.png "Graylog2")

MGT-commerce heeft een uitstekende extensie geschreven om Magento logs naar Graylog2 weg te schrijven; How to manage your Magento logs with Graylog2

Uiteraard kan je je server ook zo instellen dat de Apache error logs ook naar Graylog2 worden weggeschreven.

#### Codebase Exceptions
Hier bij Elgentos zijn wij al jaren groot fan van de tools van aTech Media. We gebruiken Codebase voor onze Git repositories en project & time management, Deploy voor het uitrollen van onze shops, patches & upgrades, Sirportly voor customer support en Point voor onze DNS behoeftes.

Sinds een paar dagen heeft aTech een functie in Codebase toegevoegd die een deel van de rol van Graylog2 overneemt, waardoor wij niet meer in 2 systemen (Codebase & Graylog2) hoeven te werken, namelijk Exceptions. Hierin kunnen exceptions worden geplaatst waarna ze eventueel in een ticket omgezet kunnen worden. Om dit proces gedeeltelijk te automatiseren hebben we een Magento extensie gemaakt en open source vrijgegeven die de exceptions van Magento opvangt en bij het correcte project in Codebase plaatst; Magento Exceptions to Codebase.

Na het installeren van deze extensie zal een exception als volgt in Codebase terecht komen;

![Codebase](../../assets/images/blogs/magento-logging/5-codebase.png "Codebase")

Als je op de naam van de exception klikt krijg je een uitgebreide beschrijving en de mogelijkheid om er direct een ticket van te maken;

![Codebase](../../assets/images/blogs/magento-logging/6-codebase-php-error.png "Codebase")

Dit helpt ons in het stroomlijnen van het oppikken van deze meldingen zodat we onze klanten zo snel mogelijk kunnen bijstaan in het geval van problemen met de shops.

Veel succes met het testen van deze tools!
