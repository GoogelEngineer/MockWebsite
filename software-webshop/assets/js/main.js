
(() => {
  'use strict';

  const CART_KEY = 'studio-demo-cart-v1';
  const amount = new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: 'EUR'
  });
  const price = 49;

  const readCart = () => {
    try {
      return sessionStorage.getItem(CART_KEY) === '1';
    } catch {
      return window.__demoCart === true;
    }
  };

  const writeCart = value => {
    window.__demoCart = value;
    try {
      sessionStorage.setItem(CART_KEY, value ? '1' : '0');
    } catch {
      // Browser may disable storage.
    }
    updateCart();
  };

  const announce = message => {
    const region = document.getElementById('status-live');
    if (region) region.textContent = message;
  };

  const updateCart = () => {
    const has = readCart();

    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = has ? '1' : '0';
      el.setAttribute('aria-label', has ? '1 Artikel' : '0 Artikel');
    });

    const items = document.getElementById('cart-items');
    const count = document.getElementById('summary-items');
    const total = document.getElementById('summary-total');
    const btn = document.getElementById('checkout-btn');

    if (count) count.textContent = has ? '1' : '0';
    if (total) total.textContent = amount.format(has ? price : 0);
    if (btn) btn.disabled = !has;

    if (items) {
      items.replaceChildren();

      if (!has) {
        const div = document.createElement('div');
        div.className = 'empty-cart';
        div.innerHTML = `
          <h2>Dein Warenkorb ist leer.</h2>
          <p>Du kannst das fiktive Softwareprodukt auf der Preisseite hinzufügen.</p>
          <a class="button button-primary" href="preise.html">
            Zur Preisseite <span aria-hidden="true">↗</span>
          </a>
        `;
        items.append(div);
      } else {
        const article = document.createElement('article');
        article.className = 'cart-item';
        article.innerHTML = `
          <div>
            <h2>Standardlizenz</h2>
            <p>Fiktives Projektmanagement-Produkt · Digitaler Artikel</p>
            <button type="button" class="cart-remove" id="cart-remove">
              Artikel entfernen
            </button>
          </div>
          <strong>${amount.format(price)}</strong>
        `;
        items.append(article);

        document.getElementById('cart-remove').addEventListener('click', () => {
          writeCart(false);
          announce('Artikel entfernt.');
        });
      }
    }
  };

  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      writeCart(true);
      announce('Standardlizenz zum Warenkorb hinzugefügt.');
      btn.textContent = 'Im Warenkorb ✓';
    });
  });

  const checkout = document.getElementById('checkout-btn');

  if (checkout) {
    checkout.addEventListener('click', () => {
      if (!readCart()) return;

      const out = document.getElementById('order-result');
      out.hidden = false;
      out.textContent =
        'Simulation abgeschlossen. Es wurde keine Bestellung übermittelt, kein Vertrag geschlossen und keine Zahlung ausgelöst.';

      writeCart(false);
      out.focus();
    });
  }

  const menu = document.querySelector('[data-menu-toggle]');

  if (menu) {
    const nav = document.getElementById('main-navigation');

    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        menu.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        menu.focus();
      }
    });
  }

  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let invalid = null;

      for (const input of form.querySelectorAll('[required]')) {
        const err = document.getElementById(
          input.id.replace('contact-', '') + '-error'
        );

        const good = input.validity.valid &&
          input.value.trim().length > 0;

        input.setAttribute('aria-invalid', String(!good));

        err.textContent = good
          ? ''
          : input.validity.typeMismatch
            ? 'Bitte eine gültige E-Mail-Adresse eingeben.'
            : 'Dieses Feld ist erforderlich.';

        if (!good && !invalid) invalid = input;
      }

      const status = document.getElementById('form-status');

      if (invalid) {
        status.textContent =
          'Bitte die gekennzeichneten Eingaben korrigieren.';
        invalid.focus();
        return;
      }

      status.textContent =
        'Formular erfolgreich simuliert. Es wurden keine Angaben versendet oder gespeichert.';

      form.reset();
      form.querySelectorAll('[aria-invalid]').forEach(x => {
        x.removeAttribute('aria-invalid');
      });
    });
  }

  // Produktvorschau: drei wechselbare Ansichten
  const previewPanels = [
    ...document.querySelectorAll('[data-preview-panel]')
  ];

  if (previewPanels.length) {
    let index = 0;

    const selectors = [
      ...document.querySelectorAll('[data-preview-select]')
    ];

    const counter = document.querySelector('[data-preview-counter]');
    const caption = document.querySelector('[data-preview-caption]');

    const captions = [
      'Projektübersicht',
      'Aufgaben-Board',
      'Meilensteinplan'
    ];

    const showPreview = next => {
      index = (next + previewPanels.length) % previewPanels.length;

      previewPanels.forEach((panel, i) => {
        panel.hidden = i !== index;
      });

      selectors.forEach((button, i) => {
        button.setAttribute('aria-pressed', String(i === index));
      });

      if (counter) {
        counter.textContent =
          String(index + 1).padStart(2, '0') + ' / 03';
      }

      if (caption) {
        caption.textContent =
          'ABB. ' +
          String(index + 1).padStart(2, '0') +
          ' — ' +
          captions[index] +
          ' · Illustrative Softwareoberfläche, selbst gestaltet';
      }
    };

    document.querySelector('[data-preview-prev]')
      ?.addEventListener('click', () => showPreview(index - 1));

    document.querySelector('[data-preview-next]')
      ?.addEventListener('click', () => showPreview(index + 1));

    selectors.forEach(button => {
      button.addEventListener('click', () => {
        showPreview(Number(button.dataset.previewSelect));
      });
    });

    showPreview(0);
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  updateCart();
})();
