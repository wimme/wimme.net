---
title: "Meet het waterniveau van je regenput"
description: "Hoe nauwkeurig het waterniveau meten van een waterput"
categories: "Tech/Smart home"
image: https://img.wimme.net/IMG_9119.HEIC.jpg
keywords: [sensor,regenput,waterniveau,citerne,waterput,watertank,regenwater,druksensor,monitoring]
gallery:
  - images:
    - src: https://img.wimme.net/regenput-diagram.png
      caption: "Bedradingsschema"
---

Met het zeer droge voorjaar in 2025 zaten wij plots zonder regenwater. Dit gebeurd natuurlijk altijd op een slecht moment. Hoe handig zou het zijn om het waterniveau te kunnen meten? Door realtime inzicht te hebben in hoeveel water er nog beschikbaar is, kun je gerichter je regenwater gebruiken voor bijvoorbeeld de tuin, het toilet of de wasmachine. In deze blogpost ga ik over mijn oplossing om betrouwbaar het waterniveau te meten door middel van een druksensor en ESPHome.

### Waarom het waterniveau meten?

Een regenput lijkt een oneindige bron van gratis water, tot je op een droge zomerdag merkt dat hij leeg is. Door het niveau in realtime te meten en zichtbaar te maken op bijvoorbeeld je smartphone via Home Assistant, kun je:

- Waterverbruik beter plannen
- Tijdig de regenput bijvullen of overschakelen op stadswater
- Problemen zoals lekken sneller detecteren
- Automatiseren (bijv. pomp uitschakelen bij laag niveau)

### Soorten sensoren

Er bestaan verschillende types sensoren die je kunt gebruiken om het waterniveau te meten. De meest gebruikte zijn:

#### Ultrasone sensor

- Meetafstand door geluidsreflectie
- Werkt van bovenaf, zonder contact met water
- **Nadelen:** gevoelig voor omgevingsinvloeden zoals condens, insecten, spinnenwebben

#### Druksensor

- Meet hydrostatische druk op de bodem van de put
- Lineaire en stabiele metingen
- Gemakkelijk te installeren: sensor ligt op de bodem

##### Aanbevolen modellen: **TL-136** of **TL-231**

Beide zijn 4–20mA druksensoren geschikt voor water en corrosieve omgevingen. De 4–20mA output bepaalt het waterniveau. Doordat de sensor een specifieke hoeveelheid elektrische stroom doorlaat, afhankelijk van het waterniveau, is dit storingsongevoelig, zelfs over lange kabels, want de hoeveel elektrische stroom blijft hetzelfde (voor een bepaald waterniveau) ongeacht de lengte van de kabel. Je kan dus perfect de kwetsbare ESP op een veilige plaats binnen plaatsen.

De keuze tussen TL-136 of TL-231 hangt vooral af van beschikbaarheid en het gewenste meetbereik. Neem een sensor met een bereik die overeenstemt met de diepte van jouw waterput. Neem geen sensor die tot veel dieper meet dan nodig, want dan worden de metingen minder nauwkeurig, de 4-20mA output blijft namelijk hetzelfde waarvan je dan maar een klein deel gebruikt.

- TL-136: metingen tot 3 meter diep
- TL-231: metingen tot 5 meter diep

### Mijn oplossing met ESPHome

