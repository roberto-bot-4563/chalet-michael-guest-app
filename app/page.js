"use client";

import {useState} from "react";
import {
  House, MapPin, Phone, MessageCircle, Wifi, KeyRound, Clock3, Car, Bus,
  Flame, Heater, Trash2, Coffee, BedDouble, Bath, ShoppingBasket, Croissant,
  UtensilsCrossed, Mountain, Snowflake, Compass, Navigation, ShieldCheck,
  LockKeyhole, FileDown
} from "lucide-react";

const T={
de:{
title:"Chalet Michael",subtitle:"Ihr Gästeguide",arrived:"Sie sind angekommen",
arrivedText:"Willkommen im Chalet Michael. Hier finden Sie alles, was Sie während Ihres Aufenthalts brauchen – Informationen zum Haus, zur An- und Abreise, zur unmittelbaren Umgebung und zur Region sowie den direkten Kontakt zu Petra.",
homeTitle:"Ihr Zuhause in den Walliser Alpen",homeText:"Machen Sie es sich gemütlich. Die wichtigsten Informationen für Ihren Aufenthalt sind hier übersichtlich zusammengefasst.",
facts:["4 Schlafzimmer","2 Badezimmer"],nav:["Im Chalet","An- & Abreise","Rund ums Haus","In der Region","Petra"],
inHouse:"Im Chalet",wifi:"WLAN",network:"Netzwerk",password:"Passwort",show:"Passwort anzeigen",hide:"Passwort verbergen",
kitchen:"Küche",kitchenText:"Nespresso-Kaffeemaschine mit separatem Milchaufschäumer.",
fire:"Kamin",fireText:"Feuer niemals unbeaufsichtigt lassen. Vor dem Schlafengehen vollständig erlöschen lassen; falls nötig mit Wasser löschen. Feuerholz ist im Supermarkt erhältlich.",
heat:"Heizung",heatText:"Bei Abreise alle Elektroheizkörper auf ca. 7 °C stellen. Fußbodenheizungen und Handtuchheizungen in den Badezimmern ausschalten.",
waste:"Müll & Recycling",wasteText:"Glas und PET bitte recyceln. Hausmüll ausschließlich in den offiziellen orangefarbenen Säcken entsorgen. Zusätzliche Säcke sind im Coop erhältlich.",
arrival:"An- & Abreise",address:"Adresse",addressText:"Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
key:"Schlüssel",keyText:"Bitte kontaktieren Sie Petra für die Schlüsselübergabe.",
checkout:"Check-out",checkoutText:"Check-out ist bis 10:00 Uhr. Bitte Petra wegen der Schlüsselübergabe kontaktieren.",
parking:"Parken",parkingText:"Großzügige private Parkmöglichkeiten direkt am Chalet, auch für mehrere Fahrzeuge.",
bus:"Bus nach Grächen",busText:"Die Bushaltestelle nach Grächen befindet sich praktisch direkt vor dem Haus.",
around:"Rund ums Haus",bakery:"z'Pfünderli",bakeryText:"Empfohlene Bäckerei für frisches Brot und Gebäck.",
coop:"Coop Grächen",coopText:"Für Lebensmittel, Getränke und den täglichen Einkauf. Hier erhalten Sie auch die offiziellen orangefarbenen Kehrichtsäcke.",
restaurants:"Restaurants in Grächen",restaurantText:"Träffpunkt · Piazza · Walliserkanne · Grächerhof · Bärgji-Alp",route:"Auf Karte öffnen",
region:"In der Region",regionText:"Grächen, Zermatt, Saas-Fee und die Aletsch Arena sind bequem erreichbar. Gute Ausgangspunkte für Wandern, Skifahren und Tagesausflüge.",
petra:"Petra – Ihre Ansprechpartnerin vor Ort",petraText:"Petra begleitet Check-in und Check-out und hilft Ihnen während Ihres Aufenthalts gerne weiter.",
call:"Petra anrufen",whatsapp:"WhatsApp an Petra",good:"Gut zu wissen",
rules:["Nichtraucherhaus","Keine Haustiere","Bettwäsche & Handtücher: CHF 40 pro Person","Kurtaxe separat über den Co-Host"],
pdf:"Gästeguide als PDF",manager:"Chalet Manager"
},
en:{
title:"Chalet Michael",subtitle:"Your Guest Guide",arrived:"You have arrived",
arrivedText:"Welcome to Chalet Michael. Here you will find everything you need during your stay – information about the house, arrival and departure, the immediate surroundings and region, plus direct contact with Petra.",
homeTitle:"Your home in the Valais Alps",homeText:"Make yourself comfortable. The essential information for your stay is clearly collected here.",
facts:["4 bedrooms","2 bathrooms"],nav:["At the chalet","Arrival & departure","Around the chalet","In the region","Petra"],
inHouse:"At the chalet",wifi:"Wi-Fi",network:"Network",password:"Password",show:"Show password",hide:"Hide password",
kitchen:"Kitchen",kitchenText:"Nespresso coffee machine with separate milk frother.",
fire:"Fireplace",fireText:"Never leave a fire unattended. Before bed, make sure it is fully extinguished; use water if necessary. Firewood is available at the supermarket.",
heat:"Heating",heatText:"On departure, turn all electric radiators down to about 7 °C. Switch off bathroom underfloor heating and towel heaters.",
waste:"Waste & recycling",wasteText:"Please recycle glass and PET. Household waste must only go into official orange refuse bags. Additional bags are available at Coop.",
arrival:"Arrival & departure",address:"Address",addressText:"Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
key:"Keys",keyText:"Please contact Petra for the key handover.",
checkout:"Check-out",checkoutText:"Check-out is by 10:00 am. Please contact Petra regarding the key handover.",
parking:"Parking",parkingText:"Generous private parking directly at the chalet for several vehicles.",
bus:"Bus to Grächen",busText:"The bus stop to Grächen is located almost directly outside the house.",
around:"Around the chalet",bakery:"z'Pfünderli",bakeryText:"Recommended bakery for fresh bread and pastries.",
coop:"Coop Grächen",coopText:"For groceries, drinks and everyday shopping. Official orange refuse bags are also available here.",
restaurants:"Restaurants in Grächen",restaurantText:"Träffpunkt · Piazza · Walliserkanne · Grächerhof · Bärgji-Alp",route:"Open in Maps",
region:"In the region",regionText:"Grächen, Zermatt, Saas-Fee and the Aletsch Arena are all within comfortable reach for hiking, skiing and day trips.",
petra:"Petra – your local contact",petraText:"Petra assists with check-in and check-out and is happy to help throughout your stay.",
call:"Call Petra",whatsapp:"WhatsApp Petra",good:"Good to know",
rules:["Non-smoking chalet","No pets","Bed linen & towels: CHF 40 per person","Visitor tax paid separately via the co-host"],
pdf:"Guest Guide PDF",manager:"Chalet Manager"
},
fr:{
title:"Chalet Michael",subtitle:"Votre guide",arrived:"Vous êtes arrivés",
arrivedText:"Bienvenue au Chalet Michael. Vous trouverez ici tout ce dont vous avez besoin pendant votre séjour : informations sur la maison, l’arrivée et le départ, les environs et la région, ainsi que le contact direct de Petra.",
homeTitle:"Votre maison dans les Alpes valaisannes",homeText:"Installez-vous confortablement. Les informations essentielles pour votre séjour sont réunies ici.",
facts:["4 chambres","2 salles de bain"],nav:["Au chalet","Arrivée & départ","Autour du chalet","Dans la région","Petra"],
inHouse:"Au chalet",wifi:"Wi-Fi",network:"Réseau",password:"Mot de passe",show:"Afficher",hide:"Masquer",
kitchen:"Cuisine",kitchenText:"Machine Nespresso avec mousseur à lait séparé.",
fire:"Cheminée",fireText:"Ne laissez jamais le feu sans surveillance. Avant de dormir, assurez-vous qu’il soit complètement éteint; utilisez de l’eau si nécessaire. Le bois est disponible au supermarché.",
heat:"Chauffage",heatText:"Au départ, réglez les radiateurs électriques à environ 7 °C. Éteignez le chauffage au sol et les sèche-serviettes dans les salles de bain.",
waste:"Déchets & recyclage",wasteText:"Recyclez le verre et le PET. Les déchets ménagers doivent être placés uniquement dans les sacs orange officiels, disponibles au Coop.",
arrival:"Arrivée & départ",address:"Adresse",addressText:"Chalet Michael · Salzgräbe · Riederstrasse 391 · 3925 Grächen",
key:"Clés",keyText:"Merci de contacter Petra pour la remise des clés.",
checkout:"Check-out",checkoutText:"Départ avant 10h00. Merci de contacter Petra pour la remise des clés.",
parking:"Parking",parkingText:"De nombreuses places de stationnement privées directement au chalet.",
bus:"Bus pour Grächen",busText:"L’arrêt de bus pour Grächen se trouve presque devant la maison.",
around:"Autour du chalet",bakery:"z'Pfünderli",bakeryText:"Boulangerie recommandée pour le pain frais et les pâtisseries.",
coop:"Coop Grächen",coopText:"Pour les courses quotidiennes, boissons et alimentation. Les sacs-poubelle orange officiels y sont également disponibles.",
restaurants:"Restaurants à Grächen",restaurantText:"Träffpunkt · Piazza · Walliserkanne · Grächerhof · Bärgji-Alp",route:"Ouvrir la carte",
region:"Dans la région",regionText:"Grächen, Zermatt, Saas-Fee et l’Aletsch Arena sont facilement accessibles pour la randonnée, le ski et les excursions.",
petra:"Petra – votre contact sur place",petraText:"Petra accompagne l’arrivée et le départ et reste disponible pendant votre séjour.",
call:"Appeler Petra",whatsapp:"WhatsApp Petra",good:"Bon à savoir",
rules:["Chalet non-fumeur","Animaux non admis","Linge et serviettes: CHF 40 par personne","Taxe de séjour séparée via le co-hôte"],
pdf:"Guide PDF",manager:"Chalet Manager"
}
};

