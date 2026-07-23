"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import styles from "../Manager.module.css";

export default function ManagerLogin() {
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

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }

      window.location.href = "/manager";
    } catch (err) {
      setError("Passwort nicht korrekt.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <LockKeyhole size={34} />
        <p className={styles.kicker}>Chalet Michael</p>
        <h1>Chalet Manager</h1>
        <p>Geschützter Bereich für Familie & Freunde</p>

        <form onSubmit={submit} className={styles.loginForm}>
          <input
            aria-label="Passwort"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button disabled={busy}>{busy ? "Bitte warten…" : "Öffnen"}</button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
        <a href="/" className={styles.backLink}>← Zurück zum Gästeguide</a>
      </section>
    </main>
  );
}