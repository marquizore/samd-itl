import { store, AUTH_CREDENTIALS } from "./store.js";
import { StudentScreens } from "./screens/studentScreens.js";
import { AccessAndVisitorScreens } from "./screens/accessAndVisitorScreens.js";
import { SecurityScreens } from "./screens/securityScreens.js";

const rootElement = document.getElementById("app-root");

export function navigate(screenName) {
  store.currentScreen = screenName;
  store.isMenuOpen = false;
  renderApp();
}

function drawQRCode(elementId, textValue, size = 190) {
  const container = document.getElementById(elementId);
  if (container && window.QRCode) {
    container.innerHTML = "";
    new window.QRCode(container, {
      text: textValue,
      width: size,
      height: size,
      colorDark: "#0a1d60",
      colorLight: "#ffffff",
      correctLevel: window.QRCode.CorrectLevel.H,
    });
  }
}

export function renderApp() {
  let html = "";

  switch (store.currentScreen) {
    case "login":
      html = StudentScreens.renderLogin();
      break;
    case "dashboard":
      html = StudentScreens.renderDashboard();
      break;
    case "register_vehicle":
      html = StudentScreens.renderRegisterVehicle();
      break;
    case "generate_id":
      html = StudentScreens.renderGenerateId();
      break;
    case "digital_id":
      html = StudentScreens.renderDigitalId();
      break;
    case "generate_event":
      html = StudentScreens.renderGenerateEvent();
      break;
    case "qr_event":
      html = StudentScreens.renderQREvent();
      break;
    case "visitor":
      html = AccessAndVisitorScreens.renderVisitor();
      break;
    case "qr_pedestrian":
      html = AccessAndVisitorScreens.renderAccessQR("pedestrian");
      break;
    case "qr_vehicle":
      html = AccessAndVisitorScreens.renderAccessQR("vehicle");
      break;
    case "qr_visitor":
      html = AccessAndVisitorScreens.renderAccessQR("visitor");
      break;
    case "success_entry":
      html = AccessAndVisitorScreens.renderStatus("entry");
      break;
    case "success_exit":
      html = AccessAndVisitorScreens.renderStatus("exit");
      break;
    case "success_visitor":
      html = AccessAndVisitorScreens.renderStatus("visitor");
      setTimeout(() => {
        if (store.currentScreen === "success_visitor") navigate("qr_visitor");
      }, 1800);
      break;
    case "guard_dashboard":
      html = SecurityScreens.renderGuardDashboard();
      break;
    case "secure_chat":
      html = SecurityScreens.renderSecureChat();
      break;
    default:
      html = StudentScreens.renderLogin();
  }

  rootElement.innerHTML = html;

  // Renderizar íconos Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Dibujar códigos QR reales si la pantalla actual tiene un contenedor QR
  drawQRCode("qr-main-box", `SAMD-ITL-${store.student.controlNumber}-${Date.now()}`, 190);
  drawQRCode("qr-digital-id", `ID-VALID-${store.student.controlNumber}`, 110);
  drawQRCode("qr-event-box", `EVENT-${store.eventDetails.eventName || "ITL"}-${Date.now()}`, 180);

  bindEvents();
}

