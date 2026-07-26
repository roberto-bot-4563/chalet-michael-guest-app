"use client";

import { useEffect, useState } from "react";
import {
  House, MapPin, Wifi, Clock3, Car, Flame, Heater, Trash2, Coffee,
  KeyRound, PanelTopOpen, Zap, Droplets, Refrigerator, BedDouble, LogOut,
  CheckCircle2, FileDown, Navigation, ShieldCheck
} from "lucide-react";

const TEXT = {
  de: {
    title: "Gästeguide", subtitle: "Chalet Michael", welcome: "Schön, dass ihr da seid.",
    intro: "Dieser Guide begleitet euch Schritt für Schritt - vom Ankommen und Öffnen des Hauses bis zum Check-out.",
    nav: ["Anreise und Haus aufschließen", "Fensterläden öffnen", "Haus in Betrieb nehmen", "Im Chalet", "Check-out & Abreise"],
    arrival: "1. Anreise", address: "Adresse", parking: "Parken", keys: "Schlüssel holen", unlock: "Haus aufschließen",
    addressText: "Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
    parkingText: "Bitte rechts neben der Garage parken. Dort befinden sich die Parkplätze für das Chalet.",
    keysText: "Vom Hauseingang links am Haus entlanggehen und zweimal um die Ecke, bis ihr die Terrasse erreicht. Dort hängt am Wasserabflussrohr ein Schlüsselkasten.",
    keyCode: "Code: 2901", unlockText: "Im Schlüsselkasten findet ihr die Schlüssel für die Holzeingangstür und die Haupteingangstür. Anschließend das Haus aufschließen.",
    windows: "2. Fensterläden öffnen", windowsIntro: "Bitte vorsichtig vorgehen - die Fenster sind älter und teilweise schwergängig.",
    windowSteps: [
      ["Holzläden entsichern", "Von außen alle Holzläden rund ums Haus entsichern."],
      ["Fenster öffnen", "Von innen die Fenster im Ess- und Küchenbereich sowie im Bad-/Schlafzimmerbereich vorsichtig öffnen. Vorhänge vorher vollständig zur Seite ziehen, damit sie nicht eingeklemmt werden."],
      ["Holzläden arretieren", "Alle geöffneten Holzläden außen sicher arretieren."],
      ["Wohnzimmer", "Die Rollläden im Wohnzimmer können seitlich neben den Fenstern hochgezogen werden."],
      ["Balkontür", "Die Balkontür kann mit dem Knopf am Türgriff entriegelt (herausziehen) und verriegelt (hineindrücken) werden."]
    ],
    activate: "3. Haus in Betrieb nehmen", activateIntro: "Zuerst Strom einschalten, danach Hauptwasser öffnen und anschließend den Kühlschrank in Betrieb nehmen.",
    electricity: "Strom anschalten (Sicherungskasten)", electricityText: "Im Keller am Sicherungskasten einschalten: S1 - Heizung EIN · F18 - Warmwasserboiler EIN · F16 - Herd EIN.",
    water: "Hauptwasser öffnen", waterSteps: [
      ["Schritt 1 - Schlüssel holen", "Im Keller das Schlüsselkästchen mit Code 391 öffnen und nur den Schlüssel für den Heizungsraum entnehmen.", "Code: 391"],
      ["Schritt 2 - Heizungsraum öffnen", "Mit dem Schlüssel den Heizungsraum öffnen.", ""],
      ["Schritt 3 - Hauptwasser öffnen", "Hinter dem Warmwasserboiler befindet sich der Hauptwasserhahn an der Wand. Diesen vollständig öffnen.", ""]
    ],
    fridge: "Kühlschrank einschalten", fridgeText: "In der Küche den Kühlschrank einstecken und kurz kontrollieren, ob er läuft.",
    chalet: "4. Im Chalet", wifi: "WLAN", network: "Netzwerk", password: "Passwort", show: "Passwort anzeigen", hide: "Passwort verbergen",
    kitchen: "Küche", kitchenText: "Eine Nespresso-Kaffeemaschine und ein separater Milchaufschäumer sind vorhanden. Alternativ befindet sich eine Filterkaffeemaschine im Regal unter der Kellertreppe.",
    fire: "Kamin", fireText: "Lasst das Feuer nie unbeaufsichtigt. Vor dem Schlafengehen bitte vollständig löschen; falls nötig mit Wasser. Feuerholz bekommt ihr im Supermarkt.",
    heat: "Heizung", heatText: "Bei der Abreise alle Elektroheizkörper auf ca. 7 °C stellen. Fußbodenheizungen und Handtuchheizungen in den Badezimmern ausschalten.",
    waste: "Müll & Recycling", wasteText: "Glas und PET bitte recyceln. Hausmüll gehört in die offiziellen orangefarbenen Säcke. Die Müll- und Recyclingstation liegt ca. 100 m die Straße hinunter, an der Kreuzung zur Straße nach Grächen.",
    beds: "Schlafzimmer & Betten",
    bedItems: [
      ["EG - Schlafzimmer", "Doppelbett 160 × 190 cm", "Zwei Kissen (80 × 40 cm) und zwei Decken (140 × 200 cm) vorhanden. Bitte Bettwäsche mitbringen oder nach Absprache. Auf keinen Fall ohne Bezüge benutzen!"],
      ["1. OG - Honeymoon Suite (am Ende des Ganges)", "1 Doppelbett (180 × 200 cm) oder 2 Einzelbetten (90 × 200 cm)", "Zwei Kissen (80 × 40 cm) und zwei Decken (140 × 200 cm) vorhanden."],
      ["1. OG - Familienzimmer", "1 Doppelbett (140 × 200 cm) und ein Stockbett", "1 Einzelbett unten und 1 Einzelbett oben, je 90 × 160 cm. Kissen (80 × 40 cm) und Decken (120 × 160 cm) vorhanden."],
      ["1. OG - Cosy Bedroom", "2 Einzelbetten (90 × 200 cm)", "Zwei Kissen (80 × 40 cm) und zwei Decken (140 × 200 cm) vorhanden."]
    ],
    departure: "5. Check-out & Abreise", departureIntro: "Bitte hinterlasst das Haus so, wie ihr es vorgefunden habt.",
    good: "Organisatorisches", goodItems: [
      "Nichtraucherhaus",
      "Keine Haustiere",
      "Bettwäsche und Handtücher: Bitte selber mitbringen oder nach Absprache.",
      "Kurtaxe: CHF 3,80 pro Person und Tag (bitte bar im Einmachglas hinterlassen)."
    ],
    checkout: "Check-out", checkoutText: "Check-out ist bis 10:00 Uhr oder nach Absprache.",
    bus: "Bus nach Grächen", busText: "Die Haltestelle liegt an der Hauptstraße nach Grächen. Der Bus ist für Bergbahnbenutzer kostenlos.",
    checklist: "Abreise-Checkliste", shutdown: "Zum Schluss: Haus stilllegen",
    shutdownIntro: "Erst durchführen, wenn das Haus vollständig aufgeräumt und gereinigt ist.",
    pdf: "Vollständiger Gästeguide als PDF"
  },
  en: {
    title: "Guest Guide", subtitle: "Chalet Michael", welcome: "It is lovely to have you here.",
    intro: "This guide takes you through your stay step by step - from arrival and opening the house to check-out.",
    nav: ["Arrival and unlock the house", "Open the shutters", "Start the house services", "At the chalet", "Check-out & departure"],
    arrival: "1. Arrival", address: "Address", parking: "Parking", keys: "Collect the keys", unlock: "Unlock the house",
    addressText: "Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
    parkingText: "Please park to the right of the garage. These are the chalet parking spaces.",
    keysText: "From the entrance, walk left along the house and around two corners to the terrace. The key box hangs on the water drainpipe.",
    keyCode: "Code: 2901", unlockText: "The key box contains keys for the wooden entrance door and the main door. Unlock the house.",
    windows: "2. Open the shutters", windowsIntro: "Please take care - the older windows can be stiff.",
    windowSteps: [
      ["Release shutters", "Release all wooden shutters from outside."],
      ["Open windows", "Carefully open the dining, kitchen, bathroom and bedroom windows from inside. Fully pull curtains aside first so they are not trapped."],
      ["Secure shutters", "Secure all open wooden shutters outside."],
      ["Living room", "Raise the living-room roller shutters using the straps beside the windows."],
      ["Balcony door", "Unlock the balcony door by pulling out the button on the door handle; lock it by pushing the button in."]
    ],
    activate: "3. Start the house services", activateIntro: "Switch on electricity first, then open the main water supply and finally start the fridge.",
    electricity: "Switch on electricity (panel)", electricityText: "In the basement switch on: S1 - heating · F18 - hot-water boiler · F16 - stove.",
    water: "Open the main water supply", waterSteps: [
      ["Step 1 - Get the key", "Open the basement key box with code 391 and take only the key for the heating room.", "Code: 391"],
      ["Step 2 - Open the heating room", "Use the key to open the heating room.", ""],
      ["Step 3 - Open the main water valve", "The main water valve is on the wall behind the hot-water boiler. Open it fully.", ""]
    ],
    fridge: "Switch on the fridge", fridgeText: "Plug in the fridge in the kitchen and check that it is running.",
    chalet: "4. At the chalet", wifi: "Wi-Fi", network: "Network", password: "Password", show: "Show password", hide: "Hide password",
    kitchen: "Kitchen", kitchenText: "A Nespresso machine and a separate milk frother are available. Alternatively, a filter coffee machine is located on the shelf beneath the basement stairs.",
    fire: "Fireplace", fireText: "Never leave the fire unattended. Extinguish it completely before bed; use water if necessary. Firewood is available at the supermarket.",
    heat: "Heating", heatText: "When leaving, set all electric radiators to about 7 °C. Switch off bathroom underfloor heating and towel heaters.",
    waste: "Waste & recycling", wasteText: "Please recycle glass and PET. Household waste goes into official orange bags. The recycling station is about 100 m down the road at the junction with the road to Grächen.",
    beds: "Bedrooms & beds", bedItems: [
      ["Ground floor bedroom", "Double bed 160 × 190 cm", "Two pillows (80 × 40 cm) and two duvets (140 × 200 cm) are provided. Please bring bed linen or arrange it in advance. Never use them without covers!"],
      ["First floor - Honeymoon Suite (at the end of the hallway)", "1 double bed (180 × 200 cm) or 2 single beds (90 × 200 cm)", "Two pillows (80 × 40 cm) and two duvets (140 × 200 cm) are provided."],
      ["First floor - family room", "1 double bed (140 × 200 cm) and a bunk bed", "One lower and one upper single bed, each 90 × 160 cm. Pillows (80 × 40 cm) and duvets (120 × 160 cm) are provided."],
      ["First floor - cosy bedroom", "2 single beds (90 × 200 cm)", "Two pillows (80 × 40 cm) and two duvets (140 × 200 cm) are provided."]
    ],
    departure: "5. Check-out & departure", departureIntro: "Please leave the house as you found it.",
    good: "Practical information", goodItems: ["Non-smoking chalet", "No pets", "Bed linen and towels: Please bring your own or arrange in advance.", "Visitor tax: CHF 3.80 per person per day (please leave cash in the preserving jar)."],
    checkout: "Check-out", checkoutText: "Check-out is by 10:00 am or by arrangement.",
    bus: "Bus to Grächen", busText: "The stop is on the main road to Grächen. The bus is free for mountain-lift users.",
    checklist: "Departure checklist", shutdown: "Finally: shut down the house", shutdownIntro: "Only do this once the house has been fully cleaned and tidied.", pdf: "Complete Guest Guide PDF"
  },
  fr: {
    title: "Guide des hôtes", subtitle: "Chalet Michael", welcome: "Nous sommes heureux de vous accueillir.",
    intro: "Ce guide vous accompagne étape par étape - de l'arrivée et l'ouverture de la maison jusqu'au départ.",
    nav: ["Arrivée et ouverture de la maison", "Ouvrir les volets", "Mettre la maison en service", "Au chalet", "Check-out et départ"],
    arrival: "1. Arrivée", address: "Adresse", parking: "Parking", keys: "Prendre les clés", unlock: "Ouvrir la maison",
    addressText: "Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
    parkingText: "Garez-vous à droite du garage, sur les places réservées au chalet.",
    keysText: "Depuis l'entrée, longez la maison par la gauche et contournez deux angles jusqu'à la terrasse. Le boîtier à clés est accroché au tuyau d'évacuation.",
    keyCode: "Code: 2901", unlockText: "Le boîtier contient les clés de la porte en bois et de la porte principale. Ouvrez ensuite la maison.",
    windows: "2. Ouvrir les volets", windowsIntro: "Attention - les anciennes fenêtres peuvent être difficiles à ouvrir.",
    windowSteps: [
      ["Déverrouiller les volets", "Déverrouillez tous les volets en bois depuis l'extérieur."],
      ["Ouvrir les fenêtres", "Ouvrez prudemment les fenêtres de la salle à manger, cuisine, salles de bain et chambres. Tirez complètement les rideaux de côté."],
      ["Fixer les volets", "Fixez tous les volets ouverts à l'extérieur."],
      ["Salon", "Montez les stores du salon à l'aide des sangles placées à côté des fenêtres."],
      ["Porte du balcon", "Déverrouillez la porte du balcon en tirant le bouton de la poignée; verrouillez-la en enfonçant le bouton."]
    ],
    activate: "3. Mettre la maison en service", activateIntro: "Allumez d'abord l'électricité, puis ouvrez l'eau principale et branchez le réfrigérateur.",
    electricity: "Allumer l'électricité (tableau)", electricityText: "Au sous-sol, allumez: S1 - chauffage · F18 - chauffe-eau · F16 - cuisinière.",
    water: "Ouvrir l'eau principale", waterSteps: [
      ["Étape 1 - Prendre la clé", "Ouvrez le boîtier à clés du sous-sol avec le code 391 et prenez uniquement la clé du local de chauffage.", "Code: 391"],
      ["Étape 2 - Ouvrir le local de chauffage", "Utilisez la clé pour ouvrir le local de chauffage.", ""],
      ["Étape 3 - Ouvrir l'arrivée d'eau", "Le robinet principal se trouve au mur derrière le chauffe-eau. Ouvrez-le complètement.", ""]
    ],
    fridge: "Brancher le réfrigérateur", fridgeText: "Branchez le réfrigérateur dans la cuisine et vérifiez qu'il fonctionne.",
    chalet: "4. Au chalet", wifi: "Wi-Fi", network: "Réseau", password: "Mot de passe", show: "Afficher", hide: "Masquer",
    kitchen: "Cuisine", kitchenText: "Une machine Nespresso et un mousseur à lait séparé sont à votre disposition. Une cafetière filtre se trouve également sur l'étagère sous l'escalier de la cave.",
    fire: "Cheminée", fireText: "Ne laissez jamais le feu sans surveillance. Éteignez-le complètement avant de dormir; utilisez de l'eau si nécessaire.",
    heat: "Chauffage", heatText: "Au départ, réglez les radiateurs électriques à environ 7 °C. Éteignez le chauffage au sol et les sèche-serviettes.",
    waste: "Déchets & recyclage", wasteText: "Recyclez le verre et le PET. Utilisez les sacs orange officiels. La station se trouve à environ 100 m en descendant la route, au croisement vers Grächen.",
    beds: "Chambres & lits", bedItems: [
      ["Chambre au rez-de-chaussée", "Lit double 160 × 190 cm", "Deux oreillers (80 × 40 cm) et deux couettes (140 × 200 cm) sont disponibles. Merci d'apporter le linge de lit ou de convenir d'une solution à l'avance. Ne jamais les utiliser sans housses !"],
      ["1er étage - Honeymoon Suite (au bout du couloir)", "1 lit double (180 × 200 cm) ou 2 lits simples (90 × 200 cm)", "Deux oreillers (80 × 40 cm) et deux couettes (140 × 200 cm) sont disponibles."],
      ["1er étage - chambre familiale", "1 lit double (140 × 200 cm) et un lit superposé", "Un lit simple en bas et un en haut, chacun de 90 × 160 cm. Oreillers (80 × 40 cm) et couettes (120 × 160 cm) disponibles."],
      ["1er étage - chambre cosy", "2 lits simples (90 × 200 cm)", "Deux oreillers (80 × 40 cm) et deux couettes (140 × 200 cm) sont disponibles."]
    ],
    departure: "5. Check-out & départ", departureIntro: "Merci de laisser la maison comme vous l'avez trouvée.",
    good: "Informations pratiques", goodItems: ["Chalet non-fumeur", "Animaux non admis", "Linge et serviettes: Merci de les apporter ou de convenir d'une solution à l'avance.", "Taxe de séjour: CHF 3,80 par personne et par jour (merci de laisser les espèces dans le bocal)."],
    checkout: "Check-out", checkoutText: "Départ avant 10h00 ou selon accord.",
    bus: "Bus pour Grächen", busText: "L'arrêt se trouve sur la route principale vers Grächen. Le bus est gratuit pour les utilisateurs des remontées mécaniques.",
    checklist: "Liste de départ", shutdown: "Enfin: arrêter la maison", shutdownIntro: "À faire uniquement lorsque la maison est propre et rangée.", pdf: "Guide complet PDF"
  }
};

