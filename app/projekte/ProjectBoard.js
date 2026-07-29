"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  CircleUserRound,
  House,
  Pencil,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";
import styles from "./ProjectBoard.module.css";

const initialProjects = [
  { id: 1, title: "Boiler prüfen / ersetzen", category: "Wasser & Energie", timeframe: "Sofort", responsibility: "Extern", owner: "Heinz / Sanitär", cost: "Offerte", status: "In Abklärung", note: "Korrosion prüfen. Temperatur auf mindestens 55 °C prüfen; neuer Boiler möglichst mit Solaranschluss." },
  { id: 2, title: "Elektroheizungen und Timer prüfen", category: "Heizung", timeframe: "Sofort", responsibility: "Extern", owner: "Heinz", cost: "Offerte", status: "Offen", note: "Alte Elektroheizungen prüfen und sinnvolle Timer-Steuerung abklären." },
  { id: 3, title: "X-Sense Feuermelder montieren", category: "Sicherheit", timeframe: "Sofort", responsibility: "Ich", owner: "Robert", cost: "CHF 100–300", status: "Offen" },
  { id: 4, title: "Kiste für Hauptwasserhahn", category: "Wasser & Energie", timeframe: "Sofort", responsibility: "Familie", owner: "Noch zu vergeben", cost: "CHF 100–300", status: "Offen", dimensions: "50 × 70 × 25 cm" },
  { id: 5, title: "Kellerfenster isolieren", category: "Fenster & Dämmung", timeframe: "Sofort", responsibility: "Familie", owner: "Noch zu vergeben", cost: "CHF 300–1’000", status: "Offen", dimensions: "780 × 1040; 780 × 550; 750 × 640 mm" },
  { id: 6, title: "Garagendach erneuern", category: "Dach & Aussen", timeframe: "Sofort", responsibility: "Ich", owner: "Robert + Helfer", cost: "CHF 1’500–4’000", status: "Geplant", dimensions: "6750 × 3720 mm", note: "Anstrich/Primer und Bitumenbahnen; Material- und Verlegeplan festlegen." },
  { id: 7, title: "Ofen-Glastür einbauen", category: "Innenausbau", timeframe: "6–12 Monate", responsibility: "Extern", owner: "Bruno / Reno klären", cost: "Offerte", status: "In Abklärung" },
  { id: 8, title: "Fenster – Muri Fux abklären", category: "Fenster & Dämmung", timeframe: "6–12 Monate", responsibility: "Extern", owner: "Muri Fux", cost: "Offerte", status: "In Abklärung", note: "Umfang, Kontakt und Zuständigkeit noch ergänzen." },
  { id: 9, title: "Duschscheibe einbauen", category: "Bad", timeframe: "6–12 Monate", responsibility: "Extern", owner: "Noch zu vergeben", cost: "CHF 800–2’000", status: "Offen", dimensions: "1975 oder 2025 × 800 mm" },
  { id: 10, title: "Hauptwasserhähne beim Parkplatz", category: "Wasser & Energie", timeframe: "6–12 Monate", responsibility: "Extern", owner: "Sanitär", cost: "Offerte", status: "Offen", note: "Zugang und Ausführung für die Hausabsperrung klären." },
  { id: 11, title: "Kellereingang für Boilerzugang", category: "Zugang", timeframe: "6–12 Monate", responsibility: "Extern", owner: "Architekt / Baumeister", cost: "Offerte", status: "In Abklärung", note: "Prüfen, ob Aushub oder ein vergrösserter Zugang nötig ist, um einen Boiler einzubringen." },
  { id: 12, title: "Gärtner finden", category: "Garten", timeframe: "6–12 Monate", responsibility: "Extern", owner: "Noch zu vergeben", cost: "Offerte", status: "Offen" },
  { id: 13, title: "Kellerzugang rückseitig", category: "Architektur", timeframe: "Langfristig", responsibility: "Extern", owner: "Architekt", cost: "Studie", status: "Offen" },
  { id: 14, title: "Erweiterung auf der Rückseite", category: "Architektur", timeframe: "Langfristig", responsibility: "Extern", owner: "Architekt", cost: "Studie", status: "Offen" },
  { id: 15, title: "Outdoor-Sauna", category: "Aussenbereich", timeframe: "Langfristig", responsibility: "Familie", owner: "Noch zu vergeben", cost: "CHF 15’000+", status: "Offen" },
];

const contacts = [
  ["Heinz", "Elektriker gegenüber"],
  ["Bruno", "Skilehrer · möglicher Helfer"],
  ["Petra", "Ferienvermietung / Co-Host"],
  ["Rudi", "Wannihorn Ski"],
  ["Remo", "Nachbar"],
  ["Muri Fux", "Fenster · Details ergänzen"],
  ["Paul Bauer", "Historischer Kontakt · verstorben"],
];

const columns = ["Sofort", "6–12 Monate", "Langfristig"];
const responsibilities = ["Ich", "Familie", "Extern"];
const statuses = ["Offen", "In Abklärung", "Geplant", "Erledigt"];
const storageKey = "chalet-michael-projects-v2";

