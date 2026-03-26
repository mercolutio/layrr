const fs = require('fs');
const path = require('path');

// ====== STÄDTE MIT GEO-KOORDINATEN ======
const staedte = [
  { name: 'Hannover', slug: 'hannover', lat: 52.3759, lng: 9.7320, plz: '30159' },
  { name: 'Braunschweig', slug: 'braunschweig', lat: 52.2689, lng: 10.5268, plz: '38100' },
  { name: 'Oldenburg', slug: 'oldenburg', lat: 53.1435, lng: 8.2146, plz: '26121' },
  { name: 'Osnabrück', slug: 'osnabrueck', lat: 52.2799, lng: 8.0472, plz: '49074' },
  { name: 'Wolfsburg', slug: 'wolfsburg', lat: 52.4227, lng: 10.7865, plz: '38440' },
  { name: 'Göttingen', slug: 'goettingen', lat: 51.5413, lng: 9.9158, plz: '37073' },
  { name: 'Salzgitter', slug: 'salzgitter', lat: 52.1547, lng: 10.3293, plz: '38226' },
  { name: 'Hildesheim', slug: 'hildesheim', lat: 52.1508, lng: 9.9510, plz: '31134' },
  { name: 'Delmenhorst', slug: 'delmenhorst', lat: 53.0511, lng: 8.6318, plz: '27749' },
  { name: 'Wilhelmshaven', slug: 'wilhelmshaven', lat: 53.5308, lng: 8.1052, plz: '26382' },
  { name: 'Lüneburg', slug: 'lueneburg', lat: 53.2494, lng: 10.4015, plz: '21335' },
  { name: 'Celle', slug: 'celle', lat: 52.6224, lng: 10.0807, plz: '29221' },
  { name: 'Garbsen', slug: 'garbsen', lat: 52.4186, lng: 9.5981, plz: '30823' },
  { name: 'Hameln', slug: 'hameln', lat: 52.1036, lng: 9.3568, plz: '31785' },
  { name: 'Lingen', slug: 'lingen', lat: 52.5225, lng: 7.3167, plz: '49808' },
  { name: 'Langenhagen', slug: 'langenhagen', lat: 52.4386, lng: 9.7399, plz: '30853' },
  { name: 'Nordhorn', slug: 'nordhorn', lat: 52.4324, lng: 7.0713, plz: '48529' },
  { name: 'Wolfenbüttel', slug: 'wolfenbuettel', lat: 52.1642, lng: 10.5336, plz: '38300' },
  { name: 'Goslar', slug: 'goslar', lat: 51.9060, lng: 10.4298, plz: '38640' },
  { name: 'Peine', slug: 'peine', lat: 52.3193, lng: 10.2336, plz: '31224' },
  { name: 'Emden', slug: 'emden', lat: 53.3669, lng: 7.2060, plz: '26721' },
  { name: 'Cuxhaven', slug: 'cuxhaven', lat: 53.8617, lng: 8.6940, plz: '27472' },
  { name: 'Stade', slug: 'stade', lat: 53.5977, lng: 9.4726, plz: '21682' },
  { name: 'Melle', slug: 'melle', lat: 52.2037, lng: 8.3384, plz: '49324' },
  { name: 'Neustadt am Rübenberge', slug: 'neustadt-am-ruebenberge', lat: 52.5061, lng: 9.4590, plz: '31535' },
  { name: 'Laatzen', slug: 'laatzen', lat: 52.3161, lng: 9.7989, plz: '30880' },
  { name: 'Buchholz', slug: 'buchholz', lat: 53.3264, lng: 9.8681, plz: '21244' },
  { name: 'Wunstorf', slug: 'wunstorf', lat: 52.4262, lng: 9.4310, plz: '31515' },
  { name: 'Barsinghausen', slug: 'barsinghausen', lat: 52.3037, lng: 9.4582, plz: '30890' },
  { name: 'Seelze', slug: 'seelze', lat: 52.3953, lng: 9.5963, plz: '30926' },
  { name: 'Lehrte', slug: 'lehrte', lat: 52.3727, lng: 9.9768, plz: '31275' },
  { name: 'Achim', slug: 'achim', lat: 53.0135, lng: 9.0265, plz: '28832' },
  { name: 'Uelzen', slug: 'uelzen', lat: 52.9655, lng: 10.5590, plz: '29525' },
];

