# ModernPlan – statischer Webshop (Arbeitsstand)

Dies ist eine **fiktive Studienwebsite** ohne echte Produkte, Bestellungen oder Zahlungsabwicklung.

## Lokal öffnen

`index.html` im Browser öffnen. Optional einen lokalen Webserver starten:

```bash
python -m http.server 8000
```

Dann `http://localhost:8000` aufrufen.

## Deployment

Den Inhalt dieses Ordners in ein GitHub-Repository hochladen. Bei Cloudflare Pages als statisches Projekt veröffentlichen, ohne Build-Befehl; Output-Verzeichnis `/` (Projektwurzel). Alternativ GitHub Pages verwenden.

## Eigenleistungstexte

Die Felder `[EIGENLEISTUNG: ...]` und mit **EIGENLEISTUNG AUSSTEHEND** gekennzeichnete Abschnitte dürfen nicht als fertige Abgabe veröffentlicht werden. Sie werden vom Studierenden verfasst und danach rechtlich/redaktionell überprüft. Insbesondere sind Lizenz, Datenschutz, Impressum und Barrierefreiheitserklärung noch nicht fertig.

## Juristische Abgrenzung

- Der fiktive Webshop soll hypothetisch wie ein echter Shop rechtlich korrekt konzipiert sein.
- Die reale Veröffentlichung der Studienwebsite ist gesondert zu prüfen (Hosting-Logs, Betreiberangaben etc.).
- Markenformen sind **provisorische Illustrationen**, keine recherchierten Marken.
- `sessionStorage` speichert lediglich eine 0/1-Warenkorbkennung innerhalb des Browser-Tabs; tatsächliche Browserdatenflüsse sind vor Veröffentlichung zu prüfen.
- Das Kontaktformular verwendet ausschließlich clientseitige Validierung und übermittelt keine Daten.
- Keine externen Schriftarten, Drittanbieter-Analytics, Cookie-Banner-Simulation oder eingebetteten Medien.

## Ausstehende Arbeiten

1. Namen, Markenentwürfe, Nizza-Klassen, Recherche.
2. Produkt-, Preis-, Unternehmens- und sämtliche Rechtstexte selbst schreiben.
3. Realistisches vollständiges rechtliches Checkout-Szenario gestalten, ohne echte Transaktionen.
4. WCAG 2.2 AA manuell und automatisiert testen, dokumentieren und Probleme beheben.
5. Echte Hosting-Datenschutzerklärung und Anbieterkennzeichnung prüfen.
6. Medienregister, Lizenzregister, Rechtsquellen und Abnahmeprotokoll vervollständigen.
