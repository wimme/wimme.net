---
title: "Starten met home automation"
description: "Bij het (ver-)bouwen van een smart home woning komt heel wat kijken."
category: "Tech/Smart home"
tag: "DIY"
image: https://img.wimme.net/IMG_4672.HEIC.jpg
gallery:
  - images:
    - src: https://img.wimme.net/IMG_1356.jpeg
      caption: "De zekeringskast"
  - images:
    - src: https://img.wimme.net/IMG_1346.jpeg
      caption: "5-voudige tastsensor van Gira"
    - src: https://img.wimme.net/IMG_1344.jpeg
      caption: "3-voudige tastsensor van Gira"
    - src: https://img.wimme.net/IMG_1369.jpeg
      caption: "Een bewegingsmelder"
  - images:
    - src: https://img.wimme.net/IMG_1347.jpeg
      caption: "De verwarming-verdeler met elektrische stelventielen"
---

Toen ik in 2015 een nieuwbouwwoning liet bouwen, keek ik als tech-enthousiast naar de mogelijkheden van domotica. Hiermee wou ik het volgende bereiken:

* Aansturen van LED-verlichting met dimmers
* Aansturen van verwarming met in elke ruimte een temperatuurmeting
* Aansturen van zonwering/screens en gordijnen
* Dit alles kunnen bedienen via smartphone en tablet, al moet in een "smart-home" alles zoveel mogelijk automatisch gebeuren

Om het enigszins betaalbaar te houden, was dit mijn beknopt lijstje. Het individueel aansturen van stopcontacten en toegangscontrole kan natuurlijk ook, maar ik zag daar toen te weinig meerwaarde in voor de meerkost.

### Op zoek naar het juiste systeem

Volgende stap was kijken wat ik hiervoor nodig had. Er bestaan heel wat systeem van verschillende merken. Ik had dan ook wat eisen:

* Gemakkelijk te bekabelen: ideaal met bussysteem om de hoeveelheid kabels te beperken
* Gemakkelijk te installeren: liefst zoveel mogelijk in de zekeringskast gemonteerd op een DIN rail
* Merkonafhankelijk en compatibel met een standaard: dit vond ik zeer belangrijk, voor meerdere redenen:
  * Keuze tussen verschillende merken
  * Verschillende merken kunnen combineren
  * Als over 10 jaar een bepaald merk of serie niet meer bestaat, wil ik wel nog nieuwe compatibele stukken kunnen kopen, zonder nieuwe kabels te moeten leggen

Hierdoor vallen gepatenteerde systemen die hun eigen bussysteem hebben af, zoals Nike Home Control.

### Mijn keuze

Wie standaard zegt, komt al vlug uit bij KNX. KNX is een standaard voor een bussysteem waarop meerdere toestellen (zoals schakelaars en actuators) kunnen communiceren. Gans wat merken brengen domotica producten op de markt die de KNX standaard ondersteunen. KNX is al vele jaren op de markt en wordt ook vaak toegepast bij kantoorgebouwen, wat extra vertrouwen geeft aan mijn keuze.

Vervolgens kwam ik uit bij Loxone: voor 500 euro incl. BTW kocht ik een Loxone Miniserver (gen 1) met KNX interface en KNX gateway ingebouwd. De ingebouwde KNX interface kan gebruikt worden om de communicatie op de KNX bus te lezen en ook om KNX opdrachten te versturen op de KNX bus. De ingebouwde KNX gateway kan gebruikt worden om alle KNX apparaten aangesloten op de KNX bus te programmeren via de KNX ETS software. Verder kan de Loxone Miniserver een HTTP request uitsturen als commando alsook voor het binnenhalen van data (zoals weerinformatie). Loxone komt met mobiele apps en programmatie software met updates, allemaal gratis na de aanschaf van de Miniserver. Alles van Loxone past in de zekeringskast. Zo vond ik Loxone een mooi en betaalbaar systeem met vele mogelijkheden.

> Update: Het eerste model van de Loxone Miniserver (gen 1) had een KNX interface en KNX gateway ingebouwd, terwijl dit in het nieuwe model niet langer het geval is. Er kan wel nog een KNX module van Loxone apart aangekocht worden, maar deze kan niet gebruikt worden als KNX gateway om via KNX ETS te kunnen programmeren, waardoor er naast deze optionele Loxone KNX module dus nog een aparte KNX gateway dient te worden aangekocht. Dit maakt de nieuwe Loxone gans wat duurder. De voorbije jaren zie ik Loxone meer en meer opschuiven naar een gesloten systeem, hun productaanbod werd fors uitgebreid, waarbij de werking enkel gegarandeerd wordt als alles van Loxone is. Loxone heeft zeker mooie producten, zoals de Audioserver en de Intercom. Maar alles uitvoeren met Loxone is tegen mijn eisen, en praktisch niet haalbaar: bijvoorbeeld bij het installeren van zonnewering zullen maar weinig installateurs bereid zijn om motors van Loxone te gebruiken waar ze geen ervaring mee hebben.

