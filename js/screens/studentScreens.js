import {
  store,
  AUTH_CREDENTIALS,
  VEHICLE_TYPE_OPTIONS,
  GUEST_RELATIONSHIP_OPTIONS,
} from "../store.js";
import { UI } from "../components/ui.js";

export const StudentScreens = {
  renderLogin() {
    return `
      <section class="screen screen--white scroll-area" style="justify-content:space-between;padding:2rem;">
        <header style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;">
          <h1 style="font-size:2.75rem;color:var(--color-primary);line-height:1.05;">SAMD<br/>ITL</h1>
          <div style="width:4.5rem;height:4.5rem;border:1px solid var(--color-muted);border-radius:1rem;padding:0.4rem;display:flex;align-items:center;justify-content:center;">
            <img src="./assets/tec.png" alt="Logo ITL" style="max-width:100%;max-height:100%;object-fit:contain;" onerror="this.outerHTML='<strong style=color:var(--color-primary)>ITL</strong>'" />
          </div>
        </header>

        <form id="login-form" novalidate>
          ${UI.Input({ id: "login-control", label: "Número de Control", placeholder: "Introduce tu No. de Control" })}
          ${UI.Input({ id: "login-password", label: "Contraseña", placeholder: "Ingresa tu contraseña", type: "password" })}

          <aside style="background:var(--color-background);padding:1rem 1.25rem;border-radius:var(--radius-2xl);font-size:0.85rem;margin-bottom:1rem;">
            <p style="font-weight:700;color:var(--color-primary);">Credencial de prueba</p>
            <p>No. de Control: <strong>${AUTH_CREDENTIALS.controlNumber}</strong></p>
            <p>Contraseña: <strong>${AUTH_CREDENTIALS.password}</strong></p>
          </aside>

          ${
            store.loginError
              ? `<p role="alert" style="background:var(--color-danger-light);color:var(--color-danger);padding:0.75rem 1rem;border-radius:1rem;font-size:0.85rem;font-weight:600;margin-bottom:1rem;">${store.loginError}</p>`
              : ""
          }

          ${UI.Button({ text: "Ingresar", type: "submit", variant: "primary" })}
        </form>

        <footer style="display:flex;flex-direction:column;gap:0.75rem;align-items:center;margin-top:1.5rem;">
          <button type="button" data-nav="visitor" style="background:none;border:none;color:var(--color-primary);text-decoration:underline;font-weight:600;cursor:pointer;">
            ¿Eres externo? Registra tu visita aquí
          </button>
          <button type="button" data-nav="guard_dashboard" style="background:none;border:none;color:var(--color-muted-foreground);font-weight:600;cursor:pointer;">
            Acceso para Guardias de Seguridad
          </button>
        </footer>
      </section>
    `;
  },

  renderDashboard() {
    const s = store.student;
    const fullName = `${s.firstName} ${s.lastNamePaternal} ${s.lastNameMaternal}`.trim();

    return `
      <section class="screen screen--bg">
        <header style="padding:1.75rem 1.75rem 1.25rem;background:var(--color-card);border-radius:0 0 2rem 2rem;display:flex;justify-content:space-between;align-items:center;box-shadow:var(--shadow-sm);position:relative;z-index:30;">
          <h1 style="font-size:1.5rem;color:var(--color-primary);">Bienvenido,<br/>${s.firstName}</h1>
          <nav style="position:relative;">
            <button type="button" id="btn-toggle-menu" class="icon-btn" aria-label="Menú">
              <i data-lucide="menu"></i>
            </button>
            ${
              store.isMenuOpen
                ? `
              <div style="position:absolute;top:110%;right:0;background:var(--color-card);border-radius:1rem;box-shadow:var(--shadow-xl);border:1px solid var(--color-muted);width:11rem;overflow:hidden;z-index:50;">
                <button type="button" id="btn-logout" style="width:100%;text-align:left;padding:0.85rem 1rem;background:none;border:none;color:var(--color-danger);font-weight:700;cursor:pointer;">
                  Cerrar sesión
                </button>
              </div>`
                : ""
            }
          </nav>
        </header>

        <div class="scroll-area pb-fab">
          <article class="student-card">
            <div class="student-card__header">
              <div class="avatar-box">
                ${
                  s.photoUrl
                    ? `<img src="${s.photoUrl}" alt="${fullName}" />`
                    : `<i data-lucide="user" style="width:2rem;height:2rem;"></i>`
                }
              </div>
              <div style="width:3rem;height:3rem;background:#fff;border-radius:0.75rem;display:flex;align-items:center;justify-content:center;color:var(--color-primary);font-weight:800;font-size:0.75rem;">
                ITL
              </div>
            </div>

            <span class="badge-pill">ESTUDIANTE</span>

            <div>
              <p style="font-size:0.65rem;opacity:0.8;text-transform:uppercase;font-weight:700;">Nombre</p>
              <p style="font-size:1.1rem;font-weight:700;margin-bottom:1rem;">${fullName}</p>
              <div style="display:flex;justify-content:space-between;align-items:flex-end;">
                <div>
                  <p style="font-size:0.65rem;opacity:0.8;text-transform:uppercase;font-weight:700;">Carrera</p>
                  <p style="font-size:0.85rem;font-weight:600;">${s.career}</p>
                </div>
                <div style="text-align:right;">
                  <p style="font-size:0.65rem;opacity:0.8;text-transform:uppercase;font-weight:700;">No. Control</p>
                  <p style="font-size:1.1rem;font-weight:700;">${s.controlNumber}</p>
                </div>
              </div>
            </div>
          </article>

          <nav style="display:flex;flex-direction:column;gap:0.85rem;">
            <div data-nav="qr_pedestrian">${UI.Button({ text: "Registrar ingreso/salida peatonal", variant: "secondary", icon: "arrow-right", between: true })}</div>
            <div data-nav="generate_id">${UI.Button({ text: "Generar Credencial Virtual", variant: "secondary", icon: "arrow-right", between: true })}</div>
            <div data-nav="generate_event">${UI.Button({ text: "Generar evento", variant: "secondary", icon: "calendar-days", between: true })}</div>
            <div data-nav="register_vehicle">${UI.Button({ text: "Registrar Vehículo", variant: "primary", icon: "car", between: true })}</div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-top:0.5rem;">
              <div data-nav="success_entry">${UI.Button({ text: "Test Entry", variant: "success" })}</div>
              <div data-nav="success_exit">${UI.Button({ text: "Test Exit", variant: "info" })}</div>
            </div>

            <div style="display:flex;justify-content:center;margin-top:1rem;">
              <button type="button" id="btn-panic" class="btn btn--danger" style="width:13rem;">
                Botón de Pánico
              </button>
            </div>
          </nav>
        </div>

        <button type="button" class="fab" data-nav="secure_chat" aria-label="Chat Seguro con Guardia">
          <i data-lucide="message-square"></i>
        </button>

        ${
          store.panicAlertVisible
            ? `
          <aside role="alert" class="panic-toast">
            <h3 style="font-size:1.25rem;margin-bottom:0.25rem;">¡Alerta enviada!</h3>
            <p style="font-size:0.85rem;opacity:0.92;">Se ha notificado a la caseta de vigilancia. Mantente en un lugar seguro.</p>
          </aside>`
            : ""
        }
      </section>
    `;
  },

  renderRegisterVehicle() {
    const activeVehicle =
      store.vehicles.find((v) => v.id === store.activeVehicleId) || store.vehicles[0];

    const tabsHtml =
      store.vehicles.length > 1
        ? `
      <nav style="display:flex;gap:0.5rem;padding:0.75rem 1.5rem 0;overflow-x:auto;">
        ${store.vehicles
          .map(
            (v, idx) => `
          <button type="button" class="chip-btn" data-vehicle-tab="${v.id}" style="${
              v.id === activeVehicle.id ? "background:var(--color-primary);color:#fff;" : ""
            }">
            Vehículo ${idx + 1}
          </button>`
          )
          .join("")}
      </nav>`
        : "";

    const thumbsHtml = [0, 1, 2, 3]
      .map((index) => {
        const photoUrl = activeVehicle.photos[index];
        if (photoUrl) {
          return `
            <figure class="thumb-box">
              <img src="${photoUrl}" alt="Foto vehículo ${index + 1}" />
              <button type="button" class="delete-badge" data-remove-vphoto="${index}" aria-label="Eliminar foto">
                <i data-lucide="x" style="width:0.75rem;height:0.75rem;"></i>
              </button>
            </figure>`;
        }
        return `
          <div class="thumb-box">
            <i data-lucide="image" style="color:var(--color-muted-foreground);opacity:0.4;"></i>
          </div>`;
      })
      .join("");

    return `
      <section class="screen screen--bg">
        ${UI.Header({ title: "Mis Vehículos", backTarget: "dashboard" })}
        ${tabsHtml}

        <div class="scroll-area">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <button type="button" id="btn-add-vehicle" class="chip-btn" style="background:var(--color-primary);color:#fff;display:inline-flex;align-items:center;gap:0.35rem;">
              <i data-lucide="plus" style="width:1rem;height:1rem;"></i> Agregar vehículo
            </button>
            ${
              store.vehicles.length > 1
                ? `<button type="button" id="btn-delete-vehicle" style="background:none;border:none;color:var(--color-danger);font-weight:600;cursor:pointer;">Eliminar</button>`
                : ""
            }
          </div>

          <form id="vehicle-form">
            ${UI.Select({
              id: "v-tipo",
              label: "Tipo de Vehículo",
              value: activeVehicle.tipo,
              options: VEHICLE_TYPE_OPTIONS,
              helperText: "Opciones: Coche, Camioneta, Moto, Bicicleta y Monopatín Eléctrico.",
            })}
            ${UI.Input({ id: "v-marca", label: "Marca", placeholder: "Ej. Nissan", value: activeVehicle.marca })}
            ${UI.Input({ id: "v-modelo", label: "Modelo", placeholder: "Ej. Versa 2020", value: activeVehicle.modelo })}
            ${UI.Input({ id: "v-color", label: "Color", placeholder: "Ej. Blanco", value: activeVehicle.color })}
            ${UI.Input({
              id: "v-placas",
              label: "Placas",
              placeholder: "Ej. ABC-123-D",
              value: activeVehicle.placas,
              helperText: "(Opcional para bicicletas y monopatines)",
            })}

            <div style="margin:1rem 0 1.5rem;">
              <p class="form-label" style="margin-bottom:0.5rem;">Fotografías del vehículo</p>
              <label class="upload-zone">
                <input type="file" id="input-v-photos" accept="image/*" multiple hidden ${
                  activeVehicle.photos.length >= 4 ? "disabled" : ""
                } />
                <i data-lucide="camera" style="width:2rem;height:2rem;"></i>
                <span style="font-size:0.85rem;font-weight:600;">
                  ${activeVehicle.photos.length >= 4 ? "Límite alcanzado (4/4)" : "Subir fotos (Máx. 4)"}
                </span>
              </label>
              <div class="thumb-row">${thumbsHtml}</div>
            </div>

            ${UI.Button({ text: "Guardar y Generar QR Vehicular", type: "submit", variant: "primary" })}
          </form>
        </div>
      </section>
    `;
  },

  renderGenerateId() {
    const s = store.student;
    return `
      <section class="screen screen--bg">
        ${UI.Header({ title: "Mi Credencial", backTarget: "dashboard" })}
        <form id="credential-form" class="scroll-area">
          <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:1.5rem;">
            <div style="position:relative;margin-bottom:0.5rem;">
              ${
                s.photoUrl
                  ? `
                <figure style="width:7.5rem;height:7.5rem;border-radius:9999px;overflow:hidden;border:4px solid #fff;box-shadow:var(--shadow-md);">
                  <img src="${s.photoUrl}" alt="Foto de perfil" style="width:100%;height:100%;object-fit:cover;" />
                </figure>
                <button type="button" id="btn-remove-id-photo" class="delete-badge" style="width:2rem;height:2rem;" aria-label="Quitar foto">
                  <i data-lucide="x" style="width:1rem;height:1rem;"></i>
                </button>`
                  : `
                <label style="width:7.5rem;height:7.5rem;border-radius:9999px;border:3px dashed rgba(10,29,96,0.3);background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-primary);">
                  <input type="file" id="input-id-photo" accept="image/*" hidden />
                  <i data-lucide="camera" style="width:2rem;height:2rem;"></i>
                </label>`
              }
            </div>
            <p style="font-size:0.85rem;font-weight:600;color:var(--color-muted-foreground);">Subir foto de perfil</p>
          </div>

          ${UI.Input({ id: "id-control", label: "Número de Control", value: s.controlNumber })}
          ${UI.Input({ id: "id-nombre", label: "Nombre(s)", value: s.firstName })}
          ${UI.Input({ id: "id-paterno", label: "Apellido Paterno", value: s.lastNamePaternal })}
          ${UI.Input({ id: "id-materno", label: "Apellido Materno", value: s.lastNameMaternal })}
          ${UI.Input({ id: "id-carrera", label: "Carrera", value: s.career })}

          <div style="margin-top:1.5rem;">
            ${UI.Button({ text: "Generar Credencial", type: "submit", variant: "primary" })}
          </div>
        </form>
      </section>
    `;
  },

  renderDigitalId() {
    const s = store.student;
    return `
      <section class="screen screen--bg">
        ${UI.Header({ title: "Credencial Digital", backTarget: "generate_id" })}
        <div class="scroll-area" style="display:flex;flex-direction:column;align-items:center;">
          <article style="width:100%;max-width:20rem;background:var(--color-card);border-radius:var(--radius-3xl);box-shadow:var(--shadow-xl);border:1px solid var(--color-muted);overflow:hidden;">
            <header style="background:var(--color-primary);color:#fff;padding:1rem;display:flex;justify-content:space-between;align-items:center;text-align:center;">
              <span style="font-size:0.65rem;font-weight:700;background:rgba(255,255,255,0.2);padding:0.35rem;border-radius:0.4rem;">LOGO<br/>ITL</span>
              <h2 style="font-size:0.8rem;line-height:1.2;">INSTITUTO TECNOLÓGICO<br/>DE LEÓN</h2>
              <span style="font-size:0.65rem;font-weight:700;background:rgba(255,255,255,0.2);padding:0.35rem;border-radius:0.4rem;">LOGO<br/>TECNM</span>
            </header>

            <div style="padding:1.5rem;display:flex;flex-direction:column;align-items:center;text-align:center;">
              <figure style="width:7rem;height:7rem;border-radius:1rem;background:var(--color-background);overflow:hidden;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
                ${
                  s.photoUrl
                    ? `<img src="${s.photoUrl}" alt="Foto estudiante" style="width:100%;height:100%;object-fit:cover;" />`
                    : `<i data-lucide="user" style="width:3rem;height:3rem;color:var(--color-muted-foreground);"></i>`
                }
              </figure>
              <h3 style="font-size:1.25rem;text-transform:uppercase;">${s.firstName}<br/>${s.lastNamePaternal} ${s.lastNameMaternal}</h3>
              <p style="font-size:0.75rem;font-weight:600;color:var(--color-muted-foreground);margin:0.35rem 0 0.75rem;">${s.career}</p>
              <span style="background:var(--color-primary-light);color:var(--color-primary);padding:0.3rem 1rem;border-radius:9999px;font-weight:700;letter-spacing:0.08em;margin-bottom:1.25rem;">
                ${s.controlNumber}
              </span>
              <div id="qr-digital-id" style="padding:0.5rem;background:#fff;border:1px solid var(--color-muted);border-radius:0.75rem;margin-bottom:0.4rem;"></div>
              <p style="font-size:0.65rem;font-weight:700;color:var(--color-muted-foreground);text-transform:uppercase;">Escanear para validar identidad</p>
            </div>
          </article>

          <div style="width:100%;max-width:20rem;margin-top:1.5rem;" data-nav="dashboard">
            ${UI.Button({ text: "Descargar Credencial (PDF)", variant: "secondary" })}
          </div>
        </div>
      </section>
    `;
  },

  renderGenerateEvent() {
    const e = store.eventDetails;
    return `
      <section class="screen screen--bg">
        ${UI.Header({ title: "Crear evento", subtitle: "Genera un acceso para tu invitado", backTarget: "dashboard" })}
        <form id="event-form" class="scroll-area">
          ${UI.Input({ id: "ev-name", label: "Nombre del evento", placeholder: "Ej. Ceremonia de graduación", value: e.eventName })}
          ${UI.Input({ id: "ev-guest", label: "Nombre completo del invitado", placeholder: "Ej. Roberto Reyes López", value: e.guestName })}
          ${UI.Select({ id: "ev-rel", label: "Relación con el invitado", value: e.relationship, options: GUEST_RELATIONSHIP_OPTIONS })}
          ${UI.Input({ id: "ev-phone", label: "Teléfono del invitado", placeholder: "10 dígitos", type: "tel", value: e.phone })}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
            ${UI.Input({ id: "ev-date", label: "Fecha", type: "date", value: e.date })}
            ${UI.Input({ id: "ev-time", label: "Hora", type: "time", value: e.time })}
          </div>
          ${UI.Input({ id: "ev-loc", label: "Lugar dentro del campus", placeholder: "Ej. Auditorio principal", value: e.location })}

          <div style="margin-top:1rem;">
            ${UI.Button({ text: "Generar código QR", type: "submit", variant: "primary", icon: "qr-code" })}
          </div>
        </form>
      </section>
    `;
  },

  renderQREvent() {
    const e = store.eventDetails;
    return `
      <section class="screen screen--primary">
        ${UI.Header({ title: "", backTarget: "generate_event", variant: "transparent" })}
        <div class="scroll-area" style="text-align:center;display:flex;flex-direction:column;align-items:center;">
          <span class="badge-pill">✓ Invitación generada</span>
          <h1 style="font-size:1.75rem;margin-bottom:0.25rem;">${e.eventName || "Titulación ITL"}</h1>
          <p style="opacity:0.8;margin-bottom:1.25rem;">Presenta este código en el acceso al campus</p>

          <div class="qr-card">
            <div id="qr-event-box" class="qr-frame"></div>
          </div>

          <article style="width:100%;background:rgba(255,255,255,0.12);border-radius:1.5rem;padding:1.25rem;text-align:left;margin-bottom:1.5rem;">
            <p style="font-size:0.7rem;text-transform:uppercase;opacity:0.7;font-weight:700;">Invitado</p>
            <p style="font-size:1.2rem;font-weight:700;margin-bottom:0.75rem;">${e.guestName || "Invitado Especial"}</p>
            <p style="font-size:0.85rem;margin-bottom:0.25rem;">📅 ${e.date || "16 de octubre de 2026"}</p>
            <p style="font-size:0.85rem;margin-bottom:0.25rem;">⏰ ${e.time || "20:15"} h</p>
            <p style="font-size:0.85rem;">📍 ${e.location || "Auditorio Posgrado"}</p>
          </article>

          <div style="width:100%;" data-nav="dashboard">
            ${UI.Button({ text: "Volver al inicio", variant: "secondary" })}
          </div>
        </div>
      </section>
    `;
  },
};