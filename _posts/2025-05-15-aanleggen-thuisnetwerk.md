---
title: Thuis een netwerk aanleggen
description: "Hoe je een degelijk thuisnetwerk aanlegt: van netwerkkast tot wifi, inclusief tips, materialen en wat je zeker moet vermijden."
---

In een tijd waarin alles - van je thermostaat tot je televisie - verbonden is met internet, is een betrouwbaar en snel thuisnetwerk geen luxe meer, maar een must. WiFi is handig, maar wie het goed wil aanpakken, legt ook een bedraad netwerk aan.

### Waarom een bedraad netwerk in huis nog altijd de beste keuze is

- **Stabieler dan wifi** - geen interferentie of signaalverlies  
- **Snelheden tot 10 Gbps mogelijk** met Cat6A  
- **Lagere latency** - cruciaal voor gaming, videovergaderingen en domotica  
- **Minder straling & minder storing op wifi** (minder congestie)

Een goed aangelegd bekabeld netwerk is niet alleen sneller, het is ook veiliger, stabieler en eenvoudiger te beheren.

### Netwerkontwerp: begin met een plan

Voor je kabels begint te trekken: maak een **plattegrond van je woning** en bepaal per ruimte:

- Waar komen toestellen met vaste netwerkaansluiting? (TV, printer, PC, NAS, gameconsole)  
- Waar heb je wifi nodig? (denk aan mesh access points met ethernet-backhaul)  
- Waar komt de netwerkkast? (idealiter centraal of in de kelder/technische ruimte)  

Houd bij het ontwerp rekening met:
- Toekomstige uitbreidingen  
- Back-up stroomvoorziening (UPS)  
- Beperkte wifi-dekking van één modem/router

### Aanbevolen bekabeling: waarom Cat6A?

Gebruik minstens **Cat6A-kabels**:

| Categorie | Snelheid     | Frequentie | Afscherming nodig? | Max. afstand |
|-----------|--------------|------------|---------------------|--------------|
| Cat5e     | 1 Gbps       | 100 MHz    | Nee (maar gevoelig) | ~100 m       |
| Cat6      | 1 Gbps (10 Gbps <37 m) | 250 MHz | Aanbevolen          | ~55 m max 10G |
| **Cat6A** | **10 Gbps**  | **500 MHz**| **Ja (FTP/SFTP)**   | **100 m**    |
| Cat7/8    | >10 Gbps     | >600 MHz   | Ja, maar onpraktisch| Speciale toepassingen |

**Waarom Cat6A?**  
- Toekomstbestendig: je hoeft niet binnen 5 jaar opnieuw te bekabelen  
- Ondersteunt 10 Gbps tot 100 meter  
- Beter afgeschermd tegen interferentie (EMI/RFI)  
- Compatibel met standaard RJ45 keystones en patchpanelen

---

### Gebruikte materialen

#### Bekabeling
- **Cat6A S/FTP massieve kabel** (voor vaste installatie, AWG 23)  
- Leg altijd **minstens twee kabels per muurpunt** (voor redundantie)

#### Keystones & wandcontactdozen
- **Afgeschermde Cat6A keystone jacks** (toolless of LSA)  
- **Inbouwdozen of opbouwdozen** met metalen kern (voor afscherming)

#### Patchpanelen en netwerkkast
- **19 inch patchpanel (24-poorts)** - afgeschermd, met aardingschroef  
- **Keystones passend in patchpanel**  
- **Netwerkkast** (wand- of vloermodel)  
- **Switch** (liefst managed, met PoE voor wifi access points)

#### Patchkabels
- **S/FTP afgeschermde Cat6A patchkabels**  
- Exacte lengtes gebruiken (0.25-0.5m) om kabelspaghetti te vermijden

### Interferentie vermijden: afscherming & aarding

#### Wat kan storing veroorzaken?
- Elektriciteitskabels  
- TL-verlichting, dimmers, voedingen  
- Andere netwerkkabels zonder afscherming

#### Wat doe je eraan?
- Gebruik **S/FTP-kabels** en **afgeschermde keystones & panelen**  
- Sluit **aardscherm aan op rack** of via aparte aardklem  
- Vermijd parallel lopen van netstroom en datakabels - kruisen mag, parallel liever niet  
- Gebruik geen kabels met aluminium geleiders (CCA)

### Wifi in huis: mesh of access points?

#### ❌ Vermijd:
- **WiFi-pods (mesh via wifi-backhaul)** - bandbreedte halveert bij elke hop  
- **Powerline-adapters** - gevoelig voor storing, vaak instabiel  
- **WiFi-repeaters** - verhogen latency en verlagen snelheid

#### ✅ Beter:
- Gebruik **Wifi 6 access points met ethernet-backhaul**  
- Plaats **AP's aan plafond of hoog op muur**, centraal in de ruimte  
- Gebruik PoE (**Power over Ethernet**) om access points te voeden via de netwerkkabel

Voorbeelden: Ubiquiti UniFi, TP-Link Omada, Netgear Insight

### Indeling en montage: netjes en logisch

- **Patchpanel bovenaan**, switch eronder  
- **Kabelmanagement-panelen** (brushes, goten, kabelbinders)  
- **Label alles**: poorten, kabels, wandcontacten  
- Laat ruimte over voor uitbreiding (bv. reserve-keystones)  
- Installeer een **UPS** voor modem, router, switch

### Tot slot

Een goed netwerk begint bij een goed ontwerp en kwalitatieve materialen. Met **Cat6A-bekabeling, afgeschermde componenten en een slimme plaatsing van je netwerkkast en wifi-access points** bouw je een infrastructuur waar je jarenlang op kunt vertrouwen. Vermijd shortcuts zoals powerlines of goedkope wifi-repeaters - ze zijn vaak de oorzaak van frustraties en instabiliteit.
