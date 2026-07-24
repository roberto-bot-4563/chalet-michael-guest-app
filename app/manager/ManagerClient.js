"use client";
import { useState } from "react";
import { Car, KeyRound, PanelTopOpen, Droplets, Zap, Refrigerator, BedDouble, LogOut, CheckCircle2, FileDown, House } from "lucide-react";

const sections = [
 {id:"arrival", icon:Car, title:"1. Ankommen", intro:"Parken, Schlüssel holen und das Chalet öffnen.",
  steps:[
   ["Parken","Bitte rechts neben der Garage parken. Dort befinden sich die Parkplätze für das Chalet."],
   ["Schlüsselkasten","Vom Hauseingang links am Haus entlanggehen und zweimal um die Ecke, bis ihr die Terrasse erreicht. Dort hängt am Wasserabflussrohr ein Schlüsselkasten.","Code: 2901"],
   ["Schlüssel","Im Schlüsselkasten findet ihr die Schlüssel für die Holzeingangstür und die Haupteingangstür. Anschließend das Haus aufschließen."]
  ]},
 {id:"open", icon:PanelTopOpen, title:"2. Fenster & Läden öffnen", intro:"Bitte vorsichtig vorgehen – die Fenster sind älter und teilweise schwergängig.",
  steps:[
   ["Holzläden entsichern","Von außen alle Holzläden rund ums Haus entsichern."],
   ["Fenster öffnen","Von innen die Fenster im Ess- und Küchenbereich sowie im Bad-/Schlafzimmerbereich vorsichtig öffnen. Vorhänge vorher vollständig zur Seite ziehen, damit sie nicht eingeklemmt werden."],
   ["Holzläden arretieren","Alle geöffneten Holzläden außen sicher arretieren."],
   ["Wohnzimmer","Die Rollläden im Wohnzimmer können seitlich neben den Fenstern hochgezogen werden."]
  ]},
 {id:"activate", icon:Zap, title:"3. Haus in Betrieb nehmen", intro:"Wasser, Heizung, Warmwasser, Herd und Kühlschrank einschalten.",
  steps:[
   ["Hauptwasser","In den Keller in den Raum mit dem Warmwasserboiler gehen. Hinter dem Boiler befindet sich der Hauptwasserhahn an der Wand. Diesen vollständig öffnen."],
   ["Sicherungskasten","Am Sicherungskasten im Keller einschalten: S1 – Heizung EIN · F18 – Warmwasserboiler EIN · F16 – Herd EIN."],
   ["Kühlschrank","In der Küche den Kühlschrank einstecken und kurz kontrollieren, ob er läuft."]
  ]},
];

const beds = [
 ["EG – Schlafzimmer","Doppelbett 160 × 190 cm","Kissen und Decken vorhanden"],
 ["1. OG – Hinten","1 Doppelbett oder 2 Einzelbetten",""],
 ["1. OG – Familienzimmer","1 Doppelbett 140 × 200 cm","plus Stockbett: 1 Einzelbett unten + 1 Einzelbett oben"],
 ["1. OG – Cosy Bedroom","2 Einzelbetten","Matratzenmaße noch zu ergänzen"]
];

const checkout = {
 "Alle Schlafzimmer":["Betten abziehen","Staubsaugen und grobe Verschmutzungen nass reinigen","Fenster schließen und Fensterläden schließen","Heizungen ausschalten"],
 "Bäder":["Toiletten putzen – auch unter der Klobrille","Waschbecken und Badewanne reinigen","Boden saugen/kehren und nass wischen","Fensterläden schließen"],
 "Wohnzimmer":["Kamin reinigen, Asche draußen entsorgen","Sofa absaugen, auch dahinter reinigen","Boden saugen","Rollläden herunterlassen","WLAN/Router ausstecken"],
 "Küche":["Geschirr spülen – Töpfe, Geschirr und Spülmaschine","Arbeitsflächen, Herd und Tisch abwischen","Boden saugen und nass wischen","Kühlschrank leeren, ausstecken und offen lassen","Wasserkocher und Kaffeemaschine ausstecken","Fensterläden schließen","Heizung auf ca. 10 °C stellen"],
 "Müll":["Allen Müll entsorgen","Flaschen entsorgen","Papier entsorgen","Restmüll entsorgen"],
 "Flur & Treppenhaus":["Fegen","Groben Schmutz nass wischen","Fensterläden schließen"]
};