Dankzij [ESPHome](https://esphome.io/) kun je de sensor eenvoudig integreren in je slimme woning. ESPHome is firmware voor ESP32/ESP8266 die naadloos samenwerkt met Home Assistant.

#### Voordelen van ESPHome:

- Geen programmeerkennis nodig
- Webinterface om alles te configureren
- OTA-updates (over-the-air)
- Direct zichtbaar in Home Assistant

### Benodigdheden

Om aan de slag te gaan heb je het volgende nodig:

- 1x ESP32 of ESP8266 - zelf maak ik gebruik van Olimex ESP32-POE-ISO want deze heeft een bedrade netwerkverbinding en ondersteund Power-over-Ethernet (PoE) met galvanische scheiding, hierdoor kan ook de sensor veilig gevoed worden via de netwerkverbinding en zijn er geen afzonderlijk stopcontacten en stroomadapters nodig
- 1x [TL-136 of TL-231 4–20mA druksensor](https://www.amazon.com.be/-/nl/Waterniveausensor-vloeistofniveau-signaaluitgang-waterniveausensor-stroomschakelaar/dp/B0C4YN7S89?crid=3C132C69974SY&dib=eyJ2IjoiMSJ9.Jj4qTFJ0BSRx5xhVXfk4kJ0rRPybJws9MfCtqueHTneBH0Q-BK9Xs2Df_NeoZOKV72qkodtbWyXOcSHb_kTjtm_JGgh7ZBh9A4NV4zp3I-3pt67fK0bSuc5wTqqSsnG4hbNBjLnp6En_RIsMibW8mZ53KfdJ2w7VS2xmlesebO3SJ20tsGV3EO8-Kan9sw_HO1Nwsmqu9_i9BRcByasUvvIWsN698p1BCrhpM3PQzAhZH-mwG6llye8-SEElq_JNZder-PMFIQArDA9cpMyvobs_1cOCzqoRul0emuvKUxU.fZHxZWBe4cI55nZebJdmUxm0el2RLiUPXw8p9Xp1GgI&dib_tag=se&keywords=tl136&qid=1750531203&s=electronics&sprefix=tl%2B136%2Celectronics%2C135&sr=1-1-catcorr&th=1&linkCode=ll1&tag=wimme-21&linkId=b477aec4357bdb23867651226b07bc3b&language=nl_BE&ref_=as_li_ss_tl) met het vereiste max waterniveau
- 1x [Step-up (boost) converter type XL6009 of LM2596](https://www.amazon.com.be/-/nl/dp/B00HV59922?&linkCode=ll1&tag=wimme-21&linkId=b4e9307a8b2238a92f1d81edfc2dfd4c&language=nl_BE&ref_=as_li_ss_tl) - zet de 5V afkomstig van de ESP om naar 24V voor de sensor
- 1x [4-20mA transducer](https://www.amazon.com.be/-/nl/dp/B09NRSQ3G3?&linkCode=ll1&tag=wimme-21&linkId=09d1a081a6d58e2a09eb6cbb790a43ad&language=nl_BE&ref_=as_li_ss_tl) - zet de stroom van de sensor om in spanning (hiervoor kan ook een simepele weerstand gebruikt worden, maar de transducer is wel handig om wat te kunnen bijregelen)
- 1x [ADS1115 ADC](https://www.amazon.com.be/-/nl/dp/B07PXFD3BH?th=1&linkCode=ll1&tag=wimme-21&linkId=23e5a385354502b646ba47209c22eaf1&language=nl_BE&ref_=as_li_ss_tl) - zet de analoge spanning om naar een digitale waarde welke via een I²C bus doorgestuurd wordt naar de ESP (deze heeft 4 ingangen dus er zijn nog 3 ingangen beschikbaar)
- Schroefklemmen / verbindingsmateriaal

### Bedradingsschema

<div>
{%- assign image = page.gallery[0].images[0] -%}
{%- include image.html image=image -%}
</div>

De ADS1115 analoog-digitaal converter is verbonden met de ESP via de I²C bus. De uitgang van de 4-20mA transducer is verbonden met een ingang (A0 in mijn geval) van de ADS1115.

### Installatie

Met de trimmer "Zero" stel je de uitgangsspanning van de transducer af op 0V wanneer de sensor boven water is. Wanneer je de sensor tot maximale diepte laat onderdompelen, stel dan met de trimmer "Span" de uitgangsspanning af op 3.3V. Dit valt te simuleren door gebruik te maken van een buis van de volledige lengte, gevuld met water. De druk zal hetzelfde zijn als in een grote regenput (wet van Archimedes).

### Configuratie in ESPHome

Hieronder is mijn configuratie. Je zal deze wat moeten aanpassen (bvb de hoogte van de regenput en de range van je druksensor). De berekening gaat uit van een lineair verloop (regenput in de vorm van een cylinder of rechthoek), heeft je regenput grote afrondingen over de hoogte waardoor het waterniveau niet lineair stijgt dan zal je een extra filter (calibrate_linear) moeten toevoegen aan de configuratie om een exact resultaat te bekomen.

```yaml
esphome:
  name: esphome-web-3904e4
  friendly_name: ESPHome Water Level Meter
  min_version: 2024.11.0
  name_add_mac_suffix: false

esp32:
  board: esp32-poe-iso
  framework:
    type: esp-idf

# Enable logging
logger:

# Enable Home Assistant API
api:

# Allow Over-The-Air updates
ota:
- platform: esphome

#wifi:
#  ssid: !secret wifi_ssid
#  password: !secret wifi_password

ethernet:
  type: LAN8720
  mdc_pin: GPIO23
  mdio_pin: GPIO18
  clk_mode: GPIO17_OUT
  phy_addr: 0
  power_pin: GPIO12

# I²C bus configuration
i2c:
  sda: GPIO13
  scl: GPIO16
  scan: true
  id: bus_a

# ADS1115 4-Channel 16-Bit A/D Converter, ADDR connected to VDD (0x49) or to GND (0x48)
ads1115:
  address: 0x49
sensor:
  - platform: ads1115
    multiplexer: 'A0_GND'
    gain: 4.096
    name: "Water Level (raw voltage)"
    id: raw_voltage
    update_interval: 60s
    unit_of_measurement: V

  - platform: template
    name: "Water Level (liters)"
    unit_of_measurement: "L"
    update_interval: 60s
    lambda: |-
      // Map voltage (0–3.3V) to liters (0–5000L)
      float v = id(raw_voltage).state;
      const float min_v = 0.0;
      const float max_v = 3.3;
      if (v < min_v) return 0;
      if (v > max_v) return 5000;
      return (v - min_v) / (max_v - min_v) * 5000.0;
    accuracy_decimals: 0
    icon: "mdi:water"

  - platform: template
    name: "Water Level (%)"
    unit_of_measurement: "%"
    update_interval: 60s
    lambda: |-
      // Map voltage (0–3.3V) to percentage (0–100%)
      float v = id(raw_voltage).state;
      const float min_v = 0.0;
      const float max_v = 3.3;
      if (v < min_v) return 0;
      if (v > max_v) return 100;
      return (v - min_v) / (max_v - min_v) * 100.0;
    accuracy_decimals: 0
    icon: "mdi:water-percent"

  - platform: template
    name: "Water Level (cm)"
    unit_of_measurement: "cm"
    update_interval: 60s
    lambda: |-
      // Map voltage (0–3.3V) to cm (0–300cm)
      float v = id(raw_voltage).state;
      const float min_v = 0.0;
      const float max_v = 3.3;
      const float max_cm = 300.0;  // Actual tank height
      if (v < min_v) return 0;
      if (v > max_v) return max_cm;
      return (v - min_v) / (max_v - min_v) * max_cm;
    accuracy_decimals: 0
    icon: "mdi:cup-water"
```

### Tot slot

Met een druksensor en ESPHome maak je een betrouwbare, onderhoudsarme oplossing voor de monitoring van een regenput. Het is een ideaal DIY-project voor wie graag zijn smart home uitbreidt en duurzaam met water wil omgaan.
