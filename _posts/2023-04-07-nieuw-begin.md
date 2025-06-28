---
title: "Een nieuw begin"
description: "Eindelijk! Er staat hier opnieuw een website online!"
category: "Tech/Web"
image: https://img.wimme.net/pexels-pixabay-270360.jpg
---

Eindelijk! Er staat hier opnieuw een website online!

Vele jaren geleden, toen ik nog op de secundaire school zat, had ik hier mijn website online gezet met allerlei info over technologie en het maken van websites. Helaas verouderde de inhoud vlug en had ik geen tijd meer om het up to date te houden. Maar het werd terug tijd om een nieuwe op te zetten!

### Op zoek naar het beste systeem

#### Static Site Generators (SSG)

Bij static site generators (SSG) wordt de volledige website vooraf gegenereerd, waarbij elke afzonderlijke pagina als een statisch HTML-bestand wordt opgeslagen. Dit betekent dat de server geen verwerking hoeft uit te voeren bij een paginabezoek.

Voordelen:

* **Razendsnelle laadtijden** – Elke pagina is al als HTML beschikbaar, waardoor er geen extra serververwerking nodig is.
* **Eenvoudig te hosten** – De website kan gehost worden via een Git-repository, zoals [GitHub](https://github.com/), en automatisch worden gebouwd met een CI/CD-workflow. Hosting via [GitHub Pages](https://pages.github.com/) is mogelijk zonder een aparte webserver.
* **Onderhoudsvriendelijk** – Omdat de website uit statische bestanden bestaat, zijn er weinig updates en patches nodig.
* **Veiligheid** – Er is geen server-side code die kan worden misbruikt, wat het risico op hacks sterk vermindert.

Nadelen:

* **Geen dynamische functionaliteiten** – Functionaliteiten zoals reacties, contactformulieren of gebruikersauthenticatie moeten via externe services worden opgelost.
* **Rebuilds bij updates** – Wanneer er content wordt aangepast, moet de hele site opnieuw worden gegenereerd en gedeployed.

Voorbeelden:

* [Jekyll](https://jekyllrb.com/)
* [Astro](https://astro.build/)
* [Hugo](https://gohugo.io/)

#### Dynamische websites

Bij dynamische websites wordt elke pagina-aanvraag verwerkt door de webserver. Dit betekent dat content en functionaliteit in realtime gegenereerd kunnen worden, bijvoorbeeld vanuit een database. Vaak wordt caching gebruikt om de server te ontlasten.

Voordelen:

* **Flexibiliteit** – Geschikt voor interactieve en op maat gemaakte functionaliteiten zoals gebruikersaccounts, webshops, en betalingen.
* **Geautomatiseerd contentbeheer** – Content kan eenvoudig worden beheerd via een CMS zonder dat de hele website opnieuw moet worden gegenereerd.

Nadelen:

* **Langzamere laadtijden** – Elke pagina-aanvraag vereist serververwerking, wat de prestaties kan beïnvloeden.
* **Hogere serverbelasting** – Servers moeten continu blijven draaien en voldoende rekenkracht hebben om verkeer te verwerken.
* **Scripting ondersteuning** - Een webserver is nodig die scripting ondersteund (PHP, ASP.NET, Node.JS, enz).
* **Beveiligingsrisico’s** – Omdat er database-interacties en server-side code worden uitgevoerd, zijn dynamische websites kwetsbaarder voor hacks en datalekken als ze niet goed beveiligd zijn.

Voorbeelden:

* [WordPress](https://wordpress.com/)
* [Drupal](https://drupal.org)
* [Discourse](https://www.discourse.org/)

#### Single-Page Applications (SPA)

Bij single-page applications (SPA) wordt de website geladen als één enkele pagina, waarbij content dynamisch wordt opgehaald via een web-API. Dit betekent dat de pagina niet opnieuw hoeft te laden bij navigatie, wat een vloeiende gebruikerservaring oplevert.

Voordelen:

* **Interactiviteit** – Ideaal voor complexe gebruikersinterfaces, zoals dashboards en real-time applicaties.
* **Snelle navigatie** – Doordat de pagina niet opnieuw geladen hoeft te worden, voelt de interactie soepel en direct aan.
* **Duidelijke scheiding tussen frontend en backend** – De client (frontend) en server (backend) communiceren via API’s, wat flexibiliteit biedt.

Nadelen:

* **Trage initiële laadtijd** – De volledige applicatie moet eerst worden ingeladen, wat kan leiden tot langere wachttijden zonder server-side rendering (SSR) of prerendering (SSG).
* **SEO-uitdagingen** – Zoekmachines kunnen moeite hebben met het indexeren van JavaScript-gedreven content.
* **Hoge onderhoudslast** – Er zijn veel afhankelijkheden en frameworks die regelmatig geüpdatet moeten worden.

Voorbeelden:

* [Angular](https://angular.io/)
* [React](https://react.dev/)
* [Vue.js](https://vuejs.org/)

### Tot slot

Voor andere projecten heb ik allerlei websites gemaakt, waardoor ik uiteindelijk een soort van eigen <abbr title="Content Management System">CMS</abbr> ben beginnen in elkaar stoppen. Modulair, generiek, gemakkelijk uitbreidbaar, ik kan het gemakkelijk voor iemand opzetten en verder aanpassen. De backend maakt gebruik van [PHP](https://www.php.net/) en [MySQL](https://www.mysql.com/)/[MariaDB](https://mariadb.org/) waardoor de kost om het online te zetten beperkt blijft.

Voor deze website maak ik hiervan gebruik in combinatie met een static site generator, namelijk [Jekyll](https://jekyllrb.com/). De reden dat ik hiervoor koos is het grote gemak, geen zware code updates moeten doorvoeren, niet veel moeten scripten.

Leuk om terug een website online te hebben. Geen idee hoe vaak er een nieuwe post zal verschijnen, maar dat zien we wel :)
