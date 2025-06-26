---
title: "Tracing in webapps tot op de server"
description: "Het tracen van requests in moderne webapplicaties is essentieel voor debugging, monitoring en performantie-analyse. In deze blogpost bespreken we hoe je een eenvoudige maar krachtige tracing-structuur kunt opzetten van client-side webapps tot deep server logs, inclusief enkele best practices."
category: "Tech/Web"
image:
keywords: [tech,software,development,web,tracing]
---

Wanneer je web frontend bestaat uit talloze webapps, dashboards, scripts, enz (die gebruikers mogelijks zelf kunnen creëren), dan wordt het tracen van requests essentieel voor debugging, monitoring en performantie-analyse. In deze blogpost bespreken we hoe je een eenvoudige maar krachtige tracing-structuur kunt opzetten van client-side webapps tot deep server logs, inclusief enkele best practices.

### Waarom tracing?

Tracing helpt je om:

* Requests te volgen van bron tot eindpunt (inclusief tussenliggende acties).
* Fouten sneller te lokaliseren.
* Performance bottlenecks op te sporen.
* Misbruik of overbelasting te detecteren per bron.

### Tracing structuur: `Source ID` & `Request ID`

In mijn concept bevat elke HTTP-request naar de server twee extra velden:

```
SourceID: webapp-abc123
RequestID: 4f02dc14-6e7c-4b5f-b401-0d4f4b9f8f1a
```

#### `Source ID`

Een **unieke identifier** die aangeeft waar de request **vandaan** komt. Dit kan bijvoorbeeld zijn:

* Een specifieke frontend-app (bv. portal-client-prod)
* Een specifieke pagina of route (bv. webapp-contactform)
* Een klant- of tenant-ID in een multi-tenant omgeving

Gebruik:

* Logging van bron
* Traffic throttling per app
* Blokkeren of isoleren van misbruikende bronnen

#### `Request ID`

Een **unieke identifier per request**, bijvoorbeeld een UUID. Dit ID blijft gedurende het hele pad van het request bestaan, ook binnen asynchrone of background-processen.

Deze hoeft niet vanuit de client te worden verzonden, deze kan ook als eerste stap in de API op de server toegevoegd worden.

Gebruik:

* Correlatie van logs
* Debuggen van foutpaden
* Meten van performantie per actie of stap

### Server-side: Wat kun je doen?

Zodra de headers binnenkomen op de server, kun je het volgende doen:

1. Request-logging uitbreiden

    Log altijd het `Source ID` en `Request ID`, bijvoorbeeld:

    ```
    [INFO] [2025-06-25T10:00:12Z] [src:webapp-abc123] [req:4f02dc14-xxxx] POST /api/orders createOrder START
    ```

2. Child acties loggen

    Wanneer één request leidt tot meerdere interne calls (DB, andere microservices), gebruik hetzelfde `Request ID`. Je kunt eventueel een **child ID** toevoegen:

    ```
    [INFO] [req:4f02dc14-xxxx] [child:db-call-1] SELECT * FROM orders WHERE ...
    ```

3. Performance meten

    Gebruik timestamps om begin- en eindpunten van elk onderdeel te meten:

    ```
    [START] [req:xyz] [action:validate-input]
    ...
    [END] [req:xyz] [action:validate-input] duration=3ms
    ```

    Of gebruik structured logging / observability platforms zoals:

    * OpenTelemetry
    * Elastic APM
    * Datadog
    * Grafana Tempo

### Aanvullende best practices

#### Propagatie door hele stack

Zorg dat `Request ID` meegaat:

* Tussen services
* In background jobs
* In async queues

#### Validatie

Controleer dat `Source ID` en `Request ID` geldig zijn (formaat, lengte), en genereer desnoods zelf een fallback `Request ID` als deze ontbreekt.

#### Rate limiting & quota per source

Gebruik `Source ID` als key in rate limiting of quota-control:

```yaml
source_limits:
  portal-client-prod:
    max_requests_per_minute: 500
  test-client:
    max_requests_per_minute: 50
```

#### Gebruik standaard libraries

Gebruik bij voorkeur standaard tracing tools/libraries zoals Jaeger, Zipkin (met OpenTelemetry).

| Mijn concept   | OpenTelemetry concept          | Toepassing                               |
| -------------- | ------------------------------ | ---------------------------------------- |
| `Request ID`   | `Trace ID`                     | Tracing van volledige request            |
| `Source ID`    | `Attribute` of `Baggage`       | Info over bron; filteren in trace viewer |
| Child acties   | `Spans`                        | Visualisatie van tussenliggende stappen  |
| Timing/logging | Automatisch via span-durations | Performance inzicht in tools             |


### Conclusie

Door een simpele maar doordachte structuur op te zetten met `Source ID` en `Request ID`, kun je enorme stappen zetten in:

* Traceerbaarheid
* Debugbaarheid
* Performance monitoring
* Security & abuse detection

Met slechts twee properties leg je de basis voor een robuust observability framework. Voeg standaardisatie en goede tooling toe, en je bent future-proof.
