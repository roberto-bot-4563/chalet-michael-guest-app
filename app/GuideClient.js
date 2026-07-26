"use client";

import { useState } from "react";
import {
  House, MapPin, Phone, MessageCircle, Wifi, KeyRound, Clock3, Car, Bus,
  Flame, Heater, Trash2, Coffee, Mountain, Snowflake, Compass, Navigation,
  ShieldCheck, LockKeyhole, FileDown
} from "lucide-react";
import ManagerClient from "./manager/ManagerClient";

const T = {
  de: {
    title: "Gästeguide", subtitle: "Chalet Michael", arrived: "Ihr seid angekommen",
    arrivedText: "Schön, dass ihr da seid. Hier findet ihr alles, was ihr für euren Aufenthalt braucht - vom WLAN und der Küche bis zur Anreise, Abreise und Petras Kontaktdaten.",
    nav: ["Im Chalet", "An- & Abreise", "In der Region", "Petra"],
    inHouse: "Im Chalet", wifi: "WLAN", network: "Netzwerk", password: "Passwort",
    show: "Passwort anzeigen", hide: "Passwort verbergen",
    kitchen: "Küche", kitchenText: "Eine Nespresso-Kaffeemaschine mit separatem Milchaufschäumer und eine Filterkaffeemaschine sind vorhanden.",
    fire: "Kamin", fireText: "Lasst das Feuer nie unbeaufsichtigt. Vor dem Schlafengehen bitte vollständig löschen; falls nötig mit Wasser. Feuerholz bekommt ihr im Supermarkt.",
    heat: "Heizung", heatText: "Bei der Abreise alle Elektroheizkörper auf ca. 7 °C stellen. Fußbodenheizungen und Handtuchheizungen in den Badezimmern ausschalten.",
    waste: "Müll & Recycling", wasteText: "Glas und PET bitte recyceln. Hausmüll gehört ausschließlich in die offiziellen orangefarbenen Säcke. Zusätzliche Säcke gibt es im Coop. Die Müll- und Recyclingstation liegt ca. 100 m die Straße hinunter, an der Kreuzung zur Straße nach Grächen.",
    arrival: "An- & Abreise", address: "Adresse", addressText: "Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
    key: "Schlüssel", keyText: "Die Schlüsselübergabe bitte direkt mit Petra abstimmen.",
    checkout: "Check-out", checkoutText: "Check-out ist bis 10:00 Uhr oder nach Absprache.",
    parking: "Parken", parkingText: "Private Parkplätze befinden sich direkt am Chalet.",
    bus: "Bus nach Grächen", busText: "Die Haltestelle liegt an der Hauptstraße nach Grächen. Der Bus ist für Bergbahnbenutzer kostenlos.",
    region: "In der Region", regionText: "Grächen, Zermatt, Saas-Fee und die Aletsch Arena sind gut erreichbar - ideal zum Wandern, Skifahren und für Tagesausflüge.",
    petra: "Petra - eure Ansprechpartnerin vor Ort", petraText: "Petra hilft euch beim Check-in und Check-out und ist während eures Aufenthalts gerne für euch da.",
    call: "Petra anrufen", whatsapp: "WhatsApp an Petra", good: "Gut zu wissen",
    rules: ["Nichtraucherhaus", "Keine Haustiere", "Bettwäsche und Handtücher: Bitte selber mitbringen oder nach Absprache.", "Kurtaxe: Normalerweise CHF 3,80 pro Person und Tag (kann bar im Einmachglas hinterlassen werden)."],
    route: "Auf Karte öffnen", pdf: "Gästeguide als PDF", manager: "Chalet Manager"
  },
  en: {
    title: "Guest Guide", subtitle: "Chalet Michael", arrived: "You have arrived",
    arrivedText: "It is lovely to have you here. This guide has everything you need for your stay - from Wi-Fi and the kitchen to arrival, departure and Petra's contact details.",
    nav: ["At the chalet", "Arrival & departure", "In the region", "Petra"],
    inHouse: "At the chalet", wifi: "Wi-Fi", network: "Network", password: "Password",
    show: "Show password", hide: "Hide password",
    kitchen: "Kitchen", kitchenText: "There is a Nespresso machine with a separate milk frother, as well as a filter coffee machine.",
    fire: "Fireplace", fireText: "Never leave the fire unattended. Before going to bed, make sure it is fully extinguished; use water if needed. Firewood is available at the supermarket.",
    heat: "Heating", heatText: "When leaving, set all electric radiators to about 7 °C. Switch off bathroom underfloor heating and towel heaters.",
    waste: "Waste & recycling", wasteText: "Please recycle glass and PET. Household waste must go into the official orange bags; extra bags are available at Coop. The waste and recycling station is about 100 m down the road, at the junction with the road to Grächen.",
    arrival: "Arrival & departure", address: "Address", addressText: "Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
    key: "Keys", keyText: "Please arrange the key handover directly with Petra.",
    checkout: "Check-out", checkoutText: "Check-out is by 10:00 am or by arrangement.",
    parking: "Parking", parkingText: "Private parking is available directly at the chalet.",
    bus: "Bus to Grächen", busText: "The stop is on the main road to Grächen. The bus is free for mountain-lift users.",
    region: "In the region", regionText: "Grächen, Zermatt, Saas-Fee and the Aletsch Arena are within easy reach for hiking, skiing and day trips.",
    petra: "Petra - your local contact", petraText: "Petra helps with check-in and check-out and is happy to assist during your stay.",
    call: "Call Petra", whatsapp: "WhatsApp Petra", good: "Good to know",
    rules: ["Non-smoking chalet", "No pets", "Bed linen and towels: Please bring your own or arrange in advance.", "Visitor tax: Normally CHF 3.80 per person per day (cash may be left in the preserving jar)."],
    route: "Open in Maps", pdf: "Guest Guide PDF", manager: "Chalet Manager"
  },
  fr: {
    title: "Guide des hôtes", subtitle: "Chalet Michael", arrived: "Vous êtes arrivés",
    arrivedText: "Nous sommes heureux de vous accueillir. Vous trouverez ici tout ce dont vous avez besoin pendant votre séjour - Wi-Fi, cuisine, arrivée, départ et coordonnées de Petra.",
    nav: ["Au chalet", "Arrivée & départ", "Dans la région", "Petra"],
    inHouse: "Au chalet", wifi: "Wi-Fi", network: "Réseau", password: "Mot de passe",
    show: "Afficher", hide: "Masquer",
    kitchen: "Cuisine", kitchenText: "Une machine Nespresso avec mousseur à lait séparé et une cafetière filtre sont à votre disposition.",
    fire: "Cheminée", fireText: "Ne laissez jamais le feu sans surveillance. Avant de dormir, éteignez-le complètement; utilisez de l'eau si nécessaire. Le bois est disponible au supermarché.",
    heat: "Chauffage", heatText: "Au départ, réglez les radiateurs électriques à environ 7 °C. Éteignez le chauffage au sol et les sèche-serviettes dans les salles de bain.",
    waste: "Déchets & recyclage", wasteText: "Recyclez le verre et le PET. Les déchets ménagers doivent être placés dans les sacs orange officiels; des sacs supplémentaires sont disponibles au Coop. La station de déchets et de recyclage se trouve à environ 100 m en descendant la route, au croisement avec la route de Grächen.",
    arrival: "Arrivée & départ", address: "Adresse", addressText: "Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
    key: "Clés", keyText: "Merci d'organiser la remise des clés directement avec Petra.",
    checkout: "Check-out", checkoutText: "Départ avant 10h00 ou selon accord.",
    parking: "Parking", parkingText: "Des places privées se trouvent directement au chalet.",
    bus: "Bus pour Grächen", busText: "L'arrêt se trouve sur la route principale vers Grächen. Le bus est gratuit pour les utilisateurs des remontées mécaniques.",
    region: "Dans la région", regionText: "Grächen, Zermatt, Saas-Fee et l'Aletsch Arena sont facilement accessibles pour la randonnée, le ski et les excursions.",
    petra: "Petra - votre contact sur place", petraText: "Petra vous aide pour l'arrivée et le départ et reste disponible pendant votre séjour.",
    call: "Appeler Petra", whatsapp: "WhatsApp Petra", good: "Bon à savoir",
    rules: ["Chalet non-fumeur", "Animaux non admis", "Linge et serviettes: Merci de les apporter ou de convenir d'une solution à l'avance.", "Taxe de séjour: En général CHF 3,80 par personne et par jour (à laisser en espèces dans le bocal)."],
    route: "Ouvrir la carte", pdf: "Guide PDF", manager: "Chalet Manager"
  }
};

