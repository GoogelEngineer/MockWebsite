
(() => {
  'use strict';

  const KEY = 'modernplan-demo-consent-v1';

  // CSS automatisch auf jeder Seite einbinden
  const style = document.createElement('style');
  style.textContent = `
    .consent-banner[hidden] {
      display: none !important;
    }

    .consent-banner {
      position: fixed;
      inset: auto 0 0;
      z-index: 10000;
      max-height: 85vh;
      overflow-y: auto;
      background: #fff;
      color: #18263e;
      border-top: 2px solid #263b5b;
      box-shadow: 0 -6px 26px rgba(17,24,39,.16);
    }

    .consent-inner {
      width: min(1100px, calc(100% - 32px));
      margin: auto;
      padding: 24px 0;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 24px;
    }

    .consent-copy h2 {
      font-size: 1.2rem;
      margin: 0 0 12px;
    }

    .consent-copy p {
      font-size: .9rem;
      line-height: 1.6;
      margin: 0 0 12px;
    }

    .consent-choice {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      cursor: pointer;
    }

    .consent-choice input {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      accent-color: #263b5b;
    }

    .consent-buttons {
      display: grid;
      grid-template-columns: repeat(2, minmax(145px, 1fr));
      gap: 10px;
    }

    .consent-button {
      min-height: 48px;
      padding: 12px 16px;
      background: #263b5b;
      color: #fff;
      border: 2px solid #263b5b;
      border-radius: 4px;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .consent-button-secondary {
      grid-column: 1 / -1;
      background: #fff;
      color: #263b5b;
    }

    .consent-button:focus-visible,
    .consent-choice input:focus-visible,
    .consent-footer-link:focus-visible {
      outline: 3px solid #d76541;
      outline-offset: 3px;
    }

    .consent-footer-link {
      background: none;
      border: none;
      padding: 0;
      color: inherit;
      font: inherit;
      text-decoration: underline;
      cursor: pointer;
    }

    @media (max-width: 800px) {
      .consent-inner {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 400px) {
      .consent-buttons {
        grid-template-columns: 1fr;
      }

      .consent-button-secondary {
        grid-column: auto;
      }
    }
  `;
  document.head.append(style);

  // Auswahl lesen und speichern
  function readConsent() {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // Speicherung im Browser nicht verfügbar.
    }
  }

  // Dialog erzeugen
  const banner = document.createElement('section');
  banner.id = 'consent-banner';
  banner.className = 'consent-banner';
  banner.setAttribute('aria-labelledby', 'consent-title');
  banner.hidden = true;

  banner.innerHTML = `
    <div class="consent-inner">
      <div class="consent-copy">
        <h2 id="consent-title">
          Datenschutz-Einstellungen
        </h2>

        <p>
          Diese Website verwendet lokalen Sitzungsspeicher.
          Sie können zusätzlich zu
          einer fiktiven Website-Analyse zustimmen.
        </p>

        <label class="consent-choice">
          <input type="checkbox" id="consent-analytics">
          Analyse-Simulation erlauben
        </label>

        <p>
          Ihre Auswahl wird lokal gespeichert und kann
          jederzeit geändert werden.
          Weitere Informationen finden Sie in der
          <a href="datenschutz.html">Datenschutzerklärung</a>.
        </p>
      </div>

      <div class="consent-buttons">
        <button type="button"
                class="consent-button"
                id="consent-reject">
          Alle ablehnen
        </button>

        <button type="button"
                class="consent-button"
                id="consent-accept">
          Alle akzeptieren
        </button>

        <button type="button"
                class="consent-button consent-button-secondary"
                id="consent-save">
          Auswahl speichern
        </button>
      </div>
    </div>
  `;

  document.body.append(banner);

  const analytics = document.getElementById('consent-analytics');
  const reject = document.getElementById('consent-reject');
  const accept = document.getElementById('consent-accept');
  const save = document.getElementById('consent-save');

  let returnFocus = null;

  function openSettings() {
    returnFocus = document.activeElement;
    analytics.checked = readConsent() === 'accepted';
    banner.hidden = false;
    reject.focus();
  }

  function closeSettings(value) {
    saveConsent(value);
    banner.hidden = true;

    // Nur simulierte Einstellung, kein echtes Tracking
    window.modernPlanDemoAnalyticsAllowed =
      value === 'accepted';

    if (returnFocus && returnFocus.isConnected) {
      returnFocus.focus();
    }
  }

  reject.addEventListener('click', () => {
    closeSettings('rejected');
  });

  accept.addEventListener('click', () => {
    closeSettings('accepted');
  });

  save.addEventListener('click', () => {
    closeSettings(
      analytics.checked ? 'accepted' : 'rejected'
    );
  });

  // Änderungsmöglichkeit automatisch im Footer ergänzen
  const footer = document.querySelector('.footer-bottom');

  if (footer) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'consent-footer-link';
    button.textContent = 'Datenschutz-Einstellungen';

    button.addEventListener('click', openSettings);
    footer.append(button);
  }

  // Beim ersten Besuch anzeigen
  const stored = readConsent();

  window.modernPlanDemoAnalyticsAllowed =
    stored === 'accepted';

  if (stored !== 'accepted' && stored !== 'rejected') {
    openSettings();
  }
})();
