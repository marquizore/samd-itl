export const UI = {
  Button({ id = "", text, variant = "primary", icon = "", between = false, type = "button", className = "" }) {
    const layoutClass = between ? "btn--between" : "";
    const iconHtml = icon ? `<i data-lucide="${icon}"></i>` : "";
    return `
      <button type="${type}" ${id ? `id="${id}"` : ""} class="btn btn--${variant} ${layoutClass} ${className}">
        <span>${text}</span>
        ${iconHtml}
      </button>
    `;
  },

  Input({ id, label = "", placeholder = "", type = "text", value = "", helperText = "" }) {
    return `
      <div class="form-group">
        ${label ? `<label for="${id}" class="form-label">${label}</label>` : ""}
        <input
          id="${id}"
          name="${id}"
          type="${type}"
          placeholder="${placeholder}"
          value="${value}"
          class="form-control"
        />
        ${helperText ? `<p class="helper-text">${helperText}</p>` : ""}
      </div>
    `;
  },

  Select({ id, label = "", value = "", options = [], helperText = "" }) {
    const optionsHtml = options
      .map(
        (opt) =>
          `<option value="${opt.value}" ${opt.value === value ? "selected" : ""}>${opt.label}</option>`
      )
      .join("");

    return `
      <div class="form-group">
        ${label ? `<label for="${id}" class="form-label">${label}</label>` : ""}
        <div class="select-wrapper">
          <select id="${id}" name="${id}" class="form-control">
            <option value="" disabled ${!value ? "selected" : ""}>Selecciona una opción</option>
            ${optionsHtml}
          </select>
          <span class="select-icon"><i data-lucide="chevron-down"></i></span>
        </div>
        ${helperText ? `<p class="helper-text">${helperText}</p>` : ""}
      </div>
    `;
  },

  Header({ title, subtitle = "", backTarget, variant = "light", rightHtml = "" }) {
    if (variant === "transparent") {
      return `
        <header class="screen-header screen-header--transparent">
          <button type="button" class="icon-btn icon-btn--translucent" data-nav="${backTarget}" aria-label="Volver">
            <i data-lucide="chevron-left"></i>
          </button>
          ${rightHtml}
        </header>
      `;
    }

    if (variant === "primary") {
      return `
        <header class="screen-header screen-header--primary">
          <div>
            <button type="button" data-nav="${backTarget}" style="background:none;border:none;color:rgba(255,255,255,0.8);display:flex;align-items:center;gap:0.25rem;cursor:pointer;margin-bottom:0.5rem;font-weight:600;">
              <i data-lucide="chevron-left"></i> Volver
            </button>
            <h1 style="font-size:1.75rem;">${title}</h1>
            ${subtitle ? `<p style="opacity:0.85;font-size:0.9rem;margin-top:0.25rem;">${subtitle}</p>` : ""}
          </div>
          ${rightHtml}
        </header>
      `;
    }

    return `
      <header class="screen-header">
        <button type="button" class="icon-btn" data-nav="${backTarget}" aria-label="Volver">
          <i data-lucide="chevron-left"></i>
        </button>
        <div style="flex:1;">
          <h1 style="font-size:1.35rem;color:var(--color-primary);">${title}</h1>
          ${subtitle ? `<p style="font-size:0.8rem;color:var(--color-muted-foreground);">${subtitle}</p>` : ""}
        </div>
        ${rightHtml}
      </header>
    `;
  },
};