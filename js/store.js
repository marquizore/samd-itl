export const AUTH_CREDENTIALS = {
  controlNumber: "20210001",
  password: "ITL2025",
};

export const VEHICLE_TYPE_OPTIONS = [
  { label: "Coche", value: "Coche" },
  { label: "Camioneta", value: "Camioneta" },
  { label: "Moto", value: "Moto" },
  { label: "Bicicleta", value: "Bicicleta" },
  { label: "Monopatín Eléctrico", value: "Monopatín Eléctrico" },
];

export const GUEST_RELATIONSHIP_OPTIONS = [
  { label: "Padre o madre", value: "Padre o madre" },
  { label: "Familiar", value: "Familiar" },
  { label: "Amigo(a)", value: "Amigo(a)" },
  { label: "Invitado(a) externo", value: "Invitado(a) externo" },
];

export const QUICK_CHAT_REPLIES = [
  "Olvidé mi credencial.",
  "Problema con el código QR.",
  "Necesito asistencia en entrada/salida.",
  "Reportar vehículo mal estacionado.",
  "Gracias, todo resuelto.",
];

export const store = {
  currentScreen: "login",
  loginError: "",
  isMenuOpen: false,
  panicAlertVisible: false,

  student: {
    controlNumber: "23240995",
    firstName: "Marco Uriel",
    lastNamePaternal: "Reyes",
    lastNameMaternal: "Ramirez",
    career: "ING. SISTEMAS COMPUTACIONALES",
    photoUrl: null,
  },

  vehicles: [
    {
      id: 1,
      tipo: "",
      marca: "",
      modelo: "",
      color: "",
      placas: "ABC-123-D",
      photos: [],
    },
  ],
  activeVehicleId: 1,

  eventDetails: {
    eventName: "",
    guestName: "",
    relationship: "",
    phone: "",
    date: "",
    time: "",
    location: "",
  },

  guardSearchQuery: "",
  guardLogs: [
    { id: 1, name: "Iker Alberto", detail: "23240001", time: "08:15 AM", type: "entry", category: "pedestrian" },
    { id: 2, name: "Ana Sofía", detail: "22240512", time: "08:30 AM", type: "exit", category: "pedestrian" },
    { id: 3, name: "Visitante (Ana Montes)", detail: "Externo • ABC-123-D", time: "09:10 AM", type: "entry", category: "vehicle" },
  ],

  chatMessages: [
    { id: 1, text: "Buen día, ¿en qué le puedo ayudar?", sender: "guard" },
  ],
};