// ====== BRANCHEN ======
const branchen = [
  {
    name: 'Solarfirmen',
    slug: 'solarfirmen',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    heroSub: (stadt) => `Professionelle Websites für Solarunternehmen in ${stadt} — mehr Sichtbarkeit, mehr Anfragen, mehr Aufträge für Ihre Solarfirma.`,
    metaDesc: (stadt) => `Webdesign für Solarfirmen in ${stadt}. Moderne, SEO-optimierte Websites die Kunden bringen. In 7 Tagen online. Jetzt kostenloses Erstgespräch!`,
    problems: [
      'Potenzielle Kunden suchen online nach Solaranlagen — ohne Website verlieren Sie Aufträge an die Konkurrenz',
      'Die Energiewende boomt, aber Ihre Solarfirma ist online nicht sichtbar',
      'Komplexe Produkte wie PV-Anlagen brauchen eine überzeugende Online-Präsentation',
      'Ohne lokale SEO finden Hausbesitzer in Ihrer Region Sie nicht bei Google',
    ],
    leistungen: [
      { title: 'Solar-Landingpages', desc: 'Optimierte Seiten für PV-Anlagen, Stromspeicher und Wallboxen — jedes Produkt perfekt präsentiert.' },
      { title: 'Anfragen-Formulare', desc: 'Smarte Kontaktformulare mit Dachflächen-Kalkulator für qualifizierte Solar-Leads.' },
      { title: 'Lokale SEO', desc: 'Top-Rankings für Suchanfragen wie "Solaranlage {stadt}" und "Photovoltaik {stadt}".' },
      { title: 'Referenz-Galerie', desc: 'Professionelle Darstellung Ihrer realisierten Solarprojekte mit Vorher-Nachher-Bildern.' },
    ],
    keywords: 'Solarfirma, Photovoltaik, PV-Anlage, Solaranlage, Solarteur',
    faqs: (stadt) => [
      { q: `Was kostet eine Website für eine Solarfirma in ${stadt}?`, a: `Eine professionelle Website für Solarfirmen in ${stadt} gibt es bei WEBCRAFT ab einem Festpreis. Im kostenlosen Erstgespräch besprechen wir Ihre Anforderungen und erstellen ein individuelles Angebot — transparent und ohne versteckte Kosten.` },
      { q: `Wie schnell ist die Website für meine Solarfirma in ${stadt} fertig?`, a: `In der Regel ist Ihre neue Website innerhalb von 7 Werktagen online. Wir arbeiten effizient und halten Sie über den gesamten Prozess auf dem Laufenden.` },
      { q: `Wird meine Solarfirma in ${stadt} bei Google gefunden?`, a: `Ja. Jede Website wird von uns für lokale Suchanfragen wie „Solaranlage ${stadt}", „Photovoltaik ${stadt}" und „Solarfirma ${stadt}" optimiert. Wir setzen auf technische SEO, lokale Signale und strukturierte Daten.` },
      { q: `Welche Inhalte brauche ich für die Website meiner Solarfirma?`, a: `Idealerweise: Beschreibung Ihrer Leistungen (PV-Anlagen, Stromspeicher, Wallboxen), Referenzprojekte und Kontaktdaten. Auf Wunsch erstellen wir die Texte für Sie — branchenspezifisch und SEO-optimiert.` },
    ],
  },
  {
    name: 'Wärmepumpenfirmen',
    slug: 'waermepumpenfirmen',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l6.5-3"/><circle cx="12" cy="12" r="3"/></svg>`,
    heroSub: (stadt) => `Professionelle Websites für Wärmepumpen-Installateure in ${stadt} — werden Sie zur ersten Anlaufstelle für nachhaltige Heiztechnik.`,
    metaDesc: (stadt) => `Webdesign für Wärmepumpenfirmen in ${stadt}. Moderne Websites die Vertrauen schaffen und Anfragen generieren. Jetzt kostenloses Erstgespräch!`,
    problems: [
      'Hausbesitzer recherchieren online intensiv bevor sie sich für einen Wärmepumpen-Installateur entscheiden',
      'Ohne professionelle Website wirkt Ihre Firma weniger vertrauenswürdig als die Konkurrenz',
      'Das Heizungsgesetz treibt die Nachfrage — aber finden Kunden Sie auch online?',
      'Fördermittel-Informationen und Beratungskompetenz müssen online sichtbar sein',
    ],
    leistungen: [
      { title: 'Produktseiten', desc: 'Übersichtliche Darstellung Ihres Wärmepumpen-Portfolios — Luft-Wasser, Sole-Wasser, Hybrid.' },
      { title: 'Förder-Rechner', desc: 'Interaktive Elemente die potenziellen Kunden die Fördermöglichkeiten aufzeigen.' },
      { title: 'Lokale SEO', desc: 'Top-Platzierungen für "Wärmepumpe {stadt}" und "Heizung erneuern {stadt}".' },
      { title: 'Vertrauens-Elemente', desc: 'Zertifikate, Herstellerpartner und Kundenbewertungen professionell präsentiert.' },
    ],
    keywords: 'Wärmepumpe, Heizung, Wärmepumpen-Installation, Heiztechnik, Energieberatung',
    faqs: (stadt) => [
      { q: `Was kostet eine Website für Wärmepumpenfirmen in ${stadt}?`, a: `WEBCRAFT bietet Websites für Wärmepumpenfirmen in ${stadt} zum Festpreis an. Im kostenlosen Erstgespräch klären wir den Umfang und erstellen ein transparentes Angebot ohne versteckte Kosten.` },
      { q: `Wie werden Wärmepumpenfirmen in ${stadt} online gefunden?`, a: `Durch gezielte lokale SEO-Optimierung für Suchbegriffe wie „Wärmepumpe ${stadt}", „Heizung erneuern ${stadt}" und „Wärmepumpen-Installateur ${stadt}". Wir optimieren Ihre Website technisch und inhaltlich für maximale Sichtbarkeit.` },
      { q: `Können Sie auch Fördermittel-Informationen auf der Website darstellen?`, a: `Ja. Wir integrieren aktuelle Informationen zu Förderprogrammen (BAFA, KfW) übersichtlich auf Ihrer Website — ein wichtiger Vertrauensfaktor für potenzielle Kunden.` },
      { q: `Wie lange dauert die Erstellung einer Wärmepumpen-Website?`, a: `Ihre professionelle Website ist in der Regel innerhalb von 7 Werktagen fertig und online — inklusive mobilfreundlichem Design, SEO-Optimierung und Kontaktformular.` },
    ],
  },
  {
    name: 'SHK-Betriebe',
    slug: 'shk-betriebe',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    heroSub: (stadt) => `Professionelle Websites für Sanitär-, Heizungs- und Klimabetriebe in ${stadt} — mehr Kunden durch starke Online-Präsenz.`,
    metaDesc: (stadt) => `Webdesign für SHK-Betriebe in ${stadt}. Moderne Websites für Sanitär, Heizung & Klima. In 7 Tagen online. Jetzt kostenloses Erstgespräch!`,
    problems: [
      '87% der Kunden googeln bevor sie einen SHK-Betrieb beauftragen — ohne Website sind Sie unsichtbar',
      'Notdienst-Anfragen gehen an Betriebe die online sofort gefunden werden',
      'Jüngere Hausbesitzer erwarten eine moderne, mobilfreundliche Website',
      'Ohne Online-Bewertungen und Referenzen verlieren Sie gegen die digitale Konkurrenz',
    ],
    leistungen: [
      { title: 'Notdienst-Sektion', desc: 'Prominente Notfall-Rufnummer und 24/7-Service sofort sichtbar für dringende Anfragen.' },
      { title: 'Leistungsübersicht', desc: 'Klare Darstellung aller SHK-Leistungen — Sanitär, Heizung, Klima, Badsanierung.' },
      { title: 'Lokale SEO', desc: 'Top-Rankings für "Klempner {stadt}", "Heizungsbauer {stadt}" und "Sanitär Notdienst {stadt}".' },
      { title: 'Bewertungen', desc: 'Integration von Google-Bewertungen und Kundenstimmen für maximales Vertrauen.' },
    ],
    keywords: 'SHK, Sanitär, Heizung, Klima, Klempner, Installateur, Badsanierung',
    faqs: (stadt) => [
      { q: `Was kostet eine Website für SHK-Betriebe in ${stadt}?`, a: `Professionelle Websites für SHK-Betriebe in ${stadt} bieten wir zum Festpreis an. Im kostenlosen Erstgespräch besprechen wir Ihren Bedarf — ob Sanitär, Heizung oder Klimatechnik — und erstellen ein individuelles Angebot.` },
      { q: `Kann eine Notdienst-Funktion integriert werden?`, a: `Ja. Wir integrieren eine prominente Notdienst-Sektion mit Click-to-Call-Funktion, damit Ihre Kunden Sie in ${stadt} bei Rohrbrüchen oder Heizungsausfällen sofort erreichen können.` },
      { q: `Wie wird mein SHK-Betrieb in ${stadt} bei Google sichtbar?`, a: `Durch lokale SEO-Optimierung für Suchbegriffe wie „Klempner ${stadt}", „Heizungsbauer ${stadt}" und „Sanitär Notdienst ${stadt}". Dazu optimieren wir Ihren Google My Business Eintrag und setzen strukturierte Daten ein.` },
      { q: `Wie schnell bekomme ich meine SHK-Website?`, a: `In der Regel innerhalb von 7 Werktagen. Von der Erstberatung über das Konzept bis zum Launch — alles aus einer Hand, schnell und unkompliziert.` },
    ],
  },
  {
    name: 'Lokale Firmen',
    slug: 'lokale-firmen',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    heroSub: (stadt) => `Professionelle Websites für lokale Unternehmen in ${stadt} — werden Sie online sichtbar und gewinnen Sie mehr Kunden aus Ihrer Region.`,
    metaDesc: (stadt) => `Webdesign für lokale Firmen in ${stadt}. Moderne Websites die regional gefunden werden. In 7 Tagen online. Jetzt kostenloses Erstgespräch!`,
    problems: [
      'Ihre Kunden suchen lokal bei Google — ohne Website existieren Sie für sie nicht',
      'Social Media allein reicht nicht — eine eigene Website schafft Vertrauen und Professionalität',
      'Die Konkurrenz in Ihrer Stadt ist bereits online präsent und fängt Ihre Kunden ab',
      'Ohne Google My Business und lokale SEO bleiben Sie in der Suche unsichtbar',
    ],
    leistungen: [
      { title: 'Lokales Webdesign', desc: 'Maßgeschneiderte Websites die Ihre lokale Identität widerspiegeln und Vertrauen aufbauen.' },
      { title: 'Google My Business', desc: 'Optimierung Ihres Google-Eintrags für maximale Sichtbarkeit in der lokalen Suche und auf Maps.' },
      { title: 'Lokale SEO', desc: 'Top-Rankings für lokale Suchanfragen in {stadt} und Umgebung.' },
      { title: 'Kontaktoptimierung', desc: 'Click-to-Call, Anfahrtskarte und einfache Kontaktmöglichkeiten für mehr Kundenanfragen.' },
    ],
    keywords: 'lokales Unternehmen, Firma, Geschäft, Dienstleister, regional',
    faqs: (stadt) => [
      { q: `Was kostet eine Website für lokale Firmen in ${stadt}?`, a: `WEBCRAFT erstellt Websites für lokale Unternehmen in ${stadt} zum transparenten Festpreis. Im kostenlosen Erstgespräch klären wir Ihren Bedarf und erstellen ein individuelles Angebot.` },
      { q: `Warum braucht mein lokales Geschäft in ${stadt} eine Website?`, a: `Über 87% der Verbraucher googeln bevor sie ein lokales Unternehmen besuchen. Ohne Website verlieren Sie diese Kunden an die Konkurrenz. Eine professionelle Website schafft Vertrauen und generiert rund um die Uhr Anfragen.` },
      { q: `Werde ich mit meiner Firma in ${stadt} bei Google gefunden?`, a: `Ja. Wir optimieren Ihre Website für lokale Suchanfragen in ${stadt} und Umgebung. Zusätzlich helfen wir bei der Einrichtung und Optimierung Ihres Google My Business Profils.` },
      { q: `Muss ich technisches Wissen mitbringen?`, a: `Nein. Wir kümmern uns um alles — Design, Technik, Texte und SEO. Sie liefern Ihre Wünsche und Inhalte, wir setzen alles professionell um.` },
    ],
  },
  {
    name: 'Werkstätten',
    slug: 'werkstaetten',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    heroSub: (stadt) => `Professionelle Websites für Werkstätten in ${stadt} — mehr Terminbuchungen, mehr Stammkunden, mehr Umsatz.`,
    metaDesc: (stadt) => `Webdesign für Werkstätten in ${stadt}. Moderne Websites die Vertrauen schaffen und Terminbuchungen steigern. Jetzt kostenloses Erstgespräch!`,
    problems: [
      'Kunden vergleichen Werkstätten online — ohne Website entscheiden sie sich für die Konkurrenz',
      'Bewertungen und Transparenz sind entscheidend — das geht nur mit einer professionellen Website',
      'Ohne Online-Terminbuchung verlieren Sie Kunden an modernere Werkstätten',
      'Ihre Spezialisierungen und Leistungen sind ohne Website für Neukunden unsichtbar',
    ],
    leistungen: [
      { title: 'Online-Terminbuchung', desc: 'Einfache Terminvereinbarung direkt über Ihre Website — 24/7 ohne Telefonwarteschleife.' },
      { title: 'Leistungskatalog', desc: 'Übersichtliche Darstellung aller Werkstatt-Leistungen mit transparenten Informationen.' },
      { title: 'Lokale SEO', desc: 'Top-Rankings für "Werkstatt {stadt}", "KFZ-Werkstatt {stadt}" und "Autowerkstatt {stadt}".' },
      { title: 'Bewertungsintegration', desc: 'Google-Bewertungen und Kundenstimmen prominent auf Ihrer Website präsentiert.' },
    ],
    keywords: 'Werkstatt, KFZ-Werkstatt, Autowerkstatt, Reparatur, Inspektion',
    faqs: (stadt) => [
      { q: `Was kostet eine Website für Werkstätten in ${stadt}?`, a: `WEBCRAFT bietet Websites für Werkstätten in ${stadt} zum Festpreis — transparent und ohne versteckte Kosten. Im kostenlosen Erstgespräch klären wir Ihren Bedarf.` },
      { q: `Kann eine Online-Terminbuchung integriert werden?`, a: `Ja. Wir integrieren ein benutzerfreundliches Terminbuchungs-System, damit Ihre Kunden in ${stadt} rund um die Uhr Termine online vereinbaren können — ohne Anruf.` },
      { q: `Wie wird meine Werkstatt in ${stadt} bei Google gefunden?`, a: `Durch lokale SEO-Optimierung für Suchbegriffe wie „KFZ-Werkstatt ${stadt}", „Autowerkstatt ${stadt}" und „Werkstatt in der Nähe". Wir sorgen dafür, dass Sie in der lokalen Suche ganz oben stehen.` },
      { q: `Wie schnell ist meine Werkstatt-Website fertig?`, a: `Ihre professionelle Website ist in der Regel innerhalb von 7 Werktagen online — inklusive mobilfreundlichem Design, SEO und Kontaktformular.` },
    ],
  },
  {
    name: 'KFZ-Gutachter',
    slug: 'kfz-gutachter',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm12-2h-4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"/><path d="M12 2a8 8 0 0 0-8 8v4"/><path d="M20 10a8 8 0 0 0-16 0"/></svg>`,
    heroSub: (stadt) => `Professionelle Websites für KFZ-Gutachter und Sachverständige in ${stadt} — mehr Aufträge durch professionelle Online-Präsenz.`,
    metaDesc: (stadt) => `Webdesign für KFZ-Gutachter in ${stadt}. Moderne Websites die Vertrauen schaffen und Gutachten-Aufträge generieren. Jetzt kostenloses Erstgespräch!`,
    problems: [
      'Nach einem Unfall suchen Geschädigte sofort online nach einem KFZ-Gutachter in der Nähe',
      'Versicherungen und Anwälte empfehlen Gutachter mit professioneller Online-Präsenz',
      'Ohne Website fehlt das Vertrauen — Kunden wählen den Gutachter mit der besseren Darstellung',
      'Ihre Qualifikationen und Zertifizierungen müssen online sofort erkennbar sein',
    ],
    leistungen: [
      { title: 'Unfallgutachten-Seiten', desc: 'Spezialisierte Landingpages für Haftpflicht-, Kasko- und Wertgutachten.' },
      { title: 'Sofort-Kontakt', desc: 'Prominente Notruf-Nummer und schnelle Kontaktmöglichkeit für Unfallgeschädigte.' },
      { title: 'Lokale SEO', desc: 'Top-Rankings für "KFZ-Gutachter {stadt}", "Unfallgutachten {stadt}" und "Sachverständiger {stadt}".' },
      { title: 'Qualifikations-Darstellung', desc: 'Zertifikate, Kammer-Zugehörigkeit und Spezialisierungen professionell präsentiert.' },
    ],
    keywords: 'KFZ-Gutachter, Sachverständiger, Unfallgutachten, KFZ-Sachverständiger, Schadensgutachten',
    faqs: (stadt) => [
      { q: `Was kostet eine Website für KFZ-Gutachter in ${stadt}?`, a: `WEBCRAFT erstellt professionelle Websites für KFZ-Gutachter in ${stadt} zum Festpreis. Im kostenlosen Erstgespräch besprechen wir Ihre Anforderungen und erstellen ein transparentes Angebot.` },
      { q: `Wie finden Unfallgeschädigte in ${stadt} meinen Gutachter-Service?`, a: `Durch lokale SEO-Optimierung für Suchanfragen wie „KFZ-Gutachter ${stadt}", „Unfallgutachten ${stadt}" und „Sachverständiger ${stadt}". Wir sorgen dafür, dass Sie bei Google und in KI-Suchmaschinen gefunden werden.` },
      { q: `Können Zertifikate und Qualifikationen auf der Website dargestellt werden?`, a: `Ja. Wir präsentieren Ihre Zertifizierungen, Kammer-Zugehörigkeit und Spezialisierungen professionell — das schafft Vertrauen bei Geschädigten, Anwälten und Versicherungen.` },
      { q: `Wie schnell ist meine KFZ-Gutachter-Website fertig?`, a: `In der Regel innerhalb von 7 Werktagen. Schnelle Umsetzung ist gerade für KFZ-Gutachter wichtig — je früher Sie online sind, desto schneller kommen die Aufträge.` },
    ],
  },
];

