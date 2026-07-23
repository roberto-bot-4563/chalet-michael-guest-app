"use client";
import {useState} from "react";
import {Wifi,MapPin,Clock3,KeyRound,Trash2,Flame,Heater,Coffee,Phone,MessageCircle,ShoppingBasket,Croissant,UtensilsCrossed,ChevronDown,ShieldCheck} from "lucide-react";

const D={
de:{
 title:"Chalet Michael",sub:"Ihr digitaler Gästeguide",guest:"Informationen für Gäste",
 addr:"Adresse & Anreise",address:"Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
 check:"Check-out",checktxt:"Check-out ist bis 10:00 Uhr. Bitte kontaktieren Sie Petra wegen der Schlüsselübergabe.",
 key:"Schlüssel",keytxt:"Bitte kontaktieren Sie Petra für die Schlüsselübergabe.",
 wifi:"WLAN",net:"Netzwerk",pw:"Passwort",show:"Passwort anzeigen",hide:"Passwort verbergen",
 waste:"Müll & Recycling",wastetxt:"Bitte Abfälle nach den örtlichen Regeln entsorgen. Glas und PET-Flaschen bitte recyceln. Hausmüll darf ausschließlich in den offiziellen orangefarbenen Säcken entsorgt werden. Zusätzliche Säcke sind im Coop erhältlich.",
 heat:"Heizung bei Abreise",heattxt:"Alle Elektroheizkörper auf die Mindesttemperatur von ca. 7 °C stellen. Fußbodenheizungen und Handtuchheizungen in den Badezimmern ausschalten.",
 fire:"Kamin",firetxt:"Feuer niemals unbeaufsichtigt lassen. Vor dem Schlafengehen vollständig erlöschen lassen; falls erforderlich mit Wasser löschen. Feuerholz ist im Supermarkt erhältlich.",
 kitchen:"Küche",kitchentxt:"Nespresso-Kaffeemaschine mit separatem Milchaufschäumer.",
 petra:"Petra – Ihre Co-Hostin",petratxt:"Petra empfängt Sie persönlich und steht während des Aufenthalts mit praktischer Hilfe und regionalen Tipps zur Verfügung.",
 call:"Petra anrufen",wa:"WhatsApp an Petra",
 enjoy:"Einkaufen & Genießen",bakery:"z'Pfünderli",bakerytxt:"Unsere Bäckerei-Empfehlung für frisches Brot und Gebäck – perfekt fürs Frühstück im Chalet.",
 coop:"Coop Grächen",cooptxt:"Für Lebensmittel, Getränke und den täglichen Einkauf. Hier erhalten Sie auch die offiziellen orangefarbenen Kehrichtsäcke.",
 food:"Restaurants",foodtxt:"Unsere Auswahl für Grächen: Träffpunkt, Piazza, Walliserkanne, Grächerhof und Bärgji-Alp.",
 note:"Bitte beachten",rules:"Nichtraucherhaus · Keine Haustiere · Bettwäsche & Handtücher CHF 40 pro Person · Kurtaxe separat über den Co-Host."
},
en:{
 title:"Chalet Michael",sub:"Your digital guest guide",guest:"Guest information",
 addr:"Address & arrival",address:"Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
 check:"Check-out",checktxt:"Check-out is by 10:00 am. Please contact Petra regarding the key handover.",
 key:"Keys",keytxt:"Please contact Petra for the key handover.",
 wifi:"Wi-Fi",net:"Network",pw:"Password",show:"Show password",hide:"Hide password",
 waste:"Waste & recycling",wastetxt:"Please dispose of waste according to local rules. Recycle glass and PET bottles. Household waste must only be placed in official orange refuse bags. Additional bags are available at Coop.",
 heat:"Heating on departure",heattxt:"Turn all electric radiators down to the minimum temperature of about 7 °C. Switch off bathroom underfloor heating and towel heaters.",
 fire:"Fireplace",firetxt:"Never leave a fire unattended. Before going to bed, make sure it is fully extinguished; use water if necessary. Firewood is available at the supermarket.",
 kitchen:"Kitchen",kitchentxt:"Nespresso coffee machine with separate milk frother.",
 petra:"Petra – your co-host",petratxt:"Petra welcomes you personally and is available throughout your stay with practical help and local recommendations.",
 call:"Call Petra",wa:"WhatsApp Petra",
 enjoy:"Shopping & dining",bakery:"z'Pfünderli",bakerytxt:"Our bakery recommendation for fresh bread and pastries – perfect for breakfast at the chalet.",
 coop:"Coop Grächen",cooptxt:"For groceries, drinks and everyday shopping. Official orange refuse bags are also available here.",
 food:"Restaurants",foodtxt:"Our Grächen shortlist: Träffpunkt, Piazza, Walliserkanne, Grächerhof and Bärgji-Alp.",
 note:"Please note",rules:"Non-smoking chalet · No pets · Bed linen & towels CHF 40 per person · Visitor tax paid separately via the co-host."
},
fr:{
 title:"Chalet Michael",sub:"Votre guide numérique",guest:"Informations pour les hôtes",
 addr:"Adresse & arrivée",address:"Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
 check:"Check-out",checktxt:"Le départ est prévu avant 10h00. Merci de contacter Petra pour la remise des clés.",
 key:"Clés",keytxt:"Merci de contacter Petra pour la remise des clés.",
 wifi:"Wi-Fi",net:"Réseau",pw:"Mot de passe",show:"Afficher le mot de passe",hide:"Masquer le mot de passe",
 waste:"Déchets & recyclage",wastetxt:"Merci de respecter les règles locales. Recyclez le verre et les bouteilles PET. Les déchets ménagers doivent être placés uniquement dans les sacs orange officiels, disponibles au Coop.",
 heat:"Chauffage au départ",heattxt:"Réglez tous les radiateurs électriques à la température minimale d’environ 7 °C. Éteignez le chauffage au sol et les sèche-serviettes dans les salles de bain.",
 fire:"Cheminée",firetxt:"Ne laissez jamais le feu sans surveillance. Avant de dormir, assurez-vous qu’il soit complètement éteint; utilisez de l’eau si nécessaire. Le bois est disponible au supermarché.",
 kitchen:"Cuisine",kitchentxt:"Machine Nespresso avec mousseur à lait séparé.",
 petra:"Petra – votre co-hôte",petratxt:"Petra vous accueille personnellement et reste disponible pendant votre séjour pour vous aider et partager ses conseils locaux.",
 call:"Appeler Petra",wa:"WhatsApp Petra",
 enjoy:"Courses & plaisirs",bakery:"z'Pfünderli",bakerytxt:"Notre boulangerie recommandée pour le pain frais et les pâtisseries – idéale pour le petit-déjeuner.",
 coop:"Coop Grächen",cooptxt:"Pour les courses quotidiennes, boissons et alimentation. Les sacs-poubelle orange officiels y sont également disponibles.",
 food:"Restaurants",foodtxt:"Notre sélection à Grächen : Träffpunkt, Piazza, Walliserkanne, Grächerhof et Bärgji-Alp.",
 note:"À savoir",rules:"Chalet non-fumeur · Animaux non admis · Linge et serviettes CHF 40 par personne · Taxe de séjour séparée via le co-hôte."
}};