const shutdown=["Hauptwasserhahn schließen","Waschmaschine ausstecken","Warmwasserboiler F18 AUS","Herd F16 AUS","Heizung S1 AUS – im Sommer","Kühlschrank leeren, ausstecken und Tür offen lassen","WLAN-Router ausstecken","Alle Fenster schließen","Holzläden schließen und sichern","Rollläden im Wohnzimmer herunterlassen"];

export default function ManagerClient(){
 const [done,setDone]=useState({});
 const toggle=k=>setDone(v=>({...v,[k]:!v[k]}));
 return <main className="manager">
  <header className="managerHero">
   <div><span>CHALET MICHAEL</span><h1>Chalet Manager</h1><p>Check-in & Check-out</p></div>
   <div className="managerActions"><a href="/api/manager-pdf" target="_blank"><FileDown size={17}/>PDF Checkliste</a><a href="/"><House size={17}/>Gästeguide</a></div>
  </header>

  <nav className="managerNav">
   {sections.map(s=><a href={"#"+s.id} key={s.id}>{s.title}</a>)}
   <a href="#beds">4. Schlafzimmer & Betten</a><a href="#checkout">5. Abreise</a>
  </nav>

  {sections.map((s,si)=><section id={s.id} className="managerSection" key={s.id}>
   <div className="sectionHead"><s.icon/><div><span>SCHRITT {si+1}</span><h2>{s.title}</h2><p>{s.intro}</p></div></div>
   <div className="stepGrid">{s.steps.map(([h,p,b],i)=><article className="stepCard" key={h}><div className="stepNo">{i+1}</div><h3>{h}</h3><p>{p}</p>{b&&<strong className="codeBox">{b}</strong>}
   {s.id==="activate"&&i===0&&<img className="instructionPhoto" src="/main-water.jpeg" alt="Hauptwasserhahn im Boilerraum" />}
   {s.id==="activate"&&i===1&&<img className="instructionPhoto" src="/electrical-panel.jpeg" alt="Sicherungskasten im Keller" />}
   </article>)}</div>
  </section>)}

  <section id="beds" className="managerSection alt">
   <div className="sectionHead"><BedDouble/><div><span>SCHRITT 4</span><h2>Schlafzimmer & Betten</h2><p>Bettenkonfiguration für die Vorbereitung des Hauses.</p></div></div>
   <div className="bedGrid">{beds.map(([room,bed,note])=><article key={room}><h3>{room}</h3><strong>{bed}</strong>{note&&<p>{note}</p>}</article>)}</div>
  </section>

  <section id="checkout" className="managerSection">
   <div className="sectionHead"><LogOut/><div><span>SCHRITT 5</span><h2>Abreise</h2><p><b>Bitte hinterlasst das Haus so, wie ihr es vorgefunden habt.</b> Arbeitet die Checkliste vor der Abreise vollständig durch.</p></div></div>
   <div className="checkGroups">{Object.entries(checkout).map(([group,tasks])=><article key={group}><h3>{group}</h3>{tasks.map((task,i)=>{const k=group+i;return <label className={done[k]?"checked":""} key={k}><input type="checkbox" checked={!!done[k]} onChange={()=>toggle(k)}/><CheckCircle2/>{task}</label>})}</article>)}</div>

   <div className="shutdown"><h2>Zum Schluss: Haus stilllegen</h2><p>Erst durchführen, wenn das Haus vollständig aufgeräumt und gereinigt ist.</p>
   {shutdown.map((task,i)=>{const k="shutdown"+i;return <label className={done[k]?"checked":""} key={k}><input type="checkbox" checked={!!done[k]} onChange={()=>toggle(k)}/><CheckCircle2/>{task}</label>})}</div>
  </section>
 </main>
}