// ====== HTML TEMPLATE ======
function generateHTML(branche, stadt) {
  const stadtName = stadt.name;
  const stadtSlug = stadt.slug;
  const titleLong = `Webdesign für ${branche.name} in ${stadtName} | WEBCRAFT`;
  const titleShort = `Webdesign ${branche.name} ${stadtName} | WEBCRAFT`;
  const title = titleLong.length > 60 ? titleShort : titleLong;
  const metaDescFull = branche.metaDesc(stadtName);
  const metaDescription = metaDescFull.length > 155 ? metaDescFull.substring(0, 152) + '...' : metaDescFull;
  const heroSubline = branche.heroSub(stadtName);
  const filename = `webdesign-${branche.slug}-${stadtSlug}.html`;
  const canonicalUrl = `https://webcraft-studio.de/landing/${filename}`;
  const faqs = branche.faqs(stadtName);

  const leistungenHTML = branche.leistungen.map((l, i) => {
    const desc = l.desc.replaceAll('{stadt}', stadtName);
    return `
      <div class="lp-card reveal${i > 0 ? ` reveal-d${i}` : ''}">
        <div class="lp-card-num">0${i + 1}</div>
        <h3>${l.title}</h3>
        <p>${desc}</p>
      </div>`;
  }).join('');

  const problemsHTML = branche.problems.map((p, i) => `
        <div class="lp-problem-item reveal${i > 0 ? ` reveal-d${i}` : ''}">
          <div class="lp-problem-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <p>${p.replaceAll('{stadt}', stadtName)}</p>
        </div>`).join('');

  const faqsHTML = faqs.map((faq, i) => `
      <div class="faq-item reveal${i > 0 ? ` reveal-d${Math.min(i, 3)}` : ''}">
        <button class="faq-q" aria-expanded="false">${faq.q}<span class="faq-toggle">+</span></button>
        <div class="faq-a"><p>${faq.a}</p></div>
      </div>`).join('');

  // Schema.org: LocalBusiness + Service + FAQPage + GeoCoordinates
  const schemaArray = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": `WEBCRAFT — Webdesign für ${branche.name} in ${stadtName}`,
      "description": metaDescription,
      "url": canonicalUrl,
      "telephone": "+49 123 456 7890",
      "email": "info@webcraft-studio.de",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": stadtName,
        "postalCode": stadt.plz,
        "addressRegion": "Niedersachsen",
        "addressCountry": "DE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": stadt.lat,
        "longitude": stadt.lng
      },
      "areaServed": {
        "@type": "City",
        "name": stadtName,
        "containedInPlace": {
          "@type": "State",
          "name": "Niedersachsen"
        }
      },
      "serviceType": `Webdesign für ${branche.name}`,
      "provider": {
        "@type": "Organization",
        "name": "WEBCRAFT",
        "url": "https://webcraft-studio.de"
      },
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Webdesign-Leistungen für ${branche.name}`,
        "itemListElement": branche.leistungen.map((l, i) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": l.title,
            "description": l.desc.replaceAll('{stadt}', stadtName)
          }
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "WEBCRAFT",
          "item": "https://webcraft-studio.de"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `Webdesign für ${branche.name}`,
          "item": `https://webcraft-studio.de/landing/webdesign-${branche.slug}-${stadtSlug}.html`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${branche.name} in ${stadtName}`,
          "item": canonicalUrl
        }
      ]
    }
  ];

  const schemaScripts = schemaArray.map(s =>
    `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`
  ).join('\n');

  // Zusammenfassungstext für LLM/AI-Crawler (natürlicher Fließtext)
  const llmSummary = `WEBCRAFT ist eine Webdesign-Agentur die professionelle Websites für ${branche.name} in ${stadtName}, Niedersachsen erstellt. Der Service umfasst ${branche.leistungen.map(l => l.title).join(', ')}. Websites werden innerhalb von 7 Werktagen geliefert, sind mobilfreundlich, SEO-optimiert und DSGVO-konform. WEBCRAFT bietet ein kostenloses Erstgespräch und arbeitet zu transparenten Festpreisen. Kontakt: info@webcraft-studio.de, Tel: +49 123 456 7890.`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${metaDescription}">
