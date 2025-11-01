---
title: "Een energie-efficiënte home server bouwen"
description: "Bouw je eigen energiezuinige en krachtige home server, perfect voor VMs, containers en Home Assistant. Geoptimaliseerd voor performance en laag energieverbruik, met Proxmox of TrueNAS als basis."
category: "Tech"
tag: "DIY"
image: https://img.wimme.net/IMG_1608.HEIC.jpg
keywords: ["home server", "thuis server", "proxmox", "truenas", "intel n100", "homelab", "virtualisatie", "container", "nas", "home assistant"]
gallery:
  - images:
    - src: https://img.wimme.net/IMG_1607_1.HEIC.jpg
      caption: "Voorzijde"
    - src: https://img.wimme.net/IMG_1606_1.HEIC.jpg
      caption: "Achterzijde"
---

## Een energie-efficiënte home server bouwen

Ik was op zoek naar een nieuwe oplossing om al mijn foto's en video's te bewaren. Daarnaast wou ik ook aan de slag met Home Assistant voor monitoring en automatisaties thuis.

Ik wou geen extra toestel die ergens in de weg staat. Daar ik een netwerkkast heb, waarin ook de modem, router en netwerkswitch staat, moet deze erbij kunnen.

Verder wou ik ook een oplossing waar ik over tijd iets gemakkelijk kan aan vervangen/upgraden, zonder een volledig toestel te moeten kopen.

Na gans wat te vergelijken, kwam ik uiteindelijk uit op de Intel N100. Deze biedt verrassend veel performance in een zuinig jasje, wat toch wel een grote vereiste is voor een thuisserver die 24/7 draait.

### Hardwarekeuze

De Intel N100 (Alder Lake-N) is de perfecte balans tussen lage energieconsumptie en goede performance. Met zijn 4 efficiënte cores en moderne architectuur is hij ideaal voor lichte tot middelzware workloads, zoals virtuele machines, containers en zelfs lichte media- of NAS-taken.

#### Moederbord

Er zijn momenteel twee interessante N100-moederborden beschikbaar:

