"use client";

import {useState} from "react";
import {
  House, Mountain, UtensilsCrossed, MessageCircle, Wifi, Car, Bus, Flame,
  MapPin, Phone, BedDouble, Bath, Users, ChevronRight, Trees, Coffee,
  Snowflake, Compass, Clock3, ShieldCheck, KeyRound, Trash2, Heater,
  ShoppingBasket, Croissant
} from "lucide-react";

const T = {
de:{
 eyebrow:"Willkommen im", title:"Chalet Michael",
 subtitle:"Großzügiger Alpenrückzugsort mit Garten & Bergpanorama",
 introTitle:"Ein Ort zum Ankommen",
 intro:"Chalet Michael verbindet den authentischen Charakter der 1970er Jahre mit modernem Komfort. Besonders angenehm für Familien und kleinere Gruppen von 4–6 Personen, mit viel Raum, Privatsphäre und Ruhe.",
 sections:["Das Chalet","Entdecken","Genießen","Petra"],
 quick:["200 m² Wohnfläche","4 Schlafzimmer","2 Badezimmer","Bis zu 10 Gäste"],
 chaletTitle:"Ihr Zuhause in den Walliser Alpen",
 chaletText:"Großzügige Wohnbereiche, eine offene Küche, viel Holz, ein markanter Kamin und ein weitläufiger Garten schaffen eine warme, entspannte Atmosphäre.",
 guestTitle:"Wichtige Gästeinformationen",
 check:"Check-out", checktxt:"Bis 10:00 Uhr. Bitte Petra wegen der Schlüsselübergabe kontaktieren.",
 key:"Schlüssel", keytxt:"Bitte kontaktieren Sie Petra für die Schlüsselübergabe.",
 parking:"Parken", parkingtxt:"Großzügige private Parkmöglichkeiten direkt am Chalet, auch für mehrere Fahrzeuge.",
 bus:"Bus nach Grächen", bustxt:"Die Bushaltestelle nach Grächen befindet sich praktisch direkt vor dem Haus.",
 wifi:"WLAN", network:"Netzwerk", password:"Passwort", show:"Passwort anzeigen", hide:"Passwort verbergen",
 waste:"Müll & Recycling", wastetxt:"Glas und PET bitte recyceln. Hausmüll darf ausschließlich in den offiziellen orangefarbenen Säcken entsorgt werden. Zusätzliche Säcke sind im Coop erhältlich.",
 heat:"Heizung bei Abreise", heattxt:"Alle Elektroheizkörper auf ca. 7 °C stellen. Fußbodenheizungen und Handtuchheizungen in den Badezimmern ausschalten.",
 fire:"Kamin", firetxt:"Feuer niemals unbeaufsichtigt lassen. Vor dem Schlafengehen vollständig erlöschen lassen; falls nötig mit Wasser löschen. Feuerholz ist im Supermarkt erhältlich.",
 kitchen:"Küche", kitchentxt:"Nespresso-Kaffeemaschine mit separatem Milchaufschäumer.",
 gallery:"Einblicke ins Chalet",
 regionTitle:"Die Region entdecken",
 regionText:"Grächen, Zermatt, Saas-Fee und die Aletsch Arena liegen in komfortabler Reichweite. Wandern, Skifahren und alpine Tagesausflüge beginnen praktisch vor der Haustür.",
 enjoyTitle:"Genießen & Einkaufen",
 bakery:"z'Pfünderli", bakerytxt:"Unsere Bäckerei-Empfehlung für frisches Brot und Gebäck – perfekt fürs Frühstück im Chalet.",
 coop:"Coop Grächen", cooptxt:"Für Lebensmittel, Getränke und den täglichen Einkauf. Hier erhalten Sie auch die offiziellen orangefarbenen Kehrichtsäcke.",
 restaurants:"Restaurants", restauranttxt:"Unsere Auswahl für Grächen: Träffpunkt, Piazza, Walliserkanne, Grächerhof und Bärgji-Alp.",
 petraTitle:"Persönlich betreut von Petra",
 petraText:"Petra empfängt Sie persönlich, begleitet Check-in und Check-out und steht während des Aufenthalts mit regionalen Tipps und praktischer Hilfe zur Seite.",
 call:"Petra anrufen", whatsapp:"WhatsApp an Petra",
 rulesTitle:"Gut zu wissen",
 rules:["Nichtraucherhaus","Keine Haustiere","Bettwäsche & Handtücher: CHF 40 pro Person","Kurtaxe separat über den Co-Host","Persönlicher Check-in"]
},
en:{
 eyebrow:"Welcome to", title:"Chalet Michael",
 subtitle:"A spacious alpine retreat with garden & mountain views",
 introTitle:"A place to settle in",
 intro:"Chalet Michael combines authentic 1970s character with modern comfort. It is especially well suited to families and smaller groups of 4–6 guests who value space, privacy and tranquillity.",
 sections:["The Chalet","Explore","Enjoy","Petra"],
 quick:["200 m² living space","4 bedrooms","2 bathrooms","Up to 10 guests"],
 chaletTitle:"Your home in the Valais Alps",
 chaletText:"Generous living areas, an open kitchen, warm timber interiors, a striking fireplace and a large garden create a relaxed, welcoming atmosphere.",
 guestTitle:"Essential guest information",
 check:"Check-out", checktxt:"By 10:00 am. Please contact Petra regarding the key handover.",
 key:"Keys", keytxt:"Please contact Petra for the key handover.",
 parking:"Parking", parkingtxt:"Generous private parking directly at the chalet for several vehicles.",
 bus:"Bus to Grächen", bustxt:"The bus stop to Grächen is located almost directly outside the house.",
 wifi:"Wi-Fi", network:"Network", password:"Password", show:"Show password", hide:"Hide password",
 waste:"Waste & recycling", wastetxt:"Please recycle glass and PET. Household waste must only be placed in official orange refuse bags. Additional bags are available at Coop.",
 heat:"Heating on departure", heattxt:"Turn all electric radiators down to about 7 °C. Switch off bathroom underfloor heating and towel heaters.",
 fire:"Fireplace", firetxt:"Never leave a fire unattended. Before bed, make sure it is fully extinguished; use water if necessary. Firewood is available at the supermarket.",
 kitchen:"Kitchen", kitchentxt:"Nespresso coffee machine with separate milk frother.",
 gallery:"Inside Chalet Michael",
 regionTitle:"Discover the region",
 regionText:"Grächen, Zermatt, Saas-Fee and the Aletsch Arena are all within comfortable reach. Hiking, skiing and alpine day trips begin almost at the doorstep.",
 enjoyTitle:"Enjoy & shop",
 bakery:"z'Pfünderli", bakerytxt:"Our bakery recommendation for fresh bread and pastries – perfect for breakfast at the chalet.",
 coop:"Coop Grächen", cooptxt:"For groceries, drinks and everyday shopping. Official orange refuse bags are also available here.",
 restaurants:"Restaurants", restauranttxt:"Our Grächen shortlist: Träffpunkt, Piazza, Walliserkanne, Grächerhof and Bärgji-Alp.",
 petraTitle:"Personally hosted by Petra",
 petraText:"Petra welcomes you in person, assists with check-in and check-out, and remains available throughout your stay with local tips and practical help.",
 call:"Call Petra", whatsapp:"WhatsApp Petra",
 rulesTitle:"Good to know",
 rules:["Non-smoking chalet","No pets","Bed linen & towels: CHF 40 per person","Visitor tax paid separately","Personal check-in"]
},
fr:{
 eyebrow:"Bienvenue au", title:"Chalet Michael",
 subtitle:"Un refuge alpin spacieux avec jardin & vue sur les montagnes",
 introTitle:"Un lieu où se poser",
 intro:"Chalet Michael associe le charme authentique des années 1970 au confort moderne. Il convient particulièrement aux familles et aux petits groupes de 4 à 6 personnes qui apprécient l’espace, l’intimité et le calme.",
 sections:["Le chalet","Découvrir","Profiter","Petra"],
 quick:["200 m² habitables","4 chambres","2 salles de bain","Jusqu’à 10 personnes"],
 chaletTitle:"Votre maison dans les Alpes valaisannes",
 chaletText:"De grands espaces de vie, une cuisine ouverte, des boiseries chaleureuses, une cheminée remarquable et un vaste jardin créent une atmosphère accueillante et détendue.",
 guestTitle:"Informations essentielles",
 check:"Check-out", checktxt:"Avant 10h00. Merci de contacter Petra pour la remise des clés.",
 key:"Clés", keytxt:"Merci de contacter Petra pour la remise des clés.",
 parking:"Parking", parkingtxt:"De nombreuses places de stationnement privées directement au chalet.",
 bus:"Bus pour Grächen", bustxt:"L’arrêt de bus pour Grächen se trouve presque devant la maison.",
 wifi:"Wi-Fi", network:"Réseau", password:"Mot de passe", show:"Afficher", hide:"Masquer",
 waste:"Déchets & recyclage", wastetxt:"Recyclez le verre et le PET. Les déchets ménagers doivent être placés uniquement dans les sacs orange officiels, disponibles au Coop.",
 heat:"Chauffage au départ", heattxt:"Réglez les radiateurs électriques à environ 7 °C. Éteignez le chauffage au sol et les sèche-serviettes dans les salles de bain.",
 fire:"Cheminée", firetxt:"Ne laissez jamais le feu sans surveillance. Avant de dormir, assurez-vous qu’il soit complètement éteint; utilisez de l’eau si nécessaire. Le bois est disponible au supermarché.",
 kitchen:"Cuisine", kitchentxt:"Machine Nespresso avec mousseur à lait séparé.",
 gallery:"Aperçu du chalet",
 regionTitle:"Découvrir la région",
 regionText:"Grächen, Zermatt, Saas-Fee et l’Aletsch Arena sont facilement accessibles. Randonnées, ski et excursions alpines commencent presque devant la porte.",
 enjoyTitle:"Profiter & faire ses courses",
 bakery:"z'Pfünderli", bakerytxt:"Notre boulangerie recommandée pour le pain frais et les pâtisseries – idéale pour le petit-déjeuner.",
 coop:"Coop Grächen", cooptxt:"Pour les courses quotidiennes, boissons et alimentation. Les sacs-poubelle orange officiels y sont également disponibles.",
 restaurants:"Restaurants", restauranttxt:"Notre sélection à Grächen : Träffpunkt, Piazza, Walliserkanne, Grächerhof et Bärgji-Alp.",
 petraTitle:"Accueil personnel par Petra",
 petraText:"Petra vous accueille personnellement, accompagne l’arrivée et le départ et reste disponible pendant tout le séjour avec ses conseils régionaux.",
 call:"Appeler Petra", whatsapp:"WhatsApp Petra",
 rulesTitle:"Bon à savoir",
 rules:["Chalet non-fumeur","Animaux non admis","Linge et serviettes: CHF 40 par personne","Taxe de séjour séparée","Accueil personnel"]
}
};

