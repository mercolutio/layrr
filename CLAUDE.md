# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projektübersicht

LAYRR ist eine statische Marketing-Website für eine Webdesign-Agentur in Niedersachsen. Der Scope ist bewusst klein gehalten: eine Hauptseite (`index.html`), drei rechtliche Seiten (`impressum.html`, `datenschutz.html`, `agb.html`) und ein Remotion-Videoprojekt im Unterordner `video/`.

**Historischer Kontext:** Das Projekt enthielt zuvor einen Node.js-Generator (`generate-landings.js`), der 198 SEO-Landing-Pages unter `/landing/` erzeugte (33 Städte × 6 Branchen). Dieser Ansatz wurde verworfen — die Seiten waren aufgrund hoher Inhaltsähnlichkeit als Doorway-Pages zu klassifizieren und brachten kaum Impressionen. Generator und Landing-Ordner wurden entfernt. Falls wieder SEO-Skalierung benötigt wird, muss der Ansatz neu gedacht werden (echter Unique-Content pro Seite, nicht Template-Variation).

## Befehle

```bash
# Video-Vorschau (Remotion im Browser)
cd video && npm install && npm run preview

# Video rendern (Output: ../layrr-showcase.mp4)
cd video && npm run render
```

Es gibt kein Linting, keine Tests und kein Build-System für die Hauptseite — alles ist vanilla HTML/CSS/JS.

## Deployment

Automatisch via GitHub Actions (`.github/workflows/deploy.yml`): Bei Push auf `main` wird per FTP deployed (SamKirkland/FTP-Deploy-Action). Die Action synchronisiert den Arbeitsbaum mit dem Server — lokal gelöschte Dateien werden auch auf dem FTP-Host entfernt. Ausgeschlossen vom Upload: `.git*`, `.github/`, `deploy.py`, `node_modules/`.

## Architektur

### Hauptseite (`index.html`)

Einzelne statische HTML-Datei (~2.400 Zeilen) mit eingebettetem CSS und JS. Enthält: Hero mit Video-Hintergrund, Services, Branchen-Grid, FAQ-Akkordeon, Kontaktformular. Das Kontaktformular hat nur eine Client-seitige Absende-Animation (kein Backend).

### Statische Seiten

`impressum.html`, `datenschutz.html`, `agb.html` — manuell gepflegte rechtliche Seiten mit eigenem inline CSS. Die `sitemap.xml` und `robots.txt` werden ebenfalls manuell gepflegt.

### Video (`video/`)

Remotion-Projekt (React 18 + Remotion 4) für Instagram-Reels-Format (1080×1920, 15s @ 30fps). Hauptkomponente: `src/LayrShowcase.jsx` mit animierten Szenen. Farbkonstanten am Dateianfang spiegeln das Website-Theme wider.

### Health-Check-Reports

`health-check-*.html` — SEO/Health-Check-Reports als eigenständige HTML-Dateien (historische Artefakte, manuell gepflegt).

## Konventionen

- **Sprache**: Alle Inhalte sind deutsch
- **Theme-Farben**: Background `#050505`, Akzent `#c8ff00`, identisch in Website und Video-Konstanten
- **Fonts**: Plus Jakarta Sans (Display/Body), Space Mono (Monospace)
- **Eigenständige Seiten**: Jede Seite enthält ihr gesamtes CSS/JS inline — keine externen Stylesheets oder Scripts (außer Google Fonts)
- **Domain**: `layrr.de` — alle canonical URLs und Sitemap-Einträge verwenden diese Domain