function bindEvents() {
  // Navegación declarativa con atributo data-nav
  rootElement.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      navigate(el.getAttribute("data-nav"));
    });
  });

  // 1. Login Form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const ctrl = document.getElementById("login-control").value.trim();
      const pass = document.getElementById("login-password").value;

      if (ctrl === AUTH_CREDENTIALS.controlNumber && pass === AUTH_CREDENTIALS.password) {
        store.loginError = "";
        navigate("dashboard");
      } else {
        store.loginError =
          "El número de control o la contraseña son incorrectos. Verifica tus datos e intenta de nuevo.";
        renderApp();
      }
    });
  }

  // 2. Dashboard: Menú y Botón de Pánico
  const btnMenu = document.getElementById("btn-toggle-menu");
  if (btnMenu) {
    btnMenu.addEventListener("click", () => {
      store.isMenuOpen = !store.isMenuOpen;
      renderApp();
    });
  }

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => navigate("login"));
  }

  const btnPanic = document.getElementById("btn-panic");
  if (btnPanic) {
    btnPanic.addEventListener("click", () => {
      store.panicAlertVisible = true;
      renderApp();
      setTimeout(() => {
        store.panicAlertVisible = false;
        if (store.currentScreen === "dashboard") renderApp();
      }, 4000);
    });
  }

  // 3. Vehículos: Pestañas, Agregar, Eliminar, Fotos (Máx. 4) y Guardar
  const activeVehicle =
    store.vehicles.find((v) => v.id === store.activeVehicleId) || store.vehicles[0];

  rootElement.querySelectorAll("[data-vehicle-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      store.activeVehicleId = Number(tab.getAttribute("data-vehicle-tab"));
      renderApp();
    });
  });

  const btnAddVehicle = document.getElementById("btn-add-vehicle");
  if (btnAddVehicle) {
    btnAddVehicle.addEventListener("click", () => {
      const newId = Date.now();
      store.vehicles.push({
        id: newId,
        tipo: "",
        marca: "",
        modelo: "",
        color: "",
        placas: "",
        photos: [],
      });
      store.activeVehicleId = newId;
      renderApp();
    });
  }

  const btnDeleteVehicle = document.getElementById("btn-delete-vehicle");
  if (btnDeleteVehicle) {
    btnDeleteVehicle.addEventListener("click", () => {
      store.vehicles = store.vehicles.filter((v) => v.id !== activeVehicle.id);
      store.activeVehicleId = store.vehicles[store.vehicles.length - 1].id;
      renderApp();
    });
  }

  const inputVehiclePhotos = document.getElementById("input-v-photos");
  if (inputVehiclePhotos) {
    inputVehiclePhotos.addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      const urls = files.map((file) => URL.createObjectURL(file));
      activeVehicle.photos = [...activeVehicle.photos, ...urls].slice(0, 4);
      renderApp();
    });
  }

  rootElement.querySelectorAll("[data-remove-vphoto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.getAttribute("data-remove-vphoto"));
      activeVehicle.photos.splice(index, 1);
      renderApp();
    });
  });

  const vehicleForm = document.getElementById("vehicle-form");
  if (vehicleForm) {
    vehicleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      activeVehicle.tipo = document.getElementById("v-tipo").value;
      activeVehicle.marca = document.getElementById("v-marca").value;
      activeVehicle.modelo = document.getElementById("v-modelo").value;
      activeVehicle.color = document.getElementById("v-color").value;
      activeVehicle.placas = document.getElementById("v-placas").value || "ABC-123-D";
      navigate("qr_vehicle");
    });
  }

  // 4. Credencial Virtual: Subir/Quitar Foto y Guardar
  const inputIdPhoto = document.getElementById("input-id-photo");
  if (inputIdPhoto) {
    inputIdPhoto.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        store.student.photoUrl = URL.createObjectURL(e.target.files[0]);
        renderApp();
      }
    });
  }

  const btnRemoveIdPhoto = document.getElementById("btn-remove-id-photo");
  if (btnRemoveIdPhoto) {
    btnRemoveIdPhoto.addEventListener("click", () => {
      store.student.photoUrl = null;
      renderApp();
    });
  }

  const credentialForm = document.getElementById("credential-form");
  if (credentialForm) {
    credentialForm.addEventListener("submit", (e) => {
      e.preventDefault();
      store.student.controlNumber = document.getElementById("id-control").value;
      store.student.firstName = document.getElementById("id-nombre").value;
      store.student.lastNamePaternal = document.getElementById("id-paterno").value;
      store.student.lastNameMaternal = document.getElementById("id-materno").value;
      store.student.career = document.getElementById("id-carrera").value;
      navigate("digital_id");
    });
  }

  // 5. Formulario de Eventos
  const eventForm = document.getElementById("event-form");
  if (eventForm) {
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      store.eventDetails = {
        eventName: document.getElementById("ev-name").value,
        guestName: document.getElementById("ev-guest").value,
        relationship: document.getElementById("ev-rel").value,
        phone: document.getElementById("ev-phone").value,
        date: document.getElementById("ev-date").value,
        time: document.getElementById("ev-time").value,
        location: document.getElementById("ev-loc").value,
      };
      navigate("qr_event");
    });
  }

  // 6. Formulario de Visitantes
  const visitorForm = document.getElementById("visitor-form");
  if (visitorForm) {
    visitorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      navigate("success_visitor");
    });
  }

  // 7. Buscador en Panel de Guardias
  const guardSearchInput = document.getElementById("guard-search-input");
  if (guardSearchInput) {
    guardSearchInput.addEventListener("input", (e) => {
      store.guardSearchQuery = e.target.value;
      renderApp();
      const inputAfterRender = document.getElementById("guard-search-input");
      if (inputAfterRender) {
        inputAfterRender.focus();
        inputAfterRender.setSelectionRange(
          store.guardSearchQuery.length,
          store.guardSearchQuery.length
        );
      }
    });
  }

  // 8. Chat Seguro con Respuestas Rápidas
  rootElement.querySelectorAll("[data-quick-reply]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const text = chip.getAttribute("data-quick-reply");
      store.chatMessages.push({ id: Date.now(), text, sender: "user" });
      renderApp();

      setTimeout(() => {
        store.chatMessages.push({
          id: Date.now() + 1,
          text: "Enterado. Un guardia en caseta está procesando tu solicitud.",
          sender: "guard",
        });
        if (store.currentScreen === "secure_chat") renderApp();
      }, 700);
    });
  });
}

// Inicializar aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", renderApp);