<meta name="keywords" content="Webdesign ${stadtName}, ${branche.keywords}, Website ${stadtName}, Homepage ${stadtName}">
<link rel="canonical" href="${canonicalUrl}">

<!-- Geo Meta Tags -->
<meta name="geo.region" content="DE-NI">
<meta name="geo.placename" content="${stadtName}">
<meta name="geo.position" content="${stadt.lat};${stadt.lng}">
<meta name="ICBM" content="${stadt.lat}, ${stadt.lng}">

<!-- Open Graph -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${metaDescription}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="WEBCRAFT">
<meta property="og:image" content="https://webcraft-studio.de/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- AI/LLM Optimization -->
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta name="subject" content="Webdesign für ${branche.name} in ${stadtName}">
<meta name="topic" content="Webdesign, ${branche.name}, ${stadtName}, Niedersachsen">
<meta name="summary" content="${llmSummary}">
<meta name="classification" content="Business/Webdesign">
<meta name="target" content="${branche.name} in ${stadtName}">
<meta name="coverage" content="${stadtName}, Niedersachsen, Deutschland">
<meta name="category" content="Webdesign">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

${schemaScripts}

<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #050505;
  --bg-card: #0a0a0a;
  --bg-elevated: #111111;
  --bg-glass: rgba(255,255,255,0.03);
  --border: rgba(255,255,255,0.06);
  --border-hover: rgba(255,255,255,0.12);
  --text: #ffffff;
  --text-secondary: rgba(255,255,255,0.5);
  --text-tertiary: rgba(255,255,255,0.3);
  --accent: #c8ff00;
  --accent-dim: rgba(200,255,0,0.15);
  --accent-glow: rgba(200,255,0,0.08);
  --purple: #8b5cf6;
  --blue: #3b82f6;
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'Space Mono', monospace;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --radius: 16px;
  --radius-sm: 10px;
}

html { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: var(--accent) var(--bg); }

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--accent); color: var(--bg); }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

a { color: inherit; text-decoration: none; }
button { font-family: inherit; }
img { display: block; max-width: 100%; }

.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

/* REVEAL */
.reveal { opacity: 0; transform: translateY(60px); transition: opacity 1s var(--ease), transform 1s var(--ease); }
.reveal.vis { opacity: 1; transform: none; }
.reveal-d1 { transition-delay: 0.1s; }
.reveal-d2 { transition-delay: 0.2s; }
.reveal-d3 { transition-delay: 0.3s; }

/* NOISE */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 10000;
  opacity: 0.4;
}

/* HEADER */
.header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 20px 0; transition: all 0.5s var(--ease);
}
.header.scrolled {
  padding: 14px 0; background: rgba(5,5,5,0.8);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border);
}
.header-inner { display: flex; align-items: center; justify-content: space-between; }
.logo {
  font-family: var(--font-display); font-weight: 800; font-size: 1.3rem;
  letter-spacing: -0.04em; display: flex; align-items: center; gap: 8px;
}
.logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; display: inline-block; }
.nav { display: flex; align-items: center; gap: 36px; }
.nav a { font-size: 0.82rem; font-weight: 500; color: var(--text-secondary); letter-spacing: 0.02em; transition: color 0.3s; }
.nav a:hover { color: var(--text); }
.nav-cta {
  background: var(--accent) !important; color: var(--bg) !important; font-weight: 700 !important;
  padding: 10px 24px; border-radius: 100px; font-size: 0.82rem; transition: all 0.3s var(--ease) !important;
}
.nav-cta:hover { transform: scale(1.05); }
.burger { display: none; flex-direction: column; gap: 6px; background: none; border: none; cursor: pointer; padding: 4px; z-index: 200; }
.burger span { width: 24px; height: 1.5px; background: var(--text); transition: all 0.4s var(--ease); display: block; }
.burger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5.5px); }
.burger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.burger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5.5px); }

/* HERO */
.lp-hero {
  min-height: 80vh; display: flex; align-items: center;
  position: relative; overflow: hidden; padding: 160px 0 100px;
}
.hero-glow { position: absolute; width: 800px; height: 800px; border-radius: 50%; filter: blur(120px); opacity: 0.12; pointer-events: none; }
.hero-glow-1 { top: -200px; right: -200px; background: var(--accent); }
.hero-glow-2 { bottom: -300px; left: -200px; background: var(--purple); opacity: 0.08; }
.lp-hero-content { position: relative; z-index: 2; max-width: 800px; }
.lp-hero-tag {
  display: inline-flex; align-items: center; gap: 10px;
  border: 1px solid var(--border); padding: 8px 20px 8px 10px;
  border-radius: 100px; font-size: 0.78rem; color: var(--text-secondary);
  margin-bottom: 28px; background: var(--bg-glass);
}
.lp-hero-tag .pulse {
  width: 8px; height: 8px; background: var(--accent); border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
.lp-hero h1 {
  font-family: var(--font-display); font-weight: 800;
  font-size: clamp(2.2rem, 5vw, 3.8rem); line-height: 1.08;
  letter-spacing: -0.04em; margin-bottom: 24px;
}
.lp-hero h1 em { font-style: italic; color: var(--accent); }
.lp-hero-sub {
  font-size: 1.1rem; color: var(--text-secondary); line-height: 1.7;
  max-width: 600px; margin-bottom: 36px;
}
.btn-main {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--accent); color: var(--bg); font-weight: 700;
  padding: 16px 36px; border-radius: 100px; font-size: 0.95rem;
  transition: all 0.4s var(--ease); border: none; cursor: pointer;
}
.btn-main:hover { transform: scale(1.05); box-shadow: 0 0 40px var(--accent-dim); }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--border); padding: 16px 32px; border-radius: 100px;
  font-size: 0.9rem; font-weight: 500; color: var(--text-secondary);
  transition: all 0.3s; margin-left: 12px;
}
.btn-ghost:hover { border-color: var(--text); color: var(--text); }
.lp-hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }

/* SECTION UTILS */
.section { padding: 100px 0; position: relative; }
.section-tag {
  font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 20px;
  display: flex; align-items: center; gap: 12px;
}
.section-tag::before { content: '//'; opacity: 0.5; }
.section-heading {
  font-family: var(--font-display); font-weight: 800;
  font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.08;
  letter-spacing: -0.04em; margin-bottom: 20px;
}
.section-heading em { font-style: italic; color: var(--accent); }
.section-desc { font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; max-width: 520px; }

/* PROBLEMS */
.lp-problems { background: var(--bg-card); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.lp-problems-header { text-align: center; margin-bottom: 56px; }
.lp-problems-header .section-tag { justify-content: center; }
.lp-problems-header .section-desc { margin: 0 auto; }
.lp-problems-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto; }
.lp-problem-item {
  display: flex; gap: 16px; align-items: flex-start;
  padding: 28px; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg); transition: all 0.4s var(--ease);
}
.lp-problem-item:hover { border-color: var(--border-hover); transform: translateY(-2px); }
.lp-problem-icon { flex-shrink: 0; color: var(--accent); margin-top: 2px; }
.lp-problem-item p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; }

