# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projektübersicht

LAYRR ist eine statisch generierte Marketing-Website für eine Webdesign-Agentur in Niedersachsen. Das Kernkonzept: Ein Node.js-Generator erzeugt kombinatorisch SEO-optimierte Landing Pages aus Städte- und Branchendaten (aktuell 33 Städte × 6 Branchen = 198 Seiten). Dazu kommen eine Hauptseite (`index.html`), rechtliche Seiten (`impressum.html`, `datenschutz.html`, `agb.html`) und ein Remotion-Videoprojekt.

## Befehle

```bash
# Landing Pages generieren (erzeugt alle HTML-Dateien in /landing/ + llms.txt im Root)
node generate-landings.js

# Video-Vorschau (Remotion im Browser)
cd video && npm install && npm run preview

# Video rendern (Output: ../layrr-showcase.mp4)
cd video && npm run render
```

Es gibt kein Linting, keine Tests und kein Build-System für die Hauptseite — alles ist vanilla HTML/CSS/JS.

## Deployment

Automatisch via GitHub Actions (`.github/workflows/deploy.yml`): Bei Push auf `main` wird per FTP deployed (SamKirkland/FTP-Deploy-Action). Ausgeschlossen vom Upload: `.git*`, `.github/`, `generate-landings.js`, `deploy.py`, `node_modules/`.

**Wichtig:** Nach Änderungen am Generator muss `node generate-landings.js` lokal ausgeführt und die generierten HTML-Dateien commited werden — der Generator läuft nicht in CI.

## Architektur

### Landing-Page-Generator (`generate-landings.js`)

Einzelne Datei (~1.200 Zeilen) mit datentreibendem Template-System:

- **`staedte[]`** (Zeile ~5–39) — Array von Stadt-Objekten mit: `name`, `slug`, `lat`/`lng`, `plz`, `einwohner`, `region`, `besonderheit`, `wirtschaft` (regionaler Wirtschaftstext)
- **`branchen[]`** (Zeile ~42–300+) — Array von Branchen-Objekten mit: `name`, `slug`, `icon` (inline SVG), `heroSub(stadt)`, `metaDesc(stadt)`, `problems[]`, `leistungen[]`, `keywords`, `faqs(stadt)` (alle stadtabhängigen Felder sind Funktionen)
- **`generateHTML(branche, stadt)`** — Erzeugt eine vollständige HTML-Seite inkl. CSS, JS, JSON-LD (ProfessionalService, FAQPage, BreadcrumbList), Cross-Linking und SEO-Meta-Tags
- **Output-Schleife** — `branchen × staedte` erzeugt alle Kombinationen als statische HTML nach `landing/`
- **`llms.txt`** (Zeile ~1150) — Wird am Ende ebenfalls generiert; enthält eine AI-lesbare Zusammenfassung aller Services und Links zu allen Landing Pages

Dateinamenskonvention: `landing/webdesign-{branche.slug}-{stadt.slug}.html`

Neue Städte oder Branchen werden als Datenobjekte in die jeweiligen Arrays eingefügt — der Generator erzeugt automatisch alle Kombinationen. Jede Landing Page ist eine vollständig eigenständige HTML-Datei mit eingebettetem CSS und JS (keine geteilten Assets).

### Cross-Linking-Strategie

Jede Landing Page enthält zwei Verlinkungs-Blöcke: 8 zufällig gewählte andere Städte derselben Branche und alle anderen Branchen derselben Stadt. Die Zufallsauswahl (`Math.random()`) bedeutet, dass jede Regenerierung leicht andere Cross-Links erzeugt.

### Hauptseite (`index.html`)

Einzelne statische HTML-Datei (~2.400 Zeilen) mit eingebettetem CSS und JS. Enthält: Hero mit Video-Hintergrund, Services, Branchen-Grid, FAQ-Akkordeon, Kontaktformular. Das Kontaktformular hat nur eine Client-seitige Absende-Animation (kein Backend). Die `index.html` wird manuell gepflegt und **nicht** vom Generator erzeugt.

### Video (`video/`)

Remotion-Projekt (React 18 + Remotion 4) für Instagram-Reels-Format (1080×1920, 15s @ 30fps). Hauptkomponente: `src/LayrShowcase.jsx` mit animierten Szenen. Farbkonstanten am Dateianfang spiegeln das Website-Theme wider.

### Statische Seiten

`impressum.html`, `datenschutz.html`, `agb.html` — manuell gepflegte rechtliche Seiten mit eigenem inline CSS. Die `sitemap.xml` und `robots.txt` werden ebenfalls manuell gepflegt (nicht vom Generator erzeugt).

### Health-Check-Reports

`health-check-*.html` — Wöchentliche SEO/Health-Check-Reports als eigenständige HTML-Dateien.

## Konventionen

- **Sprache**: Alle Inhalte und Variablennamen in den Datenarrays sind Deutsch
- **SEO**: Jede generierte Seite muss canonical URL, JSON-LD, Open Graph Tags, Geo-Meta-Tags und lokalisierte Meta-Descriptions enthalten
- **Cross-Linking**: Landing Pages verlinken untereinander (andere Städte derselben Branche, andere Branchen derselben Stadt)
- **Theme-Farben**: Background `#050505`, Akzent `#c8ff00`, identisch in Website und Video-Konstanten
- **Fonts**: Plus Jakarta Sans (Display/Body), Space Mono (Monospace)
- **Eigenständige Seiten**: Jede Landing Page und die Hauptseite enthalten ihr gesamtes CSS/JS inline — keine externen Stylesheets oder Scripts (außer Google Fonts)
- **Domain**: `layrr.de` — alle canonical URLs und Sitemap-Einträge verwenden diese Domain
