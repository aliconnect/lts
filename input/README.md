# Van specificatie naar werkende tunnel

## Stel je eens voor
Dat de wegverkeersleider in de centrale meldkamer alle tunnels kan bewaken vanaf één bedienplek, dat aanwezigen in een tunnel bij een probleem hun telefoon camera opname direct kunnen delen op het camera observatie systeem van de wegverkeersleider en het bouwen van de benodigde software hiervoor een kwestie is van configureren en een start knop drukken.

## En dat doen we door
Gebruik te gaan maken van webtechniek en allemaal te gaan werken vanuit één bron van gegevens, One Source, One Truth. Door te gaan genereren in plaats van doorgeven en overtypen van gegevens met veel faalkosten en babilonische praakverwarringen.

# Van de bron, een pdf, naar werkbare content

We starten met input van RWS, he eisenpakket. De [Basisspecificatie TTI RWS Tunnelsysteem.pdf](https://aliconnect.nl/lts/input/R1.2 SP2 B2-1.6 Basisspecificatie TTI RWS Tunnelsysteem.pdf).

Er zijn betere bestandformaten dan pdf voor informatie overdracht. Binnen een pdf is content volledig versnipperd in losse stukjes tekst ergens op een pagina en de relatie tussen tekst is voor software moeilijk te herleiden en deze vorm van informatie is eigenlijk alleen afgestemd op het menselijk oog. Om uren overtype werk te voorkomen hebben we een redelijk slimme [import module bstti.pdf to yaml](https://aliconnect.nl/lts/input/bstti/) gebouwd (kan verder worden geoptimaliseerd) die pdf omzet naar content.

Het resultaat is een [bstti.pdf.yaml](https://aliconnect.nl/lts/input/bstti/bstti.pdf.yaml). We kiezen voor het YAML bestandformaat daar deze zowel door een mens als software te lezen is.

## Content als bron
Een optie is het natuurlijk om een content bestandformaat als bron te gebruiken. We kunnen daarvoor software gebruiken als MS-Word, DOORS, Relatics Enterprise Architect. Maar wellicht is het invoeren van tekst in een YAML document een optie. In ieder geval is het efficienter en effectiever om de content met alle meta data door te geven naar volgende gebruikers. Deze content kan ook een export zijn van database informatie naar XML, JSON of YAML.

## Content naar leesbare pagina's
Nu we de inhoud van het document als content hebben is het mogelijk om documentatie voor mensen te genereren. Een voorbeeld is [de bstti html pagina](https://aliconnect.nl/lts/input/bstti/?make=html). Dit document heeft nog geen plaatjes en is eenvoudig van opzet maar geeft een idee van de snelheid en werking.

Daarbij biedt generatie voordelen daar de getoonde infromatie afestemd kan worden op de doelgroep. We werken met 1 bron document maar bij de visualisatie kan technische en functionele informatie gescheiden worden.

# Standaardisatie

## Naam conventies
Het standaardiseren van taalgebruik is belangrijk zodat iedereen bij een term weet wat we bedoelen. Voor software is dit nog veel belangrijker daar een naam exact gelijk moet zijn als zaken naar elkaar verwijderen. In veel gevallen ook nog hoofdletter gevoelig. Daarom zijn er afspraken over hoe we zaken noemen in software.

We gebruiken vanaf nu CamelCase. Hierbij schrijven we een naam zonder spaties of scheidingstekens. Ieder woord begint met een hoofdletter. Voor properties (ook wel eigenschappen, variabelen genoemd) gebruiken we UpperCamelCase zoals HandStand en bij operations (ook wel opdrachten, besturingen, bedieningen, autonome-processen of commando's genoemd) gebruiken we lowerCamelCase zoals setHandStand.

## Applicatie interfaces
Binnen een samengesteld systeem als een tunnel moeten subsystemen met elkaar communiceren. Om nu niet allemaal een eigen en andere taal te spreken is het verstandig afspraken te maken. Een bekende interface voor op webtechniek gebaseerde systemen is HTTP. Deze bestaat uit een vraag en antwoord spel tussen applicaties en servers. De vraag is verwerkt in een url welke aangeeft 'doe me alle verkeerslichten in het systeem' zoals:
```http
https://aliconnect.nl/api/Verkeerslichten/?$select=*
```
En het antwoord bestaat uit content in het formaat json bijvoorbeeld
```json
{"value":[{"@id":"Verkeerslichten(1)"}]}
```
### Standaard OData
Om nu niet allemaal het wiel opnieuw uit te vinden gebruiken we hier de standaard <a target=doc href=https://www.odata.org/>odata</a> voor. De opbouw van de url is volledig uitgewerkt in [documentatie](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html) en ook het antwoord ligt vast in [documentatie](http://docs.oasis-open.org/odata/odata-json-format/v4.01/odata-json-format-v4.01.html).
### Standaard Open API Specificatie
Maar per systeem moeten we nog wel documenteren welke properties en operations een dergelijk systeem heeft. Ook hier kiezen we voor een standaard wijze van documenteren. Een wijze die voor andere systemen makkelijk te lezen is zodat deze weten hoe ze met een systeem moeten commuiceren. De gebruikte standaard, ook door RWS aanbevollen, is de [OpenAPI 3.0](https://www.openapis.org/). Ook deze stndaard is breed gedocumenteerd zoals op [swagger](https://swagger.io/specification/). En deze heeft zelfs een editor [ontwikkeld](https://editor.swagger.io/) om een API goed te beschrijven.

# Generatie van de interface
Nu we de basisspecificatie van de tunnel hebben kunnen we deze ook gebruiken om zo veel mogelijk de gewenste API's te genereren en alle benodigde documentatie op te stellen. We doorlopen in het [script](https://aliconnect.nl/lts/input/bstti/?make=config) de volgende stappen.
1. Door inconsistentie in de bron pdf moeten we enkele teksten vervangen. Hieronder vallen operations zonder aflsuiting met ().
1. Alle schema namen, poperty namen en operation namen worden gewijzigd in CamelCase
1. De teksten worden zo veel als mogelijk geannaliseerd en opgesplits in data objecten zoals toestand-variabele, commando's, properties, operations, condities, acties, waarden, initiele waarden enz.

# Het resultaat
Na analyse en conversie hebben we de volgende resultaten

## Naam conventie hernoem lijst
Voor tracering naar het eisenpakket is er een [hernoemlijst](https://aliconnect.nl/lts/input/bstti/rename.yaml). Wellicht een mogelijkheid om de gekozen standaarden over te nemen en wijzigingen door te voeren in de bron.

## Nieuw document content bestand
Voor het generen van documentatie is er een compleet [doc bestand](https://aliconnect.nl/lts/input/bstti/doc.yaml). In dit doucment zijn eisen opgesplist in meta gegevens zoals eis teksten, nummers en kunnen uitgebreid worden met informatie over auteur en moment van wijzigen enz.  Dit document bevat alle informatie en kan eventueel ook gebruikt worden als import en export naar systemen. Deze data is dan ook te lezen en wijziginen door software evenals een mens, anders dan een XML formaat. Wellicht kan dit document de officele bron zijn, opgeslagen in github, voor algemeen gebruik. Er dient dan een ontwerp afspraak te worden gemaakt over de opbouw van dit data document.

## AIM configuratie bestand
Voor het configureren van een Tunnel in Aliconnect is een configuratie nodig. Deze bevat minimaal een overzicht van de schemas met hun properties. Deze configuratie is volledig gebaseerd op de OAS en de voordelen van het AIM Data Ware House is dat geen database ontwikkeling nodig is. De Database is zelflerend en bevat AI zodat de alleen het opgeven van een configuratie nodig is om data op te slaan. Ieder ander systeem kan rechtstreeks data uitwisselen via een REST API. De beveiliging is volledig gebaseerd op OAuth 2.0.
1. De gegenereerde configuratie staat in [config.local.bstti.yaml](https://aliconnect.nl/lts/input/bstti/config.local.bstti.yaml). Dit bestand wordt iedere generatie overschreven.
1. Om handmatige wijzigingen niet te overschrijven bestaat het bron document [config.local.src.yaml](https://aliconnect.nl/lts/input/bstti/config.local.src.yaml). Dit wordt onderhouden door engineers en bevat alle aanvullingen en wijzigingen over het generatie bestand
1. De AIM configuratie staat in [config.local.yaml](https://aliconnect.nl/lts/input/bstti/config.local.yaml). Deze wordt gebruikt door Aliconnect en de ObjectManager voor het configureren van een Tunnel



# Video wall
Een video wall. De beeldschermen zijn op te starten op apparte PC's met eigen schermen. Er kan één totaal scherm worden gebruikt of meerdere schermen over één of meerdere PC's.
https://wall.aliconnect.nl/v1/api/lib/vms/index.html?wall=1


## Video wall digital twin
Simulatie van camera's gebaseerd op de configuratie van de tunnel
https://rws.aliconnect.nl/tms/eht/lts/lib/Tunnel/GUI/webroot/twin/?wall=1&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJpc3MiOiJyd3MuYWxpY29ubmVjdC5ubCIsInNjb3BlIjoid2Vic2l0ZS5yZWFkIG5hbWUgZW1haWwiLCJzdWIiOiIyODA0MzQyIiwiYXVkIjoiMzY2NjEzNCIsImV4cCI6MTYwNTM2Mjk3MCwiaWF0IjoxNjA1Mjc2NTcwfQ.UKHp3WPoh5DtXvZBG9D3TNpLeh6v17rD1kfJSRBWqxU

## Toevoegen extra webcam
Door het bezoeken van een webpagina kan een burger zijn telefoon camera delen met het systeem. Deze is door de wegverkeersleider toe te voegen aan de video wall.
https://wall.aliconnect.nl/v1/api/lib/vms/index.html?wall=1&cam=201
