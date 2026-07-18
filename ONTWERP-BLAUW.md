# Ontwerp — blauwe richting (blue-hour Nairobi)

**Status:** preview / ter beoordeling — *niet live*.
**Branch:** `ontwerp-blauw` (afgetakt van `main`). `main` is ongemoeid; urbanchill.nl blijft de huidige crème-versie tot dit bewust gemergd wordt.
**Bestand:** `ontwerp-blauw-preview.html` (losstaand, bewust níet `index.html` zodat Cloudflare Pages het nooit per ongeluk als homepage oppikt).

## Waar dit vandaan komt
Aanleiding: de huidige crème-site voelde als "losse, geplakte onderdelen". Twee oude mockups (blauw UrbanChill + een SONGA-variant) toonden een sterkere *visuele richting* — sfeer, plek, gelaagdheid — maar stonden niet meer in de git-historie (nooit als code gecommit). Deze preview bouwt die richting schoon na, met de discipline van de huidige site.

## Ontwerpkeuzes
- **Kleur:** Nairobi in het blauwe uur. Navy dat naar dusk-blauw zakt, met een warme horizongloed. (Lucht is op verzoek meerdere tinten lichter gezet dan het eerste, bijna-zwarte voorstel.)
- **Accent:** amber-goud `#E3A24A` — de kleur van de raamlichtjes tegen de schemer. Eén accent, geen drie-kleuren-knoppen. Afgeleid van het onderwerp, niet de oude terracotta.
- **Typografie:** Cormorant Garamond voor koppen (merkschreef blijft herkenbaar) + Inter voor tekst/labels.
- **Signature:** een Nairobi-skyline in CSS/SVG met warme, subtiel flikkerende raamlichtjes. Keert klein terug in de dienstkaarten en de donkere banden — dát bindt de pagina tot één geheel.
- **Leesbaarheid:** donkere waas (scrim) over de hero, zodat tekst-over-beeld altijd leesbaar blijft (het grootste gebrek van de mockups).
- **Geen foto-afhankelijkheid:** de sfeer komt volledig uit gradient + SVG. Een echte hero-foto kan later achter de waas geschoven worden; werkt met én zonder.

## Harde gegevens (ongewijzigd overgenomen)
- Prijzen: **Arrival €299** (€399 voor 2 personen), **Extra Day €199** p/dag, **Concierge €149** p/maand — allemaal incl. btw. Altijd zichtbaar.
- Geen reisbureau-/safari-framing, geen "overleven"-framing, geen belofte van Nederlandstalige begeleiding op de grond (Nederlandse voorbereiding vooraf, Engelstalige host ter plekke).
- Teksten in de preview zijn **illustratief** — alleen de prijzen zijn definitief.

## Vervolgstappen (wanneer je zover bent)
1. Echte content erin: hero-copy, volledige dienst-details, FAQ, Over, Contact.
2. Weer/koers-widgets toevoegen in de glas-stijl van de hero-panelen (i.p.v. los dashboard-blok).
3. Beslissen: wordt dit de hele site, of blijft het naast de crème-versie staan als vergelijking?
4. Nog te verfijnen op smaak: exacte helderheid van de lucht, sterkte van de horizongloed, overgang donker → lichte secties, en definitieve accentkleur (amber vs. terracotta vs. teal).
5. Pas bij akkoord: `ontwerp-blauw` bewust naar `main` mergen → dán pas live. Teruggaan blijft altijd mogelijk via de git-historie.