const checklist = {
  de: {
    "Alle Schlafzimmer": ["Betten abziehen", "Staubsaugen und grobe Verschmutzungen nass reinigen", "Fenster und Fensterläden schließen", "Heizungen ausschalten"],
    "Bäder": ["Toiletten putzen - auch unter der Klobrille", "Waschbecken und Badewanne reinigen", "Boden saugen/kehren und nass wischen", "Fensterläden schließen"],
    "Wohnzimmer": ["Kamin reinigen und Asche draußen entsorgen", "Sofa absaugen, auch dahinter", "Boden saugen", "Rollläden herunterlassen", "WLAN/Router ausstecken"],
    "Küche": ["Geschirr spülen", "Arbeitsflächen, Herd und Tisch abwischen", "Boden saugen und nass wischen", "Kühlschrank leeren, ausstecken und offen lassen", "Wasserkocher und Kaffeemaschinen ausstecken", "Fensterläden schließen", "Heizung auf ca. 10 °C stellen"],
    "Müll": ["Allen Müll entsorgen", "Flaschen entsorgen", "Papier entsorgen", "Restmüll entsorgen"],
    "Flur & Treppenhaus": ["Fegen", "Groben Schmutz nass wischen", "Fensterläden schließen"]
  }
};

const shutdown = [
  "Hauptwasserhahn schließen", "Waschmaschine ausstecken", "Warmwasserboiler F18 AUS", "Herd F16 AUS",
  "Heizung S1 AUS - im Sommer", "Kühlschrank leeren, ausstecken und Tür offen lassen", "WLAN-Router ausstecken",
  "Alle Fenster schließen", "Holzläden schließen und sichern", "Rollläden im Wohnzimmer herunterlassen"
];

