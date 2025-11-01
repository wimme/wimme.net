---
title: Thuis een netwerk aanleggen
description: "Hoe je een degelijk thuisnetwerk aanlegt: van netwerkkast tot wifi, inclusief tips, materialen en wat je zeker moet vermijden."
category: "Tech"
tag: "DIY"
image: https://img.wimme.net/IMG_1805_1.HEIC.jpg
keywords: [netwerk,ethernet,thuisnetwerk,netwerkkast,netwerkkabels,kabels,keystones,wifi,AP,mesh,installeren,vermijden,interferentie]
---

In een tijd waarin alles - van je thermostaat tot je televisie - verbonden is met internet, is een betrouwbaar en snel thuisnetwerk geen luxe meer, maar een must. Wifi is handig, maar wie het goed wil aanpakken, legt ook een bedraad netwerk aan.

### Waarom een bedraad netwerk in huis nog altijd de beste keuze is

* Stabieler dan wifi - geen interferentie of signaalverlies
* Snelheden tot 10 Gbps mogelijk met Cat6A
* Lagere latency - cruciaal voor gaming, videovergaderingen en domotica
* Minder straling & minder storing op wifi

Een goed aangelegd bekabeld netwerk is niet alleen sneller, het is ook veiliger, stabieler en eenvoudiger te beheren.

### Netwerkontwerp: begin met een plan

Voor je kabels begint te trekken: maak een plattegrond van je woning en bepaal per ruimte:

* Waar komen toestellen met vaste netwerkaansluiting? (TV, printer, PC, NAS, gameconsole)
* Waar heb je wifi nodig? (denk aan mesh access points met ethernet aansluiting, voorzie minstens 1 access point per verdieping van je woning)
* Waar komt de netwerkkast? (idealiter centraal in de technische ruimte of garage)

Houd bij het ontwerp rekening met:
* Toekomstige uitbreidingen (zoals een wifi-access point buiten)
* Back-up stroomvoorziening (UPS)
* Beperkte wifi-dekking van één modem/router (daarom in plaats hiervan is het beter afzonderlijke mesh access points te plaatsen)

### Aanbevolen bekabeling: waarom Cat6A?

Gebruik minstens Cat6A-kabels:

| Categorie | Snelheid     | Frequentie | Afscherming nodig? | Max. afstand |
|-----------|--------------|------------|---------------------|--------------|
| Cat5e     | 1 Gbps       | 100 MHz    | Nee (maar gevoelig) | ~100 m       |
| Cat6      | 1 Gbps (10 Gbps <37 m) | 250 MHz | Aanbevolen          | ~55 m max 10G |
| **Cat6A** | **10 Gbps**  | **500 MHz**| **Ja (FTP/SFTP)**   | **100 m**    |
| Cat7/8    | >10 Gbps     | >600 MHz   | Ja, maar onpraktisch| Speciale toepassingen |

Waarom Cat6A?

* Ondersteunt 10 Gbps tot 100 meter
* Beter afgeschermd tegen interferentie (EMI/RFI)
* Compatibel met standaard RJ45 keystones en patchpanelen

---

### Gebruikte materialen

Hieronder staat wat ik gebruik en tevreden over ben. Veel van mijn bedrade netwerkinstallatie is van Digitus, een merk met een goeie prijs/kwaliteit verhouding.

#### Bekabeling

* Cat6A S/FTP massieve kabel (voor vaste installatie, AWG 23)
* Ik leg altijd minstens twee kabels per muurpunt. Bij de TV heb ik vier kabels voorzien (een voor de TV zelf, een netwerkspeler, een AV-receiver of soundbar, een gameconsole, ...)
* Gebruik waterbestendige kabels voor buiten (veelal zwart)

#### Wandcontactdozen