/* LEISTUNGEN */
.lp-leistungen { background: var(--bg); }
.lp-leistungen-header { margin-bottom: 56px; }
.lp-leistungen-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.lp-card {
  border: 1px solid var(--border); border-radius: var(--radius); padding: 36px 28px;
  background: var(--bg); transition: all 0.4s var(--ease); position: relative; overflow: hidden;
}
.lp-card::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, var(--accent-glow), transparent);
  opacity: 0; transition: opacity 0.4s;
}
.lp-card:hover { border-color: var(--accent); transform: translateY(-4px); }
.lp-card:hover::before { opacity: 1; }
.lp-card-num {
  font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent);
  letter-spacing: 0.1em; margin-bottom: 20px; position: relative; z-index: 1;
}
.lp-card h3 {
  font-family: var(--font-display); font-weight: 700; font-size: 1.05rem;
  margin-bottom: 10px; position: relative; z-index: 1;
}
.lp-card p { font-size: 0.82rem; color: var(--text-tertiary); line-height: 1.65; position: relative; z-index: 1; }

/* LLM SUMMARY */
.lp-summary {
  background: var(--bg); border-bottom: 1px solid var(--border);
}
.lp-summary-inner {
  max-width: 800px; margin: 0 auto; text-align: center;
}
.lp-summary-inner .section-tag { justify-content: center; }
.lp-summary-text {
  font-size: 1rem; color: var(--text-secondary); line-height: 1.9;
  column-count: 1;
}
.lp-summary-text strong { color: var(--text); font-weight: 600; }

/* FAQ */
.lp-faq { background: var(--bg-card); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.lp-faq-header { text-align: center; margin-bottom: 56px; }
.lp-faq-header .section-tag { justify-content: center; }
.lp-faq-header .section-desc { margin: 0 auto; }
.faq-list { max-width: 760px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid var(--border); }
.faq-q {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 24px 0; background: none; border: none; cursor: pointer;
  font-family: var(--font-display); font-size: 1rem; font-weight: 600;
  color: var(--text); text-align: left; gap: 20px; letter-spacing: -0.01em; transition: color 0.3s;
}
.faq-q:hover { color: var(--accent); }
.faq-toggle {
  width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: all 0.4s var(--ease); color: var(--text-tertiary); font-size: 1.2rem;
}
.faq-item.active .faq-toggle {
  background: var(--accent); border-color: var(--accent); color: var(--bg); transform: rotate(45deg);
}
.faq-a { max-height: 0; overflow: hidden; transition: max-height 0.5s var(--ease); }
.faq-item.active .faq-a { max-height: 300px; }
.faq-a p { padding-bottom: 24px; font-size: 0.9rem; line-height: 1.8; color: var(--text-secondary); }

/* REFERENZEN */
.lp-referenzen {
  background: var(--bg-card); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
}
.lp-ref-inner { text-align: center; max-width: 600px; margin: 0 auto; }
.lp-ref-inner .section-tag { justify-content: center; }
.lp-ref-inner .section-desc { margin: 0 auto 32px; }

/* CTA BANNER */
.lp-cta { background: var(--bg); padding: 100px 0; }
.lp-cta-inner {
  border: 1px solid var(--border); border-radius: 24px; padding: 72px 60px;
  text-align: center; position: relative; overflow: hidden;
  background: linear-gradient(135deg, rgba(200,255,0,0.04), var(--bg), rgba(139,92,246,0.03));
}
.lp-cta-inner::before {
  content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 600px; background: radial-gradient(circle, var(--accent-glow), transparent 70%);
  pointer-events: none;
}
.lp-cta-inner .section-heading { position: relative; z-index: 2; max-width: 600px; margin: 0 auto 16px; }
.lp-cta-inner .section-desc { position: relative; z-index: 2; margin: 0 auto 36px; max-width: 500px; }
.lp-cta-inner .btn-main { position: relative; z-index: 2; font-size: 1.05rem; padding: 20px 44px; }

/* CONTACT */
.lp-contact { background: var(--bg); position: relative; overflow: hidden; }
.contact-glow {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  background: var(--accent); filter: blur(200px); opacity: 0.04;
  top: -200px; right: -200px; pointer-events: none;
}
.contact-layout {
  display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px;
  align-items: start; position: relative; z-index: 2;
}
.contact-left p { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7; margin-bottom: 40px; }
.contact-detail { display: flex; align-items: center; gap: 16px; padding: 14px 0; }
.cd-icon {
  width: 44px; height: 44px; border-radius: var(--radius-sm);
  border: 1px solid var(--border); display: flex; align-items: center;
  justify-content: center; color: var(--accent); flex-shrink: 0;
}
.cd-label { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 3px; }
.cd-value { font-weight: 500; font-size: 0.95rem; }
.contact-form {
  border: 1px solid var(--border); border-radius: var(--radius); padding: 44px;
  background: var(--bg-glass); backdrop-filter: blur(10px);
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group { margin-bottom: 18px; }
.form-group label {
  display: block; font-family: var(--font-mono); font-size: 0.68rem;
  color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
}
.form-group input, .form-group textarea, .form-group select {
  width: 100%; padding: 14px 18px; background: rgba(255,255,255,0.03);
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  font-family: var(--font-body); font-size: 0.9rem; color: var(--text);
  transition: all 0.3s; outline: none;
}
.form-group input::placeholder, .form-group textarea::placeholder { color: var(--text-tertiary); }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  border-color: var(--accent); background: var(--accent-glow); box-shadow: 0 0 20px rgba(200,255,0,0.05);
}
.form-group select { cursor: pointer; }
.form-group select option { background: var(--bg); color: var(--text); }
.form-group textarea { resize: vertical; min-height: 120px; }
.form-submit {
  width: 100%; padding: 18px; background: var(--accent); color: var(--bg);
  font-size: 0.95rem; font-weight: 700; border: none; border-radius: 100px;
  cursor: pointer; transition: all 0.4s var(--ease);
  display: flex; align-items: center; justify-content: center; gap: 10px;
  position: relative; overflow: hidden;
}
.form-submit::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: translateX(-100%); transition: transform 0.6s;
}
.form-submit:hover::before { transform: translateX(100%); }
.form-submit:hover { box-shadow: 0 0 40px var(--accent-dim); transform: scale(1.02); }

