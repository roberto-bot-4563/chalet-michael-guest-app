"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Droplets, Zap, ChevronDown, ChevronUp, CheckCircle2, LogOut,
  BedDouble, Bath, Sofa, UtensilsCrossed, Trash2, Footprints,
  Languages, AlertTriangle
} from "lucide-react";
import styles from "./Manager.module.css";

const COPY = {
  de: {
    subtitle: "Family & Friends",
    intro: "Dieser Bereich ist für selbständigen Check-in und Check-out durch Familie und Freunde.",
    arrival: "Ankunft – Chalet aktivieren",
    arrivalIntro: "Bei Ankunft sind Hauptwasserhahn, Heizung, Herd und Warmwasserboiler ausgeschaltet.",
    water: "1. Hauptwasser einschalten",
    waterText: "Im Keller den Raum mit dem Warmwasserboiler aufsuchen. Hinter dem Warmwasserboiler befindet sich der Hauptwasserhahn an der Wand. Diesen vollständig aufdrehen.",
    panel: "2. Sicherungskasten im Keller",
    on: "EIN",
    departure: "Haus verlassen – Checkliste",
    departureIntro: "Bitte alle Punkte erledigen, bevor die Services ausgeschaltet werden.",
    completed: "erledigt",
    shutdown: "Haus stilllegen",
    shutdownIntro: "Erst durchführen, wenn das Haus vollständig aufgeräumt und gereinigt ist.",
    complete: "Chalet vollständig geschlossen",
    reset: "Checkliste zurücksetzen",
    guide: "Zurück zum Gästeguide",
    logout: "Abmelden",
    rooms: ["Alle Schlafzimmer","Bäder","Wohnzimmer","Küche","Müll","Flur & Treppenhaus"],
    tasks: [
      ["Betten abziehen","Staubsaugen und grobe Verschmutzungen nass reinigen","Fenster schließen und Fensterläden schließen","Heizungen ausschalten"],
      ["Toiletten putzen (auch unter der Klobrille)","Waschbecken und Badewanne reinigen","Boden saugen/kehren und nass wischen","Fensterläden schließen"],
      ["Kamin reinigen, Asche draußen entsorgen","Sofa absaugen, auch dahinter reinigen","Boden saugen","Rollläden herunterlassen","WLAN/Router ausstecken"],
      ["Geschirr spülen (Töpfe, Geschirr, Spülmaschine)","Arbeitsflächen, Herd und Tisch abwischen","Boden saugen und nass wischen","Kühlschrank leeren, ausstecken und offen lassen","Geräte ausstecken (Wasserkocher, Kaffeemaschine)","Fensterläden schließen","Heizung auf ca. 10 °C stellen"],
      ["Allen Müll entsorgen","Flaschen","Papier","Restmüll"],
      ["Fegen","Groben Schmutz nass wischen","Fensterläden schließen"]
    ],
    shutdownItems: ["Hauptwasserhahn ZU","Waschmaschine ausstecken","Warmwasserboiler F18 AUS","Herd F16 AUS","Heizung S1 AUS (im Sommer)"]
  },
  en: {
    subtitle: "Family & Friends",
    intro: "This area is for independent check-in and check-out by family and friends.",
    arrival: "Arrival – activate the chalet",
    arrivalIntro: "On arrival, the main water valve, heating, stove and hot-water boiler are switched off.",
    water: "1. Turn on main water",
    waterText: "In the basement, go to the room with the hot-water boiler. The main water valve is on the wall behind the boiler. Open it fully.",
    panel: "2. Electrical panel in the basement",
    on: "ON",
    departure: "Leaving the House – Checklist",
    departureIntro: "Please complete all items before switching off the services.",
    completed: "completed",
    shutdown: "Shut down the chalet",
    shutdownIntro: "Only do this after the house has been fully tidied and cleaned.",
    complete: "Chalet fully closed",
    reset: "Reset checklist",
    guide: "Back to guest guide",
    logout: "Log out",
    rooms: ["All Bedrooms","Bathrooms","Living Room","Kitchen","Waste","Hall & Stairs"],
    tasks: [
      ["Strip beds","Vacuum and wet-clean heavy dirt","Close windows and shutters","Turn off heaters"],
      ["Clean toilets, including under the seat","Clean sink and bathtub","Vacuum/sweep and mop floor","Close shutters"],
      ["Clean fireplace and dispose of ash outside","Vacuum sofa and clean behind it","Vacuum floor","Lower shutters","Unplug Wi-Fi/router"],
      ["Wash dishes, pots and empty dishwasher","Wipe counters, stove and table","Vacuum and mop floor","Empty fridge, unplug and leave open","Unplug kettle and coffee machine","Close shutters","Set heating to about 10 °C"],
      ["Dispose of all waste","Bottles","Paper","General waste"],
      ["Sweep","Wet-clean heavy dirt","Close shutters"]
    ],
    shutdownItems: ["Main water valve CLOSED","Unplug washing machine","Hot-water boiler F18 OFF","Stove F16 OFF","Heating S1 OFF (in summer)"]
  },
  fr: {
    subtitle: "Famille & amis",
    intro: "Cet espace est destiné à l’arrivée et au départ autonomes de la famille et des amis.",
    arrival: "Arrivée – activer le chalet",
    arrivalIntro: "À l’arrivée, l’arrivée d’eau principale, le chauffage, la cuisinière et le chauffe-eau sont coupés.",
    water: "1. Ouvrir l’eau principale",
    waterText: "Au sous-sol, allez dans la pièce avec le chauffe-eau. La vanne principale se trouve sur le mur derrière le chauffe-eau. Ouvrez-la complètement.",
    panel: "2. Tableau électrique au sous-sol",
    on: "ON",
    departure: "Quitter la maison – Liste de contrôle",
    departureIntro: "Veuillez terminer tous les points avant de couper les services.",
    completed: "terminé",
    shutdown: "Mettre le chalet hors service",
    shutdownIntro: "À faire uniquement lorsque la maison est entièrement rangée et nettoyée.",
    complete: "Chalet entièrement fermé",
    reset: "Réinitialiser la liste",
    guide: "Retour au guide",
    logout: "Déconnexion",
    rooms: ["Toutes les chambres","Salles de bain","Salon","Cuisine","Déchets","Couloir & Escalier"],
    tasks: [
      ["Retirer les draps des lits","Passer l’aspirateur et nettoyer les grosses saletés","Fermer les fenêtres et les volets","Éteindre les chauffages"],
      ["Nettoyer les toilettes, y compris sous l’abattant","Nettoyer le lavabo et la baignoire","Passer l’aspirateur/balayer puis laver le sol","Fermer les volets"],
      ["Nettoyer la cheminée et jeter les cendres dehors","Passer l’aspirateur sur le canapé et derrière","Passer l’aspirateur sur le sol","Baisser les volets","Débrancher le Wi-Fi/routeur"],
      ["Laver la vaisselle, les casseroles et vider le lave-vaisselle","Essuyer les surfaces, la cuisinière et la table","Passer l’aspirateur et laver le sol","Vider le frigo, débrancher et laisser ouvert","Débrancher bouilloire et cafetière","Fermer les volets","Régler le chauffage à env. 10 °C"],
      ["Jeter tous les déchets","Bouteilles","Papier","Déchets résiduels"],
      ["Balayer","Nettoyer les grosses saletés à l’eau","Fermer les volets"]
    ],
    shutdownItems: ["Vanne d’eau principale FERMÉE","Débrancher le lave-linge","Chauffe-eau F18 OFF","Cuisinière F16 OFF","Chauffage S1 OFF (en été)"]
  }
};

