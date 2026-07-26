"use client";
import { useEffect, useState } from "react";
import { Car, PanelTopOpen, Zap, BedDouble, LogOut, CheckCircle2, FileDown, House } from "lucide-react";

const sections = [
  {
    id: "arrival", icon: Car, title: "1. Ankommen",
    intro: "Parken, Schlüssel holen und das Chalet öffnen.",
    steps: [
      { title: "Parken", text: "Bitte rechts neben der Garage parken. Dort befinden sich die Parkplätze für das Chalet." },
      { title: "Schlüsselkasten am Haus", text: "Vom Hauseingang links am Haus entlanggehen und zweimal um die Ecke, bis ihr die Terrasse erreicht. Dort hängt am Wasserabflussrohr ein Schlüsselkasten.", code: "Code: 2901" },
      { title: "Haus aufschließen", text: "Im Schlüsselkasten findet ihr die Schlüssel für die Holzeingangstür und die Haupteingangstür. Anschließend das Haus aufschließen." }
    ]
  },
  {
    id: "open", icon: PanelTopOpen, title: "2. Fenster & Läden öffnen",
    intro: "Bitte vorsichtig vorgehen - die Fenster sind älter und teilweise schwergängig.",
    steps: [
      { title: "Holzläden entsichern", text: "Von außen alle Holzläden rund ums Haus entsichern." },
      { title: "Fenster öffnen", text: "Von innen die Fenster im Ess- und Küchenbereich sowie im Bad-/Schlafzimmerbereich vorsichtig öffnen. Vorhänge vorher vollständig zur Seite ziehen, damit sie nicht eingeklemmt werden." },
      { title: "Holzläden arretieren", text: "Alle geöffneten Holzläden außen sicher arretieren." },
      { title: "Wohnzimmer", text: "Die Rollläden im Wohnzimmer können seitlich neben den Fenstern hochgezogen werden." }
    ]
  },
  {
    id: "activate", icon: Zap, title: "3. Haus in Betrieb nehmen",
    intro: "Zuerst Strom einschalten, danach Hauptwasser öffnen und anschließend den Kühlschrank in Betrieb nehmen.",
    steps: [
      {
        title: "Strom anschalten (Sicherungskasten)",
        text: "In den Keller gehen und am Sicherungskasten folgende Schalter einschalten: S1 - Heizung EIN · F18 - Warmwasserboiler EIN · F16 - Herd EIN.",
        image: "/electrical-panel.jpeg", imageAlt: "Sicherungskasten im Keller"
      },
      {
        title: "Hauptwasser öffnen",
        substeps: [
          { title: "Schritt 1 - Schlüssel holen", text: "Im Keller befindet sich ein Schlüsselkästchen. Mit Code 391 öffnen und den Schlüssel für den Aufbewahrungs- und Boilerraum entnehmen.", image: "/key-box.jpeg", imageAlt: "Schlüsselkästchen im Keller", code: "Code: 391" },
          { title: "Schritt 2 - Boilerraum aufsuchen", text: "Mit dem Schlüssel den Boilerraum öffnen.", image: "/boiler-room.jpeg", imageAlt: "Boilerraum im Keller" },
          { title: "Schritt 3 - Hauptwasserhahn öffnen", text: "Hinter dem Warmwasserboiler befindet sich der Hauptwasserhahn an der Wand. Diesen vollständig öffnen.", image: "/main-water.jpeg", imageAlt: "Hauptwasserhahn hinter dem Boiler" }
        ]
      },
      { title: "Kühlschrank einschalten", text: "In der Küche den Kühlschrank einstecken und kurz kontrollieren, ob er läuft." }
    ]
  }
];

const beds = [
  ["EG - Schlafzimmer", "Doppelbett 160 × 190 cm", "Kissen und Decken vorhanden"],
  ["1. OG - Hinten", "1 Doppelbett oder 2 Einzelbetten", ""],
  ["1. OG - Familienzimmer", "1 Doppelbett 140 × 200 cm", "plus Stockbett: 1 Einzelbett unten + 1 Einzelbett oben"],
  ["1. OG - Cosy Bedroom", "2 Einzelbetten", "Matratzenmaße noch zu ergänzen"]
];

const checkout = {
  "Alle Schlafzimmer": ["Betten abziehen", "Staubsaugen und grobe Verschmutzungen nass reinigen", "Fenster schließen und Fensterläden schließen", "Heizungen ausschalten"],
  "Bäder": ["Toiletten putzen - auch unter der Klobrille", "Waschbecken und Badewanne reinigen", "Boden saugen/kehren und nass wischen", "Fensterläden schließen"],
  "Wohnzimmer": ["Kamin reinigen, Asche draußen entsorgen", "Sofa absaugen, auch dahinter reinigen", "Boden saugen", "Rollläden herunterlassen", "WLAN/Router ausstecken"],
  "Küche": ["Geschirr spülen - Töpfe, Geschirr und Spülmaschine", "Arbeitsflächen, Herd und Tisch abwischen", "Boden saugen und nass wischen", "Kühlschrank leeren, ausstecken und offen lassen", "Wasserkocher und Kaffeemaschinen ausstecken", "Fensterläden schließen", "Heizung auf ca. 10 °C stellen"],
  "Müll": ["Allen Müll entsorgen", "Flaschen entsorgen", "Papier entsorgen", "Restmüll entsorgen"],
  "Flur & Treppenhaus": ["Fegen", "Groben Schmutz nass wischen", "Fensterläden schließen"]
};