| Model | RAM-type | SATA connectors | PCIe | Opmerkingen |
|-------|----------|-----------------|------|-------------|
| [ASUS Prime N100I-D D4](https://www.amazon.com.be/-/nl/dp/B0C9YNF6JK?&linkCode=ll1&tag=wimme-21&linkId=69a765a1aa8262cb4845b9990b7acca4&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} | DDR4 SODIMM | 1 | PCIe 3.0 x1 | Simpel, energiezuinig, budgetvriendelijk |
| [ASRock N100DC-ITX](https://www.amazon.com.be/-/nl/ASROCK-N100DC-ITX-Intel-Q-Core-N100/dp/B0C9JG8L79?&linkCode=ll1&tag=wimme-21&linkId=829e98fa5da76f4c66f359cbb0493b37&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} | DDR4 DIMM | 2 | PCIe 3.0 x4 | Betere uitbreidingsmogelijkheden en koeling |

Zelf koos ik voor de Asus-variant, simpelweg omdat ik nog [DDR4 SODIMM-geheugen](https://www.amazon.com.be/-/nl/dp/B08C511GQH?th=1&linkCode=ll1&tag=wimme-21&linkId=5b544c9585b4b0a561dcdb4c61bf7e71&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} en een voeding had liggen.
Toch heeft de ASRock N100M een paar troeven: extra SATA3 poort, extra fan header, snellere PCIe-sleuf, standaard DIMM-geheugen en kan gevoed worden met een standaard laptop adapter.

Beide modellen hebben helaas maar weinig SATA poorten. Wil je meerdere HDD's gebruiken en van de server een NAS maken?
Dan is een [M.2-naar-SATA-adapter](https://www.amazon.com.be/-/nl/6-poorts-converter-aluminium-radiator-PM-functie/dp/B0BVMC37SX?&linkCode=ll1&tag=wimme-21&linkId=d694d480c5481caa3103da242a743f1f&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} handig: hiermee heb je extra SATA-poorten beschikbaar - ideaal voor een RAID-setup of ZFS-storage.

#### Behuizing

Omdat de server netjes in mijn netwerkkast moet passen, koos ik voor een Inter-Tech rack case.
Deze cases zijn betaalbaar, degelijk en bieden genoeg ruimte voor een compact mini-ITX moederbord, voeding en eventueel een paar 2.5"/3.5" schijven.

Rack cases met een hoogte van 1U zijn net iets te klein om een standaard mini-ITX moederbord in te passen. Maar Inter-Tech heeft 1.5U modellen waarin een mini-ITX moederbord past:

| Model | Hot-Swap HDD bays | Opmerkingen |
|------------|-----------|--------------|
| [Inter-Tech IPC 1.5U-1528L](https://www.amazon.com.be/-/nl/GEH-Inter-Tech-1-5U-1528L-opslag-zwart/dp/B075FNMY7P?&linkCode=ll1&tag=wimme-21&linkId=3e0e3deaea69fe6084b5ecde2a4e1d70&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} | 2 | Meer geschikt als NAS server |
| Inter-Tech IPC 1.5U-1528-1 | 1 | Meer ruimte voor PCIe kaarten |

Standaard komen deze cases met gewone fans, deze heb ik vervangen door 2
[Noctua NF-A6x25 PWM](https://www.amazon.com.be/-/nl/dp/B00VXTANZ4?&linkCode=ll1&tag=wimme-21&linkId=b3cb6e045bd9a3e00614107df009c84c&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"} fans, deze zijn stil en hun snelheid wordt door het moederbord aangestuurd.

In deze cases past een FlexATX voeding, hiervoor gebruik ik de [Inter-Tech GF-350 BULK](https://www.amazon.com.be/-/nl/INTER-TECH-pc-voeding-gf-350-bulk/dp/B0DBMJDR67?&linkCode=ll1&tag=wimme-21&linkId=83940d559b2acfba6aee7977161f073e&language=nl_BE&ref_=as_li_ss_tl){:rel="nofollow"}.

<div>
{%- assign gallery = page.gallery[0] -%}
{%- include gallery.html gallery=gallery -%}
</div>

### Softwarekeuze

De keuze van je basis-OS bepaalt grotendeels de flexibiliteit en het beheer van je home server.
Twee populaire opties zijn Proxmox VE en TrueNAS SCALE:

#### Proxmox VE

Een hypervisor gebaseerd op Debian met KVM en LXC-integratie. Perfect voor het draaien van virtuele machines én containers naast elkaar.

Voordelen:

- Zeer stabiel en performant
- Webinterface voor beheer
- Uitgebreide community en documentatie
- Ondersteuning voor ZFS, backups en clustering

[Proxmox VE website](https://www.proxmox.com/en/)

#### TrueNAS SCALE

Gebaseerd op Debian en ZFS, met ingebouwde virtualisatie en Docker (via Kubernetes).

Voordelen:

- Uitstekend voor NAS-gebruik
- Geïntegreerde file sharing (SMB/NFS)
- Sterke ZFS-ondersteuning
- Containers en apps eenvoudig via GUI te beheren

[TrueNAS SCALE website](https://www.truenas.com/truenas-scale/)

#### Wat erop draaien?

Een van de grootste voordelen van een eigen home server is de vrijheid om precies die diensten te draaien die jij wil.
Hier zijn enkele populaire voorbeelden:

##### Virtuele machines

- [Home Assistant](https://www.home-assistant.io/) - dé hub voor je smart home. Draai hem als VM zodat add-ons zoals ESPHome rechtstreeks in Home Assistant kunnen integreren.
- [OPNsense](https://opnsense.org/) - open-source firewall en router, zie mijn [Zelf een router opzetten]({% post_url 2023-07-16-router %}) post.

##### Containers

- [Immich](https://immich.app/) - zelf gehost alternatief voor Google Photos, razendsnel met GPU-ondersteuning.
- [Frigate](https://frigate.video/) - slimme video-analyse voor beveiligingscamera's met AI-detectie.
- [EVCC](https://evcc.io/) - optimaliseer je EV-laden met zonne-energie-integratie.
- [Uptime Kuma](https://github.com/louislam/uptime-kuma) - monitor je diensten met mooie dashboards en meldingen.
