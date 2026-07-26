"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import styles from "../manager/Manager.module.css";

export default function GuideLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/manager-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!response.ok) throw new Error("Login failed");
      window.location.href = "/";
    } catch {
      setError("Passwort nicht korrekt.");
    } finally {
      setBusy(false);
    }
  }

  return <main className={styles.loginPage}>
    <section className={styles.loginCard}>
      <LockKeyhole size={34} />
      <p className={styles.kicker}>CHALET MICHAEL</p>
      <h1>Gästeguide</h1>
      <p>Dieser Bereich ist nur für Gäste, Familie und Freunde zugänglich.</p>
      <form onSubmit={submit} className={styles.loginForm}>
        <input aria-label="Passwort" type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required />
        <button disabled={busy}>{busy ? "Bitte warten…" : "Gästeguide öffnen"}</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </section>
  </main>;
}