* Cat6A inbouwdozen of opbouwdozen met metalen afscherming, zoals [Niko 170-66179](https://www.niko.eu/nl-be/artikel/170-66179){:rel="nofollow"}

#### Patchpanelen en netwerkkast

* 19 inch netwerkkast
* [19 inch patchpaneel (24-poorts)](https://www.amazon.com.be/dp/B07CXWL8WB?th=1&linkCode=ll1&tag=wimme-21&linkId=d0d38b977c2e516bff72011f7cec522a&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} - afgeschermd, met aardingschroef om aan te sluiten aan de aarding
* [Afgeschermde Cat6A keystones passend in patchpaneel](https://www.amazon.com.be/dp/B00WZG3WR0?th=1&linkCode=ll1&tag=wimme-21&linkId=17b53cc4c61daffd99948c18fffbc46b&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"}
* Switch - liefst managed, met PoE voor wifi-access points:
  * HP Aruba Instant On 1930 24G Class4 PoE 4SFP/SFP+ 195W - zeer uitgebreide switch met 4 SFP+ poorten en 24 PoE poorten
  * [Ubiquiti UniFi Switch Gen 2 (24-poorts 95W PoE+)](https://www.amazon.com.be/dp/B08385GFT9?&linkCode=ll1&tag=wimme-21&linkId=7a75b0303bfc9d1d1bfa493f4bffffa4&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} - 2 SFP poorten en 16 PoE poorten met het UniFi beheersysteem (handig als je ook UniFi access points hebt)

#### Patchkabels

* Afgeschermde Cat6A patch kabels, gebruik exacte lengtes gebruiken ([0.25m](https://www.amazon.com.be/dp/B08N1BX8Z9?th=1&linkCode=ll1&tag=wimme-21&linkId=3cdd1386738920a1175ecb1606acbf94&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} of [0.5m](https://www.amazon.com.be/dp/B08N1C33N2?th=1&linkCode=ll1&tag=wimme-21&linkId=54bf7322c6c977bd6477c59480a16aa0&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"}) om kabelspaghetti te vermijden

#### Tools

* Een [netwerk set](https://www.amazon.com.be/-/nl/DIGITUS-Network-Tool-stripgereedschap-insteekgereedschap/dp/B00JG4UWQ8?crid=3MBLACUYKIYWQ&dib=eyJ2IjoiMSJ9.GHry4rBZ_cVhS4WZ6GW9wb7Q90Ci6UISp2ID5h69709WafKM3U5ZVA73kP4k5CP5D0RY0SKg7z2OUn175UpAMdMsiU9ZVMENzm-11mWe5C3HoFUCFZx1MIJX3i0b0GMqoRTpAjM5uq2FcvIXlBib44qicW2rFtI89aKWXQ0MVO9T0Aji9qEgUXEF4H5vZnNU4cG63-6GpuvHZvhARAD_7bcJomohOs9CAQvOE0AzyICtcVHHBqVlsiU7-9orQ8UBP5dqp8T8uLeP8_d-ETLSB-UOJQpJ3eoiBFwsT32criw.4tbeYIhlyMGoi2v16C21VHOJ_y5YuKP50wdjfhI0IoA&dib_tag=se&keywords=digitus+kit&qid=1752947528&sprefix=digitus+%2Caps%2C185&sr=8-1&linkCode=ll1&tag=wimme-21&linkId=57ecd5deb0ba2e1d31e187f253aa7616&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} bestaande uit een tester en krimptang komen zeker van pas bij het opzetten van een bedraad netwerk

---

### Interferentie vermijden: afscherming & aarding

#### Wat kan storing veroorzaken?

* Elektriciteitskabels
* TL-verlichting, dimmers, voedingen
* Andere netwerkkabels zonder afscherming

#### Wat doe je eraan?

* Gebruik S/FTP-kabels en afgeschermde keystones & panelen - bij voorkeur minstens Cat6A
* Sluit aarding aan op de netwerkkast en op de patchpanelen
* Vermijd parallel lopen van netstroom en datakabels - kruisen mag, parallel liever niet
* Gebruik geen kabels met aluminium geleiders (CCA)

---

### Goeie wifi in huis

#### Vermijd:

* Wifi-pods (mesh via wifi) - bandbreedte halveert bij elke hop en verhoogt latency
* Powerline-adapters - gevoelig voor storing, vaak instabiel
* Wifi-repeaters - verhogen latency en verlagen snelheid

#### Beter:

* Gebruik wifi 6 (of hoger) access points met vaste ethernet aansluiting
* Plaats AP's aan plafond of hoog op muur, centraal in de ruimte - die stralen uit in de vorm van een paraplu
* Gebruik PoE (Power over Ethernet) om access points te voeden via de netwerkkabel
* Bij betonnen gewelven, plaats minstens 1 AP per verdieping

Voorbeelden: [Ubiquiti UniFi](https://www.amazon.com.be/-/nl/Ubiquiti-UniFi-U6-Acceso-Inyector/dp/B0BYL7G7SZ?crid=1WO72N2UHX8SD&dib=eyJ2IjoiMSJ9.S_StUpFIKlUSI4dwnllROAUWjKhAUQzPcgWdMijYl5HBE9sA_q3zoNkT6w6i3hkK7ujNQdB281mmgA-nc92SUdWQbSXekk0wHBk2CPAF4lOHkKRWvaebtkTk-M9XmMrS1sGXuxYy9HsvvOs6IKGmT_Omo3TAmlWYuGjWwsRQcj9PxvtJ6-WsB5DXkj5hLsQiDmzpoq45Ym7Oqj2-8NwB1U3Sh1-NviCw0M4rerMVQDjRrEtRS0T_ehzrtaLGM1uE54DBDA9Fi9xWv5UBt6IVxkF14sYmgPMNIyTxeN4eFSY.LtPkFrd-T3oKYifBuE6RJ7m96c2WPt2hibP5Nv3y3eY&dib_tag=se&keywords=unifi+wifi+6&qid=1752948173&sprefix=unifi+wifi+6%2Caps%2C93&sr=8-2&linkCode=ll1&tag=wimme-21&linkId=930e3c393acab79d4f094249832598d5&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"}, TP-Link Omada, Netgear Insight, HPE Aruba Instant On

### Tot slot

Een goed netwerk begint bij een goed ontwerp en kwalitatieve materialen. Met Cat6A-bekabeling, afgeschermde componenten en een slimme plaatsing van je netwerkkast en wifi-access points bouw je een infrastructuur waar je jarenlang op kunt vertrouwen. Vermijd shortcuts zoals powerline-adapters of wifi-pods - ze zijn vaak de oorzaak van frustraties en instabiliteit.