<div>
{%- assign image = page.gallery[0].images[0] -%}
{%- include image.html image=image -%}
</div>

> Tip: Plaats een grote zekeringskast, smart home modules nemen heel wat plaats in. Zorg ook voor wat ruimte voor in de toekomst, bijvoorbeeld voor het plaatsen van een laadpaal of energiemeters.

#### KNX bus

Voor de KNX bus is er een voeding nodig die stroom levert aan alle KNX apparaten aangesloten op de bus. Hiervoor gebruik ik de MDT STV-0320.01.

#### Verlichting

Mijn woning is overal uitgerust met LED verlichting. Deze wordt geschakeld en gedimd via meerdere KNX actuators. Voor lichtkringen die gedimd kunnen worden gebruik ik de MDT AKD-0401.01 welke 4 kanalen heeft. De MDT AKK-0816.02 schakelt de lichtkringen aan en uit die niet gedimd worden.

De bediening gebeurt via drukknoppen of bewegingsmelders.

##### Drukknoppen

Als drukknoppen zocht ik iets mooi en kwam ik uit op de Tastsensor 3 van Gira. Deze bestaat uit een busaankoppeler en de tastsensor, die vervolgens naar smaak kan afgewerkt worden met een frame en wippenset (ik koos voor de aluminium look). Er zijn heel wat combinaties mogelijk, enkele voorbeelden:

<table>
  <tr>
    <th></th>
    <th>Een 1-voudige tastsensor (basic):</th>
    <th>Een 3-voudige tastsensor:</th>
    <th>Een 5-voudige tastsensor:</th>
  </tr>
  <tr>
    <td>KNX busaankoppeler:</td>
    <td>Gira 200800</td>
    <td>Gira 200800</td>
    <td>Gira 200800</td>
  </tr>
  <tr>
    <td>Tastsensor:</td>
    <td>Gira 511100 Tastsensor 3 Basic 1-voudig</td>
    <td>Gira 513300 Tastsensor 3 Komfort 3-voudig (heeft ingebouwde temperatuurmeter)</td>
    <td>Gira 514500 Tastsensor 3 Plus 5-voudig (heeft ingebouwd LCD scherm met temperatuurmeter)</td>
  </tr>
  <tr>
    <td>Frame:</td>
    <td>Gira 0211203 aluminium</td>
    <td>Gira 0211203 aluminium</td>
    <td>Gira 1002203 aluminium</td>
  </tr>
  <tr>
    <td>Wippenset:</td>
    <td>Gira 2131211 aluminium</td>
    <td>Gira 2133211 aluminium</td>
    <td>Gira 2145211 aluminium</td>
  </tr>
</table>

##### Bewegingsmelder

Als bewegingsmelder had ik lang zitten zoeken naar een model dat mooi in te bouwen is in het plafond. Uiteindelijk gebruik ik deze: B.E.G PD11-FLAT, is klein en valt amper op.

<div>
{%- assign gallery = page.gallery[1] -%}
{%- include gallery.html gallery=gallery -%}
</div>

> Tip: In ruimtes zoals de inkom, trappenhal, garage, toilet, is enkel een bewegingsmelder nodig. In andere ruimtes wil je wel drukknoppen om vlug iets te kunnen bedienen. Bewegingsmelders kunnen in deze ruimtes ook interessant zijn om bewegingspatronen te herkennen: bijvoorbeeld iemand staat op en gaat naar beneden, dit kan dan een bepaalde actie triggeren.

##### LED strips