const gallery = [
 ["/living-fireplace.jpeg","Living room"],
 ["/kitchen-wide.jpeg","Kitchen"],
 ["/terrace.jpeg","Terrace"],
 ["/bedroom-large.jpeg","Bedroom"],
 ["/bathroom-red.jpeg","Bathroom"],
 ["/chalet-terrace.jpeg","Chalet"]
];

export default function Page(){
 const [lang,setLang]=useState("de");
 const [showPw,setShowPw]=useState(false);
 const t=T[lang];

 return <main>
  <section className="hero">
   <img src="/chalet-front.jpeg" className="heroImage" alt="Chalet Michael"/>
   <div className="shade"/>
   <div className="topbar">
    <img src="/logo.png" className="logo" alt="Chalet Michael"/>
    <div className="langs">
     {["de","en","fr"].map(x=><button key={x} onClick={()=>setLang(x)} className={lang===x?"active":""}>{x.toUpperCase()}</button>)}
    </div>
   </div>
   <div className="heroContent">
    <p>{t.eyebrow}</p><h1>{t.title}</h1><h2>{t.subtitle}</h2>
    <a href="#intro" className="primary">Explore <ChevronRight size={18}/></a>
   </div>
  </section>

  <section id="intro" className="section intro">
   <div><span className="kicker">Chalet Michael</span><h2>{t.introTitle}</h2><p>{t.intro}</p></div>
   <div className="quickGrid">
    {[House,BedDouble,Bath,Users].map((I,i)=><article key={i}><I/><strong>{t.quick[i]}</strong></article>)}
   </div>
  </section>

  <section className="section navTiles">
   {[
    [House,t.sections[0],"#guest","/living-room.jpeg"],
    [Mountain,t.sections[1],"#region","/mountain-view.jpeg"],
    [UtensilsCrossed,t.sections[2],"#enjoy","/kitchen-bar.jpeg"],
    [MessageCircle,t.sections[3],"#petra","/terrace.jpeg"]
   ].map(([I,label,href,img],i)=>
    <a key={i} href={href} className="tile" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.62)),url(${img})`}}>
     <I/><strong>{label}</strong>
    </a>
   )}
  </section>

  <section className="section split">
   <img src="/living-fireplace.jpeg" alt="Wohnzimmer"/>
   <div><span className="kicker">Chalet</span><h2>{t.chaletTitle}</h2><p>{t.chaletText}</p>
    <div className="featureList"><span><Flame/>Kamin</span><span><Trees/>Garten</span><span><Car/>Parking</span><span><Wifi/>Wi-Fi</span></div>
   </div>
  </section>

  <section id="guest" className="guest">
   <div className="section">
    <span className="kicker">Guest Guide</span><h2>{t.guestTitle}</h2>
    <div className="wifiCard">
      <Wifi/><div><h3>{t.wifi}</h3><p><b>{t.network}:</b> Chalet Michael</p><p><b>{t.password}:</b> {showPw?"Stgt_4563":"•••••••••"}</p>
      <button onClick={()=>setShowPw(!showPw)}>{showPw?t.hide:t.show}</button></div>
    </div>
    <div className="infoGrid">
     {[
      [Clock3,t.check,t.checktxt],[KeyRound,t.key,t.keytxt],[Car,t.parking,t.parkingtxt],[Bus,t.bus,t.bustxt],
      [Trash2,t.waste,t.wastetxt],[Heater,t.heat,t.heattxt],[Flame,t.fire,t.firetxt],[Coffee,t.kitchen,t.kitchentxt]
     ].map(([I,h,p],i)=><article key={i}><I/><h3>{h}</h3><p>{p}</p></article>)}
    </div>
   </div>
  </section>

  <section className="section">
   <span className="kicker">Galerie</span><h2>{t.gallery}</h2>
   <div className="gallery">{gallery.map(([img,alt],i)=><img key={i} src={img} alt={alt}/>)}</div>
  </section>

  <section id="region" className="region">
   <img src="/matterhorn.jpeg" alt="Matterhorn"/>
   <div className="regionShade"/>
   <div className="regionCopy"><span className="kicker">Wallis</span><h2>{t.regionTitle}</h2><p>{t.regionText}</p>
    <div className="regionTags"><span><MapPin/>Grächen</span><span><Mountain/>Zermatt</span><span><Snowflake/>Saas-Fee</span><span><Compass/>Aletsch Arena</span></div>
   </div>
  </section>

  <section id="enjoy" className="section">
   <span className="kicker">Local</span><h2>{t.enjoyTitle}</h2>
   <div className="enjoyGrid">
    <article><img src="/kitchen-wide.jpeg"/><div><Croissant/><h3>{t.bakery}</h3><p>{t.bakerytxt}</p></div></article>
    <article><img src="/terrace.jpeg"/><div><ShoppingBasket/><h3>{t.coop}</h3><p>{t.cooptxt}</p></div></article>
    <article><img src="/kitchen-bar.jpeg"/><div><UtensilsCrossed/><h3>{t.restaurants}</h3><p>{t.restauranttxt}</p></div></article>
   </div>
  </section>

  <section id="petra" className="petra">
   <div className="section petraGrid">
    <div><span className="kicker">Co-Host</span><h2>{t.petraTitle}</h2><p>{t.petraText}</p>
     <div className="buttons">
      <a href="tel:+41797570753"><Phone size={18}/>{t.call}</a>
      <a className="secondary" href="https://wa.me/32475320980"><MessageCircle size={18}/>{t.whatsapp}</a>
     </div>
    </div>
    <div className="rules"><h3>{t.rulesTitle}</h3>{t.rules.map((r,i)=><p key={i}><ShieldCheck size={18}/>{r}</p>)}</div>
   </div>
  </section>

  <footer><img src="/logo.png" alt="Chalet Michael"/><p>Salzgräbe · Riederstrasse 391 · 3925 Grächen · Wallis</p></footer>
 </main>
}