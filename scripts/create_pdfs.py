from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle,
    KeepTogether
)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PRIVATE = ROOT / "private"
OUT = ROOT / "output" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)

ORANGE = colors.HexColor("#C5642F")
CREAM = colors.HexColor("#F6EFE6")
INK = colors.HexColor("#211D19")
MUTED = colors.HexColor("#6D625A")
PALE = colors.HexColor("#EADFD3")
GREEN = colors.HexColor("#2F6B4F")

pdfmetrics.registerFont(TTFont("DVSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DVSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("DVSerif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("DVSerif-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"))

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleGuide", fontName="DVSerif-Bold", fontSize=30, leading=33, textColor=colors.white, alignment=TA_CENTER, spaceAfter=8))
styles.add(ParagraphStyle(name="CoverSub", fontName="DVSans-Bold", fontSize=10, leading=13, textColor=colors.white, alignment=TA_CENTER, tracking=1.3))
styles.add(ParagraphStyle(name="H1Guide", fontName="DVSerif-Bold", fontSize=24, leading=27, textColor=INK, spaceBefore=5, spaceAfter=12))
styles.add(ParagraphStyle(name="H2Guide", fontName="DVSerif-Bold", fontSize=16, leading=19, textColor=INK, spaceBefore=8, spaceAfter=7))
styles.add(ParagraphStyle(name="H3Guide", fontName="DVSans-Bold", fontSize=10.5, leading=14, textColor=INK, spaceAfter=4))
styles.add(ParagraphStyle(name="BodyGuide", fontName="DVSans", fontSize=9.2, leading=13.5, textColor=MUTED, spaceAfter=7))
styles.add(ParagraphStyle(name="BodyWhite", fontName="DVSans", fontSize=9.5, leading=14, textColor=colors.white, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="KickerGuide", fontName="DVSans-Bold", fontSize=7.5, leading=10, textColor=ORANGE, tracking=1.5, spaceAfter=5))
styles.add(ParagraphStyle(name="CheckGuide", fontName="DVSans", fontSize=8.8, leading=12.5, textColor=INK, leftIndent=2, spaceAfter=3))
styles.add(ParagraphStyle(name="SmallGuide", fontName="DVSans", fontSize=7.5, leading=10, textColor=MUTED))
styles.add(ParagraphStyle(name="CodeGuide", fontName="DVSans-Bold", fontSize=11, leading=14, textColor=colors.white, alignment=TA_CENTER))


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(PALE)
    canvas.line(18 * mm, 13 * mm, 192 * mm, 13 * mm)
    canvas.setFont("DVSans", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8 * mm, "Gästeguide · Chalet Michael · Riederstrasse 391 · 3925 Grächen")
    canvas.drawRightString(192 * mm, 8 * mm, f"Seite {doc.page}")
    canvas.restoreState()


def img(path, width, height):
    item = Image(str(path), width=width, height=height)
    item._restrictSize(width, height)
    return item


def card(title, text):
    return Table([[Paragraph(title, styles["H3Guide"]), Paragraph(text, styles["BodyGuide"])]],
                 colWidths=[42 * mm, 116 * mm], style=TableStyle([
                     ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                     ("BOX", (0, 0), (-1, -1), 0.5, PALE),
                     ("VALIGN", (0, 0), (-1, -1), "TOP"),
                     ("LEFTPADDING", (0, 0), (-1, -1), 8),
                     ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                     ("TOPPADDING", (0, 0), (-1, -1), 8),
                     ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                 ]))


def section_heading(number, title):
    return [Paragraph(number, styles["KickerGuide"]), Paragraph(title, styles["H1Guide"])]


def public_story():
    story = []
    cover = Table([
        [img(PUBLIC / "chalet-front.jpeg", 174 * mm, 106 * mm)],
        [Paragraph("CHALET MICHAEL", styles["CoverSub"])],
        [Paragraph("Gästeguide", styles["TitleGuide"])],
        [Paragraph("Schön, dass ihr da seid.", styles["BodyWhite"])]
    ], colWidths=[174 * mm], style=TableStyle([
        ("BACKGROUND", (0, 1), (0, -1), INK),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 1), (0, 1), 14),
        ("TOPPADDING", (0, 2), (0, 2), 4),
        ("BOTTOMPADDING", (0, -1), (0, -1), 16),
    ]))
    story += [Spacer(1, 10 * mm), cover, PageBreak()]

    story += section_heading("01", "Im Chalet")
    story += [
        card("WLAN", "<b>Netzwerk:</b> Chalet Michael<br/><b>Passwort:</b> Stgt_4563"),
        Spacer(1, 4 * mm),
        card("Küche", "Eine Nespresso-Kaffeemaschine mit separatem Milchaufschäumer und eine Filterkaffeemaschine sind vorhanden."),
        Spacer(1, 4 * mm),
        card("Kamin", "Lasst das Feuer nie unbeaufsichtigt. Vor dem Schlafengehen bitte vollständig löschen; falls nötig mit Wasser. Feuerholz bekommt ihr im Supermarkt."),
        Spacer(1, 4 * mm),
        card("Heizung", "Bei der Abreise alle Elektroheizkörper auf ca. 7 °C stellen. Fußbodenheizungen und Handtuchheizungen in den Badezimmern ausschalten."),
        Spacer(1, 4 * mm),
        card("Müll & Recycling", "Glas und PET bitte recyceln. Hausmüll gehört ausschließlich in die offiziellen orangefarbenen Säcke. Zusätzliche Säcke gibt es im Coop. Die Müll- und Recyclingstation liegt ca. 100 m die Straße hinunter, an der Kreuzung zur Straße nach Grächen."),
        PageBreak()
    ]

    story += section_heading("02", "An- & Abreise")
    for title, text in [
        ("Adresse", "Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen"),
        ("Schlüssel", "Die Schlüsselübergabe bitte direkt mit Petra abstimmen."),
        ("Check-out", "Check-out ist bis 10:00 Uhr oder nach Absprache."),
        ("Parken", "Private Parkplätze befinden sich direkt am Chalet."),
        ("Bus nach Grächen", "Die Haltestelle liegt an der Hauptstraße nach Grächen. Der Bus ist für Bergbahnbenutzer kostenlos."),
    ]:
        story += [card(title, text), Spacer(1, 4 * mm)]

    story += [Spacer(1, 5 * mm), Paragraph("03", styles["KickerGuide"]), Paragraph("In der Region", styles["H1Guide"]),
              Paragraph("Grächen, Zermatt, Saas-Fee und die Aletsch Arena sind gut erreichbar - ideal zum Wandern, Skifahren und für Tagesausflüge.", styles["BodyGuide"]),
              img(PUBLIC / "matterhorn.jpeg", 174 * mm, 86 * mm), PageBreak()]

    story += section_heading("04", "Petra - eure Ansprechpartnerin vor Ort")
    story += [
        Paragraph("Petra hilft euch beim Check-in und Check-out und ist während eures Aufenthalts gerne für euch da.", styles["BodyGuide"]),
        card("Telefon", "+41 79 757 07 53"),
        Spacer(1, 4 * mm),
        card("WhatsApp", "+32 475 320 980"),
        Spacer(1, 10 * mm),
        Paragraph("Gut zu wissen", styles["H2Guide"])
    ]
    for item in [
        "Nichtraucherhaus",
        "Keine Haustiere",
        "Bettwäsche und Handtücher: Bitte selber mitbringen oder nach Absprache.",
        "Kurtaxe: Normalerweise CHF 3,80 pro Person und Tag (kann bar im Einmachglas hinterlassen werden).",
    ]:
        story.append(Paragraph("• " + item, styles["BodyGuide"]))
    return story