export default function GuideClient({ isAdmin = false }) {
  const [lang, setLang] = useState("de");
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState({});
  const t = TEXT[lang];
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem("guide-checks") || "{}")); } catch {} }, []);
  const toggle = key => setDone(old => {
    const next = { ...old, [key]: !old[key] };
    localStorage.setItem("guide-checks", JSON.stringify(next));
    return next;
  });

  return <main>
    <header className="guideHero">
      <img src="/chalet-front.jpeg" alt="Chalet Michael" /><div className="guideShade" />
      <div className="guideTop"><div /><div className="langs">{["de", "en", "fr"].map(code => <button key={code} className={lang === code ? "active" : ""} onClick={() => setLang(code)}>{code.toUpperCase()}</button>)}</div></div>
      <div className="guideHeroText"><span>{t.subtitle}</span><h1>{t.title}</h1></div>
    </header>

    <section className="section arrived"><div><span className="kicker">Willkommen</span><h2>{t.welcome}</h2><p>{t.intro}</p></div><img src="/living-fireplace.jpeg" alt="Wohnzimmer" /></section>
    <nav className="guideNav section">{[["#arrival", KeyRound], ["#open", PanelTopOpen], ["#activate", Zap], ["#chalet", House], ["#departure", LogOut]].map(([href, Icon], i) => <a href={href} key={href}><Icon /><span>{t.nav[i]}</span></a>)}</nav>

    <section id="arrival" className="section flowSection"><span className="kicker">01</span><h2>{t.arrival}</h2>
      <div className="timeline">
        {[[MapPin, t.address, t.addressText], [Car, t.parking, t.parkingText], [KeyRound, t.keys, t.keysText], [KeyRound, t.unlock, t.unlockText]].map(([Icon, title, text], i) => <article className="lightCard" key={title}><div className="stepNo">{i + 1}</div><Icon /><h3>{title}</h3><p>{text}</p>{i === 0 && <a href="https://www.google.com/maps/search/?api=1&query=Riederstrasse+391+3925+Graechen+Switzerland" target="_blank"><Navigation size={16} />Karte</a>}{i === 2 && <strong className="codeBox">{t.keyCode}</strong>}</article>)}
      </div>
    </section>

    <section id="open" className="softFlow"><div className="section"><span className="kicker">02</span><h2>{t.windows}</h2><p>{t.windowsIntro}</p>
      <div className="timeline">{t.windowSteps.map(([title, text], i) => <article className="lightCard" key={title}><div className="stepNo">{i + 1}</div><PanelTopOpen /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section id="activate" className="managerSection unifiedActivate"><div className="sectionHead"><Zap /><div><span>03</span><h2>{t.activate}</h2><p>{t.activateIntro}</p></div></div>
      <article className="stepCard"><div className="stepNo">1</div><h3>{t.electricity}</h3><p>{t.electricityText}</p><img className="instructionPhoto" src="/electrical-panel.jpeg" alt="Sicherungskasten" /></article>
      <article className="stepCard"><div className="stepNo">2</div><h3>{t.water}</h3><div className="substeps">{t.waterSteps.map(([title, text, code], i) => <div className="substep" key={title}><h4>{title}</h4><p>{text}</p>{code && <strong className="codeBox smallCode">{code}</strong>}<img className="instructionPhoto" src={["/key-box.jpeg", "/boiler-room.jpeg", "/main-water.jpeg"][i]} alt={title} /></div>)}</div></article>
      <article className="stepCard"><div className="stepNo">3</div><h3>{t.fridge}</h3><p>{t.fridgeText}</p></article>
    </section>

    <section id="chalet" className="chaletSection"><div className="section"><span className="kicker">04</span><h2>{t.chalet}</h2>
      <div className="guideGrid"><article className="infoCard wifiCard"><Wifi /><div><h3>{t.wifi}</h3><p><b>{t.network}:</b> Chalet Michael</p><p><b>{t.password}:</b> {showPw ? "Stgt_4563" : "•••••••••"}</p><button onClick={() => setShowPw(!showPw)}>{showPw ? t.hide : t.show}</button></div></article>
        {[[Coffee, t.kitchen, t.kitchenText], [Flame, t.fire, t.fireText], [Heater, t.heat, t.heatText], [Trash2, t.waste, t.wasteText]].map(([Icon, title, text]) => <article className="infoCard" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}
      </div>
      <h3 className="subsectionTitle"><BedDouble />{t.beds}</h3><div className="bedGrid">{t.bedItems.map(([room, bed, note]) => <article key={room}><h3>{room}</h3><strong>{bed}</strong>{note && <p>{note}</p>}</article>)}</div>
      <h3 className="subsectionTitle"><ShieldCheck />{t.good}</h3><div className="organizerList">{[`${t.bus}: ${t.busText}`, ...t.goodItems].map(item => <p key={item}><CheckCircle2 />{item}</p>)}</div>
    </div></section>

    <section id="departure" className="managerSection departureSection"><div className="sectionHead"><LogOut /><div><span>05</span><h2>{t.departure}</h2><p>{t.departureIntro}</p></div></div>
      <div className="departureIntroGrid singleCard"><article className="lightCard"><Clock3 /><h3>{t.checkout}</h3><p>{t.checkoutText}</p></article></div>
      <h3 className="subsectionTitle"><CheckCircle2 />{t.checklist}</h3>
      <div className="checkGroups">{Object.entries(checklist.de).map(([group, tasks]) => <article key={group}><h3>{group}</h3>{tasks.map((task, i) => { const key = group + i; return <label className={done[key] ? "checked" : ""} key={key}><input type="checkbox" checked={!!done[key]} onChange={() => toggle(key)} /><CheckCircle2 />{task}</label>; })}</article>)}</div>
      <div className="shutdown"><h2>{t.shutdown}</h2><p>{t.shutdownIntro}</p>{shutdown.map((task, i) => { const key = "shutdown" + i; return <label className={done[key] ? "checked" : ""} key={key}><input type="checkbox" checked={!!done[key]} onChange={() => toggle(key)} /><CheckCircle2 />{task}</label>; })}</div>
    </section>

    <footer><strong>Gästeguide · Chalet Michael</strong><div className="footerLinks"><a href="/api/manager-pdf" target="_blank"><FileDown size={15} />{t.pdf}</a>{isAdmin && <a href="/links"><KeyRound size={15} />Gästelink erstellen</a>}</div><p>Salzgräbe · Riederstrasse 391 · 3925 Grächen · Wallis</p></footer>
  </main>;
}
