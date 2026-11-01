import { store } from "../store.js";
import { UI } from "../components/ui.js";

export const AccessAndVisitorScreens = {
  renderVisitor() {
    const rightLogo = `
      <div style="width:3.5rem;height:3.5rem;background:rgba(255,255,255,0.15);border-radius:1rem;display:flex;align-items:center;justify-content:center;font-weight:800;">
        ITL
      </div>`;

    return `
      <section class="screen screen--white">
        ${UI.Header({
          title: "SAMD ITL",
          subtitle: "Visita de externo",
          backTarget: "login",
          variant: "primary",
          rightHtml: rightLogo,
        })}

        <form id="visitor-form" class="scroll-area">
          ${UI.Input({ id: "vis-nombre", label: "Nombre del visitante", placeholder: "Tu nombre" })}
          ${UI.Input({ id: "vis-paterno", label: "Apellido Paterno", placeholder: "Tu apellido paterno" })}
          ${UI.Input({ id: "vis-materno", label: "Apellido Materno", placeholder: "Tu apellido materno" })}
          ${UI.Input({ id: "vis-motivo", label: "Motivo de la visita", placeholder: "Ej. Trámite administrativo" })}
          ${UI.Input({ id: "vis-tel", label: "Número de teléfono", placeholder: "10 dígitos", type: "tel" })}

          <div style="margin-top:1.5rem;">
            ${UI.Button({ text: "Registrar visita", type: "submit", variant: "primary" })}
          </div>
        </form>
      </section>
    `;
  },

  renderAccessQR(mode) {
    const activeVehicle =
      store.vehicles.find((v) => v.id === store.activeVehicleId) || store.vehicles[0];

    const config = {
      pedestrian: {
        title: "Acceso Peatonal",
        desc: "Escanea el código en la entrada de tu campus.",
        back: "dashboard",
      },
      vehicle: {
        title: "Acceso Vehicular",
        desc: "Escanea este código en la pluma del estacionamiento.",
        back: "dashboard",
        plates: activeVehicle.placas || "ABC-123-D",
      },
      visitor: {
        title: "Acceso Visitante",
        desc: "Escanea este código en la entrada del campus.",
        back: "login",
        finishBtn: true,
      },
    }[mode];

    return `
      <section class="screen screen--primary">
        ${UI.Header({ title: "", backTarget: config.back, variant: "transparent" })}
        <div class="scroll-area" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
          <div class="qr-card">
            <div id="qr-main-box" class="qr-frame"></div>
          </div>

          <h1 style="font-size:2rem;margin-bottom:0.5rem;">${config.title}</h1>
          <p style="opacity:0.85;font-size:1.05rem;margin-bottom:1.5rem;">${config.desc}</p>

          ${
            config.plates
              ? `<div style="background:rgba(255,255,255,0.15);padding:0.6rem 2rem;border-radius:9999px;font-weight:700;letter-spacing:0.1em;font-size:1.2rem;">${config.plates}</div>`
              : ""
          }

          ${
            config.finishBtn
              ? `<div style="width:100%;margin-top:1rem;" data-nav="login">${UI.Button({ text: "Finalizar", variant: "secondary" })}</div>`
              : ""
          }
        </div>
      </section>
    `;
  },

  renderStatus(type) {
    const isEntry = type === "entry" || type === "visitor";
    const bgColor = isEntry ? "var(--color-success)" : "var(--color-info)";
    const subtitle = isEntry ? "Registro exitoso" : "Salida exitosa";
    const title =
      type === "visitor"
        ? "Generando QR..."
        : isEntry
        ? "¡Bienvenido!"
        : "¡Vuelva pronto!";
    const nextTarget = type === "visitor" ? "qr_visitor" : "dashboard";

    return `
      <section class="screen screen--white" data-nav="${nextTarget}" style="align-items:center;justify-content:center;text-align:center;cursor:pointer;padding:2rem;">
        <div style="width:8rem;height:8rem;border-radius:9999px;background:${bgColor};color:#fff;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;box-shadow:var(--shadow-xl);">
          <i data-lucide="check" style="width:4rem;height:4rem;"></i>
        </div>
        <h2 style="color:var(--color-muted-foreground);font-size:1.35rem;margin-bottom:0.35rem;">${subtitle}</h2>
        <h1 style="color:${bgColor};font-size:2.75rem;">${title}</h1>
        <p style="margin-top:2rem;font-size:0.8rem;color:var(--color-muted-foreground);">Toca la pantalla para continuar</p>
      </section>
    `;
  },
};