const mapLinks={
 bakery:"https://www.google.com/maps/search/?api=1&query=z%27Pfuenderli+Graechen+Switzerland",
 coop:"https://www.google.com/maps/search/?api=1&query=Coop+Graechen+Switzerland",
 restaurants:"https://www.google.com/maps/search/?api=1&query=restaurants+Graechen+Switzerland",
 address:"https://www.google.com/maps/search/?api=1&query=Riederstrasse+391+3925+Graechen+Switzerland"
};

export default function Page(){
 const [lang,setLang]=useState("de"),[showPw,setShowPw]=useState(false); const t=T[lang];
 const house=[[Wifi,t.wifi,null],[Coffee,t.kitchen,t.kitchenText],[Flame,t.fire,t.fireText],[Heater,t.heat,t.heatText],[Trash2,t.waste,t.wasteText]];
 const arrival=[[MapPin,t.address,t.addressText],[KeyRound,t.key,t.keyText],[Clock3,t.checkout,t.checkoutText],[Car,t.parking,t.parkingText],[Bus,t.bus,t.busText]];
 return <main>
  <header className="guideHero">
   <img src="/chalet-front.jpeg" alt="Chalet Michael"/>
   <div className="guideShade"/>
   <div className="guideTop"><img src="/logo.png" alt="Chalet Michael"/><div className="langs">{["de","en","fr"].map(x=><button key={x} className={lang===x?"active":""} onClick={()=>setLang(x)}>{x.toUpperCase()}</button>)}</div></div>
   <div className="guideHeroText"><span>{t.subtitle}</span><h1>{t.title}</h1></div>
  </header>

  <section className="section arrived">
   <div><span className="kicker">Welcome</span><h2>{t.arrived}</h2><p>{t.arrivedText}</p><h3>{t.homeTitle}</h3><p>{t.homeText}</p>
    <div className="facts">{t.facts.map(x=><span key={x}>{x}</span>)}</div>
   </div>
   <img src="/living-fireplace.jpeg" alt="Wohnzimmer"/>
  </section>

  <nav className="guideNav section">
   {[["#house",House],["#arrival",Clock3],["#around",ShoppingBasket],["#region",Mountain],["#petra",MessageCircle]].map(([href,I],i)=><a href={href} key={href}><I/><span>{t.nav[i]}</span></a>)}
  </nav>

  <section id="house" className="darkSection"><div className="section"><span className="kicker">01</span><h2>{t.inHouse}</h2>
   <div className="guideGrid">
    <article className="infoCard wifiCard"><Wifi/><div><h3>{t.wifi}</h3><p><b>{t.network}:</b> Chalet Michael</p><p><b>{t.password}:</b> {showPw?"Stgt_4563":"•••••••••"}</p><button onClick={()=>setShowPw(!showPw)}>{showPw?t.hide:t.show}</button></div></article>
    {house.slice(1).map(([I,h,p])=><article className="infoCard" key={h}><I/><h3>{h}</h3><p>{p}</p></article>)}
   </div>
  </div></section>

  <section id="arrival" className="section"><span className="kicker">02</span><h2>{t.arrival}</h2>
   <div className="guideGrid">
    {arrival.map(([I,h,p],i)=><article className="lightCard" key={h}><I/><h3>{h}</h3><p>{p}</p>{i===0&&<a href={mapLinks.address} target="_blank" rel="noreferrer"><Navigation size={16}/>{t.route}</a>}</article>)}
   </div>
  </section>

  <section id="around" className="softSection"><div className="section"><span className="kicker">03</span><h2>{t.around}</h2>
   <div className="localCards">
    {[[Croissant,t.bakery,t.bakeryText,mapLinks.bakery],[ShoppingBasket,t.coop,t.coopText,mapLinks.coop],[UtensilsCrossed,t.restaurants,t.restaurantText,mapLinks.restaurants]].map(([I,h,p,l])=><article className="localCard" key={h}><div className="localIcon"><I/></div><div><h3>{h}</h3><p>{p}</p><a href={l} target="_blank" rel="noreferrer"><Navigation size={16}/>{t.route}</a></div></article>)}
   </div>
  </div></section>

  <section id="region" className="regionGuide"><img src="/matterhorn.jpeg" alt="Matterhorn"/><div className="regionShade"/><div className="section regionGuideText"><span className="kicker">04</span><h2>{t.region}</h2><p>{t.regionText}</p>
   <div className="regionTags"><span><MapPin/>Grächen</span><span><Mountain/>Zermatt</span><span><Snowflake/>Saas-Fee</span><span><Compass/>Aletsch Arena</span></div>
  </div></section>

  <section id="petra" className="section petraGuide"><div><span className="kicker">05</span><h2>{t.petra}</h2><p>{t.petraText}</p><div className="contactButtons"><a href="tel:+41797570753"><Phone/>{t.call}</a><a className="darkBtn" href="https://wa.me/32475320980"><MessageCircle/>{t.whatsapp}</a></div></div>
   <aside><h3>{t.good}</h3>{t.rules.map(x=><p key={x}><ShieldCheck size={18}/>{x}</p>)}</aside>
  </section>

  <footer><img src="/logo.png" alt="Chalet Michael"/><div className="footerLinks"><a href="/Chalet_Michael_Gaesteguide.pdf" target="_blank"><FileDown size={15}/>{t.pdf}</a><a href="/manager"><LockKeyhole size={15}/>{t.manager}</a></div><p>Salzgräbe · Riederstrasse 391 · 3925 Grächen · Wallis</p></footer>
 </main>
}