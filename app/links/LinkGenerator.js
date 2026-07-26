"use client";

import { useState } from "react";
import { Copy, Mail, MessageCircle, Send, ArrowLeft, Link2 } from "lucide-react";
import styles from "../manager/Manager.module.css";

export default function LinkGenerator() {
  const [label, setLabel] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function create(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/create-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, expiresAt: new Date(`${expiresAt}T23:59:59`).toISOString() })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Link konnte nicht erstellt werden.");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const message = result ? `Hallo, hier ist euer persönlicher Gästeguide für Chalet Michael:\n${result.url}\nDer Link ist bis ${new Date(result.expiresAt).toLocaleDateString("de-CH")} gültig.` : "";
  const encoded = encodeURIComponent(message);

  async function copy(text) {
    await navigator.clipboard.writeText(text);
  }

  return <main className={styles.linkPage}>
    <section className={styles.linkCard}>
      <a href="/" className={styles.backLink}><ArrowLeft size={16} /> Zurück zum Gästeguide</a>
      <Link2 size={34} />
      <p className={styles.kicker}>CHALET MICHAEL</p>
      <h1>Gästelink erstellen</h1>
      <p>Der Gast wird beim Öffnen automatisch angemeldet. Der Link funktioniert in WhatsApp, Telegram und E-Mail.</p>
      <form onSubmit={create} className={styles.loginForm}>
        <label>Name oder Buchung
          <input value={label} onChange={e => setLabel(e.target.value)} placeholder="z. B. Familie Meier" required />
        </label>
        <label>Gültig bis einschließlich
          <input type="date" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} required />
        </label>
        <button disabled={busy}>{busy ? "Link wird erstellt…" : "Persönlichen Link erstellen"}</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {result && <div className={styles.linkResult}>
        <strong>Link ist fertig</strong>
        <input readOnly value={result.url} />
        <button onClick={() => copy(result.url)}><Copy size={17} /> Link kopieren</button>
        <div className={styles.shareButtons}>
          <a href={`https://wa.me/?text=${encoded}`} target="_blank"><MessageCircle size={17} />WhatsApp</a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(result.url)}&text=${encodeURIComponent(message.replace(result.url, ""))}`} target="_blank"><Send size={17} />Telegram</a>
          <a href={`mailto:?subject=${encodeURIComponent("Gästeguide Chalet Michael")}&body=${encoded}`}><Mail size={17} />E-Mail</a>
        </div>
        <small>Einladungs-ID: {result.inviteId}</small>
      </div>}
    </section>
  </main>;
}
