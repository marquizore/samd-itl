import { store, QUICK_CHAT_REPLIES } from "../store.js";
import { UI } from "../components/ui.js";

export const SecurityScreens = {
  renderGuardDashboard() {
    const q = store.guardSearchQuery.toLowerCase();
    const filtered = store.guardLogs.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.detail.toLowerCase().includes(q)
    );

    const listHtml = filtered
      .map(
        (item) => `
      <li style="background:var(--color-card);padding:1rem;border-radius:1.25rem;box-shadow:var(--shadow-sm);display:flex;align-items:center;gap:1rem;">
        <div style="width:3rem;height:3rem;border-radius:0.85rem;background:var(--color-primary-light);color:var(--color-primary);display:flex;align-items:center;justify-content:center;">
          <i data-lucide="${item.category === "vehicle" ? "car" : "user"}"></i>
        </div>
        <div style="flex:1;min-width:0;">
          <h3 style="font-size:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</h3>
          <p style="font-size:0.8rem;color:var(--color-muted-foreground);">${item.time} • ${item.detail}</p>
        </div>
        <span style="padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.75rem;font-weight:700;background:${
          item.type === "entry" ? "var(--color-success-light)" : "var(--color-info-light)"
        };color:${item.type === "entry" ? "var(--color-success)" : "var(--color-info)"};">
          ${item.type === "entry" ? "Entrada" : "Salida"}
        </span>
      </li>`
      )
      .join("");

    return `
      <section class="screen screen--bg">
        <header class="screen-header screen-header--primary" style="flex-direction:column;align-items:stretch;gap:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <h1 style="font-size:1.5rem;">Panel de Seguridad</h1>
            <button type="button" class="icon-btn icon-btn--translucent" data-nav="login" aria-label="Salir">
              <i data-lucide="chevron-left"></i>
            </button>
          </div>
          <div style="position:relative;">
            <input
              type="search"
              id="guard-search-input"
              value="${store.guardSearchQuery}"
              placeholder="Buscar por nombre o control..."
              style="width:100%;padding:0.8rem 1rem 0.8rem 2.75rem;border-radius:1rem;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.12);color:#fff;font-size:0.95rem;"
            />
            <i data-lucide="search" style="position:absolute;left:0.9rem;top:50%;transform:translateY(-50%);opacity:0.7;width:1.1rem;height:1.1rem;"></i>
          </div>
        </header>

        <div class="scroll-area pb-fab">
          <h2 style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-muted-foreground);margin-bottom:0.85rem;">
            Historial de hoy
          </h2>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:0.75rem;">
            ${listHtml || `<li style="text-align:center;padding:2rem;color:var(--color-muted-foreground);">Sin coincidencias</li>`}
          </ul>
        </div>

        <button type="button" id="btn-guard-scan" class="fab" aria-label="Escanear QR manualmente">
          <i data-lucide="camera"></i>
        </button>
      </section>
    `;
  },

  renderSecureChat() {
    const messagesHtml = store.chatMessages
      .map(
        (m) => `
      <div class="chat-bubble ${m.sender === "user" ? "chat-bubble--user" : "chat-bubble--guard"}">
        ${m.text}
      </div>`
      )
      .join("");

    const chipsHtml = QUICK_CHAT_REPLIES.map(
      (reply) => `
      <button type="button" class="chip-btn" data-quick-reply="${reply}">
        ${reply}
      </button>`
    ).join("");

    return `
      <section class="screen screen--bg">
        ${UI.Header({ title: "Contacto Seguridad", backTarget: "dashboard" })}

        <div class="scroll-area" style="display:flex;flex-direction:column;gap:0.75rem;">
          ${messagesHtml}
        </div>

        <footer style="background:var(--color-card);padding:1.25rem;border-top:1px solid var(--color-muted);border-radius:1.75rem 1.75rem 0 0;">
          <p style="font-size:0.7rem;font-weight:700;text-transform:uppercase;color:var(--color-muted-foreground);margin-bottom:0.75rem;">
            Respuestas Rápidas
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            ${chipsHtml}
          </div>
        </footer>
      </section>
    `;
  },
};