LED strips aan het plafond zijn geplaatst in de *Corner* profiel van Paulmann. Dit profiel is overschilderbaar waardoor het mooi opgaat in het geheel. Ik gebruik RGBW LED strips op 24 V aangesloten op de RGBW DMX extensie van Loxone. Wellicht vervang ik deze ooit eens met addressable LED strips waarbij elke LED afzonderlijk kan worden aangestuurd, bijvoorbeeld met het leuke [WLED](https://kno.wled.ge/) project.

#### Verwarming

In elke kamer is er een KNX drukknop met ingebouwde temperatuurmeter. Deze waarden worden op de KNX bus verstuurd en ingelezen door Loxone, welke met een "Intelligent Room Controller" bouwsteen per kamer de verwarming regelt door middel van elektrische stelventielen (via een KNX actuator, MDT AKH-0800.01 met 8 kanalen). Met behulp van de "Intelligent Temperature Controller" bouwsteen wordt de warmte-vraag van elke kamer samengeteld en vergeleken met de buitentempartuur om zo op een efficiënte manier de CV-brander en pomp aan te sturen.

> Tip: Daar de verwarming volledig automatisch werkt, plaats sensors op de ramen om te vermijden dat de verwarming aanspringt terwijl een raam openstaat.

<div>
{%- assign image = page.gallery[2].images[0] -%}
{%- include image.html image=image -%}
</div>

#### Zonwering en gordijnen

Mijn zonwering werkt draadloos met Somfy IO en mijn gordijnen met het draadloze Somfy RTS. Helaas is Somfy moeilijk te integreren. Een oplossing kan de Somfy TaHoma Switch zijn, maar deze kost 200 euro wat ik nogal prijzig vind voor wat het maar is. Een goedkoper alternatief is de Somfy Connectivity Kit, maar deze werkt enkel via een online cloud service, als Somfy beslist deze te stoppen dan werkt deze niet meer. Uiteindelijk gebruik ik [ESPSomfy-RTS](https://github.com/rstrouse/ESPSomfy-RTS) voor mijn RTS gordijnen.

> Tip: voorzie bedrading aan de ramen voor zonwering en/of gordijnen. Bedrade zonwering en gordijnen zijn veel gemakkelijker te automatiseren dan draadloze varianten.

#### Overige

Voor het monitoren van het waterniveau in de regenput maak ik gebruik van ESPHome met een druksensor, zie [Meet het waterniveau van je regenput](/tech/smart%20home/waterniveau-regenput/).

### Tevredenheid

Zowel van de drukknoppen als van de bewegingsmelders ben ik zeer tevreden, na 8 jaren in gebruik nooit iets van problemen mee gehad. Zelfde met de KNX-actuators van MDT.

Echter heb ik minder animo met Loxone. Dit komt door de veel duurdere prijzen van een nieuwe Miniserver, het wegvallen van KNX in hun nieuwe Miniservers, en ook doordat er nog steeds gebruik gemaakt wordt van SD kaarten, welke na enkele jaren corrupt worden (ook de SD kaarten van Loxone zelf), en dan zit ik zonder verwarming/verlichting totdat er nieuwe SD kaart geprogrammeerd en ingestopt kan worden (tegenwoordig heb ik telkens een reserve klaarliggen voor het geval dit opnieuw gebeurd). Niet alle SD kaarten werken: courant verkrijgbare SD kaarten zijn te groot en worden niet ondersteund. Waarom maakt Loxone niet gebruik van meer betrouwbaar geheugen zoals NVMe? Verder werkt Loxone met amper iets samen, officiële ondersteuning voor Philips Hue of Apple HomeKit is er niet, welke maar enkele populaire voorbeelden zijn. Anderzijds blijft Loxone wel een prachtig systeem dat mooi ingebouwd zit in de zekeringskast, zonder te moeten gaan klooien met afzonderlijke Raspberry Pi's of PCs.

### Uitbreiden

Daar ieder huis tegenwoordig WiFi heeft, wat een veel grotere bandbreedte heeft dan het KNX bussysteem, zijn er tegenwoordig veel producten verkrijgbaar die via WiFi over het lokale netwerk communiceren. Helaas telkens volgens een merk-eigen protocol.

De uitdaging is dan ook om alles met elkaar te laten communiceren. Hiervoor is er ook een standaard: MQTT (Message Queuing Telemetry Transport). Tegenwoordig bestaat er voor zowat alles een gateway die communicatie mogelijk maakt via MQTT:

* [knx-mqtt-bridge](https://github.com/pakerfeldt/knx-mqtt-bridge) voor KNX apparaten
* [LoxBerry](https://wiki.loxberry.de/) voor Loxone
* [Zwave2Mqtt](https://github.com/OpenZWave/Zwave2Mqtt) voor Z-Wave apparaten
* [Zigbee2MQTT](https://www.zigbee2mqtt.io/) voor Zigbee apparaten (inclusief Philips Hue en IKEA TRÅDFRI)
* [ESPSomfy-RTS](https://github.com/rstrouse/ESPSomfy-RTS) voor Somfy RTS apparaten

Dit is meteen ook een groot nadeel, telkens zo'n gateway moeten installeren op een ESP, Raspberry Pi of VM. Een nieuwe standaard genaamd Matter zal hiervoor hopelijk een oplossing brengen.

[Home Assistant](https://www.home-assistant.io/) ondersteund MQTT en Matter en kan dus overweg met heel veel apparaten. Voor Loxone is een LoxBerry nodig om met MQTT apparaten te kunnen communiceren. Hopelijk ondersteund Loxone binnenkort MQTT en Matter out of the box, anders zal ik meer en meer gebruik maken van Home Assistant.