const items=(t)=>[
 [MapPin,t.addr,t.address],[Clock3,t.check,t.checktxt],[KeyRound,t.key,t.keytxt],
 [Trash2,t.waste,t.wastetxt],[Heater,t.heat,t.heattxt],[Flame,t.fire,t.firetxt],[Coffee,t.kitchen,t.kitchentxt]
];

export default function Page(){
 const [lang,setLang]=useState("de"); const [showPw,setShowPw]=useState(false); const t=D[lang];
 return <main>
  <header><div><small>CHALET MICHAEL</small><h1>{t.title}</h1><p>{t.sub}</p></div>
   <nav>{["de","en","fr"].map(x=><button className={x===lang?"on":""} onClick={()=>setLang(x)} key={x}>{x.toUpperCase()}</button>)}</nav>
  </header>
  <section className="wrap">
   <h2>{t.guest}</h2>
   <div className="wifi card"><Wifi/><div><h3>{t.wifi}</h3><p><b>{t.net}:</b> Chalet Michael</p><p><b>{t.pw}:</b> {showPw?"Stgt_4563":"•••••••••"}</p><button onClick={()=>setShowPw(!showPw)}>{showPw?t.hide:t.show}</button></div></div>
   <div className="grid">{items(t).map(([Icon,h,p],i)=><article className="card" key={i}><Icon/><h3>{h}</h3><p>{p}</p></article>)}</div>
  </section>
  <section className="petra">
   <div className="wrap two"><div><small>CO-HOST</small><h2>{t.petra}</h2><p>{t.petratxt}</p>
    <div className="buttons"><a href="tel:+41797570753"><Phone/>{t.call}</a><a className="dark" href="https://wa.me/32475320980"><MessageCircle/>{t.wa}</a></div>
   </div><div className="notice"><ShieldCheck/><h3>{t.note}</h3><p>{t.rules}</p></div></div>
  </section>
  <section className="wrap"><h2>{t.enjoy}</h2><div className="grid three">
   <article className="card"><Croissant/><h3>{t.bakery}</h3><p>{t.bakerytxt}</p></article>
   <article className="card"><ShoppingBasket/><h3>{t.coop}</h3><p>{t.cooptxt}</p></article>
   <article className="card"><UtensilsCrossed/><h3>{t.food}</h3><p>{t.foodtxt}</p></article>
  </div></section>
  <footer>Chalet Michael · Grächen · Wallis</footer>
 </main>
}