/* FOOTER */
.footer { padding: 64px 0 32px; border-top: 1px solid var(--border); background: var(--bg); }
.footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 56px; }
.footer-brand p { margin-top: 16px; font-size: 0.85rem; color: var(--text-tertiary); line-height: 1.7; max-width: 280px; }
.footer-col h4 { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 20px; }
.footer-col a { display: block; font-size: 0.85rem; color: var(--text-secondary); padding: 5px 0; transition: color 0.3s; }
.footer-col a:hover { color: var(--accent); }
.footer-bottom {
  padding-top: 28px; border-top: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;
}
.footer-bottom p { font-size: 0.75rem; color: var(--text-tertiary); }
.footer-socials { display: flex; gap: 8px; }
.footer-socials a {
  width: 36px; height: 36px; border: 1px solid var(--border); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-tertiary); transition: all 0.3s;
}
.footer-socials a:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .lp-leistungen-grid { grid-template-columns: repeat(2, 1fr); }
  .contact-layout { grid-template-columns: 1fr; gap: 56px; }
  .lp-problems-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .container { padding: 0 20px; }
  .section { padding: 72px 0; }
  .nav { display: none; }
  .nav.open {
    display: flex; flex-direction: column; position: fixed; inset: 0;
    background: rgba(5,5,5,0.98); backdrop-filter: blur(24px);
    justify-content: center; align-items: center; gap: 28px; z-index: 150;
  }
  .nav.open a { font-size: 1.4rem; color: var(--text); }
  .burger { display: flex; }
  .lp-hero h1 { font-size: 2.2rem; }
  .lp-leistungen-grid { grid-template-columns: 1fr; }
  .lp-cta-inner { padding: 48px 28px; }
  .form-row { grid-template-columns: 1fr; }
  .contact-form { padding: 28px; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .lp-hero-actions { flex-direction: column; align-items: flex-start; }
  .btn-ghost { margin-left: 0; }
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
<noscript><style>.reveal { opacity: 1 !important; transform: none !important; }</style></noscript>

<!-- HEADER -->
<header class="header" id="header">
  <div class="container header-inner">
    <a href="../index.html" class="logo">WEBCRAFT<span class="logo-dot"></span></a>
    <nav class="nav" id="nav">
      <a href="../index.html#leistungen">Leistungen</a>
      <a href="../index.html#portfolio">Arbeiten</a>
      <a href="../index.html#branchen">Branchen</a>
      <a href="../index.html#ablauf">Ablauf</a>
      <a href="#kontakt" class="nav-cta">Projekt starten</a>
    </nav>
    <button class="burger" id="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main>
<!-- HERO -->
<section class="lp-hero">
  <div class="hero-glow hero-glow-1"></div>
  <div class="hero-glow hero-glow-2"></div>
  <div class="container lp-hero-content">
    <div class="lp-hero-tag reveal">
      <span class="pulse"></span>
      ${branche.name} in ${stadtName}
    </div>
    <h1 class="reveal reveal-d1">Webdesign für <em>${branche.name}</em> in ${stadtName}</h1>
    <p class="lp-hero-sub reveal reveal-d2">${heroSubline}</p>
    <div class="lp-hero-actions reveal reveal-d3">
      <a href="#kontakt" class="btn-main">
        Kostenloses Erstgespräch
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
      <a href="../index.html#portfolio" class="btn-ghost">Unsere Arbeiten</a>
    </div>
  </div>
</section>

<!-- ZUSAMMENFASSUNG (AI/LLM-optimiert) -->
<section class="lp-summary section">
  <div class="container">
    <div class="lp-summary-inner reveal">
      <div class="section-tag">Über diesen Service</div>
      <h2 class="section-heading">Webdesign-Agentur für <em>${branche.name}</em> in ${stadtName}</h2>
      <article class="lp-summary-text">
        <p><strong>WEBCRAFT</strong> ist eine Webdesign-Agentur mit Fokus auf <strong>${branche.name} in ${stadtName}</strong>, Niedersachsen. Wir erstellen professionelle, mobilfreundliche und SEO-optimierte Websites speziell für die Anforderungen von ${branche.name}. Unser Service umfasst <strong>${branche.leistungen.map(l => l.title).join('</strong>, <strong>')}</strong>. Jede Website wird innerhalb von <strong>7 Werktagen</strong> fertiggestellt, ist <strong>DSGVO-konform</strong> und wird zu einem transparenten <strong>Festpreis</strong> angeboten. Wir bieten ein <strong>kostenloses und unverbindliches Erstgespräch</strong> für ${branche.name} in ${stadtName} und Umgebung an. Kontaktieren Sie uns unter <strong>info@webcraft-studio.de</strong> oder telefonisch unter <strong>+49 123 456 7890</strong>.</p>
      </article>
    </div>
  </div>
</section>

<!-- PROBLEMS -->
<section class="lp-problems section">
  <div class="container">
    <div class="lp-problems-header reveal">
      <div class="section-tag">Das Problem</div>
      <h2 class="section-heading">Warum ${branche.name} in ${stadtName} eine <em>Website</em> brauchen</h2>
      <p class="section-desc">Ohne professionelle Online-Präsenz verlieren Sie täglich potenzielle Kunden an Ihre Konkurrenz.</p>
    </div>
    <div class="lp-problems-grid">
      ${problemsHTML}
    </div>
  </div>
</section>

<!-- LEISTUNGEN -->
<section class="lp-leistungen section">
  <div class="container">
    <div class="lp-leistungen-header reveal">
      <div class="section-tag">Unsere Leistungen</div>
      <h2 class="section-heading">Was wir für <em>${branche.name}</em> in ${stadtName} bieten</h2>
      <p class="section-desc">Maßgeschneiderte Web-Lösungen speziell für die Anforderungen von ${branche.name}.</p>
    </div>
    <div class="lp-leistungen-grid">
      ${leistungenHTML}
    </div>
  </div>
</section>

<!-- FAQ (AI/LLM-optimiert mit FAQPage Schema) -->
<section class="lp-faq section" id="faq">
  <div class="container">
    <div class="lp-faq-header reveal">
      <div class="section-tag">Häufige Fragen</div>
      <h2 class="section-heading">FAQ: Webdesign für <em>${branche.name}</em> in ${stadtName}</h2>
      <p class="section-desc">Antworten auf die wichtigsten Fragen rund um Webdesign für ${branche.name} in ${stadtName}.</p>
    </div>
    <div class="faq-list">
      ${faqsHTML}
    </div>
  </div>
</section>

<!-- REFERENZEN -->
<section class="lp-referenzen section">
  <div class="container">
    <div class="lp-ref-inner reveal">
      <div class="section-tag">Referenzen</div>
      <h2 class="section-heading">Überzeugen Sie sich <em>selbst</em></h2>
      <p class="section-desc">Sehen Sie sich unsere erfolgreich umgesetzten Projekte an und erfahren Sie, wie wir auch Ihr Unternehmen online zum Erfolg führen.</p>
      <a href="../index.html#portfolio" class="btn-main">
        Portfolio ansehen
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- CTA BANNER -->
<section class="lp-cta">
  <div class="container">
    <div class="lp-cta-inner reveal">
      <h2 class="section-heading">Kostenloses Erstgespräch für <em>${branche.name}</em> in ${stadtName}</h2>
      <p class="section-desc">Wir beraten Sie ehrlich und unverbindlich. Erfahren Sie, wie eine professionelle Website Ihr Geschäft in ${stadtName} voranbringt.</p>
      <a href="#kontakt" class="btn-main">
        Jetzt Erstgespräch buchen
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- KONTAKT -->
<section class="lp-contact section" id="kontakt">
  <div class="contact-glow"></div>
  <div class="container contact-layout">
    <div class="contact-left reveal">
      <div class="section-tag">Kontakt</div>
      <h2 class="section-heading">Projekt <em>starten</em></h2>
      <p>Erstgespräch ist kostenlos und unverbindlich. Schreiben Sie uns oder rufen Sie an — wir melden uns innerhalb von 24 Stunden.</p>
      <div class="contact-detail">
        <div class="cd-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <div>
          <div class="cd-label">Telefon</div>
          <div class="cd-value">+49 123 456 7890</div>
        </div>
      </div>
      <div class="contact-detail">
        <div class="cd-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </div>
        <div>
          <div class="cd-label">E-Mail</div>
          <div class="cd-value">info@webcraft-studio.de</div>
        </div>
      </div>
      <div class="contact-detail">
        <div class="cd-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div>
          <div class="cd-label">Standort</div>
          <div class="cd-value">${stadtName}, Niedersachsen</div>
        </div>
      </div>
    </div>
    <form class="contact-form reveal reveal-d2" id="contactForm">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name *</label>
          <input type="text" id="name" name="name" placeholder="Max Mustermann" required>
        </div>
        <div class="form-group">
          <label for="email">E-Mail *</label>
          <input type="email" id="email" name="email" placeholder="max@firma.de" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="phone">Telefon</label>
          <input type="tel" id="phone" name="phone" placeholder="+49 123 456 789">
        </div>
        <div class="form-group">
          <label for="branche">Ihre Branche</label>
          <select id="branche" name="branche">
            <option value="${branche.slug}" selected>${branche.name}</option>
            <option value="handwerk">Handwerk</option>
            <option value="gastro">Gastronomie</option>
            <option value="gesundheit">Gesundheit</option>
            <option value="immobilien">Immobilien</option>
            <option value="sonstiges">Sonstiges</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="message">Nachricht *</label>
        <textarea id="message" name="message" placeholder="Erzählen Sie uns von Ihrem Unternehmen in ${stadtName} und Ihren Vorstellungen..." required></textarea>
      </div>
      <button type="submit" class="form-submit">
        Anfrage absenden
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>
    </form>
  </div>
</section>
</main>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="../index.html" class="logo">WEBCRAFT<span class="logo-dot"></span></a>
        <p>Modernes Webdesign für kleine Unternehmen. Schnell, professionell und bezahlbar.</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <a href="../index.html#leistungen">Leistungen</a>
        <a href="../index.html#portfolio">Arbeiten</a>
        <a href="../index.html#branchen">Branchen</a>
        <a href="../index.html#ablauf">Ablauf</a>
        <a href="../index.html#kontakt">Kontakt</a>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="../index.html#leistungen">Webdesign</a>
        <a href="../index.html#leistungen">SEO</a>
        <a href="../index.html#leistungen">Branding</a>
        <a href="../index.html#leistungen">Wartung</a>
      </div>
      <div class="footer-col">
        <h4>Rechtliches</h4>
        <a href="../impressum.html">Impressum</a>
        <a href="../datenschutz.html">Datenschutz</a>
        <a href="../agb.html">AGB</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 WEBCRAFT. Alle Rechte vorbehalten.</p>
      <div class="footer-socials">
        <a href="https://www.instagram.com/webcraft.studio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
        <a href="https://www.linkedin.com/company/webcraft-studio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LI</a>
        <a href="https://dribbble.com/webcraft-studio" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">DR</a>
      </div>
    </div>
  </div>
</footer>

<script>
// HEADER
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// MOBILE NAV
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('active');
  nav.classList.remove('open');
  document.body.style.overflow = '';
}));