const icons = [BedDouble, Bath, Sofa, UtensilsCrossed, Trash2, Footprints];

export default function ManagerClient() {
  const [lang, setLang] = useState("de");
  const [checks, setChecks] = useState({});
  const [open, setOpen] = useState(0);
  const t = COPY[lang];

  useEffect(() => {
    try {
      setChecks(JSON.parse(localStorage.getItem("cm-manager-checks") || "{}"));
    } catch {}
  }, []);

  const total = useMemo(
    () => t.tasks.flat().length + t.shutdownItems.length,
    [t]
  );
  const count = Object.values(checks).filter(Boolean).length;

  function toggle(key) {
    setChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("cm-manager-checks", JSON.stringify(next));
      return next;
    });
  }

  async function logout() {
    await fetch("/api/manager-logout", { method: "POST" });
    window.location.href = "/manager/login";
  }

  return (
    <main className={styles.manager}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Chalet Michael</p>
          <h1>Chalet Manager</h1>
          <p>{t.subtitle}</p>
          <p className={styles.intro}>{t.intro}</p>
        </div>
        <div className={styles.langs}>
          <Languages size={18} />
          {["de","en","fr"].map((code) => (
            <button
              key={code}
              className={lang === code ? styles.active : ""}
              onClick={() => setLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section className={styles.section}>
        <p className={styles.kicker}>Check-in</p>
        <h2>{t.arrival}</h2>
        <div className={styles.alert}>
          <AlertTriangle />
          <span>{t.arrivalIntro}</span>
        </div>

        <article className={styles.step}>
          <div className={styles.stepTitle}><Droplets /><h3>{t.water}</h3></div>
          <p>{t.waterText}</p>
          <a href="/manager/main-water.jpeg" target="_blank" rel="noreferrer">
            <img src="/manager/main-water.jpeg" alt="Hauptwasserhahn" />
          </a>
        </article>

        <article className={styles.step}>
          <div className={styles.stepTitle}><Zap /><h3>{t.panel}</h3></div>
          <div className={styles.switchGrid}>
            <strong>S1 <span>Heizung / Heating</span><b>{t.on}</b></strong>
            <strong>F18 <span>Warmwasser / Boiler</span><b>{t.on}</b></strong>
            <strong>F16 <span>Herd / Stove</span><b>{t.on}</b></strong>
          </div>
          <a href="/manager/electrical-panel.jpeg" target="_blank" rel="noreferrer">
            <img src="/manager/electrical-panel.jpeg" alt="Sicherungskasten" />
          </a>
        </article>
      </section>

      <section className={styles.checklistArea}>
        <div className={styles.section}>
          <p className={styles.kicker}>Check-out</p>
          <h2>{t.departure}</h2>
          <p>{t.departureIntro}</p>

          <div className={styles.progress}>
            <div style={{ width: `${(count / total) * 100}%` }} />
            <span>{count} / {total} {t.completed}</span>
          </div>

          {t.rooms.map((room, i) => {
            const Icon = icons[i];
            return (
              <article className={styles.group} key={room}>
                <button
                  className={styles.groupHead}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span><Icon />{room}</span>
                  {open === i ? <ChevronUp /> : <ChevronDown />}
                </button>

                {open === i && (
                  <div className={styles.items}>
                    {t.tasks[i].map((item, j) => {
                      const key = `c-${i}-${j}`;
                      return (
                        <label
                          key={item}
                          className={checks[key] ? styles.checked : ""}
                        >
                          <input
                            type="checkbox"
                            checked={!!checks[key]}
                            onChange={() => toggle(key)}
                          />
                          <span>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}

          <section className={styles.shutdown}>
            <h2>{t.shutdown}</h2>
            <p>{t.shutdownIntro}</p>

            {t.shutdownItems.map((item, i) => {
              const key = `s-${i}`;
              return (
                <label
                  key={item}
                  className={checks[key] ? styles.checked : ""}
                >
                  <input
                    type="checkbox"
                    checked={!!checks[key]}
                    onChange={() => toggle(key)}
                  />
                  <span>{item}</span>
                </label>
              );
            })}

            {t.shutdownItems.every((_, i) => checks[`s-${i}`]) && (
              <div className={styles.closed}>
                <CheckCircle2 /> {t.complete}
              </div>
            )}
          </section>

          <div className={styles.actions}>
            <button
              onClick={() => {
                localStorage.removeItem("cm-manager-checks");
                setChecks({});
              }}
            >
              {t.reset}
            </button>
            <a href="/">{t.guide}</a>
            <button onClick={logout}><LogOut size={16} />{t.logout}</button>
          </div>
        </div>
      </section>
    </main>
  );
}