const blankProject = {
  title: "",
  category: "Unterhalt",
  timeframe: "Sofort",
  responsibility: "Ich",
  owner: "Robert",
  cost: "Offerte",
  status: "Offen",
  note: "",
  dimensions: "",
  reminder: "",
};

function estimate(value) {
  const match = String(value).replaceAll("’", "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export default function ProjectBoard() {
  const [projects, setProjects] = useState(initialProjects);
  const [dataState, setDataState] = useState("loading");
  const [dataMessage, setDataMessage] = useState("Gemeinsame Projekte werden geladen …");
  const [search, setSearch] = useState("");
  const [responsibility, setResponsibility] = useState("Alle");
  const [category, setCategory] = useState("Alle");
  const [editing, setEditing] = useState(null);
  const [contactsOpen, setContactsOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", { cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Projekte konnten nicht geladen werden.");

        if (result.projects) {
          if (active) {
            setProjects(result.projects);
            localStorage.setItem(storageKey, JSON.stringify(result.projects));
            setDataState("saved");
            setDataMessage("Gemeinsam gespeichert");
          }
          return;
        }

        let firstProjects = initialProjects;
        const local = localStorage.getItem(storageKey);
        if (local) firstProjects = JSON.parse(local);

        const saveResponse = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projects: firstProjects }),
        });
        const saveResult = await saveResponse.json();
        if (!saveResponse.ok) throw new Error(saveResult.error || "Projekte konnten nicht eingerichtet werden.");

        if (active) {
          setProjects(firstProjects);
          setDataState("saved");
          setDataMessage(local ? "Vorhandene Projekte wurden übernommen" : "Gemeinsam gespeichert");
        }
      } catch (error) {
        if (active) {
          setDataState("error");
          setDataMessage(error.message);
        }
      }
    }

    loadProjects();
    return () => { active = false; };
  }, []);

  async function persist(nextProjects) {
    setProjects(nextProjects);
    localStorage.setItem(storageKey, JSON.stringify(nextProjects));
    setDataState("saving");
    setDataMessage("Wird gespeichert …");

    try {
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: nextProjects }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Speichern fehlgeschlagen.");
      setDataState("saved");
      setDataMessage("Gemeinsam gespeichert");
      return true;
    } catch (error) {
      setDataState("error");
      setDataMessage(`${error.message} Lokale Sicherung vorhanden.`);
      return false;
    }
  }

  const categories = useMemo(
    () => [...new Set(projects.map(project => project.category))].sort(),
    [projects]
  );

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter(project => {
      const text = `${project.title} ${project.category} ${project.owner} ${project.note || ""}`.toLowerCase();
      return (!query || text.includes(query))
        && (responsibility === "Alle" || project.responsibility === responsibility)
        && (category === "Alle" || project.category === category);
    });
  }, [projects, search, responsibility, category]);

  const openCount = projects.filter(project => project.status !== "Erledigt").length;
  const minimumCost = projects.reduce((sum, project) => sum + estimate(project.cost), 0);

  async function saveProject(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = {
      id: editing?.id || Date.now(),
      title: data.get("title"),
      category: data.get("category"),
      timeframe: data.get("timeframe"),
      responsibility: data.get("responsibility"),
      owner: data.get("owner"),
      cost: data.get("cost"),
      status: data.get("status"),
      dimensions: data.get("dimensions"),
      reminder: data.get("reminder"),
      note: data.get("note"),
    };
    const nextProjects = editing?.id
      ? projects.map(project => project.id === editing.id ? next : project)
      : [...projects, next];
    if (await persist(nextProjects)) setEditing(null);
  }

  function toggleDone(id) {
    persist(projects.map(project =>
      project.id === id
        ? { ...project, status: project.status === "Erledigt" ? "Offen" : "Erledigt" }
        : project
    ));
  }

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <a href="/" className={styles.brand}>
          <House size={25} />
          <span><strong>Chalet Michael</strong><small>Grächen · Projektplanung</small></span>
        </a>
        <nav>
          <a href="/"><ArrowLeft size={16} /> Gästeguide</a>
          <button onClick={() => setContactsOpen(true)}><Users size={17} /> Kontakte</button>
        </nav>
      </header>

      <section className={styles.intro}>
        <div>
          <span>PROJEKTÜBERSICHT</span>
          <h1>Was steht als Nächstes an?</h1>
          <p>{openCount} offene Projekte · ab CHF {minimumCost.toLocaleString("de-CH")} grob erfasst</p>
        </div>
        <button className={styles.primary} onClick={() => setEditing({ ...blankProject })}>
          <Plus size={18} /> Projekt hinzufügen
        </button>
      </section>

      <section className={styles.filters}>
        <label className={styles.search}>
          <Search size={18} />
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Projekte durchsuchen" />
        </label>
        <label>
          <span>Verantwortung</span>
          <div><select value={responsibility} onChange={event => setResponsibility(event.target.value)}>
            <option>Alle</option>{responsibilities.map(item => <option key={item}>{item}</option>)}
          </select><ChevronDown size={16} /></div>
        </label>
        <label>
          <span>Kategorie</span>
          <div><select value={category} onChange={event => setCategory(event.target.value)}>
            <option>Alle</option>{categories.map(item => <option key={item}>{item}</option>)}
          </select><ChevronDown size={16} /></div>
        </label>
        <button className={styles.reset} onClick={() => { setSearch(""); setResponsibility("Alle"); setCategory("Alle"); }}>
          Filter zurücksetzen
        </button>
      </section>

      <section className={styles.board}>
        {columns.map((column, columnIndex) => {
          const items = visible.filter(project => project.timeframe === column);
          return <section className={`${styles.column} ${styles[`column${columnIndex}`]}`} key={column}>
            <header><div><i /><h2>{column}</h2></div><b>{items.length}</b></header>
            <div className={styles.cards}>
              {items.map(project => <article className={`${styles.card} ${project.status === "Erledigt" ? styles.done : ""}`} key={project.id}>
                <div className={styles.cardTop}>
                  <span>{project.category}</span>
                  <button onClick={() => setEditing(project)} aria-label={`${project.title} bearbeiten`}><Pencil size={15} /></button>
                </div>
                <h3>{project.title}</h3>
                {project.dimensions && <code>{project.dimensions}</code>}
                {project.note && <p>{project.note}</p>}
                <div className={styles.owner}>
                  <i>{project.responsibility.charAt(0)}</i>
                  <span><small>{project.responsibility}</small><strong>{project.owner}</strong></span>
                </div>
                <footer>
                  <span>{project.status}</span>
                  <strong>{project.cost}</strong>
                  <button className={styles.check} onClick={() => toggleDone(project.id)} aria-label="Status ändern">
                    {project.status === "Erledigt" && <Check size={16} />}
                  </button>
                </footer>
              </article>)}
              {!items.length && <p className={styles.empty}>Keine passenden Projekte</p>}
            </div>
          </section>;
        })}
      </section>

      <footer className={styles.footer}>
        <span data-state={dataState}>{dataMessage}</span>
        <button disabled={dataState === "loading" || dataState === "saving"} onClick={() => persist(initialProjects)}>Ursprungsliste wiederherstellen</button>
      </footer>

      {contactsOpen && <div className={styles.overlay} onMouseDown={() => setContactsOpen(false)}>
        <aside className={styles.drawer} onMouseDown={event => event.stopPropagation()}>
          <button className={styles.close} onClick={() => setContactsOpen(false)}><X /></button>
          <span className={styles.kicker}>GRÄCHEN</span>
          <h2>Kontakte</h2>
          <p>Telefonnummern und weitere Angaben können später ergänzt werden.</p>
          <div className={styles.contacts}>
            {contacts.map(([name, role], index) => <div className={index === contacts.length - 1 ? styles.inactive : ""} key={name}>
              <i><CircleUserRound /></i><span><strong>{name}</strong><small>{role}</small></span>
            </div>)}
          </div>
        </aside>
      </div>}

      {editing && <div className={styles.overlay} onMouseDown={() => setEditing(null)}>
        <form className={styles.modal} onSubmit={saveProject} onMouseDown={event => event.stopPropagation()}>
          <button type="button" className={styles.close} onClick={() => setEditing(null)}><X /></button>
          <span className={styles.kicker}>{editing.id ? "PROJEKT BEARBEITEN" : "NEUES PROJEKT"}</span>
          <h2>{editing.id ? editing.title : "Projekt hinzufügen"}</h2>
          <div className={styles.formGrid}>
            <label className={styles.wide}>Projekt<input required name="title" defaultValue={editing.title} /></label>
            <label>Kategorie<input required name="category" defaultValue={editing.category} /></label>
            <label>Zeitraum<select name="timeframe" defaultValue={editing.timeframe}>{columns.map(item => <option key={item}>{item}</option>)}</select></label>
            <label>Verantwortung<select name="responsibility" defaultValue={editing.responsibility}>{responsibilities.map(item => <option key={item}>{item}</option>)}</select></label>
            <label>Name<input required name="owner" defaultValue={editing.owner} /></label>
            <label>Kosten<input required name="cost" defaultValue={editing.cost} /></label>
            <label>Status<select name="status" defaultValue={editing.status}>{statuses.map(item => <option key={item}>{item}</option>)}</select></label>
            <label>Masse<input name="dimensions" defaultValue={editing.dimensions} placeholder="optional" /></label>
            <label>Erinnerungsdatum<input type="date" name="reminder" defaultValue={editing.reminder} /></label>
            <label className={styles.wide}>Notiz<textarea name="note" defaultValue={editing.note} rows="3" /></label>
          </div>
          <div className={styles.actions}>
            {editing.id && <button type="button" className={styles.delete} onClick={async () => {
              if (await persist(projects.filter(project => project.id !== editing.id))) setEditing(null);
            }}>Löschen</button>}
            <button type="button" className={styles.secondary} onClick={() => setEditing(null)}>Abbrechen</button>
            <button className={styles.primary} type="submit">Speichern</button>
          </div>
        </form>
      </div>}
    </main>
  );
}