const addressMap = "https://www.google.com/maps/search/?api=1&query=Riederstrasse+391+3925+Graechen+Switzerland";

export default function Page() {
  const [lang, setLang] = useState("de");
  const [showPw, setShowPw] = useState(false);
  const t = T[lang];

  const house = [
    [Coffee, t.kitchen, t.kitchenText],
    [Flame, t.fire, t.fireText],
    [Heater, t.heat, t.heatText],
    [Trash2, t.waste, t.wasteText]
  ];
  const arrival = [
    [MapPin, t.address, t.addressText],
    [KeyRound, t.key, t.keyText],
    [Clock3, t.checkout, t.checkoutText],
    [Car, t.parking, t.parkingText],
    [Bus, t.bus, t.busText]
  ];

  return <main>
    <header className="guideHero">
      <img src="/chalet-front.jpeg" alt="Chalet Michael" />
      <div className="guideShade" />
      <div className="guideTop">
        <span className="wordmark">Chalet Michael</span>
        <div className="langs">
          {["de", "en", "fr"].map(x => <button key={x} className={lang === x ? "active" : ""} onClick={() => setLang(x)}>{x.toUpperCase()}</button>)}
        </div>
      </div>
      <div className="guideHeroText"><span>{t.subtitle}</span><h1>{t.title}</h1></div>
    </header>

    <section className="section arrived">
      <div><span className="kicker">Willkommen</span><h2>{t.arrived}</h2><p>{t.arrivedText}</p></div>
      <img src="/living-fireplace.jpeg" alt="Wohnzimmer im Chalet Michael" />
    </section>

    <nav className="guideNav section">
      {[["#house", House], ["#arrival", Clock3], ["#region", Mountain], ["#petra", MessageCircle]].map(([href, Icon], i) =>
        <a href={href} key={href}><Icon /><span>{t.nav[i]}</span></a>
      )}
    </nav>

    <section id="house" className="darkSection"><div className="section">
      <span className="kicker">01</span><h2>{t.inHouse}</h2>
      <div className="guideGrid">
        <article className="infoCard wifiCard"><Wifi /><div><h3>{t.wifi}</h3><p><b>{t.network}:</b> Chalet Michael</p><p><b>{t.password}:</b> {showPw ? "Stgt_4563" : "•••••••••"}</p><button onClick={() => setShowPw(!showPw)}>{showPw ? t.hide : t.show}</button></div></article>
        {house.map(([Icon, h, p]) => <article className="infoCard" key={h}><Icon /><h3>{h}</h3><p>{p}</p></article>)}
      </div>
    </div></section>

    <section id="arrival" className="section">
      <span className="kicker">02</span><h2>{t.arrival}</h2>
      <div className="guideGrid">
        {arrival.map(([Icon, h, p], i) => <article className="lightCard" key={h}><Icon /><h3>{h}</h3><p>{p}</p>{i === 0 && <a href={addressMap} target="_blank" rel="noreferrer"><Navigation size={16} />{t.route}</a>}</article>)}
      </div>
    </section>

    <section id="region" className="regionGuide">
      <img src="/matterhorn.jpeg" alt="Matterhorn" /><div className="regionShade" />
      <div className="section regionGuideText"><span className="kicker">03</span><h2>{t.region}</h2><p>{t.regionText}</p>
        <div className="regionTags"><span><MapPin />Grächen</span><span><Mountain />Zermatt</span><span><Snowflake />Saas-Fee</span><span><Compass />Aletsch Arena</span></div>
      </div>
    </section>

    <section id="petra" className="section petraGuide">
      <div><span className="kicker">04</span><h2>{t.petra}</h2><p>{t.petraText}</p>
        <div className="contactButtons"><a href="tel:+41797570753"><Phone />{t.call}</a><a className="darkBtn" href="https://wa.me/32475320980"><MessageCircle />{t.whatsapp}</a></div>
      </div>
      <aside><h3>{t.good}</h3>{t.rules.map(x => <p key={x}><ShieldCheck size={18} />{x}</p>)}</aside>
    </section>

    <ManagerClient />

    <footer>
      <strong>Gästeguide · Chalet Michael</strong>
      <div className="footerLinks"><a href="/api/manager-pdf" target="_blank"><FileDown size={15} />{t.pdf}</a></div>
      <p>Salzgräbe · Riederstrasse 391 · 3925 Grächen · Wallis</p>
    </footer>
  </main>;
}