const shutdown = [
  "Hauptwasserhahn schließen", "Waschmaschine ausstecken", "Warmwasserboiler F18 AUS",
  "Herd F16 AUS", "Heizung S1 AUS - im Sommer", "Kühlschrank leeren, ausstecken und Tür offen lassen",
  "WLAN-Router ausstecken", "Alle Fenster schließen", "Holzläden schließen und sichern",
  "Rollläden im Wohnzimmer herunterlassen"
];

function StepCard({ step, index }) {
  return <article className="stepCard">
    <div className="stepNo">{index + 1}</div>
    <h3>{step.title}</h3>
    {step.text && <p>{step.text}</p>}
    {step.code && <strong className="codeBox">{step.code}</strong>}
    {step.image && <img className="instructionPhoto" src={step.image} alt={step.imageAlt || step.title} />}
    {step.substeps && <div className="substeps">
      {step.substeps.map(sub => <div className="substep" key={sub.title}>
        <h4>{sub.title}</h4><p>{sub.text}</p>
        {sub.code && <strong className="codeBox smallCode">{sub.code}</strong>}
        {sub.image && <img className="instructionPhoto" src={sub.image} alt={sub.imageAlt || sub.title} />}
      </div>)}
    </div>}
  </article>;
}

export default function ManagerClient() {
  const [done, setDone] = useState({});
  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem("chalet-manager-checks") || "{}")); } catch {}
  }, []);
  const toggle = k => setDone(v => {
    const next = { ...v, [k]: !v[k] };
    localStorage.setItem("chalet-manager-checks", JSON.stringify(next));
    return next;
  });

  return <section id="manager" className="manager">
    <header className="managerHero">
      <div><span>GÄSTEGUIDE · CHALET MICHAEL</span><h1>Chalet Manager</h1><p>Check-in & Check-out</p></div>
      <div className="managerActions"><a href="/api/manager-pdf" target="_blank"><FileDown size={17} />Kompletter Gästeguide PDF</a></div>
    </header>

    <nav className="managerNav">
      {sections.map(s => <a href={"#" + s.id} key={s.id}>{s.title}</a>)}
      <a href="#beds">4. Schlafzimmer & Betten</a><a href="#checkout">5. Abreise</a>
    </nav>

    {sections.map((s, si) => <section id={s.id} className="managerSection" key={s.id}>
      <div className="sectionHead"><s.icon /><div><span>SCHRITT {si + 1}</span><h2>{s.title}</h2><p>{s.intro}</p></div></div>
      <div className={s.id === "activate" ? "stepGrid activateGrid" : "stepGrid"}>{s.steps.map((step, i) => <StepCard key={step.title} step={step} index={i} />)}</div>
    </section>)}

    <section id="beds" className="managerSection alt">
      <div className="sectionHead"><BedDouble /><div><span>SCHRITT 4</span><h2>Schlafzimmer & Betten</h2><p>Bettenkonfiguration für die Vorbereitung des Hauses.</p></div></div>
      <div className="bedGrid">{beds.map(([room, bed, note]) => <article key={room}><h3>{room}</h3><strong>{bed}</strong>{note && <p>{note}</p>}</article>)}</div>
    </section>

    <section id="checkout" className="managerSection">
      <div className="sectionHead"><LogOut /><div><span>SCHRITT 5</span><h2>Abreise</h2><p><b>Bitte hinterlasst das Haus so, wie ihr es vorgefunden habt.</b> Arbeitet die Checkliste vor der Abreise vollständig durch.</p></div></div>
      <div className="checkGroups">{Object.entries(checkout).map(([group, tasks]) => <article key={group}><h3>{group}</h3>{tasks.map((task, i) => {
        const k = group + i;
        return <label className={done[k] ? "checked" : ""} key={k}><input type="checkbox" checked={!!done[k]} onChange={() => toggle(k)} /><CheckCircle2 />{task}</label>;
      })}</article>)}</div>
      <div className="shutdown"><h2>Zum Schluss: Haus stilllegen</h2><p>Erst durchführen, wenn das Haus vollständig aufgeräumt und gereinigt ist.</p>{shutdown.map((task, i) => {
        const k = "shutdown" + i;
        return <label className={done[k] ? "checked" : ""} key={k}><input type="checkbox" checked={!!done[k]} onChange={() => toggle(k)} /><CheckCircle2 />{task}</label>;
      })}</div>
    </section>
  </section>;
}