def manager_story():
    cover = Table([
        [img(PUBLIC / "chalet-front.jpeg", 174 * mm, 106 * mm)],
        [Paragraph("CHALET MICHAEL", styles["CoverSub"])],
        [Paragraph("Gästeguide", styles["TitleGuide"])],
        [Paragraph("Ankommen · Einrichten · Aufenthalt · Abreise", styles["BodyWhite"])]
    ], colWidths=[174 * mm], style=TableStyle([
        ("BACKGROUND", (0, 1), (0, -1), INK),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 1), (0, 1), 14),
        ("TOPPADDING", (0, 2), (0, 2), 4),
        ("BOTTOMPADDING", (0, -1), (0, -1), 16),
    ]))
    story = [Spacer(1, 10 * mm), cover, PageBreak()]

    story += section_heading("1", "Anreise")
    for title, text in [
        ("Adresse", "Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen"),
        ("Parken", "Bitte rechts neben der Garage parken."),
        ("Schlüsselkasten am Haus", "Vom Hauseingang links am Haus entlanggehen und zweimal um die Ecke bis zur Terrasse. Dort hängt am Wasserabflussrohr ein Schlüsselkasten. <b>Code: 2901</b>."),
        ("Haus aufschließen", "Im Schlüsselkasten findet ihr die Schlüssel für die Holzeingangstür und die Haupteingangstür."),
    ]:
        story += [card(title, text), Spacer(1, 4 * mm)]

    story += [Paragraph("2", styles["KickerGuide"]), Paragraph("Fenster & Läden öffnen", styles["H1Guide"])]
    for text in [
        "Von außen alle Holzläden rund ums Haus entsichern.",
        "Von innen die Fenster im Ess- und Küchenbereich sowie im Bad-/Schlafzimmerbereich vorsichtig öffnen. Vorhänge vorher vollständig zur Seite ziehen.",
        "Alle geöffneten Holzläden außen sicher arretieren.",
        "Die Rollläden im Wohnzimmer seitlich neben den Fenstern hochziehen.",
    ]:
        story.append(Paragraph("□ " + text, styles["CheckGuide"]))
    story.append(PageBreak())

    story += section_heading("3", "Haus in Betrieb nehmen")
    story += [
        Paragraph("1. Strom anschalten (Sicherungskasten)", styles["H2Guide"]),
        Paragraph("Im Keller am Sicherungskasten einschalten: <b>S1 - Heizung EIN</b>, <b>F18 - Warmwasserboiler EIN</b>, <b>F16 - Herd EIN</b>.", styles["BodyGuide"]),
        img(PUBLIC / "electrical-panel.jpeg", 150 * mm, 92 * mm),
        Spacer(1, 7 * mm),
        Paragraph("2. Hauptwasser öffnen", styles["H2Guide"]),
        Paragraph("<b>Schritt 1:</b> Im Keller das Schlüsselkästchen mit <b>Code 391</b> öffnen und den Schlüssel für den Aufbewahrungs- und Boilerraum entnehmen.", styles["BodyGuide"]),
        img(PUBLIC / "key-box.jpeg", 72 * mm, 74 * mm),
        PageBreak(),
        Paragraph("<b>Schritt 2:</b> Mit dem Schlüssel den Boilerraum öffnen.", styles["BodyGuide"]),
        img(PUBLIC / "boiler-room.jpeg", 88 * mm, 110 * mm),
        Spacer(1, 6 * mm),
        Paragraph("<b>Schritt 3:</b> Hinter dem Warmwasserboiler den Hauptwasserhahn an der Wand vollständig öffnen.", styles["BodyGuide"]),
        img(PUBLIC / "main-water.jpeg", 88 * mm, 70 * mm),
        Spacer(1, 7 * mm),
        Paragraph("3. Kühlschrank einschalten", styles["H2Guide"]),
        Paragraph("In der Küche den Kühlschrank einstecken und kurz kontrollieren, ob er läuft.", styles["BodyGuide"]),
        PageBreak()
    ]

    story += section_heading("4", "Im Chalet")
    for title, text in [
        ("WLAN", "<b>Netzwerk:</b> Chalet Michael<br/><b>Passwort:</b> Stgt_4563"),
        ("Küche", "Eine Nespresso-Kaffeemaschine mit separatem Milchaufschäumer und eine Filterkaffeemaschine sind vorhanden."),
        ("Kamin", "Lasst das Feuer nie unbeaufsichtigt. Vor dem Schlafengehen bitte vollständig löschen; falls nötig mit Wasser."),
        ("Heizung", "Bei der Abreise alle Elektroheizkörper auf ca. 7 °C stellen. Fußbodenheizungen und Handtuchheizungen ausschalten."),
        ("Müll & Recycling", "Glas und PET bitte recyceln. Hausmüll gehört in die offiziellen orangefarbenen Säcke. Die Station liegt ca. 100 m die Straße hinunter, an der Kreuzung zur Straße nach Grächen."),
    ]:
        story += [card(title, text), Spacer(1, 4 * mm)]

    story += [Paragraph("Schlafzimmer & Betten", styles["H2Guide"])]
    for title, text in [
        ("EG - Schlafzimmer", "Doppelbett 160 x 190 cm. Zwei Kissen (80 x 40 cm) und zwei Decken (140 x 200 cm) vorhanden. Bitte Bettwäsche mitbringen oder nach Absprache. <b>Auf keinen Fall ohne Bezüge benutzen!</b>"),
        ("1. OG - Hinten", "1 Doppelbett (180 x 200 cm) oder 2 Einzelbetten (90 x 200 cm). Zwei Kissen (80 x 40 cm) und zwei Decken (140 x 200 cm) vorhanden."),
        ("1. OG - Familienzimmer", "1 Doppelbett (140 x 200 cm) und ein Stockbett: 1 Einzelbett unten und 1 Einzelbett oben, je 90 x 160 cm. Kissen (80 x 40 cm) und Decken (120 x 160 cm) vorhanden."),
        ("1. OG - Cosy Bedroom", "2 Einzelbetten (90 x 200 cm). Kissen und Decken vorhanden."),
    ]:
        story += [card(title, text), Spacer(1, 4 * mm)]

    story += [card("Bus nach Grächen", "Die Haltestelle liegt an der Hauptstraße nach Grächen. Der Bus ist für Bergbahnbenutzer kostenlos."), Spacer(1, 7 * mm)]
    organizer = [Paragraph("Organisatorisches", styles["H2Guide"])]
    for item in [
        "Nichtraucherhaus",
        "Keine Haustiere",
        "Bettwäsche und Handtücher: Bitte selber mitbringen oder nach Absprache.",
        "Kurtaxe: Normalerweise CHF 3,80 pro Person und Tag (kann bar im Einmachglas hinterlassen werden).",
    ]:
        organizer.append(Paragraph("• " + item, styles["BodyGuide"]))
    story.append(KeepTogether(organizer))
    story += [Spacer(1, 8 * mm), Paragraph("5", styles["KickerGuide"]), Paragraph("Check-out & Abreise", styles["H1Guide"]),
              card("Check-out", "Check-out ist bis 10:00 Uhr oder nach Absprache."), Spacer(1, 5 * mm),
              Paragraph("<b>Bitte hinterlasst das Haus so, wie ihr es vorgefunden habt.</b>", styles["BodyGuide"]),
              Paragraph("Abreise-Checkliste", styles["H2Guide"])]
    groups = {
        "Alle Schlafzimmer": ["Betten abziehen", "Staubsaugen und grobe Verschmutzungen nass reinigen", "Fenster und Fensterläden schließen", "Heizungen ausschalten"],
        "Bäder": ["Toiletten putzen - auch unter der Klobrille", "Waschbecken und Badewanne reinigen", "Boden saugen/kehren und nass wischen", "Fensterläden schließen"],
        "Wohnzimmer": ["Kamin reinigen und Asche draußen entsorgen", "Sofa absaugen, auch dahinter", "Boden saugen", "Rollläden herunterlassen", "WLAN/Router ausstecken"],
        "Küche": ["Geschirr spülen", "Arbeitsflächen, Herd und Tisch abwischen", "Boden saugen und nass wischen", "Kühlschrank leeren, ausstecken und offen lassen", "Wasserkocher und Kaffeemaschinen ausstecken", "Fensterläden schließen", "Heizung auf ca. 10 °C stellen"],
        "Müll": ["Allen Müll entsorgen", "Flaschen entsorgen", "Papier entsorgen", "Restmüll entsorgen"],
        "Flur & Treppenhaus": ["Fegen", "Groben Schmutz nass wischen", "Fensterläden schließen"],
    }
    for group, tasks in groups.items():
        block = [Paragraph(group, styles["H2Guide"])] + [Paragraph("□ " + task, styles["CheckGuide"]) for task in tasks]
        story.append(KeepTogether(block))
    story.append(PageBreak())
    story += [Paragraph("Zum Schluss: Haus stilllegen", styles["H1Guide"]),
              Paragraph("Erst durchführen, wenn das Haus vollständig aufgeräumt und gereinigt ist.", styles["BodyGuide"])]
    for task in [
        "Hauptwasserhahn schließen", "Waschmaschine ausstecken", "Warmwasserboiler F18 AUS",
        "Herd F16 AUS", "Heizung S1 AUS - im Sommer", "Kühlschrank leeren, ausstecken und Tür offen lassen",
        "WLAN-Router ausstecken", "Alle Fenster schließen", "Holzläden schließen und sichern",
        "Rollläden im Wohnzimmer herunterlassen"
    ]:
        story.append(Paragraph("□ " + task, styles["CheckGuide"]))
    return story


def build(path, story):
    doc = SimpleDocTemplate(str(path), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
                            topMargin=17 * mm, bottomMargin=18 * mm, title="Gästeguide · Chalet Michael",
                            author="Chalet Michael")
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


build(PRIVATE / "Gaesteguide_komplett.pdf", manager_story())
build(OUT / "Gaesteguide_komplett.pdf", manager_story())
print("PDFs created")