// REVEAL
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// FAQ
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item.active').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!wasActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// FORM
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.form-submit');
  const orig = btn.innerHTML;
  btn.innerHTML = '<span style="display:inline-block;width:18px;height:18px;border:2px solid;border-top-color:transparent;border-radius:50%;animation:spin .7s linear infinite"></span> Wird gesendet...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Gesendet!';
    btn.style.background = '#4ade80';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; this.reset(); }, 2500);
  }, 1200);
});
</script>
</body>
</html>`;
}

// ====== GENERATE ALL PAGES ======
const outDir = path.join(__dirname, 'landing');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let count = 0;
for (const branche of branchen) {
  for (const stadt of staedte) {
    const filename = `webdesign-${branche.slug}-${stadt.slug}.html`;
    const filepath = path.join(outDir, filename);
    const html = generateHTML(branche, stadt);
    fs.writeFileSync(filepath, html, 'utf-8');
    count++;
  }
}

// ====== GENERATE llms.txt ======
const llmsTxt = `# WEBCRAFT — Webdesign-Agentur

> WEBCRAFT erstellt professionelle Websites für kleine und mittelständische Unternehmen in Niedersachsen. Spezialisiert auf Solarfirmen, Wärmepumpenfirmen, SHK-Betriebe, lokale Firmen, Werkstätten und KFZ-Gutachter.

## Angebot

- Professionelles Webdesign zum Festpreis
- Fertigstellung innerhalb von 7 Werktagen
- SEO-Optimierung für lokale Suchanfragen
- Mobilfreundliche, DSGVO-konforme Websites
- Kostenloses und unverbindliches Erstgespräch

## Branchen

${branchen.map(b => `- ${b.name}: ${b.keywords}`).join('\n')}

## Servicegebiet

Niedersachsen, Deutschland. Städte: ${staedte.map(s => s.name).join(', ')}.

## Kontakt

- Website: https://webcraft-studio.de
- E-Mail: info@webcraft-studio.de
- Telefon: +49 123 456 7890

## Landing Pages

${branchen.map(b => staedte.map(s =>
  `- [Webdesign für ${b.name} in ${s.name}](https://webcraft-studio.de/landing/webdesign-${b.slug}-${s.slug}.html)`
).join('\n')).join('\n')}
`;

fs.writeFileSync(path.join(__dirname, 'llms.txt'), llmsTxt, 'utf-8');

console.log(`\n${count} Landing Pages generiert in ./landing/`);
console.log(`${branchen.length} Branchen x ${staedte.length} Städte = ${branchen.length * staedte.length} Dateien`);
console.log(`llms.txt generiert im Root-Verzeichnis`);
