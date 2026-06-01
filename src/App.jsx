import { useEffect, useMemo, useState } from "react";
import LoginView from "./components/LoginView.jsx";
import brandWordmark from "./assets/brand-wordmark.png";
import heroHome from "./assets/hero-home.jpg";
import happySeniorsHero from "./assets/ancianosfelices1.jpg";
import activityPainting from "./assets/activity-painting.jpg";
import activityYoga from "./assets/activity-yoga.jpg";
import activityMuseum from "./assets/activity-museum.jpg";
import activityWalk from "./assets/activity-walk.jpg";
import activityBeach from "./assets/activity-beach.webp";
import detailCity from "./assets/detail-city.jpg";
import detailCityThumb1 from "./assets/detail-city-thumb-1.jpg";
import detailCityThumb2 from "./assets/detail-city-thumb-2.jpg";
import detailCityThumb3 from "./assets/detail-city-thumb-3.jpg";
import detailCityThumb4 from "./assets/detail-city-thumb-4.jpg";
import registerPortrait from "./assets/register-portrait.png";
import registerSuccess from "./assets/register-success.png";
import { isSupabaseEnabled, supabase } from "./lib/supabase.js";

const TOUR_STORAGE_KEY = "club-chicaneo:tutorial-seen";
const SETTINGS_STORAGE_KEY = "club-chicaneo:accessibility-settings";
const SAVED_STORAGE_KEY = "club-chicaneo:saved-activities";
const RESERVATIONS_STORAGE_KEY = "club-chicaneo:reservations";
const SESSION_STORAGE_KEY = "club-chicaneo:session";

const guestUser = {
  id_usuario: 0,
  nombre: "Invitado",
  apellido: "",
  correo: "",
  rol: "visitante",
  estado_cuenta: "anónimo",
};

const categories = [
  { id: "cultura", label: "Cultura", count: 12, tone: "amber", icon: "palette" },
  { id: "deporte", label: "Deporte", count: 18, tone: "mint", icon: "shoe" },
  { id: "salud", label: "Salud", count: 10, tone: "rose", icon: "heart-pulse" },
  { id: "turismo", label: "Turismo", count: 15, tone: "teal", icon: "camera" },
  { id: "educacion", label: "Educación", count: 8, tone: "violet", icon: "book" },
];

const activities = [
  {
    id: "painting",
    title: "Taller de Pintura",
    category: "Cultura",
    categoryId: "cultura",
    categoryTone: "amber",
    image: activityPainting,
    gallery: [activityPainting, activityMuseum, heroHome],
    date: "20 de mayo de 2026",
    time: "10:00 a.m.",
    location: "Museo La Tertulia",
    provider: "Museo La Tertulia",
    providerType: "Institución cultural",
    price: "Gratuita",
    accessible: true,
    spots: 12,
    shortDescription: "Un espacio creativo para aprender técnicas sencillas en buena compañía.",
    description:
      "Aprende color, composición y expresión visual en una sesión guiada con materiales accesibles y acompañamiento cercano.",
    restrictions: ["Actividad de intensidad baja.", "No requiere experiencia previa.", "Material básico incluido."],
  },
  {
    id: "yoga",
    title: "Yoga para todos",
    category: "Salud",
    categoryId: "salud",
    categoryTone: "rose",
    image: activityYoga,
    gallery: [activityYoga, activityWalk, heroHome],
    date: "22 de mayo de 2026",
    time: "8:30 a.m.",
    location: "Escuela Nacional del Deporte",
    provider: "Escuela Nacional del Deporte",
    providerType: "Entidad aliada",
    price: "Gratuita",
    accessible: true,
    spots: 20,
    shortDescription: "Rutina suave con respiración guiada y opciones adaptadas.",
    description:
      "Sesión diseñada para mejorar movilidad, respiración y bienestar general con instrucciones claras y pausas frecuentes.",
    restrictions: ["Usar ropa cómoda.", "Se recomienda llevar agua.", "Actividad de intensidad baja."],
  },
  {
    id: "museum",
    title: "Visita guiada al museo",
    category: "Cultura",
    categoryId: "cultura",
    categoryTone: "violet",
    image: activityMuseum,
    gallery: [activityMuseum, activityPainting, detailCity],
    date: "24 de mayo de 2026",
    time: "11:00 a.m.",
    location: "Museo de Arte Moderno",
    provider: "Museo de Arte Moderno",
    providerType: "Institución cultural",
    price: "$15.000",
    accessible: true,
    spots: 18,
    shortDescription: "Recorrido guiado con apoyo visual y explicaciones fáciles de seguir.",
    description:
      "Descubre salas y colecciones en un recorrido cultural con grupos pequeños, tiempos de descanso y lenguaje cercano.",
    restrictions: ["Actividad de intensidad baja.", "Incluye guía cultural.", "No incluye transporte."],
  },
  {
    id: "walk",
    title: "Caminata ecológica",
    category: "Turismo",
    categoryId: "turismo",
    categoryTone: "teal",
    image: activityWalk,
    gallery: [activityWalk, activityBeach, heroHome],
    date: "25 de mayo de 2026",
    time: "7:00 a.m.",
    location: "Parque del Perro",
    provider: "Alcaldía de Cali",
    providerType: "Entidad pública",
    price: "Gratuita",
    accessible: true,
    spots: 25,
    shortDescription: "Recorrido al aire libre con ritmo amable y paradas de descanso.",
    description:
      "Explora un entorno verde con acompañamiento guiado, actividades de observación y una velocidad cómoda para el grupo.",
    restrictions: ["Usar calzado cómodo.", "No recomendable para movilidad muy reducida.", "Llevar gorra o sombrero."],
  },
  {
    id: "city-tour",
    title: "Recorrido cultural por el Centro Histórico de Cali",
    category: "Cultura",
    categoryId: "cultura",
    categoryTone: "violet",
    image: detailCity,
    gallery: [detailCity, detailCityThumb1, detailCityThumb2, detailCityThumb3, detailCityThumb4],
    date: "30 de mayo de 2026",
    time: "9:00 a.m. - 12:00 p.m.",
    location: "Centro Histórico de Cali",
    provider: "Secretaría de Cultura de Cali",
    providerType: "Proveedor verificado",
    price: "Gratuito",
    accessible: true,
    spots: 16,
    shortDescription: "Conoce lugares emblemáticos con guía, apoyos visuales y ritmo accesible.",
    description:
      "Recorrido guiado por el centro histórico para descubrir patrimonio, historias de la ciudad y puntos culturales destacados.",
    restrictions: ["Actividad de intensidad baja.", "Uso de calzado cómodo.", "No recomendable para movilidad muy reducida."],
  },
  {
    id: "beach",
    title: "Excursión a la playa",
    category: "Turismo",
    categoryId: "turismo",
    categoryTone: "teal",
    image: activityBeach,
    gallery: [activityBeach, activityWalk, heroHome],
    date: "28 de mayo de 2026",
    time: "9:00 a.m.",
    location: "Playa Ladrilleros",
    provider: "Ruta Pacífica",
    providerType: "Operador turístico",
    price: "$30.000",
    accessible: false,
    spots: 10,
    shortDescription: "Salida recreativa con transporte incluido y asistencia de coordinador.",
    description:
      "Disfruta un paseo de un día con coordinación previa, acompañamiento logístico y tiempos organizados de descanso.",
    restrictions: ["Incluye transporte.", "No es una actividad gratuita.", "Requiere registro previo."],
  },
];

const roleLabels = {
  visitante: "Visitante",
  adulto_mayor: "Adulto mayor",
  proveedor: "Proveedor",
  administrador: "Administrador",
};

const navItemsByRole = {
  visitante: [
    { id: "home", label: "Inicio", icon: "home" },
    { id: "activities", label: "Actividades", icon: "grid" },
    { id: "register", label: "Crear cuenta", icon: "user-plus" },
  ],
  adulto_mayor: [
    { id: "home", label: "Inicio", icon: "home" },
    { id: "activities", label: "Actividades", icon: "grid" },
    { id: "saved-activities", label: "Mis intereses", icon: "bookmark" },
    { id: "community", label: "Comunidad", icon: "users" },
    { id: "calendar", label: "Mi calendario", icon: "calendar" },
    { id: "messages", label: "Mensajes", icon: "message" },
    { id: "profile", label: "Mi perfil", icon: "user" },
  ],
  proveedor: [
    { id: "home", label: "Panel", icon: "dashboard" },
    { id: "activities", label: "Mis actividades", icon: "grid" },
    { id: "provider-bookings", label: "Solicitudes", icon: "clipboard" },
    { id: "messages", label: "Mensajes", icon: "message" },
    { id: "profile", label: "Mi perfil", icon: "building" },
  ],
  administrador: [
    { id: "home", label: "Panel", icon: "dashboard" },
    { id: "admin-users", label: "Usuarios", icon: "users" },
    { id: "activities", label: "Moderación", icon: "shield" },
    { id: "admin-reports", label: "Reportes", icon: "bar-chart" },
    { id: "profile", label: "Sistema", icon: "settings" },
  ],
};

const tutorialSteps = [
  {
    title: "Bienvenida a Club Chicaneo +55",
    body: "Aqui puedes explorar actividades, reservar y seguir tus pr?ximos eventos sin perderte.",
  },
  {
    title: "Explora con filtros visibles",
    body: "Usa el buscador superior o el panel lateral para encontrar actividades seg?n tus intereses.",
  },
  {
    title: "Recibe mensajes claros",
    body: "Cada reserva, cambio o error muestra una retroalimentaci?n simple y directa.",
  },
  {
    title: "Activa ayudas visuales",
    body: "Puedes cambiar tama?o de texto, contraste y modo visual desde el bot?n de accesibilidad.",
  },
];

const initialMessages = [
  {
    id: 1,
    author: "provider",
    text: "Hola, Mar?a. S?, a?n tenemos cupos disponibles para el recorrido cultural.",
    time: "10:32 a.m.",
  },
  {
    id: 2,
    author: "provider",
    text: "Si quieres, tambi?n puedo enviarte el enlace de inscripci?n y los datos del encuentro.",
    time: "10:32 a.m.",
  },
  {
    id: 3,
    author: "user",
    text: "S?, por favor, me gustar?a inscribirme.",
    time: "10:33 a.m.",
  },
  {
    id: 4,
    author: "provider",
    text: "Listo, te envio el enlace de inscripción y la informaci?n clave.",
    time: "10:34 a.m.",
    attachment: "Formulario de inscripci?n",
  },
];

const initialChatThreads = [
  {
    id: "chat-cultura",
    title: "Secretar?a de Cultura de Cali",
    subtitle: "Recorrido cultural por el Centro Hist?rico",
    initials: "SC",
    time: "10:34 a.m.",
    lastMessage: "Listo, te env?o la informaci?n clave.",
    messages: initialMessages,
  },
  {
    id: "chat-museo",
    title: "Museo de Arte Moderno",
    subtitle: "Visita guiada al museo",
    initials: "MM",
    time: "Ayer",
    lastMessage: "Te esperamos 15 minutos antes del inicio del recorrido.",
    messages: [
      {
        id: 11,
        author: "provider",
        text: "Hola, Mar?a. Tu reserva al museo sigue confirmada para este s?bado.",
        time: "9:15 a.m.",
      },
      {
        id: 12,
        author: "user",
        text: "Muchas gracias. Quisiera saber si hay sillas durante el recorrido.",
        time: "9:18 a.m.",
      },
      {
        id: 13,
        author: "provider",
        text: "S?, contamos con zonas de descanso y acompa?amiento del gu?a en cada sala.",
        time: "9:20 a.m.",
      },
    ],
  },
  {
    id: "chat-deporte",
    title: "Escuela Nacional del Deporte",
    subtitle: "Yoga para todos",
    initials: "ED",
    time: "Lun",
    lastMessage: "Recuerda llevar ropa c?moda y agua.",
    messages: [
      {
        id: 21,
        author: "provider",
        text: "Hola, te confirmamos tu cupo para Yoga para todos.",
        time: "8:00 a.m.",
      },
      {
        id: 22,
        author: "provider",
        text: "Recuerda llevar ropa c?moda y agua.",
        time: "8:01 a.m.",
      },
    ],
  },
];

const initialProviderChatThreads = [
  {
    id: "provider-chat-maria",
    title: "Mar?a Gonz?lez",
    subtitle: "Recorrido cultural por el Centro Hist?rico",
    initials: "MG",
    time: "9:24 a.m.",
    lastMessage: "S?, contamos con dos pausas y el equipo de apoyo acompa?a todo el trayecto.",
    messages: [
      {
        id: 101,
        author: "user",
        text: "Hola, quisiera confirmar si el recorrido tiene puntos de descanso durante la actividad.",
        time: "9:20 a.m.",
      },
      {
        id: 102,
        author: "provider",
        text: "S?, contamos con dos pausas y el equipo de apoyo acompa?a todo el trayecto.",
        time: "9:24 a.m.",
      },
    ],
  },
  {
    id: "provider-chat-carlos",
    title: "Carlos Herrera",
    subtitle: "Exposici?n de arte local",
    initials: "CH",
    time: "Ayer",
    lastMessage: "Gracias, estar? atento a la nueva hora.",
    messages: [
      {
        id: 103,
        author: "user",
        text: "Buenas tardes. Quisiera saber si la exposici?n tiene acceso por rampa.",
        time: "3:42 p.m.",
      },
      {
        id: 104,
        author: "provider",
        text: "S?, el ingreso principal cuenta con rampa y apoyo del personal de sala.",
        time: "3:50 p.m.",
      },
      {
        id: 105,
        author: "user",
        text: "Gracias, estar? atento a la nueva hora.",
        time: "4:01 p.m.",
      },
    ],
  },
  {
    id: "provider-chat-rosa",
    title: "Rosa Mart?nez",
    subtitle: "Taller de danza folcl?rica",
    initials: "RM",
    time: "Dom",
    lastMessage: "Claro, te env?o de nuevo la direcci?n y el punto de encuentro.",
    messages: [
      {
        id: 106,
        author: "user",
        text: "Hola. ?Podr?as compartirme otra vez la direcci?n exacta del lugar?",
        time: "11:12 a.m.",
      },
      {
        id: 107,
        author: "provider",
        text: "Claro, te env?o de nuevo la direcci?n y el punto de encuentro.",
        time: "11:15 a.m.",
      },
    ],
  },
];

const defaultReservations = [];

const demoUsers = [
  {
    id_usuario: 1,
    nombre: "Mar?a",
    apellido: "Gonz?lez",
    correo: "maria@clubchicaneo55.com",
    contrasena: "maria123",
    telefono: "3001234567",
    fecha_nacimiento: "1958-05-11",
    ciudad: "Cali",
    direccion: "Barrio San Fernando",
    rol: "adulto_mayor",
    estado_cuenta: "activo",
  },
  {
    id_usuario: 2,
    nombre: "Carlos",
    apellido: "Herrera",
    correo: "carlos@clubchicaneo55.com",
    contrasena: "carlos123",
    telefono: "3005551212",
    fecha_nacimiento: "1954-08-02",
    ciudad: "Cali",
    direccion: "Barrio El Ingenio",
    rol: "adulto_mayor",
    estado_cuenta: "activo",
  },
  {
    id_usuario: 3,
    nombre: "Luc?a",
    apellido: "Ram?rez",
    correo: "lucia@clubchicaneo55.com",
    contrasena: "lucia123",
    telefono: "3008884545",
    fecha_nacimiento: "1960-11-14",
    ciudad: "Palmira",
    direccion: "Centro",
    rol: "adulto_mayor",
    estado_cuenta: "inactivo",
  },
  {
    id_usuario: 4,
    nombre: "Adriana",
    apellido: "Cruz",
    correo: "proveedor@clubchicaneo55.com",
    contrasena: "proveedor123",
    telefono: "3007778899",
    fecha_nacimiento: "1987-09-09",
    ciudad: "Cali",
    direccion: "Centro Hist?rico",
    rol: "proveedor",
    estado_cuenta: "activo",
    organizacion: "Secretar?a de Cultura de Cali",
  },
  {
    id_usuario: 5,
    nombre: "Juan Carlos",
    apellido: "Diaz",
    correo: "admin1@clubchicaneo55.com",
    contrasena: "admin123",
    telefono: "3004443322",
    fecha_nacimiento: "1985-02-14",
    ciudad: "Cali",
    direccion: "Edificio Administrativo",
    rol: "administrador",
    estado_cuenta: "activo",
    organizacion: "Club Chicaneo +55",
  },
  {
    id_usuario: 6,
    nombre: "Valentina",
    apellido: "Feijoo",
    correo: "admin2@clubchicaneo55.com",
    contrasena: "admin234",
    telefono: "3004443323",
    fecha_nacimiento: "1990-07-21",
    ciudad: "Cali",
    direccion: "Edificio Administrativo",
    rol: "administrador",
    estado_cuenta: "activo",
    organizacion: "Club Chicaneo +55",
  },
  {
    id_usuario: 7,
    nombre: "Federico",
    apellido: "Teran",
    correo: "admin3@clubchicaneo55.com",
    contrasena: "admin345",
    telefono: "3004443324",
    fecha_nacimiento: "1988-03-03",
    ciudad: "Cali",
    direccion: "Edificio Administrativo",
    rol: "administrador",
    estado_cuenta: "activo",
    organizacion: "Club Chicaneo +55",
  },
];

const providerManagedActivities = [
  {
    id: "city-tour",
    title: "Recorrido cultural por el Centro Histórico de Cali",
    category: "Cultura",
    imageKey: "city",
    image: detailCity,
    status: "Publicada",
    date: "30 de mayo de 2026",
    registeredCount: 11,
    capacity: 16,
    accessible: true,
    place: "Centro Histórico de Cali",
    description: "Recorrido guiado por puntos emblemÃ¡ticos del centro con pausas, apoyo visual y explicaciones cercanas.",
  },
  {
    id: "museum-local",
    title: "Exposición de arte local",
    category: "Cultura",
    imageKey: "museum",
    image: activityMuseum,
    status: "Aprobacion pendiente",
    date: "12 de junio de 2026",
    registeredCount: 0,
    interestCount: 4,
    capacity: 18,
    accessible: true,
    place: "Museo de Arte Moderno",
    description: "Muestra comentada con enfoque accesible para personas mayores y acompaÃ±amiento en el recorrido.",
  },
  {
    id: "dance-workshop",
    title: "Taller de danza folclórica",
    category: "Bienestar",
    imageKey: "painting",
    image: activityPainting,
    status: "Publicada",
    date: "5 de junio de 2026",
    registeredCount: 9,
    capacity: 20,
    accessible: true,
    place: "Casa Cultural del Centro",
    description: "Encuentro artistico con ritmos suaves, instrucciones paso a paso y espacio para descansar.",
  },
];

const providerRequests = [
  {
    id: "req-1",
    person: "MarÃ­a GonzÃ¡lez",
    activity: "Recorrido cultural por el Centro Histórico de Cali",
    status: "Pendiente de confirmar",
    detail: "Solicita apoyo con punto de encuentro y recordatorio telefónico.",
    phone: "3001234567",
  },
  {
    id: "req-2",
    person: "Carlos Herrera",
    activity: "Taller de danza folclórica",
    status: "Inscripcion aprobada",
    detail: "Acepto términos y requiere información de ingreso accesible.",
    phone: "3019876543",
  },
  {
    id: "req-3",
    person: "Rosa Martínez",
    activity: "Exposición de arte local",
    status: "Esperando ajustes",
    detail: "Pidi? cambio de fecha por cita méica y desea nueva confirmación.",
    phone: "3025557788",
  },
];

const providerSummary = [
  { label: "Actividades activas", value: "3", tone: "violet", icon: "grid" },
  { label: "Solicitudes nuevas", value: "8", tone: "amber", icon: "clipboard" },
  { label: "Mensajes sin leer", value: "5", tone: "mint", icon: "message" },
];

const providerImageOptions = [
  { id: "city", label: "Recorrido cultural", src: detailCity },
  { id: "museum", label: "Museo y exposicion", src: activityMuseum },
  { id: "painting", label: "Taller artistico", src: activityPainting },
  { id: "walk", label: "Caminata", src: activityWalk },
  { id: "yoga", label: "Yoga y bienestar", src: activityYoga },
  { id: "beach", label: "Salida turistica", src: activityBeach },
];

const providerStatusOptions = ["Publicada", "Aprobacion pendiente", "Observacion"];

function getProviderStatusTone(status) {
  if (status === "Publicada" || status.includes("aprobada")) return "mint";
  if (status.includes("Pendiente") || status.includes("pendiente") || status.includes("ajustes")) return "amber";
  return "violet";
}

function formatProviderAttendance(activity) {
  if (activity.status === "Aprobacion pendiente" && activity.interestCount) {
    return `${activity.interestCount} interesados`;
  }

  const registeredCount = activity.registeredCount ?? 0;
  const capacity = activity.capacity ?? 0;
  return `${registeredCount} inscritos de ${capacity} cupos`;
}

function getProviderImageByKey(imageKey) {
  return providerImageOptions.find((option) => option.id === imageKey)?.src ?? detailCity;
}

function createProviderActivityDraft(activity = null) {
  return {
    id: activity?.id ?? null,
    title: activity?.title ?? "",
    category: activity?.category ?? "Cultura",
    imageKey: activity?.imageKey ?? "city",
    status: activity?.status ?? "Aprobacion pendiente",
    date: activity?.date ?? "",
    place: activity?.place ?? "",
    capacity: String(activity?.capacity ?? 15),
    accessible: activity?.accessible ?? true,
    description: activity?.description ?? "",
  };
}

const adminSummary = [
  { label: "Usuarios activos", value: "148", tone: "mint", icon: "users" },
  { label: "Proveedores validados", value: "16", tone: "violet", icon: "building" },
  { label: "Actividades por revisar", value: "7", tone: "amber", icon: "shield" },
  { label: "Casos de soporte", value: "4", tone: "sky", icon: "message" },
];

const adminUsers = [
  { id: 1, name: "MarÃ­a GonzÃ¡lez", role: "Adulto mayor", state: "Activa", city: "Cali" },
  { id: 2, name: "Carlos Herrera", role: "Adulto mayor", state: "Activa", city: "Cali" },
  { id: 3, name: "LucÃ­a RamÃ­rez", role: "Adulto mayor", state: "Inactiva", city: "Palmira" },
  { id: 4, name: "Adriana Cruz", role: "Proveedor", state: "Activa", city: "Cali" },
  { id: 5, name: "Juan Carlos Diaz", role: "Administrador", state: "Activa", city: "Cali" },
  { id: 6, name: "Valentina Feijoo", role: "Administrador", state: "Activa", city: "Cali" },
  { id: 7, name: "Federico Teran", role: "Administrador", state: "Activa", city: "Cali" },
];

const adminResponsibles = [
  { name: "Juan Carlos Diaz", email: "admin1@clubchicaneo55.com" },
  { name: "Valentina Feijoo", email: "admin2@clubchicaneo55.com" },
  { name: "Federico Teran", email: "admin3@clubchicaneo55.com" },
];

function getAdminStatusTone(status) {
  if (status === "Aprobada" || status === "Activa") return "mint";
  if (status === "Observacion" || status === "Observación" || status === "Pendiente" || status === "Inactiva") {
    return "amber";
  }
  return "violet";
}

function createAdminModalDraft(kind, entity = null) {
  if (kind === "user") {
    return {
      id: entity?.id ?? null,
      name: entity?.name ?? "",
      role: entity?.role ?? "Adulto mayor",
      state: entity?.state ?? "Activa",
      city: entity?.city ?? "Cali",
    };
  }

  if (kind === "moderation") {
    return {
      id: entity?.id ?? null,
      title: entity?.title ?? "",
      owner: entity?.owner ?? "",
      status: entity?.status ?? "Pendiente",
      note: entity?.note ?? "",
    };
  }

  if (kind === "report") {
    return {
      id: entity?.id ?? null,
      title: entity?.title ?? "",
      metric: entity?.metric ?? "",
      description: entity?.description ?? "",
    };
  }

  return {
    id: entity?.email ?? null,
    name: entity?.name ?? "",
    email: entity?.email ?? "",
  };
}

const communityUsers = [
  {
    id: 1,
    nombre: "MarÃ­a",
    apellido: "GonzÃ¡lez",
    bio: "Amante del arte y la cultura. Disfruto pintando y visitando museos.",
    imagen: activityPainting,
    followers: 42,
  },
  {
    id: 2,
    nombre: "Carlos",
    apellido: "Herrera",
    bio: "Instructor de yoga. Creo en el bienestar holístico.",
    imagen: activityYoga,
    followers: 78,
  },
  {
    id: 3,
    nombre: "Rosa",
    apellido: "MartÃ­nez",
    bio: "Viajera y amante de la naturaleza.",
    imagen: activityWalk,
    followers: 56,
  },
  {
    id: 4,
    nombre: "Alfonso",
    apellido: "Ruiz",
    bio: "Fotógrafo de la comunidad.",
    imagen: activityBeach,
    followers: 91,
  },
];

const communityPosts = [
  {
    id: 1,
    userId: 1,
    author: "MarÃ­a GonzÃ¡lez",
    avatar: activityPainting,
    content: "¡Acabo de terminar un taller increíble de pintura! Me sentí en mi elemento creando nuevas obras. La energía del grupo fue contagiosa.",
    image: activityPainting,
    likes: 23,
    timestamp: "Hace 2 horas",
    comments: [
      { id: 1, author: "Carlos Herrera", text: "Qué maravilloso! Me encantaría ver tus obras.", timestamp: "Hace 1 hora" },
      { id: 2, author: "Rosa MartÃ­nez", text: "¡?Felicidades, MarÃ­a! Deberías compartir tus pinturas más seguido.", timestamp: "Hace 1 hora" },
    ],
  },
  {
    id: 2,
    userId: 2,
    author: "Carlos Herrera",
    avatar: activityYoga,
    content: "Esta mañana tuve una sesión de yoga especial al aire libre en el parque. Nada como conectar con la naturaleza para encontrar paz interior.",
    image: activityYoga,
    likes: 41,
    timestamp: "Hace 4 horas",
    comments: [
      { id: 3, author: "MarÃ­a GonzÃ¡lez", text: "Eso se ve muy relajante. Próximamente me animo!", timestamp: "Hace 3 horas" },
    ],
  },
  {
    id: 3,
    userId: 3,
    author: "Rosa MartÃ­nez",
    avatar: activityWalk,
    content: "¡Qué hermoso día para una caminata ecológica! Vimos diferentes especies de aves y disfrutamos del aire fresco. La naturaleza nos sana.",
    image: activityWalk,
    likes: 38,
    timestamp: "Hace 6 horas",
    comments: [
      { id: 4, author: "Alfonso Ruiz", text: "Perfecto para fotos! Ojalá hubiera estado allí.", timestamp: "Hace 5 horas" },
      { id: 5, author: "Carlos Herrera", text: "Las caminatas en grupo son lo mejor para la salud mental.", timestamp: "Hace 4 horas" },
    ],
  },
];

const notificationsByRole = {
  visitante: [
    {
      id: "guest-1",
      title: "Nueva actividad cultural",
      description: "Ya estÃ¡ disponible un nuevo recorrido por el centro histórico para explorar en junio.",
      time: "Ahora",
    },
  ],
  adulto_mayor: [
    {
      id: "user-1",
      title: "Nueva actividad disponible",
      description: "Se agreg? una visita guiada al museo con apoyo visual y cupos abiertos.",
      time: "Hace 5 min",
    },
    {
      id: "user-2",
      title: "Recordatorio de reserva",
      description: "Tu taller de pintura es maÃ±ana a las 10:00 a.m. en Museo La Tertulia.",
      time: "Hace 30 min",
    },
  ],
  proveedor: [
    {
      id: "provider-1",
      title: "Nuevo usuario inscrito",
      description: "MarÃ­a GonzÃ¡lez se inscribió en Recorrido cultural por el Centro Histórico de Cali.",
      time: "Hace 3 min",
    },
    {
      id: "provider-2",
      title: "Consulta pendiente",
      description: "Carlos Herrera pidió información adicional sobre accesibilidad y punto de encuentro.",
      time: "Hace 18 min",
    },
  ],
  administrador: [
    {
      id: "admin-1",
      title: "Nuevo proveedor registrado",
      description: "Ruta Paca­fica envi? documentaci?n para validaci?n institucional.",
      time: "Hace 7 min",
    },
    {
      id: "admin-2",
      title: "Actividad pendiente de revisión",
      description: "Exposición de arte local sigue esperando aprobación de condiciones de accesibilidad.",
      time: "Hace 22 min",
    },
  ],
};

const categoryMetaByName = {
  cultura: { id: "cultura", tone: "amber", icon: "palette" },
  deporte: { id: "deporte", tone: "mint", icon: "shoe" },
  salud: { id: "salud", tone: "rose", icon: "heart-pulse" },
  turismo: { id: "turismo", tone: "teal", icon: "camera" },
  educacion: { id: "educacion", tone: "violet", icon: "book" },
};

const visualByActivityKey = {
  painting: { image: activityPainting, gallery: [activityPainting, activityMuseum, heroHome] },
  yoga: { image: activityYoga, gallery: [activityYoga, activityWalk, heroHome] },
  museum: { image: activityMuseum, gallery: [activityMuseum, activityPainting, detailCity] },
  walk: { image: activityWalk, gallery: [activityWalk, activityBeach, heroHome] },
  "city-tour": {
    image: detailCity,
    gallery: [detailCity, detailCityThumb1, detailCityThumb2, detailCityThumb3, detailCityThumb4],
  },
  beach: { image: activityBeach, gallery: [activityBeach, activityWalk, heroHome] },
};

function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function slugifyText(value = "") {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function resolveActivityKey(name = "", image = "") {
  const normalizedName = normalizeText(name);
  const normalizedImage = normalizeText(image);

  if (normalizedName.includes("pintura") || normalizedImage.includes("painting")) return "painting";
  if (normalizedName.includes("yoga") || normalizedImage.includes("yoga")) return "yoga";
  if (normalizedName.includes("museo")) return "museum";
  if (normalizedName.includes("caminata")) return "walk";
  if (normalizedName.includes("centro histórico")) return "city-tour";
  if (normalizedName.includes("playa")) return "beach";

  return slugifyText(name);
}

function formatDateLabel(dateValue) {
  if (!dateValue) return "";

  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateValue}T00:00:00`));
}

function formatTimeLabel(start, end) {
  if (!start) return "";
  const compact = (value) => {
    const [hours, minutes] = String(value).slice(0, 5).split(":");
    const parsedHours = Number(hours);
    const period = parsedHours >= 12 ? "p.m." : "a.m.";
    const normalizedHours = parsedHours % 12 || 12;
    return `${normalizedHours}:${minutes} ${period}`;
  };

  return end ? `${compact(start)} - ${compact(end)}` : compact(start);
}

function mapSupabaseCategory(row, allActivities) {
  const name = row.nombre_categoria;
  const meta = categoryMetaByName[normalizeText(name)] ?? { id: slugifyText(name), tone: "violet", icon: "book" };
  const count = allActivities.filter((activity) => normalizeText(activity.category) === normalizeText(name)).length;

  return {
    id: meta.id,
    label: name,
    count,
    tone: meta.tone,
    icon: meta.icon,
  };
}

function mapSupabaseActivity(row) {
  const activityName = row.nombre_actividad;
  const resolvedKey = resolveActivityKey(activityName, row.imagen);
  const visuals = visualByActivityKey[resolvedKey] ?? { image: heroHome, gallery: [heroHome] };
  const categoryName = row.categoria_actividad?.nombre_categoria ?? "General";
  const categoryMeta = categoryMetaByName[normalizeText(categoryName)] ?? {
    id: slugifyText(categoryName),
    tone: "violet",
  };
  const providerName = row.proveedor_actividad?.nombre_entidad ?? "Proveedor aliado";
  const price = Number(row.costo ?? 0) <= 0 ? "Gratuita" : `$${Number(row.costo).toLocaleString("es-CO")}`;
  const restrictions = String(row.restricciones ?? "")
    .split(".")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `${item}.`);

  return {
    id: resolvedKey,
    dbId: row.id_actividad,
    title: activityName,
    category: categoryName,
    categoryId: categoryMeta.id,
    categoryTone: categoryMeta.tone,
    image: visuals.image,
    gallery: visuals.gallery,
    rawDate: row.fecha,
    rawStartTime: row.hora_inicio,
    rawEndTime: row.hora_fin,
    date: formatDateLabel(row.fecha),
    time: formatTimeLabel(row.hora_inicio, row.hora_fin),
    location: row.ubicacion,
    provider: providerName,
    providerType:
      row.proveedor_actividad?.estado_validacion === "aprobado" ? "Proveedor verificado" : "Proveedor aliado",
    price,
    accessible: !normalizeText(row.restricciones).includes("no recomendable para movilidad muy reducida"),
    spots: row.cupos_disponibles ?? row.cupos_totales ?? 0,
    shortDescription: String(row.descripcion).slice(0, 110).trim().concat(String(row.descripcion).length > 110 ? "..." : ""),
    description: row.descripcion,
    restrictions: restrictions.length ? restrictions : ["Sin restricciones registradas."],
  };
}

const adminModerationQueue = [
  {
    id: "mod-1",
    title: "Exposición de arte local",
    owner: "Secretari­a de Cultura de Cali",
    status: "Pendiente",
    note: "Falta confirmar accesibilidad del espacio y numero final de cupos.",
  },
  {
    id: "mod-2",
    title: "Excursi?n a la playa",
    owner: "Ruta Paci­fica",
    status: "Observacion",
    note: "Debe aclarar condiciones de transporte y restricciones de movilidad.",
  },
  {
    id: "mod-3",
    title: "Yoga para todos",
    owner: "Escuela Nacional del Deporte",
    status: "Aprobada",
    note: "Cumple requisitos de información clara y apoyo visual.",
  },
];

const adminReports = [
  {
    id: "rep-1",
    title: "Accesibilidad activa",
    description: "43 usuarios guardaron preferencias de contraste o tamañ±o de texto en su Uºltima visita.",
    metric: "29%",
  },
  {
    id: "rep-2",
    title: "Reservas completadas",
    description: "El 82% de quienes inician una inscripci?n terminan el proceso sin errores bloqueantes.",
    metric: "82%",
  },
  {
    id: "rep-3",
    title: "Tiempo promedio de ayuda",
    description: "Las solicitudes de soporte reciben una primera respuest? clara en menos de 12 minutos.",
    metric: "11 min",
  },
];

function Icon({ name, size = 20, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {name === "home" && (
        <>
          <path d="M3.5 10.5 12 4l8.5 6.5" />
          <path d="M6 9.5V20h12V9.5" />
        </>
      )}
      {name === "grid" && (
        <>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </>
      )}
      {name === "dashboard" && (
        <>
          <path d="M4 13h7V4H4Z" />
          <path d="M13 20h7v-9h-7Z" />
          <path d="M13 4h7v5h-7Z" />
          <path d="M4 20h7v-5H4Z" />
        </>
      )}
      {name === "calendar" && (
        <>
          <path d="M7 3v3" />
          <path d="M17 3v3" />
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M4 10h16" />
        </>
      )}
      {name === "clipboard" && (
        <>
          <rect x="6" y="5" width="12" height="15" rx="2" />
          <path d="M9 5.5h6" />
          <path d="M9 9h6" />
          <path d="M9 13h6" />
        </>
      )}
      {name === "message" && (
        <>
          <path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
        </>
      )}
      {name === "user-plus" && (
        <>
          <path d="M15.5 20v-1.5a4.5 4.5 0 0 0-4.5-4.5H8a4.5 4.5 0 0 0-4.5 4.5V20" />
          <circle cx="9.5" cy="7" r="3.5" />
          <path d="M18 8v6" />
          <path d="M15 11h6" />
        </>
      )}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </>
      )}
      {name === "users" && (
        <>
          <circle cx="9" cy="9" r="3" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M4.5 19a5 5 0 0 1 9 0" />
          <path d="M14.5 19a4 4 0 0 1 5 0" />
        </>
      )}
      {name === "help" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.8 9a2.4 2.4 0 1 1 3.9 2c-.8.6-1.7 1.1-1.7 2.5" />
          <path d="M12 17h.01" />
        </>
      )}
      {name === "logout" && (
        <>
          <path d="M10 17H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4" />
          <path d="M14 8l4 4-4 4" />
          <path d="M18 12H9" />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </>
      )}
      {name === "bell" && (
        <>
          <path d="M6 17h12l-1.4-1.4A2 2 0 0 1 16 14.2V10a4 4 0 1 0-8 0v4.2a2 2 0 0 1-.6 1.4Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </>
      )}
      {name === "accessibility" && (
        <>
          <circle cx="12" cy="5" r="2.5" />
          <path d="M7 9.5h10" />
          <path d="M12 7.5v11" />
          <path d="M9 20 12 14l3 6" />
        </>
      )}
      {name === "palette" && (
        <>
          <path d="M12 4a8 8 0 0 0 0 16h1a2 2 0 0 0 0-4h-1.5a1.5 1.5 0 0 1-1.5-1.5A2.5 2.5 0 0 1 12.5 12H14a6 6 0 0 0 0-8Z" />
          <circle cx="8" cy="10" r="1" />
          <circle cx="10.5" cy="7.5" r="1" />
          <circle cx="14.5" cy="7.5" r="1" />
        </>
      )}
      {name === "shoe" && (
        <>
          <path d="M5 16c3 0 4.5-2 6.5-5l2 1.5c1 1 2.2 1.5 3.5 1.5h2a2 2 0 0 1 2 2v2H5Z" />
          <path d="M10 11 8 8" />
        </>
      )}
      {name === "heart-pulse" && (
        <>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
          <path d="M8 12h2l1.2-2.4L13 15l1.2-3H16" />
        </>
      )}
      {name === "camera" && (
        <>
          <rect x="4" y="7" width="16" height="12" rx="2" />
          <path d="M8 7 9.5 5h5L16 7" />
          <circle cx="12" cy="13" r="3" />
        </>
      )}
      {name === "book" && (
        <>
          <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21Z" />
          <path d="M5 5.5V21" />
        </>
      )}
      {name === "check-badge" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="m8.5 12 2.2 2.2 4.8-4.8" />
        </>
      )}
      {name === "sparkles" && (
        <>
          <path d="m12 3 1.2 3.4L16.5 7.5l-3.3 1.1L12 12l-1.2-3.4L7.5 7.5l3.3-1.1Z" />
          <path d="m18 13 .7 2 .8.3-.8.3-.7 2-.7-2-.8-.3.8-.3Z" />
          <path d="m6 14 .8 2.2L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8Z" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M12 3 5 6v5c0 4.4 2.9 8.5 7 10 4.1-1.5 7-5.6 7-10V6Z" />
          <path d="m9.3 12 1.8 1.8 3.6-3.6" />
        </>
      )}
      {name === "building" && (
        <>
          <path d="M4 20h16" />
          <path d="M6 20V6h12v14" />
          <path d="M9 9h2" />
          <path d="M13 9h2" />
          <path d="M9 13h2" />
          <path d="M13 13h2" />
        </>
      )}
      {name === "filter" && (
        <>
          <path d="M4 6h16" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </>
      )}
      {name === "bar-chart" && (
        <>
          <path d="M5 20V11" />
          <path d="M12 20V7" />
          <path d="M19 20V4" />
        </>
      )}
      {name === "settings" && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2.2" />
          <path d="M12 18.8V21" />
          <path d="m4.9 4.9 1.6 1.6" />
          <path d="m17.5 17.5 1.6 1.6" />
          <path d="M3 12h2.2" />
          <path d="M18.8 12H21" />
          <path d="m4.9 19.1 1.6-1.6" />
          <path d="m17.5 6.5 1.6-1.6" />
        </>
      )}
      {name === "map-pin" && (
        <>
          <path d="M12 20s6-5.6 6-10a6 6 0 1 0-12 0c0 4.4 6 10 6 10Z" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      )}
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v5l3 2" />
        </>
      )}
      {name === "mail" && (
        <>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="m5 8 7 5 7-5" />
        </>
      )}
      {name === "bookmark" && (
        <>
          <path d="M7 4h10v16l-5-3-5 3Z" />
        </>
      )}
      {name === "arrow-left" && (
        <>
          <path d="M15 18 9 12l6-6" />
        </>
      )}
      {name === "send" && (
        <>
          <path d="M3 20 21 12 3 4l2.6 7.4L15 12l-9.4.6Z" />
        </>
      )}
      {name === "close" && (
        <>
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        </>
      )}
      {name === "check" && <path d="m5 12 4 4L19 6" />}
      {name === "info" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v5" />
          <path d="M12 7h.01" />
        </>
      )}
      {name === "trash" && (
        <>
          <path d="M9 3H7a2 2 0 0 0-2 2v1h14V5a2 2 0 0 0-2-2h-2" />
          <path d="M4 7h16" />
          <path d="M9 11v6" />
          <path d="M12 11v6" />
          <path d="M15 11v6" />
          <path d="M4 7l1.5 12a2 2 0 0 0 2 1.5h9a2 2 0 0 0 2-1.5L20 7" />
        </>
      )}
      {name === "heart" && (
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
      )}
      {name === "send" && (
        <>
          <path d="M22 2L11 13" />
          <path d="M22 2l-7 20-5-9-9-5 20-7z" />
        </>
      )}
    </svg>
  );
}

function Button({ children, variant = "primary", type = "button", onClick, disabled = false }) {
  return (
    <button className={`button button-${variant}`} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

function Badge({ children, tone = "violet" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Sidebar({ activeView, isAuthenticated, navItems, onHelpOpen, onLogout, onOpenLogin, setView }) {
  return (
    <aside className="sidebar">
      <div className="brand-panel">
        <img alt="Club Chicaneo +55" className="brand-wordmark" src={brandWordmark} />
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const active = activeView === item.id || (activeView === "activity-detail" && item.id === "activities");
          return (
            <button
              key={item.id}
              className={`nav-button ${active ? "nav-button-active" : ""}`}
              onClick={() => setView(item.id)}
              type="button"
            >
              <Icon className="nav-button-icon" name={item.icon} size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-button nav-button-muted" onClick={onHelpOpen} type="button">
          <Icon className="nav-button-icon" name="help" size={18} />
          <span>Ayuda</span>
        </button>
        {isAuthenticated ? (
          <button className="nav-button nav-button-muted" onClick={onLogout} type="button">
            <Icon className="nav-button-icon" name="logout" size={18} />
            <span>Cerrar sesión</span>
          </button>
        ) : (
          <button className="nav-button nav-button-muted" onClick={onOpenLogin} type="button">
            <Icon className="nav-button-icon" name="user-plus" size={18} />
            <span>Iniciar sesión</span>
          </button>
        )}
      </div>
    </aside>
  );
}

function Topbar({
  currentUser,
  isAuthenticated,
  notifications,
  onOpenLogin,
  onSearchSubmit,
  onToggleNotifications,
  query,
  setQuery,
  showNotifications,
  onNavigate,
}) {
  const userLabel = roleLabels[currentUser?.rol] ?? "Usuario";

  return (
    <header className="topbar">
      <form
        className="search-shell"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
      >
        <button aria-label="Buscar actividades" className="icon-inline-button" type="submit">
          <Icon name="search" size={18} />
        </button>
        <input
          className="search-input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar actividades, categorias o lugares..."
          value={query}
        />
        <span className="shortcut-chip">Ctrl + K</span>
      </form>

      <div className="topbar-actions">
        <div className="notification-shell">
          <button aria-label="Notificaciones" className="alert-button" onClick={onToggleNotifications} type="button">
            <Icon name="bell" size={18} />
            <span className="alert-dot" />
          </button>
          {showNotifications && (
            <div className="notification-popover">
              <div className="panel-header">
                <h3>Notificaciones</h3>
              </div>
              <div className="stack-list">
                {notifications.map((notification) => (
                  <article className="mini-card notification-card" key={notification.id}>
                    <strong>{notification.title}</strong>
                    <p>{notification.description}</p>
                    <span>{notification.time}</span>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <button
            className="user-chip button-none"
            onClick={() => onNavigate("profile")}
            type="button"
            aria-label="Ir a mi perfil"
          >
            <div className="user-avatar">
              {`${currentUser?.nombre?.[0] ?? "U"}${currentUser?.apellido?.[0] ?? ""}`}
            </div>
            <div>
              <strong>{`Hola, ${currentUser?.nombre ?? "Usuario"}`}</strong>
              <span>{userLabel}</span>
            </div>
          </button>
        ) : (
          <Button onClick={onOpenLogin} variant="outline">
            Iniciar sesión
          </Button>
        )}
      </div>
    </header>
  );
}

function Toast({ feedback, onClose }) {
  if (!feedback) return null;

  return (
    <div className={`toast toast-${feedback.type}`}>
      <div className="toast-copy">
        <strong>{feedback.title}</strong>
        <p>{feedback.message}</p>
      </div>
      <button aria-label="Cerrar mensaje" className="toast-close" onClick={onClose} type="button">
        <Icon name="close" size={18} />
      </button>
    </div>
  );
}

function TutorialModal({ onClose, step, setStep }) {
  const activeStep = tutorialSteps[step];
  const isLastStep = step === tutorialSteps.length - 1;

  return (
    <div className="overlay">
      <div className="modal tutorial-modal">
        <div className="modal-header">
          <Badge tone="violet">Tutorial inicial</Badge>
          <button className="text-button" onClick={onClose} type="button">
            Omitir
          </button>
        </div>

        <div className="tutorial-media">
          <img alt="Persona mayor usando la plataforma" src={registerPortrait} />
        </div>

        <h3>{activeStep.title}</h3>
        <p>{activeStep.body}</p>

        <div className="tutorial-progress">
          {tutorialSteps.map((item, index) => (
            <span key={item.title} className={index === step ? "tutorial-progress-active" : ""} />
          ))}
        </div>

        <div className="modal-actions">
          <Button disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} variant="ghost">
            Anterior
          </Button>
          <Button onClick={() => (isLastStep ? onClose() : setStep((current) => current + 1))}>
            {isLastStep ? "Comenzar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function HelpDrawer({ onClose }) {
  return (
    <div className="drawer">
      <div className="drawer-card">
        <div className="drawer-header">
          <div>
            <Badge tone="sky">Ayuda</Badge>
            <h3>Centro de ayuda ra¡pido</h3>
          </div>
          <button aria-label="Cerrar ayuda" className="toast-close" onClick={onClose} type="button">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="stack-list">
          <article className="mini-card">
            <strong>Preguntas frecuentes</strong>
            <p>Resuelve dudas sobre reservas, accesibilidad, seguridad y cambios de actividades.</p>
          </article>
          <article className="mini-card">
            <strong>Guias y tutoriales</strong>
            <p>Aprende a usar el buscador, el filtro, el calendario y el chat con proveedores.</p>
          </article>
          <article className="mini-card">
            <strong>Contactanos</strong>
            <p>Si necesitas apoyo humano, puedes escribirnos o pedir acompañ±amiento telefónico.</p>
          </article>
        </div>
      </div>
    </div>
  );
}

function AccessibilityDrawer({ onClose, settings, setSettings }) {
  return (
    <div className="drawer">
      <div className="drawer-card">
        <div className="drawer-header">
          <div>
            <Badge tone="violet">Accesibilidad</Badge>
            <h3>Opciones de accesibilidad</h3>
          </div>
          <button aria-label="Cerrar panel de accesibilidad" className="toast-close" onClick={onClose} type="button">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="setting-group">
          <span>Tamano del texto</span>
          <div className="choice-grid">
            {[
              ["sm", "Pequeno"],
              ["md", "Medio"],
              ["lg", "Grande"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`choice-chip ${settings.textSize === value ? "choice-chip-active" : ""}`}
                onClick={() => setSettings((current) => ({ ...current, textSize: value }))}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <span>Contraste</span>
          <div className="choice-grid">
            {[
              ["normal", "Normal"],
              ["high", "Alto contraste"],
              ["invert", "Contraste invertido"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`choice-chip ${settings.contrast === value ? "choice-chip-active" : ""}`}
                onClick={() => setSettings((current) => ({ ...current, contrast: value }))}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <span>Modo visual</span>
          <div className="choice-grid choice-grid-compact">
            {[
              ["default", "Desactivado"],
              ["protanopia", "Protanopia"],
              ["deuteranopia", "Deuteranopia"],
              ["tritanopia", "Tritanopia"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={`choice-chip ${settings.colorMode === value ? "choice-chip-active" : ""}`}
                onClick={() => setSettings((current) => ({ ...current, colorMode: value }))}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={onClose}>Guardar preferencias</Button>
      </div>
    </div>
  );
}

function HomeView({
  activities,
  categories,
  currentUser,
  filters,
  isAuthenticated,
  onActivityOpen,
  onShowTutorial,
  onToggleSaved,
  savedIds,
  setFilters,
  setView,
}) {
  const upcomingActivities = activities.filter((activity) => ["painting", "yoga", "walk"].includes(activity.id));
  const greeting = isAuthenticated ? `Hola, ${currentUser.nombre}!` : "Hola!";
  
  // Filtrar actividades basadas en la categoría seleccionada
  const displayedActivities = filters.category === "all" 
    ? activities 
    : activities.filter((activity) => activity.categoryId === filters.category);

  return (
    <section className="page-section">
      <div className="hero-layout">
        <div className="panel">
          <div className="section-kicker">
            <Badge tone="mint">Bienvenida</Badge>
            <h1>{greeting}</h1>
          </div>

          <div className="hero-banner">
            <img alt="Personas mayores compartiendo un momento feliz" className="hero-banner-image" src={happySeniorsHero} />
            <div className="hero-banner-overlay" />
            <div className="hero-banner-copy">
              <h2>Disfruta, aprende y comparte actividades pensadas para ti.</h2>
              <div className="hero-banner-actions">
                <Button onClick={() => setView("activities")}>Explorar actividades</Button>
                {isAuthenticated && (
                  <Button onClick={onShowTutorial} variant="secondary">
                    Ver tutorial
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="section-block">
            <div className="section-heading">
              
              <h3>Explora por categoria</h3>
            </div>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilters((current) => ({ ...current, category: category.id }))}
                  className={`category-card category-card-${category.tone} ${filters.category === category.id ? 'category-card-active' : ''}`}
                  type="button"
                >
                  <div className="category-icon">
                    <Icon name={category.icon} size={20} />
                  </div>
                  <div>
                    <strong>{category.label}</strong>
                    <span>{category.count} actividades</span>
                  </div>
                </button>
              ))}
            </div>
            {filters.category !== "all" && (
              <button
                onClick={() => setFilters((current) => ({ ...current, category: "all" }))}
                className="text-button"
                type="button"
              >
                Ver todas las categorías
              </button>
            )}
          </div>

          <div className="section-block">
            <div className="section-heading">
              <h3>{filters.category === "all" ? "Actividades recomendadas para ti" : `Actividades de ${categories.find((c) => c.id === filters.category)?.label || ""}`}</h3>
            </div>
            <div className="activity-grid activity-grid-home">
              {displayedActivities.length > 0 ? (
                displayedActivities.map((activity) => (
                  <ActivityCard
                    activity={activity}
                    key={activity.id}
                    onActivityOpen={onActivityOpen}
                    onToggleSaved={onToggleSaved}
                    saved={savedIds.includes(activity.id)}
                  />
                ))
              ) : (
                <p>No hay actividades disponibles en est? categoría.</p>
              )}
            </div>
          </div>

        </div>

        <aside className="panel panel-sidebar calendar-sidebar">
          <div className="panel-header">
            <h3>Proximas actividades</h3>
            <button className="text-button" onClick={() => setView("calendar")} type="button">
              Ver todas
            </button>
          </div>

          <div className="upcoming-list">
            {upcomingActivities.map((activity) => (
              <button className="upcoming-item" key={activity.id} onClick={() => onActivityOpen(activity)} type="button">
                <img alt={activity.title} src={activity.image} />
                <div>
                  <strong>{activity.title}</strong>
                  <span>{activity.date}</span>
                  <small>{activity.location}</small>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function ActivityCard({ activity, onActivityOpen, onToggleSaved, saved }) {
  return (
    <article className="activity-card">
      <button className="activity-card-media" onClick={() => onActivityOpen(activity)} type="button">
        <img alt={activity.title} src={activity.image} />
      </button>

      <div className="activity-card-body">
        <div className="activity-card-meta">
          <Badge tone={activity.categoryTone}>{activity.category}</Badge>
          <button
            aria-label={saved ? "Quitar de favoritos" : "Guardar en favoritos"}
            className={`save-button ${saved ? "save-button-active" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              onToggleSaved(activity.id);
            }}
            type="button"
          >
            <Icon name={saved ? "bookmark" : "bookmark"} size={18} />
          </button>
        </div>

        <button className="activity-card-title" onClick={() => onActivityOpen(activity)} type="button">
          {activity.title}
        </button>

        <p>{activity.shortDescription}</p>

        <div className="activity-card-info">
          <span>
            <Icon name="clock" size={15} />
            {activity.time}
          </span>
          <span>
            <Icon name="map-pin" size={15} />
            {activity.location}
          </span>
        </div>
      </div>
    </article>
  );
}

function SavedActivitiesView({
  activities,
  savedIds,
  onActivityOpen,
  onToggleSaved,
  onNavigate,
}) {
  const savedActivities = activities.filter((activity) => savedIds.includes(activity.id));

  return (
    <section className="page-section">
      <div className="section-kicker">
        <h2>Mis intereses</h2>
        <p>Actividades que te han llamado la atención y que puedes revisar en cualquier momento.</p>
      </div>

      <div className="panel">
        {savedActivities.length > 0 ? (
          <div className="activity-grid">
            {savedActivities.map((activity) => (
              <ActivityCard
                activity={activity}
                key={activity.id}
                onActivityOpen={onActivityOpen}
                onToggleSaved={onToggleSaved}
                saved={true}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Icon name="bookmark" size={40} />
            </div>
            <h3>Aún no tienes actividades guardadas</h3>
            <p>Explora las actividades disponibles y guarda las que te interesen para tenerlas siempre a mano.</p>
            <Button onClick={() => onNavigate("activities")} type="button">
              Explorar actividades
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function CommunityView({
  posts,
  setPosts,
  users,
  currentUser,
  followingIds,
  setFollowingIds,
  likedPostIds,
  setLikedPostIds,
  setNotifications,
}) {
  const [newComment, setNewComment] = useState({});

  const handleLikePost = (postId) => {
    const isLiked = likedPostIds.includes(postId);
    const post = posts.find(p => p.id === postId);
    
    if (!isLiked) {
      setNotifications(prev => [
        {
          id: `like-${Date.now()}`,
          title: "¡Te ha gustado!",
          description: `Le diste like a la p?blicación de ${post.author}`,
          time: "Ahora"
        },
        ...prev
      ]);
    }
    
    setLikedPostIds(isLiked ? likedPostIds.filter((id) => id !== postId) : [...likedPostIds, postId]);
  };

  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;

    const post = posts.find(p => p.id === postId);
    
    setNotifications(prev => [
      {
        id: `comment-${Date.now()}`,
        title: "Comentario publicado",
        description: `Comentaste en la p?blicación de ${post.author}`,
        time: "Ahora"
      },
      ...prev
    ]);

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: `${currentUser.nombre} ${currentUser.apellido}`,
                  text: text.trim(),
                  timestamp: "Ahora",
                },
              ],
            }
          : post
      )
    );
    setNewComment({ ...newComment, [postId]: "" });
  };

  const handleFollowUser = (userId) => {
    const isFollowing = followingIds.includes(userId);
    const user = users.find(u => u.id === userId);
    
    if (!isFollowing) {
      setNotifications(prev => [
        {
          id: `follow-${Date.now()}`,
          title: "Nuevo seguido",
          description: `Ahora estás siguiendo a ${user.nombre} ${user.apellido}`,
          time: "Ahora"
        },
        ...prev
      ]);
    }
    
    setFollowingIds(isFollowing ? followingIds.filter((id) => id !== userId) : [...followingIds, userId]);
  };

  return (
    <section className="page-section">
      <div className="section-kicker">
        <h2>Comunidad</h2>
        <p>Conecta con otros miembros, comparte experiencias y sígueles para mantenerte inspirado.</p>
      </div>

      <div className="split-layout community-layout">
        <div className="panel community-feed">
          <div className="panel-header">
            <h3>Feed de actividades</h3>
          </div>

          <div className="posts-list">
            {posts.map((post) => (
              <article className="post-card" key={post.id}>
                <div className="post-header">
                  <div className="post-author">
                    <img alt={post.author} className="post-avatar" src={post.avatar} />
                    <div>
                      <strong>{post.author}</strong>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                <p className="post-content">{post.content}</p>

                {post.image && <img alt="Post content" className="post-image" src={post.image} />}

                <div className="post-actions">
                  <button
                    className={`post-action-btn ${likedPostIds.includes(post.id) ? "post-action-active" : ""}`}
                    onClick={() => handleLikePost(post.id)}
                    type="button"
                  >
                    <Icon name="heart" size={18} />
                    <span>{post.likes + (likedPostIds.includes(post.id) ? 1 : 0)}</span>
                  </button>
                  <button className="post-action-btn" type="button">
                    <Icon name="message" size={18} />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                <div className="post-comments">
                  <div className="comments-list">
                    {post.comments.map((comment) => (
                      <div className="comment" key={comment.id}>
                        <strong>{comment.author}</strong>
                        <p>{comment.text}</p>
                        <small>{comment.timestamp}</small>
                      </div>
                    ))}
                  </div>

                  <div className="comment-input">
                    <input
                      onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                      placeholder="Escribe un comentario..."
                      type="text"
                      value={newComment[post.id] || ""}
                    />
                    <button
                      onClick={() => handleAddComment(post.id, newComment[post.id])}
                      type="button"
                    >
                      <Icon name="send" size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel panel-sidebar community-sidebar">
          <div className="panel-header">
            <h3>Síguelos</h3>
          </div>

          <div className="stack-list users-to-follow">
            {users.map((user) => (
              <article className="user-card" key={user.id}>
                <img alt={user.nombre} className="user-avatar-lg" src={user.imagen} />
                <div className="user-info">
                  <strong>{user.nombre} {user.apellido}</strong>
                  <p>{user.bio}</p>
                  <span className="user-followers">{user.followers} seguidores</span>
                </div>
                <button
                  className={`button button-sm ${followingIds.includes(user.id) ? "button-following" : "button-secondary"}`}
                  onClick={() => handleFollowUser(user.id)}
                  type="button"
                >
                  {followingIds.includes(user.id) ? "Siguiendo" : "Seguir"}
                </button>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function ActivitiesView({
  categories,
  filteredActivities,
  filters,
  onActivityOpen,
  onResetFilters,
  onToggleSaved,
  savedIds,
  setFilters,
}) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <h2>Filtrado de actividades</h2>
        <p>Filtros visibles, entendibles y siempre disponibles para encontrar opciones ra¡pido y sin confusión.</p>
      </div>

      <div className="split-layout">
        <aside className="panel panel-filter">
          <div className="panel-header">
            <h3>Filtrar actividades</h3>
            <button className="text-button" onClick={onResetFilters} type="button">
              Limpiar filtros
            </button>
          </div>

          <label className="field">
            <span>Buscar por palabra clave</span>
            <input
              onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
              placeholder="Ej: pintura, yoga, museo..."
              value={filters.query}
            />
          </label>

          <label className="field">
            <span>Categoria</span>
            <select
              onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
              value={filters.category}
            >
              <option value="all">Todas las categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Ubicacion</span>
            <select
              onChange={(event) => setFilters((current) => ({ ...current, location: event.target.value }))}
              value={filters.location}
            >
              <option value="all">Todas las ubicaciones</option>
              <option value="Cali">Cali</option>
              <option value="Museo">Museos</option>
              <option value="Parque">Parques</option>
              <option value="Playa">Playa</option>
            </select>
          </label>

          <label className="toggle-row">
            <input
              checked={filters.freeOnly}
              onChange={(event) => setFilters((current) => ({ ...current, freeOnly: event.target.checked }))}
              type="checkbox"
            />
            <span>Solo gratuitas</span>
          </label>

          <label className="toggle-row">
            <input
              checked={filters.accessibleOnly}
              onChange={(event) =>
                setFilters((current) => ({ ...current, accessibleOnly: event.target.checked }))
              }
              type="checkbox"
            />
            <span>Solo accesibles</span>
          </label>

          <Button>
            <Icon name="filter" size={16} />
            Aplicar filtros
          </Button>
        </aside>

        <div className="panel panel-results">
          <div className="panel-header">
            <div>
              <h3>Catalogo de actividades</h3>
              <p className="section-caption">{filteredActivities.length} actividades coinciden con tus filtros.</p>
            </div>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Icon name="search" size={24} />
              </div>
              <h4>No encontramos actividades con esos criterios</h4>
              <p>Prueba otra palabra clave o limpia los filtros para continuar.</p>
              <Button onClick={onResetFilters} variant="secondary">
                Limpiar busqueda
              </Button>
            </div>
          ) : (
            <div className="activity-grid">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  activity={activity}
                  key={activity.id}
                  onActivityOpen={onActivityOpen}
                  onToggleSaved={onToggleSaved}
                  saved={savedIds.includes(activity.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DetailView({ activity, onBack, onChatOpen, onReserve, onToggleSaved, saved }) {
  const gallery = activity.gallery?.length ? activity.gallery : [activity.image];

  return (
    <section className="page-section">
      <button className="back-link" onClick={onBack} type="button">
        <Icon name="arrow-left" size={16} />
        Volver a actividades
      </button>

      <div className="detail-layout">
        <div className="panel">
          <div className="detail-hero">
            <img alt={activity.title} src={activity.image} />
          </div>

          <div className="detail-gallery">
            {gallery.map((image, index) => (
              <div className="detail-thumb" key={`${activity.id}-${index}`}>
                <img alt={`${activity.title} vista ${index + 1}`} src={image} />
              </div>
            ))}
          </div>

          <div className="detail-header">
            <div>
              <Badge tone={activity.categoryTone}>{activity.category}</Badge>
              <h2>{activity.title}</h2>
              <p className="detail-provider">
                {activity.provider} • {activity.providerType}
              </p>
            </div>
            <button
              aria-label={saved ? "Quitar de favoritos" : "Guardar actividad"}
              className={`floating-save ${saved ? "floating-save-active" : ""}`}
              onClick={() => onToggleSaved(activity.id)}
              type="button"
            >
              <Icon name="bookmark" size={18} />
            </button>
          </div>

          <div className="detail-info-grid">
            <InfoTile icon="calendar" label="Fecha" value={activity.date} />
            <InfoTile icon="clock" label="Hora" value={activity.time} />
            <InfoTile icon="map-pin" label="Lugar" value={activity.location} />
            <InfoTile icon="accessibility" label="Accesibilidad" value={activity.accessible ? "Si" : "No"} />
          </div>

          <div className="detail-copy">
            <h3>Descripcion</h3>
            <p>{activity.description}</p>
          </div>

          <div className="detail-copy">
            <h3>Restricciones e indicaciones</h3>
            <ul className="plain-list">
              {activity.restrictions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="panel panel-sidebar">
          <div className="reservation-card">
            <Badge tone="mint">Mensaje clave</Badge>
            <h3>Su inscripci?n fue realizada correctamente</h3>
            <p>El sistema comunica el resultado con claridad y deja visible el siguiente paso.</p>

            <Button onClick={() => onReserve(activity)}>Inscribirme</Button>
            <Button onClick={() => onToggleSaved(activity.id)} variant="secondary">
              {saved ? "Quitar de me interesa" : "Me interesa"}
            </Button>
            <Button onClick={onChatOpen} variant="outline">
              <Icon name="message" size={16} />
              Abrir chat
            </Button>
          </div>

          <div className="provider-card">
            <h4>Proveedor</h4>
            <strong>{activity.provider}</strong>
            <p>{activity.providerType}</p>
            <div className="provider-meta">
              <span>
                <Icon name="mail" size={15} />
                contacto@clubchicaneo55.com
              </span>
              <span>
                <Icon name="map-pin" size={15} />
                {activity.location}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <article className="info-tile">
      <div className="info-tile-icon">
        <Icon name={icon} size={17} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function CalendarView({ reservations, setReservations, onOpenReservation }) {
  const [deleteModalData, setDeleteModalData] = useState(null);
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const calendarEntries = useMemo(() => {
    const entries = {};

    reservations.forEach((reservation) => {
      let day = null;

      if (reservation.rawDate) {
        const parsed = new Date(`${reservation.rawDate}T00:00:00`);
        if (!Number.isNaN(parsed.getTime())) {
          day = parsed.getUTCDate();
        }
      }

      if (!day) {
        const match = String(reservation.date).match(/^(\d{1,2})/);
        day = match ? Number(match[1]) : null;
      }

      if (!day || day < 1 || day > 31) return;

      entries[day] = entries[day] || [];
      entries[day].push(reservation);
    });

    return entries;
  }, [reservations]);

  const handleDeleteReservation = (reservation) => {
    setDeleteModalData(reservation);
  };

  const confirmDelete = () => {
    if (deleteModalData) {
      setReservations((current) => current.filter((res) => res.id !== deleteModalData.id));
      setDeleteModalData(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalData(null);
  };

  return (
    <section className="page-section">
      <div className="section-kicker">
        <h2>Reserva y seguimiento en un solo lugar</h2>
        <p>El calendario conserva la información importante de forma visible y ordenada.</p>
      </div>

      <div className="split-layout calendar-layout">
        <div className="panel calendar-panel">
          <div className="panel-header">
            <h3>Mayo 2026</h3>
          </div>

          <div className="calendar-grid">
            {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day) => (
              <div className="calendar-head" key={day}>
                {day}
              </div>
            ))}

            {days.map((day) => {
              const dayEvents = calendarEntries[day] || [];
              const hasEvents = dayEvents.length > 0;
              return (
                <article
                  className={`calendar-day ${hasEvents ? "calendar-day-active calendar-day-clickable" : ""}`}
                  key={day}
                  onClick={() => hasEvents && onOpenReservation?.(dayEvents[0])}
                  onKeyDown={(event) => {
                    if (hasEvents && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      onOpenReservation?.(dayEvents[0]);
                    }
                  }}
                  role={hasEvents ? "button" : undefined}
                  tabIndex={hasEvents ? 0 : -1}
                >
                  <strong>{day}</strong>
                  {hasEvents && (
                    <>
                      <span>{dayEvents[0].title}</span>
                      {dayEvents.length > 1 && <small>{dayEvents.length} actividades</small>}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <aside className="panel panel-sidebar">
          <div className="panel-header">
            <h3>Reservas confirmadas</h3>
          </div>
          <div className="stack-list">
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <article className="mini-card reservation-mini-card" key={reservation.id}>
                  <div className="reservation-header">
                    <div>
                      <strong>{reservation.title}</strong>
                      <p>
                        {reservation.date} • {reservation.time}
                      </p>
                      <span>{reservation.location}</span>
                    </div>
                    <button
                      aria-label="Eliminar reserva"
                      className="icon-inline-button"
                      onClick={() => handleDeleteReservation(reservation)}
                      title="Eliminar reserva"
                      type="button"
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p>No tienes reservas confirmadas aún.</p>
            )}
          </div>
        </aside>
      </div>

      {deleteModalData && (
        <div className="overlay">
          <div className="modal confirmation-modal">
            <div className="modal-header">
              <Badge tone="danger">Eliminar reserva</Badge>
            </div>

            <div className="modal-content">
              <h3>¿Deseas eliminar est? reserva?</h3>
              <p>Estás a punto de eliminar tu inscripción a:</p>
              <strong>{deleteModalData.title}</strong>
              <span>{deleteModalData.date} • {deleteModalData.time}</span>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginTop: "12px" }}>
                Podrás volver a inscribirte en cualquier momento desde la sección de actividades.
              </p>
            </div>

            <div className="modal-actions">
              <Button onClick={cancelDelete} variant="ghost">
                Cancelar
              </Button>
              <Button onClick={confirmDelete} variant="danger">
                Eliminar reserva
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MessagesView({ threads, setThreads }) {
  const [draft, setDraft] = useState("");
  const [activeChatId, setActiveChatId] = useState(threads[0]?.id ?? initialChatThreads[0].id);

  const activeThread = threads.find((thread) => thread.id === activeChatId) || threads[0];

  const sendMessage = () => {
    if (!draft.trim()) return;

    const nextMessage = {
      id: Date.now(),
      author: "user",
      text: draft.trim(),
      time: "Ahora",
    };

    setThreads((current) =>
      current.map((thread) =>
        thread.id === activeChatId
          ? {
              ...thread,
              messages: [...thread.messages, nextMessage],
              lastMessage: draft.trim(),
              time: "Ahora",
            }
          : thread,
      ),
    );
    setDraft("");
  };

  useEffect(() => {
    if (!threads.some((thread) => thread.id === activeChatId)) {
      setActiveChatId(threads[0]?.id ?? null);
    }
  }, [activeChatId, threads]);

  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="violet">Comunicacion</Badge>
        <h2>Mensajes</h2>
        <p>Selecciona un chat para ver la conversacion y enviar mensajes directamente.</p>
      </div>

      <div className="panel chat-panel">
        <aside className="chat-sidebar">
          <div className="chat-sidebar-header">
            <strong>Chats</strong>
            <span>Elige una conversacion</span>
          </div>
          <div className="chat-list">
            {threads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                className={`chat-list-item ${thread.id === activeChatId ? "chat-list-item-active" : ""}`}
                onClick={() => setActiveChatId(thread.id)}
              >
                <div className="chat-list-item-left">
                  <div className="provider-avatar">{thread.initials}</div>
                  <div>
                    <strong>{thread.title}</strong>
                    <span>{thread.subtitle}</span>
                  </div>
                </div>
                <div className="chat-list-item-meta">
                  <small>{thread.time}</small>
                  <p>{thread.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="chat-view">
          <div className="chat-head">
            <div className="provider-chip">
              <div className="provider-avatar">{activeThread.initials}</div>
              <div>
                <strong>{activeThread.title}</strong>
                <span>{activeThread.subtitle}</span>
              </div>
            </div>
            <Button variant="secondary">Seguir</Button>
          </div>

          <div className="chat-thread">
            {activeThread?.messages.map((message) => (
              <article
                className={`chat-bubble ${message.author === "user" ? "chat-bubble-user" : "chat-bubble-provider"}`}
                key={message.id}
              >
                <p>{message.text}</p>
                {message.attachment && (
                  <div className="chat-attachment">
                    <Icon name="mail" size={15} />
                    <span>{message.attachment}</span>
                  </div>
                )}
                <small>{message.time}</small>
              </article>
            ))}
          </div>

          <div className="chat-compose">
            <input
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Escribe un mensaje..."
              value={draft}
            />
            <Button onClick={sendMessage}>
              <Icon name="send" size={16} />
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegisterView({ registerErrors, registerForm, registered, setRegisterForm, submitRegister }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <h2>Registro de usuario</h2>
        <p>Formulario simple, claro y acompañ±ado por mensajes de apoyo comprensibles.</p>
      </div>

      <div className="split-layout">
        <aside className="panel register-story">
          <img alt="Persona mayor utilizando un computador para registrarse" className="register-story-image" src={registerPortrait} />
          <div className="register-story-copy">
            <h3>Registro guiado</h3>
            <p>El usuario debe completar el registro en menos de 5 minutos y con má¡ximo un error corregible.</p>
          </div>
          <div className="register-metrics">
            <article className="metric-card">
              <Icon name="clock" size={18} />
              <div>
                <strong>Menos de 5 minutos</strong>
                <span>Proceso corto y guiado.</span>
              </div>
            </article>
            <article className="metric-card">
              <Icon name="check-badge" size={18} />
              <div>
                <strong>Validaciones claras</strong>
                <span>Mensajes puntuales y amigables.</span>
              </div>
            </article>
          </div>
        </aside>

        <form className="panel register-form" onSubmit={submitRegister}>
          <div className="panel-header">
            <div>
              <h3>Crear cuenta</h3>
              <p className="section-caption">Completa tus datos para registrarte.</p>
            </div>
            <img alt="Registro exitoso" className="register-success-image" src={registerSuccess} />
          </div>

          <div className="form-row">
            <label className="field">
              <span>Nombre</span>
              <input
                onChange={(event) => setRegisterForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Ej: Maria"
                value={registerForm.name}
              />
              {registerErrors.name && <small className="field-error">{registerErrors.name}</small>}
            </label>

            <label className="field">
              <span>Apellido</span>
              <input
                onChange={(event) => setRegisterForm((current) => ({ ...current, lastName: event.target.value }))}
                placeholder="Ej: Perez"
                value={registerForm.lastName}
              />
              {registerErrors.lastName && <small className="field-error">{registerErrors.lastName}</small>}
            </label>
          </div>

          <label className="field">
            <span>Correo electrónico</span>
            <input
              onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="Ej: maria@email.com"
              value={registerForm.email}
            />
            {registerErrors.email && <small className="field-error">{registerErrors.email}</small>}
          </label>

          <div className="form-row">
            <label className="field">
              <span>ContraseÃ±a</span>
              <input
                onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Minimo 6 caracteres"
                type="password"
                value={registerForm.password}
              />
              {registerErrors.password && <small className="field-error">{registerErrors.password}</small>}
            </label>

            <label className="field">
              <span>Confirmar contrasena</span>
              <input
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, confirmPassword: event.target.value }))
                }
                placeholder="Repite tu contrasena"
                type="password"
                value={registerForm.confirmPassword}
              />
              {registerErrors.confirmPassword && (
                <small className="field-error">{registerErrors.confirmPassword}</small>
              )}
            </label>
          </div>

          <label className="toggle-row">
            <input
              checked={registerForm.acceptedTerms}
              onChange={(event) =>
                setRegisterForm((current) => ({ ...current, acceptedTerms: event.target.checked }))
              }
              type="checkbox"
            />
            <span>Acepto los términos y condiciones.</span>
          </label>
          {registerErrors.acceptedTerms && <small className="field-error">{registerErrors.acceptedTerms}</small>}

          <Button type="submit">Registrarme</Button>

          {registered && (
            <div className="status-banner status-success">
              <strong>Registro exitoso</strong>
              <p>Tu cuenta fue creada correctamente. Ya puedes explorar todas las actividades.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function ProfileView({ currentUser, settings }) {
  const textSizeLabel = settings.textSize === "lg" ? "Grande" : settings.textSize === "sm" ? "Pequeno" : "Medio";
  const contrastLabel =
    settings.contrast === "high"
      ? "Alto contraste"
      : settings.contrast === "invert"
        ? "Contraste invertido"
        : "Normal";

  return (
    <section className="page-section">
      <div className="section-kicker">
        <h2>Mi perfil</h2>
        <p>Aqué puedes revisar tus datos y las preferencias de accesibilidad que te ayudan a usar la plataforma con comodidad.</p>
      </div>

      <div className="split-layout profile-layout">
        <div className="panel profile-card">
          <div className="panel-header">
            <h3>Informacion personal</h3>
          </div>
          <div className="stack-list">
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="user" size={18} />
              </div>
              <div>
                <strong>{`${currentUser.nombre} ${currentUser.apellido}`}</strong>
                <span>{roleLabels[currentUser.rol] ?? "Usuario"}</span>
              </div>
            </article>
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="mail" size={18} />
              </div>
              <div>
                <strong>{currentUser.correo}</strong>
                <span>Correo principal de acceso</span>
              </div>
            </article>
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="map-pin" size={18} />
              </div>
              <div>
                <strong>{currentUser.ciudad}</strong>
                <span>{currentUser.dirección}</span>
              </div>
            </article>
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="message" size={18} />
              </div>
              <div>
                <strong>{currentUser.telefono}</strong>
                <span>Telefono de contacto</span>
              </div>
            </article>
          </div>
        </div>

        <div className="panel profile-card">
          <div className="panel-header">
            <h3>Preferencias de accesibilidad</h3>
          </div>
          <div className="stack-list">
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="accessibility" size={18} />
              </div>
              <div>
                <strong>Tamano del texto</strong>
                <span>{textSizeLabel}</span>
              </div>
            </article>
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="sparkles" size={18} />
              </div>
              <div>
                <strong>Contraste</strong>
                <span>{contrastLabel}</span>
              </div>
            </article>
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="check" size={18} />
              </div>
              <div>
                <strong>Modo visual</strong>
                <span>{settings.colorMode === "default" ? "Desactivado" : settings.colorMode}</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProviderActivityModal({ activity, form, mode, onClose, onEdit, onFormChange, onSubmit }) {
  if (!mode) return null;

  const isDetail = mode === "detail";
  const title = mode === "create" ? "Nueva actividad" : mode === "edit" ? "Editar actividad" : "Detalle de la actividad";

  return (
    <div className="overlay">
      <div className="modal provider-modal">
        <div className="modal-header">
          <div>
            <Badge tone={isDetail ? "sky" : "violet"}>{title}</Badge>
            <h3>{isDetail ? activity?.title : "Completa la información principal"}</h3>
          </div>
          <button aria-label="Cerrar ventana" className="toast-close" onClick={onClose} type="button">
            <Icon name="close" size={18} />
          </button>
        </div>

        {isDetail ? (
          <div className="provider-detail-stack">
            <img alt={activity?.title} className="provider-detail-image" src={activity?.image} />
            <div className="provider-detail-grid">
              <article className="mini-card">
                <strong>Categoria</strong>
                <span>{activity?.category}</span>
              </article>
              <article className="mini-card">
                <strong>Estado</strong>
                <span>{activity?.status}</span>
              </article>
              <article className="mini-card">
                <strong>Fecha</strong>
                <span>{activity?.date}</span>
              </article>
              <article className="mini-card">
                <strong>Lugar</strong>
                <span>{activity?.place}</span>
              </article>
              <article className="mini-card">
                <strong>Cupos</strong>
                <span>{formatProviderAttendance(activity)}</span>
              </article>
              <article className="mini-card">
                <strong>Accesibilidad</strong>
                <span>{activity?.accessible ? "Con apoyo accesible" : "Sin apoyos especiales"}</span>
              </article>
            </div>
            <div className="detail-copy">
              <h3>Descripcion</h3>
              <p>{activity?.description}</p>
            </div>
            <div className="modal-actions">
              <Button onClick={() => onEdit(activity)} variant="secondary">
                Editar actividad
              </Button>
              <Button onClick={onClose} variant="outline">
                Cerrar
              </Button>
            </div>
          </div>
        ) : (
          <form
            className="provider-form"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <div className="provider-form-grid">
              <label className="field">
                <span>Nombre de la actividad</span>
                <input
                  onChange={(event) => onFormChange("title", event.target.value)}
                  placeholder="Ej: Recorrido de memoria historica"
                  value={form.title}
                />
              </label>

              <label className="field">
                <span>Categoria</span>
                <select onChange={(event) => onFormChange("category", event.target.value)} value={form.category}>
                  {["Cultura", "Bienestar", "Salud", "Turismo", "Educaci?n"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Fecha visible</span>
                <input
                  onChange={(event) => onFormChange("date", event.target.value)}
                  placeholder="Ej: 18 de junio de 2026"
                  value={form.date}
                />
              </label>

              <label className="field">
                <span>Lugar</span>
                <input
                  onChange={(event) => onFormChange("place", event.target.value)}
                  placeholder="Ej: Centro Cultural del Norte"
                  value={form.place}
                />
              </label>

              <label className="field">
                <span>Estado de publicación</span>
                <select onChange={(event) => onFormChange("status", event.target.value)} value={form.status}>
                  {providerStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Cupos</span>
                <input
                  min="1"
                  onChange={(event) => onFormChange("capacity", event.target.value)}
                  type="number"
                  value={form.capacity}
                />
              </label>

              <label className="field">
                <span>Imagen</span>
                <select onChange={(event) => onFormChange("imageKey", event.target.value)} value={form.imageKey}>
                  {providerImageOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="toggle-row provider-toggle">
                <input
                  checked={form.accessible}
                  onChange={(event) => onFormChange("accessible", event.target.checked)}
                  type="checkbox"
                />
                <span>Ofrece apoyo accesible para personas mayores</span>
              </label>
            </div>

            <label className="field">
              <span>Descripcion para participantes</span>
              <textarea
                className="provider-textarea"
                onChange={(event) => onFormChange("description", event.target.value)}
                placeholder="Describe el ambiente, la din?mica, el nivel de acompaÃ±amiento y cualquier detalle importante."
                rows={5}
                value={form.description}
              />
            </label>

            <div className="modal-actions">
              <Button onClick={onClose} variant="ghost">
                Cancelar
              </Button>
              <Button type="submit">{mode === "create" ? "Crear actividad" : "Guardar cambios"}</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function ProviderDashboardView({ currentUser, onCreateActivity, onOpenRequest, requests, summary, activities }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="violet">Panel de proveedor</Badge>
        <h2>{`Hola, ${currentUser.nombre}`}</h2>
        <p>Administra tus actividades, responde solicitudes y mantén la información clara para cada inscrito.</p>
      </div>

      <div className="summary-grid">
        {summary.map((item) => (
          <article className="panel summary-card" key={item.label}>
            <div className={`summary-icon summary-icon-${item.tone}`}>
              <Icon name={item.icon} size={20} />
            </div>
            <div>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="split-layout provider-layout">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Actividades a cargo</h3>
              <p className="section-caption">Visibilidad r?pida del estado de cada publicación.</p>
            </div>
            <Button onClick={onCreateActivity} variant="secondary">
              Nueva actividad
            </Button>
          </div>

          <div className="stack-list">
            {activities.map((activity) => (
              <article className="management-card" key={activity.id}>
                <img alt={activity.title} src={activity.image} />
                <div className="management-card-copy">
                  <div className="management-card-head">
                    <div>
                      <Badge tone={getProviderStatusTone(activity.status)}>
                        {activity.status}
                      </Badge>
                      <h4>{activity.title}</h4>
                    </div>
                    <span>{activity.category}</span>
                  </div>
                  <p>{activity.place}</p>
                  <div className="management-card-meta">
                    <span>{activity.date}</span>
                    <span>{formatProviderAttendance(activity)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel panel-sidebar">
          <div className="panel-header">
            <h3>Alertas de gestión</h3>
          </div>
          <div className="stack-list">
            {requests.map((request) => (
              <button className="mini-card mini-card-button" key={request.id} onClick={() => onOpenRequest(request.id)} type="button">
                <strong>{request.person}</strong>
                <p>{request.activity}</p>
                <span>{request.status}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function ProviderActivitiesView({ activities, onCreateActivity, onEditActivity, onViewActivity }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="mint">Mis actividades</Badge>
        <h2>Publicaciones del proveedor</h2>
        <p>Revisa estado, cupos y claridad de la información antes de cada jornada.</p>
      </div>

      <div className="panel panel-toolbar">
        <div>
          <h3>Gestion de actividades</h3>
          <p className="section-caption">Crea, ajusta o revisa cada publicación desde un solo lugar.</p>
        </div>
        <Button onClick={onCreateActivity}>Nueva actividad</Button>
      </div>

      <div className="stack-list">
        {activities.map((activity) => (
          <article className="panel management-card management-card-panel" key={activity.id}>
            <img alt={activity.title} src={activity.image} />
            <div className="management-card-copy">
              <div className="panel-header">
                <div>
                  <Badge tone={getProviderStatusTone(activity.status)}>{activity.status}</Badge>
                  <h3>{activity.title}</h3>
                </div>
                <div className="button-row">
                  <Button onClick={() => onEditActivity(activity)} variant="secondary">
                    Editar
                  </Button>
                  <Button onClick={() => onViewActivity(activity)} variant="outline">
                    Ver detalle
                  </Button>
                </div>
              </div>
              <p>{activity.place}</p>
              <div className="management-card-meta">
                <span>{activity.date}</span>
                <span>{formatProviderAttendance(activity)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProviderBookingsView({
  onOpenConversation,
  onSelectRequest,
  onUpdateRequestStatus,
  requests,
  selectedRequestId,
}) {
  useEffect(() => {
    if (!requests.some((request) => request.id === selectedRequestId)) {
      onSelectRequest(requests[0]?.id ?? null);
    }
  }, [onSelectRequest, requests, selectedRequestId]);

  const selectedRequest = requests.find((request) => request.id === selectedRequestId) ?? requests[0];

  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="amber">Solicitudes</Badge>
        <h2>Seguimiento de inscripciones</h2>
        <p>Consulta r?pidamente quiénes esperan confirmación y qué apoyo adicional necesitan.</p>
      </div>

      <div className="split-layout provider-layout">
        <div className="panel">
          <div className="panel-header">
            <h3>Solicitudes recientes</h3>
          </div>
          <div className="stack-list">
            {requests.map((request) => (
              <button
                className={`request-card request-card-button ${request.id === selectedRequestId ? "request-card-selected" : ""}`}
                key={request.id}
                onClick={() => onSelectRequest(request.id)}
                type="button"
              >
                <div className="request-card-top">
                  <strong>{request.person}</strong>
                  <Badge tone={getProviderStatusTone(request.status)}>
                    {request.status}
                  </Badge>
                </div>
                <p>{request.activity}</p>
                <span>{request.detail}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="panel panel-sidebar">
          <div className="panel-header">
            <h3>Detalle de la solicitud</h3>
          </div>
          {selectedRequest ? (
            <div className="stack-list">
              <article className="mini-card">
                <strong>{selectedRequest.person}</strong>
                <span>{selectedRequest.phone}</span>
                <p>{selectedRequest.activity}</p>
              </article>
              <article className="mini-card">
                <strong>Necesidad reportada</strong>
                <p>{selectedRequest.detail}</p>
              </article>
              <article className="mini-card">
                <strong>Estado actual</strong>
                <span>{selectedRequest.status}</span>
              </article>
              <div className="request-actions">
                <Button onClick={() => onUpdateRequestStatus(selectedRequest.id, "Inscripcion aprobada")} variant="secondary">
                  Aprobar
                </Button>
                <Button onClick={() => onUpdateRequestStatus(selectedRequest.id, "Esperando ajustes")} variant="outline">
                  Pedir ajuste
                </Button>
                <Button onClick={() => onOpenConversation(selectedRequest)}>
                  Abrir chat
                </Button>
              </div>
            </div>
          ) : (
            <p className="section-caption">No hay solicitudes disponibles por ahora.</p>
          )}
        </aside>
      </div>
    </section>
  );
}

function ProviderMessagesView({ activeChatId, setActiveChatId, threads, setThreads }) {
  const [draft, setDraft] = useState("");
  const activeThread = threads.find((thread) => thread.id === activeChatId) || threads[0];

  const sendMessage = () => {
    if (!draft.trim()) return;

    const nextMessage = {
      id: Date.now(),
      author: "provider",
      text: draft.trim(),
      time: "Ahora",
    };

    setThreads((current) =>
      current.map((thread) =>
        thread.id === activeChatId
          ? {
              ...thread,
              messages: [...thread.messages, nextMessage],
              lastMessage: draft.trim(),
              time: "Ahora",
            }
          : thread,
      ),
    );
    setDraft("");
  };

  useEffect(() => {
    if (!threads.some((thread) => thread.id === activeChatId)) {
      setActiveChatId(threads[0]?.id ?? null);
    }
  }, [activeChatId, threads]);

  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="violet">Mensajes</Badge>
        <h2>Atencion a participantes</h2>
        <p>Responde dudas de forma amable y deja instrucciones claras para cada actividad.</p>
      </div>

      <div className="panel chat-panel">
        <aside className="chat-sidebar">
          <div className="chat-sidebar-header">
            <strong>Conversaciones</strong>
            <span>Participantes inscritos</span>
          </div>
          <div className="chat-list">
            {threads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                className={`chat-list-item ${thread.id === activeChatId ? "chat-list-item-active" : ""}`}
                onClick={() => setActiveChatId(thread.id)}
              >
                <div className="chat-list-item-left">
                  <div className="provider-avatar">{thread.initials}</div>
                  <div>
                    <strong>{thread.title}</strong>
                    <span>{thread.subtitle}</span>
                  </div>
                </div>
                <div className="chat-list-item-meta">
                  <small>{thread.time}</small>
                  <p>{thread.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="chat-view">
          <div className="chat-head">
            <div className="provider-chip">
              <div className="provider-avatar">{activeThread.initials}</div>
              <div>
                <strong>{activeThread.title}</strong>
                <span>{activeThread.subtitle}</span>
              </div>
            </div>
            <Button variant="secondary">Marcar resuelto</Button>
          </div>

          <div className="chat-thread">
            {activeThread?.messages.map((message) => (
              <article
                className={`chat-bubble ${message.author === "provider" ? "chat-bubble-user" : "chat-bubble-provider"}`}
                key={message.id}
              >
                <p>{message.text}</p>
                {message.attachment && (
                  <div className="chat-attachment">
                    <Icon name="mail" size={15} />
                    <span>{message.attachment}</span>
                  </div>
                )}
                <small>{message.time}</small>
              </article>
            ))}
          </div>

          <div className="chat-compose">
            <input
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Responder a la persona inscrita..."
              value={draft}
            />
            <Button onClick={sendMessage}>
              <Icon name="send" size={16} />
              Enviar respuest?
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProviderProfileView({ currentUser }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="mint">Perfil del proveedor</Badge>
        <h2>Informacion institucional</h2>
        <p>Mantén visibles los datos de contacto y la promesa de servicio para quienes se inscriben.</p>
      </div>

      <div className="split-layout profile-layout">
        <div className="panel profile-card">
          <div className="panel-header">
            <h3>Datos principales</h3>
          </div>
          <div className="stack-list">
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="building" size={18} />
              </div>
              <div>
                <strong>{currentUser.organizacion}</strong>
                <span>Proveedor verificado</span>
              </div>
            </article>
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="mail" size={18} />
              </div>
              <div>
                <strong>{currentUser.correo}</strong>
                <span>Canal principal de contacto</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminModal({ form, kind, onChange, onClose, onSubmit, title }) {
  if (!kind) return null;

  return (
    <div className="overlay">
      <div className="modal provider-modal">
        <div className="modal-header">
          <div>
            <Badge tone="sky">{title}</Badge>
            <h3>Actualiza la información necesaria</h3>
          </div>
          <button aria-label="Cerrar ventana" className="toast-close" onClick={onClose} type="button">
            <Icon name="close" size={18} />
          </button>
        </div>

        <form
          className="provider-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          {kind === "user" && (
            <div className="provider-form-grid">
              <label className="field">
                <span>Nombre</span>
                <input onChange={(event) => onChange("name", event.target.value)} value={form.name} />
              </label>
              <label className="field">
                <span>Rol</span>
                <select onChange={(event) => onChange("role", event.target.value)} value={form.role}>
                  {["Adulto mayor", "Proveedor", "Administrador"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Estado</span>
                <select onChange={(event) => onChange("state", event.target.value)} value={form.state}>
                  {["Activa", "Inactiva", "Pendiente"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Ciudad</span>
                <input onChange={(event) => onChange("city", event.target.value)} value={form.city} />
              </label>
            </div>
          )}

          {kind === "moderation" && (
            <div className="provider-form-grid">
              <label className="field">
                <span>Actividad</span>
                <input onChange={(event) => onChange("title", event.target.value)} value={form.title} />
              </label>
              <label className="field">
                <span>Proveedor</span>
                <input onChange={(event) => onChange("owner", event.target.value)} value={form.owner} />
              </label>
              <label className="field">
                <span>Estado</span>
                <select onChange={(event) => onChange("status", event.target.value)} value={form.status}>
                  {["Pendiente", "Observacion", "Aprobada"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field field-full">
                <span>Nota de revisión</span>
                <textarea
                  className="provider-textarea"
                  onChange={(event) => onChange("note", event.target.value)}
                  rows={5}
                  value={form.note}
                />
              </label>
            </div>
          )}

          {kind === "report" && (
            <div className="provider-form-grid">
              <label className="field">
                <span>Título</span>
                <input onChange={(event) => onChange("title", event.target.value)} value={form.title} />
              </label>
              <label className="field">
                <span>Métrica</span>
                <input onChange={(event) => onChange("metric", event.target.value)} value={form.metric} />
              </label>
              <label className="field field-full">
                <span>Descripción</span>
                <textarea
                  className="provider-textarea"
                  onChange={(event) => onChange("description", event.target.value)}
                  rows={5}
                  value={form.description}
                />
              </label>
            </div>
          )}

          {kind === "responsible" && (
            <div className="provider-form-grid">
              <label className="field">
                <span>Nombre</span>
                <input onChange={(event) => onChange("name", event.target.value)} value={form.name} />
              </label>
              <label className="field">
                <span>Correo</span>
                <input onChange={(event) => onChange("email", event.target.value)} value={form.email} />
              </label>
            </div>
          )}

          <div className="modal-actions">
            <Button onClick={onClose} variant="ghost">
              Cancelar
            </Button>
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminDashboardView({ currentUser, moderationQueue, onOpenModeration, onOpenResponsible, responsibles, summary }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="violet">Panel administrador</Badge>
        <h2>{`Hola, ${currentUser.nombre}`}</h2>
        <p>Supervisa usuarios, proveedores y calidad de la experiencia desde un tablero claro y resumido.</p>
      </div>

      <div className="summary-grid summary-grid-admin">
        {summary.map((item) => (
          <article className="panel summary-card" key={item.label}>
            <div className={`summary-icon summary-icon-${item.tone}`}>
              <Icon name={item.icon} size={20} />
            </div>
            <div>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="split-layout provider-layout">
        <div className="panel">
          <div className="panel-header">
            <h3>Cola de revisión</h3>
          </div>
          <div className="stack-list">
            {moderationQueue.map((item) => (
              <button className="request-card request-card-button" key={item.id} onClick={() => onOpenModeration(item)} type="button">
                <div className="request-card-top">
                  <strong>{item.title}</strong>
                  <Badge tone={getAdminStatusTone(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <p>{item.owner}</p>
                <span>{item.note}</span>
              </button>
            ))}
          </div>
        </div>

        <aside className="panel panel-sidebar">
          <div className="panel-header">
            <h3>Responsables</h3>
          </div>
          <div className="stack-list">
            {responsibles.map((responsible) => (
              <button className="mini-card mini-card-button" key={responsible.email} onClick={() => onOpenResponsible(responsible)} type="button">
                <strong>{responsible.name}</strong>
                <span>{responsible.email}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function AdminUsersView({ onEditUser, users }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="mint">Usuarios</Badge>
        <h2>Gestion de cuentas</h2>
        <p>Consulta roles y estados para mantener el sistema ordenado y f?cil de administrar.</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Listado general</h3>
          <Button variant="secondary">Exportar</Button>
        </div>

        <div className="table-shell">
          {users.map((user) => (
            <article className="table-row" key={user.id}>
              <div>
                <strong>{user.name}</strong>
                <span>{user.city}</span>
              </div>
              <span>{user.role}</span>
              <div className="button-row table-actions">
                <Badge tone={getAdminStatusTone(user.state)}>{user.state}</Badge>
                <Button onClick={() => onEditUser(user)} variant="outline">
                  Editar
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdminActivitiesView({ moderationQueue, onApprove, onEditModeration }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="amber">Moderación</Badge>
        <h2>Revisi?n de actividades</h2>
        <p>Antes de publicar, verifica claridad del contenido, accesibilidad y datos de contacto visibles.</p>
      </div>

      <div className="stack-list">
        {moderationQueue.map((item) => (
          <article className="panel moderation-card" key={item.id}>
            <div className="panel-header">
              <div>
                <Badge tone={getAdminStatusTone(item.status)}>
                  {item.status}
                </Badge>
                <h3>{item.title}</h3>
              </div>
              <div className="button-row">
                <Button onClick={() => onEditModeration(item)} variant="secondary">
                  Solicitar ajuste
                </Button>
                <Button onClick={() => onApprove(item.id)}>Aprobar</Button>
              </div>
            </div>
            <p className="section-caption">{item.owner}</p>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminReportsView({ onEditReport, reports }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <Badge tone="sky">Reportes</Badge>
        <h2>Indicadores del sistema</h2>
        <p>Resumen rÃ¡pido para seguir usabilidad, accesibilidad y eficiencia operacional.</p>
      </div>

      <div className="summary-grid">
        {reports.map((report) => (
          <article className="panel report-card" key={report.id}>
            <span className="report-metric">{report.metric}</span>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <div className="button-row">
              <Button onClick={() => onEditReport(report)} variant="outline">
                Editar indicador
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminProfileView({ currentUser, onEditResponsible, responsibles }) {
  return (
    <section className="page-section">
      <div className="section-kicker">
        <h2>Configuracion administrativa</h2>
        <p>Vista resumida del responsable y de los criterios operativos de la plataforma.</p>
      </div>

      <div className="split-layout profile-layout">
        <div className="panel profile-card">
          <div className="panel-header">
            <h3>Cuenta actual</h3>
          </div>
          <div className="stack-list">
            <article className="mini-card mini-card-row">
              <div className="mini-card-icon">
                <Icon name="user" size={18} />
              </div>
              <div>
                <strong>{`${currentUser.nombre} ${currentUser.apellido}`}</strong>
                <span>{currentUser.correo}</span>
              </div>
            </article>
          </div>
        </div>
        <div className="panel profile-card">
          <div className="panel-header">
            <h3>Responsables</h3>
          </div>
          <div className="stack-list">
            {responsibles.map((responsible) => (
              <button className="mini-card mini-card-row mini-card-button" key={responsible.email} onClick={() => onEditResponsible(responsible)} type="button">
                <div className="mini-card-icon">
                  <Icon name="mail" size={18} />
                </div>
                <div>
                  <strong>{responsible.name}</strong>
                  <span>{responsible.email}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function safeReadJson(key, fallback) {
  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return fallback;
    return JSON.parse(rawValue);
  } catch {
    return fallback;
  }
}

function safeWriteJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in private or restricted contexts.
  }
}

export default function App() {
  const [authMode, setAuthMode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(guestUser);
  const [loginForm, setLoginForm] = useState({
    role: "adulto_mayor",
    correo: demoUsers[0].correo,
    contrasena: demoUsers[0].contrasena,
  });
  const [loginError, setLoginError] = useState("");
  const [view, setView] = useState("home");
  const [selectedActivity, setSelectedActivity] = useState(activities[4]);
  const [dbCategories, setDbCategories] = useState([]);
  const [dbActivities, setDbActivities] = useState([]);
  const [dbUsers, setDbUsers] = useState([]);
  const [filters, setFilters] = useState({
    query: "",
    category: "all",
    location: "all",
    freeOnly: false,
    accessibleOnly: false,
  });
  const [savedIds, setSavedIds] = useState(["painting", "city-tour"]);
  const [reservations, setReservations] = useState(defaultReservations);
  const [messageThreads, setMessageThreads] = useState(initialChatThreads);
  const [providerMessageThreads, setProviderMessageThreads] = useState(initialProviderChatThreads);
  const [activeProviderChatId, setActiveProviderChatId] = useState(initialProviderChatThreads[0]?.id ?? null);
  const [providerActivities, setProviderActivities] = useState(providerManagedActivities);
  const [providerRequestsState, setProviderRequestsState] = useState(providerRequests);
  const [providerSelectedRequestId, setProviderSelectedRequestId] = useState(providerRequests[0]?.id ?? null);
  const [providerActivityModal, setProviderActivityModal] = useState({ mode: null, activityId: null });
  const [providerActivityForm, setProviderActivityForm] = useState(() => createProviderActivityDraft());
  const [adminUsersState, setAdminUsersState] = useState(adminUsers);
  const [adminModerationState, setAdminModerationState] = useState(adminModerationQueue);
  const [adminReportsState, setAdminReportsState] = useState(adminReports);
  const [adminResponsiblesState, setAdminResponsiblesState] = useState(adminResponsibles);
  const [adminModal, setAdminModal] = useState({ kind: null, id: null });
  const [adminForm, setAdminForm] = useState({});
  const [registerForm, setRegisterForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registered, setRegistered] = useState(false);
  const [settings, setSettings] = useState({
    textSize: "md",
    contrast: "normal",
    colorMode: "default",
  });
  const [feedback, setFeedback] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [communityPostsState, setCommunityPosts] = useState(communityPosts);
  const [followingIds, setFollowingIds] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [notifications, setNotifications] = useState(() => notificationsByRole[guestUser.rol] ?? notificationsByRole.visitante);
  const activeRole = isAuthenticated ? currentUser.rol : guestUser.rol;
  const navItems = navItemsByRole[activeRole] ?? navItemsByRole.visitante;
  useEffect(() => {
    setNotifications(notificationsByRole[activeRole] ?? notificationsByRole.visitante);
  }, [activeRole]);
  const activityItems = dbActivities.length ? dbActivities : activities;
  const categoryItems = (dbCategories.length ? dbCategories : categories).map(category => ({
    ...category,
    count: activityItems.filter(activity => activity.categoryId === category.id).length
  }));
  const providerSummaryItems = [
    {
      label: "Actividades activas",
      value: String(providerActivities.filter((activity) => activity.status === "Publicada").length),
      tone: "violet",
      icon: "grid",
    },
    {
      label: "Solicitudes nuevas",
      value: String(
        providerRequestsState.filter(
          (request) => request.status === "Pendiente de confirmar" || request.status === "Esperando ajustes",
        ).length,
      ),
      tone: "amber",
      icon: "clipboard",
    },
    {
      label: "Mensajes sin leer",
      value: String(providerMessageThreads.length),
      tone: "mint",
      icon: "message",
    },
  ];
  const adminSummaryItems = [
    {
      label: "Usuarios activos",
      value: String(adminUsersState.filter((user) => user.state === "Activa").length),
      tone: "mint",
      icon: "users",
    },
    {
      label: "Proveedores validados",
      value: String(adminUsersState.filter((user) => user.role === "Proveedor" && user.state === "Activa").length),
      tone: "violet",
      icon: "building",
    },
    {
      label: "Actividades por revisar",
      value: String(adminModerationState.filter((item) => item.status !== "Aprobada").length),
      tone: "amber",
      icon: "shield",
    },
    {
      label: "Casos de soporte",
      value: String(providerRequestsState.filter((item) => item.status !== "Inscripcion aprobada").length),
      tone: "sky",
      icon: "message",
    },
  ];
  const authUsers = dbUsers.length ? dbUsers : demoUsers;
  const adultViews = new Set(["home", "activities", "activity-detail", "saved-activities", "community", "calendar", "messages", "profile"]);
  const providerViews = new Set(["home", "activities", "provider-bookings", "messages", "profile"]);
  const adminViews = new Set(["home", "activities", "admin-users", "admin-reports", "profile"]);

  useEffect(() => {
    const savedSession = safeReadJson(SESSION_STORAGE_KEY, null);
    const hasSeenTutorial = window.localStorage.getItem(TOUR_STORAGE_KEY) === "true";
    setSettings((current) => ({ ...current, ...safeReadJson(SETTINGS_STORAGE_KEY, {}) }));
    setSavedIds(safeReadJson(SAVED_STORAGE_KEY, ["painting", "city-tour"]));
    setReservations(safeReadJson(RESERVATIONS_STORAGE_KEY, defaultReservations));

    if (savedSession?.correo) {
      setCurrentUser(savedSession);
      setIsAuthenticated(true);
      setShowTutorial(savedSession.rol === "adulto_mayor" && !hasSeenTutorial);
    } else {
      setCurrentUser(guestUser);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseEnabled || !supabase) return;

    let cancelled = false;

    const loadSupabaseData = async () => {
      try {
        const [{ data: usersData }, { data: activitiesData }, { data: categoriesData }] = await Promise.all([
          supabase.from("usuario").select("*").order("id_usuario"),
          supabase
            .from("actividad")
            .select(
              `
                *,
                categoria_actividad ( id_categoria, nombre_categoria ),
                proveedor_actividad ( id_proveedor, nombre_entidad, estado_validacion )
              `,
            )
            .eq("estado_actividad", "activa")
            .order("fecha"),
          supabase.from("categoria_actividad").select("*").order("nombre_categoria"),
        ]);

        if (cancelled) return;

        if (Array.isArray(usersData) && usersData.length) {
          setDbUsers(usersData);
        }

        if (Array.isArray(activitiesData) && activitiesData.length) {
          const mappedActivities = activitiesData.map(mapSupabaseActivity);
          setDbActivities(mappedActivities);
          setSelectedActivity((current) => {
            const byCurrentDbId = mappedActivities.find((item) => item.dbId === current?.dbId);
            const byCurrentId = mappedActivities.find((item) => item.id === current?.id);
            return byCurrentDbId ?? byCurrentId ?? mappedActivities[0];
          });

          if (Array.isArray(categoriesData) && categoriesData.length) {
            setDbCategories(categoriesData.map((row) => mapSupabaseCategory(row, mappedActivities)));
          }
        }
      } catch {
        // Keep mock data when Supabase is not reachable or RLS blocks access.
      }
    };

    loadSupabaseData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    safeWriteJson(SETTINGS_STORAGE_KEY, settings);
  }, [settings]);

  useEffect(() => {
    safeWriteJson(SAVED_STORAGE_KEY, savedIds);
  }, [savedIds]);

  useEffect(() => {
    safeWriteJson(RESERVATIONS_STORAGE_KEY, reservations);
  }, [reservations]);

  useEffect(() => {
    if (!isSupabaseEnabled || !supabase || !isAuthenticated || !currentUser?.id_usuario) return;

    let cancelled = false;

    const syncUserData = async () => {
      try {
        const [{ data: savedLinks }, { data: reservationLinks }] = await Promise.all([
          supabase.from("lista_interes_usuario").select("id_actividad").eq("id_usuario", currentUser.id_usuario),
          supabase
            .from("inscripcion_actividad")
            .select(
              `
                id_inscripcion,
                actividad:actividad (
                  id_actividad,
                  nombre_actividad,
                  fecha,
                  hora_inicio,
                  hora_fin,
                  ubicacion,
                  imagen
                )
              `,
            )
            .eq("id_usuario", currentUser.id_usuario),
        ]);

        if (cancelled) return;

        if (Array.isArray(savedLinks)) {
          const savedActivityIds = savedLinks
            .map((item) => activityItems.find((activity) => activity.dbId === item.id_actividad)?.id)
            .filter(Boolean);
          if (savedActivityIds.length) {
            setSavedIds(savedActivityIds);
          }
        }

        if (Array.isArray(reservationLinks)) {
          const mappedReservations = reservationLinks
            .map((item) => {
              const activity = item.actividad;
              if (!activity) return null;
              const resolvedId = resolveActivityKey(activity.nombre_actividad, activity.imagen);
              return {
                id: `reservation-${resolvedId}`,
                activityId: resolvedId,
                title: activity.nombre_actividad,
                date: formatDateLabel(activity.fecha),
                time: formatTimeLabel(activity.hora_inicio, activity.hora_fin),
                location: activity.ubicacion,
              };
            })
            .filter(Boolean);

          if (mappedReservations.length) {
            setReservations(mappedReservations);
          }
        }
      } catch {
        // Keep local data when Supabase write/read policies are not yet enabled.
      }
    };

    syncUserData();

    return () => {
      cancelled = true;
    };
  }, [activityItems, currentUser?.id_usuario, isAuthenticated]);

  const filteredActivities = activityItems.filter((activity) => {
    const text = filters.query.trim().toLowerCase();
    const matchesQuery =
      text.length === 0 ||
      activity.title.toLowerCase().includes(text) ||
      activity.location.toLowerCase().includes(text) ||
      activity.category.toLowerCase().includes(text);

    const matchesCategory = filters.category === "all" || activity.categoryId === filters.category;
    const matchesLocation =
      filters.location === "all" || activity.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesPrice = !filters.freeOnly || activity.price.toLowerCase().includes("grat");
    const matchesAccessibility = !filters.accessibleOnly || activity.accessible;

    return matchesQuery && matchesCategory && matchesLocation && matchesPrice && matchesAccessibility;
  });

  const handleOpenActivity = (activity) => {
    setSelectedActivity(activity);
    setView("activity-detail");
  };

  const handleOpenReservation = (reservation) => {
    const activity = activityItems.find((item) => item.id === reservation.activityId);
    if (activity) {
      setSelectedActivity(activity);
      setView("activity-detail");
    }
  };

  const requireAuthentication = (message = "Inicie sesión para inscribirse a una actividad.") => {
    if (isAuthenticated) return true;

    setFeedback({
      type: "warning",
      title: "Acción disponible al iniciar sesión",
      message,
    });
    setAuthMode("login");
    return false;
  };

  const handleToggleSaved = async (activityId) => {
    if (!requireAuthentication("Inicie sesión para guardar actividades en Me interesa.")) return;

    const alreadySaved = savedIds.includes(activityId);
    const nextSavedIds = alreadySaved
      ? savedIds.filter((item) => item !== activityId)
      : [...savedIds, activityId];

    setSavedIds(nextSavedIds);

    const activity = activityItems.find((a) => a.id === activityId);

    if (alreadySaved) {
      setFeedback({
        type: "info",
        title: "Removido de Me interesa",
        message: `${activity?.title} ha sido removido de tu lista de intereses.`,
      });
    } else {
      setFeedback({
        type: "success",
        title: "Agregado a Me interesa",
        message: `${activity?.title} ha sido guardado en tu lista de intereses.`,
      });
    }

    if (!isSupabaseEnabled || !supabase) return;

    const selected = activityItems.find((activity) => activity.id === activityId);
    if (!selected?.dbId || !currentUser?.id_usuario) return;

    try {
      if (alreadySaved) {
        await supabase
          .from("lista_interes_usuario")
          .delete()
          .eq("id_usuario", currentUser.id_usuario)
          .eq("id_actividad", selected.dbId);
      } else {
        await supabase.from("lista_interes_usuario").insert({
          id_usuario: currentUser.id_usuario,
          id_actividad: selected.dbId,
        });
      }
    } catch {
      // Keep local interaction even if RLS blocks the demo write.
    }
  };

  const handleReserveActivity = async (activity) => {
    if (!requireAuthentication("Inicie sesión para inscribirse a una actividad.")) return;

    const alreadyReserved = reservations.some((reservation) => reservation.activityId === activity.id);

    if (!alreadyReserved) {
      setReservations((current) => [
        ...current,
        {
          id: `reservation-${activity.id}`,
          activityId: activity.id,
          title: activity.title,
          date: activity.date,
          time: activity.time,
          location: activity.location,
          rawDate: activity.rawDate,
          rawStartTime: activity.rawStartTime,
          rawEndTime: activity.rawEndTime,
        },
      ]);
    }

    if (isSupabaseEnabled && supabase && currentUser?.id_usuario && activity?.dbId) {
      try {
        await supabase.from("inscripcion_actividad").upsert(
          {
            id_usuario: currentUser.id_usuario,
            id_actividad: activity.dbId,
            estado_inscripcion: "inscrito",
            confirmacion_asistencia: false,
          },
          { onConflict: "id_usuario,id_actividad" },
        );

        await supabase.from("calendario_usuario").insert({
          id_usuario: currentUser.id_usuario,
          id_actividad: activity.dbId,
          titulo_evento: activity.title,
          fecha: activity.rawDate ?? null,
          hora_inicio: activity.rawStartTime ?? null,
          hora_fin: activity.rawEndTime ?? null,
          descripcion_evento: `Reserva confirmada en ${activity.location}.`,
          estado_evento: "programado",
        });
      } catch {
        // Keep demo flow active while Supabase policies are being adjusted.
      }
    }

    setFeedback({
      type: "success",
      title: "Su inscripci?n fue realizada correctamente",
      message: "Le enviamos los detalles de la actividad y ahora aparece en su calendario.",
    });
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!registerForm.name.trim()) errors.name = "Ingresa tu nombre.";
    if (!registerForm.lastName.trim()) errors.lastName = "Ingresa tu apellido.";
    if (!registerForm.email.includes("@")) errors.email = "Ingresa un correo valido.";
    if (registerForm.password.length < 6) errors.password = "La contrasena debe tener al menos 6 caracteres.";
    if (registerForm.confirmPassword !== registerForm.password) {
      errors.confirmPassword = "Las contrasenas deben coincidir.";
    }
    if (!registerForm.acceptedTerms) errors.acceptedTerms = "Debes aceptar los términos.";

    setRegisterErrors(errors);
    setRegistered(false);

    if (Object.keys(errors).length === 0) {
      setRegistered(true);
      const newUserPayload = {
        nombre: registerForm.name.trim(),
        apellido: registerForm.lastName.trim(),
        correo: registerForm.email.trim().toLowerCase(),
        contrasena: registerForm.password,
        rol: "adulto_mayor",
        estado_cuenta: "activo",
      };

      if (isSupabaseEnabled && supabase) {
        try {
          const { data: createdUser } = await supabase
            .from("usuario")
            .insert(newUserPayload)
            .select("*")
            .single();

          if (createdUser) {
            setDbUsers((current) => [...current.filter((item) => item.id_usuario !== createdUser.id_usuario), createdUser]);
          }
        } catch {
          // Keep local registration success for the demo if RLS blocks insert.
        }
      }

      setLoginForm({
        role: "adulto_mayor",
        correo: registerForm.email,
        contrasena: registerForm.password,
      });
      setFeedback({
        type: "success",
        title: "Informacion guardada correctamente",
        message: "Tu cuenta fue creada y ya puedes navegar con autonomÃ­a por la plataforma.",
      });
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const selectedRole = loginForm.role;
    const correo = loginForm.correo.trim().toLowerCase();
    const contrasena = loginForm.contrasena.trim();
    const matchedUser = authUsers.find(
      (user) => user.rol === selectedRole && user.correo.toLowerCase() === correo && user.contrasena === contrasena,
    );

    if (!correo || !contrasena) {
      setLoginError("Ingresa tu correo y tu contrasena para continuar.");
      return;
    }

    if (!matchedUser) {
      setLoginError("No encontramos una cuenta con esos datos para el perfil seleccionado.");
      return;
    }

    if (matchedUser.estado_cuenta !== "activo") {
      setLoginError("Tu cuenta no estó activa en este momento. Contacta soporte para recibir ayuda.");
      return;
    }

    setCurrentUser(matchedUser);
    setIsAuthenticated(true);
    setLoginError("");
    setAuthMode(null);
    safeWriteJson(SESSION_STORAGE_KEY, matchedUser);
    setView("home");

    const hasSeenTutorial = window.localStorage.getItem(TOUR_STORAGE_KEY) === "true";
    setShowTutorial(matchedUser.rol === "adulto_mayor" && !hasSeenTutorial);
    setFeedback({
      type: "success",
      title: `Bienvenido, ${matchedUser.nombre}`,
      message:
        matchedUser.rol === "adulto_mayor"
          ? "Ingresaste correctamente y ya puedes continuar en la plataforma."
          : `Ingresaste correctamente al panel de ${roleLabels[matchedUser.rol].toLowerCase()}.`,
    });
  };

  const handleLogout = () => {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    setIsAuthenticated(false);
    setCurrentUser(guestUser);
    setAuthMode(null);
    setLoginError("");
    setShowNotifications(false);
    setView("home");
    setShowTutorial(false);
  };

  const handleNavigation = (nextView) => {
    if (nextView === "register" && !isAuthenticated) {
      setAuthMode("register");
      return;
    }

    if (!isAuthenticated && ["calendar", "messages", "profile", "provider-bookings", "admin-users", "admin-reports"].includes(nextView)) {
      requireAuthentication("Inicie sesión para usar las secciones personales del sistema.");
      return;
    }

    if (isAuthenticated) {
      const allowedViews =
        activeRole === "adulto_mayor"
          ? adultViews
          : activeRole === "proveedor"
            ? providerViews
            : activeRole === "administrador"
              ? adminViews
              : adultViews;

      if (!allowedViews.has(nextView)) {
        setView("home");
        return;
      }
    }

    setView(nextView);
  };

  const openCreateProviderActivity = () => {
    setProviderActivityForm(createProviderActivityDraft());
    setProviderActivityModal({ mode: "create", activityId: null });
  };

  const openEditProviderActivity = (activity) => {
    setProviderActivityForm(createProviderActivityDraft(activity));
    setProviderActivityModal({ mode: "edit", activityId: activity.id });
  };

  const openProviderActivityDetail = (activity) => {
    setProviderActivityModal({ mode: "detail", activityId: activity.id });
  };

  const closeProviderActivityModal = () => {
    setProviderActivityModal({ mode: null, activityId: null });
    setProviderActivityForm(createProviderActivityDraft());
  };

  const handleProviderActivityFormChange = (field, value) => {
    setProviderActivityForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmitProviderActivity = () => {
    const title = providerActivityForm.title.trim();
    const place = providerActivityForm.place.trim();
    const date = providerActivityForm.date.trim();
    const description = providerActivityForm.description.trim();
    const capacity = Number(providerActivityForm.capacity);

    if (!title || !place || !date || !description || Number.isNaN(capacity) || capacity < 1) {
      setFeedback({
        type: "warning",
        title: "Completa la información de la actividad",
        message: "Antes de guardar, revisa nombre, fecha, lugar, descripcion y cupos disponibles.",
      });
      return;
    }

    const nextActivity = {
      id:
        providerActivityModal.mode === "edit" && providerActivityModal.activityId
          ? providerActivityModal.activityId
          : `provider-${Date.now()}`,
      title,
      category: providerActivityForm.category,
      imageKey: providerActivityForm.imageKey,
      image: getProviderImageByKey(providerActivityForm.imageKey),
      status: providerActivityForm.status,
      date,
      registeredCount:
        providerActivityModal.mode === "edit"
          ? providerActivities.find((activity) => activity.id === providerActivityModal.activityId)?.registeredCount ?? 0
          : 0,
      interestCount:
        providerActivityModal.mode === "edit"
          ? providerActivities.find((activity) => activity.id === providerActivityModal.activityId)?.interestCount ?? 0
          : 0,
      capacity,
      accessible: providerActivityForm.accessible,
      place,
      description,
    };

    setProviderActivities((current) => {
      if (providerActivityModal.mode === "edit") {
        return current.map((activity) => (activity.id === nextActivity.id ? nextActivity : activity));
      }
      return [nextActivity, ...current];
    });

    setFeedback({
      type: "success",
      title: providerActivityModal.mode === "edit" ? "Actividad actualizada" : "Actividad creada",
      message:
        providerActivityModal.mode === "edit"
          ? "Los cambios quedaron guardados y ya puedes seguir gestionando la publicación."
          : "La nueva actividad ya aparece en tu panel para continuar con la gestión.",
    });

    closeProviderActivityModal();
  };

  const handleUpdateProviderRequestStatus = (requestId, nextStatus) => {
    const targetRequest = providerRequestsState.find((request) => request.id === requestId);
    if (!targetRequest) return;

    setProviderRequestsState((current) =>
      current.map((request) => (request.id === requestId ? { ...request, status: nextStatus } : request)),
    );

    const wasApproved = targetRequest.status.includes("aprobada");
    const willBeApproved = nextStatus.includes("aprobada");

    if (wasApproved !== willBeApproved) {
      setProviderActivities((current) =>
        current.map((activity) => {
          if (activity.title !== targetRequest.activity) return activity;

          const currentCount = activity.registeredCount ?? 0;
          const nextCount = willBeApproved
            ? Math.min(currentCount + 1, activity.capacity ?? currentCount + 1)
            : Math.max(currentCount - 1, 0);

          return { ...activity, registeredCount: nextCount };
        }),
      );
    }

    setFeedback({
      type: nextStatus.includes("aprobada") ? "success" : "info",
      title: "Solicitud actualizada",
      message: `${targetRequest.person} ahora aparece con el estado "${nextStatus}".`,
    });
  };

  const handleOpenProviderConversation = (request) => {
    const initials = request.person
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const existingThread = providerMessageThreads.find(
      (thread) => thread.title === request.person && thread.subtitle === request.activity,
    );

    if (existingThread) {
      setActiveProviderChatId(existingThread.id);
      setView("messages");
      return;
    }

    const nextThread = {
      id: `provider-thread-${Date.now()}`,
      title: request.person,
      subtitle: request.activity,
      initials,
      time: "Ahora",
      lastMessage: "Conversacion iniciada desde solicitudes.",
      messages: [
        {
          id: Date.now(),
          author: "provider",
          text: `Hola, ${request.person.split(" ")[0]}. Ya estoy revisando tu solicitud para ${request.activity}.`,
          time: "Ahora",
        },
      ],
    };

    setProviderMessageThreads((current) => [nextThread, ...current]);
    setActiveProviderChatId(nextThread.id);
    setView("messages");
    setFeedback({
      type: "info",
      title: "Chat abierto",
      message: `Ya puedes responder directamente a ${request.person}.`,
    });
  };

  const handleOpenProviderRequest = (requestId) => {
    setProviderSelectedRequestId(requestId);
    setView("provider-bookings");
  };

  const openAdminModal = (kind, entity) => {
    const entityId = entity?.id ?? entity?.email ?? null;
    setAdminForm(createAdminModalDraft(kind, entity));
    setAdminModal({ kind, id: entityId });
  };

  const closeAdminModal = () => {
    setAdminModal({ kind: null, id: null });
    setAdminForm({});
  };

  const handleAdminFormChange = (field, value) => {
    setAdminForm((current) => ({ ...current, [field]: value }));
  };

  const handleSaveAdminModal = () => {
    if (adminModal.kind === "user") {
      setAdminUsersState((current) =>
        current.map((user) => (user.id === adminModal.id ? { ...user, ...adminForm } : user)),
      );
      setFeedback({
        type: "success",
        title: "Cuenta actualizada",
        message: "Los datos del usuario ya quedaron actualizados en el panel administrativo.",
      });
    }

    if (adminModal.kind === "moderation") {
      setAdminModerationState((current) =>
        current.map((item) => (item.id === adminModal.id ? { ...item, ...adminForm } : item)),
      );
      setFeedback({
        type: "info",
        title: "Revisión actualizada",
        message: "La actividad quedó con el nuevo estado y observación.",
      });
    }

    if (adminModal.kind === "report") {
      setAdminReportsState((current) =>
        current.map((item) => (item.id === adminModal.id ? { ...item, ...adminForm } : item)),
      );
      setFeedback({
        type: "success",
        title: "Indicador actualizado",
        message: "El reporte refleja los cambios guardados.",
      });
    }

    if (adminModal.kind === "responsible") {
      setAdminResponsiblesState((current) =>
        current.map((item) => (item.email === adminModal.id ? { ...item, ...adminForm } : item)),
      );
      setFeedback({
        type: "success",
        title: "Responsable actualizado",
        message: "La información de contacto del responsable ya fue actualizada.",
      });
    }

    closeAdminModal();
  };

  const handleApproveModeration = (itemId) => {
    setAdminModerationState((current) =>
      current.map((item) =>
        item.id === itemId
          ? { ...item, status: "Aprobada", note: "Aprobada por el administrador y lista para publicarse." }
          : item,
      ),
    );
    setFeedback({
      type: "success",
      title: "Actividad aprobada",
      message: "La actividad quedó marcada como aprobada dentro de la cola de revisión.",
    });
  };

  const resetFilters = () => {
    setFilters({
      query: "",
      category: "all",
      location: "all",
      freeOnly: false,
      accessibleOnly: false,
    });
  };

  const closeTutorial = () => {
    window.localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setShowTutorial(false);
    setTutorialStep(0);
  };

  const renderedView = (() => {
    switch (view) {
      case "home":
        if (activeRole === "proveedor") {
          return (
            <ProviderDashboardView
              activities={providerActivities}
              currentUser={currentUser}
              onCreateActivity={openCreateProviderActivity}
              onOpenRequest={handleOpenProviderRequest}
              requests={providerRequestsState}
              summary={providerSummaryItems}
            />
          );
        }
        if (activeRole === "administrador") {
          return (
            <AdminDashboardView
              currentUser={currentUser}
              moderationQueue={adminModerationState}
              onOpenModeration={(item) => openAdminModal("moderation", item)}
              onOpenResponsible={(responsible) => openAdminModal("responsible", responsible)}
              responsibles={adminResponsiblesState}
              summary={adminSummaryItems}
            />
          );
        }
        return (
          <HomeView
            activities={activityItems}
            categories={categoryItems}
            currentUser={currentUser}
            filters={filters}
            isAuthenticated={isAuthenticated}
            onActivityOpen={handleOpenActivity}
            onShowTutorial={() => setShowTutorial(true)}
            onToggleSaved={handleToggleSaved}
            savedIds={savedIds}
            setFilters={setFilters}
            setView={handleNavigation}
          />
        );
      case "activities":
        if (activeRole === "proveedor") {
          return (
            <ProviderActivitiesView
              activities={providerActivities}
              onCreateActivity={openCreateProviderActivity}
              onEditActivity={openEditProviderActivity}
              onViewActivity={openProviderActivityDetail}
            />
          );
        }
        if (activeRole === "administrador") {
          return (
            <AdminActivitiesView
              moderationQueue={adminModerationState}
              onApprove={handleApproveModeration}
              onEditModeration={(item) => openAdminModal("moderation", item)}
            />
          );
        }
        return (
          <ActivitiesView
            categories={categoryItems}
            filteredActivities={filteredActivities}
            filters={filters}
            onActivityOpen={handleOpenActivity}
            onResetFilters={resetFilters}
            onToggleSaved={handleToggleSaved}
            savedIds={savedIds}
            setFilters={setFilters}
          />
        );
      case "saved-activities":
        if (activeRole !== "adulto_mayor") return null;
        return (
          <SavedActivitiesView
            activities={activityItems}
            savedIds={savedIds}
            onActivityOpen={handleOpenActivity}
            onToggleSaved={handleToggleSaved}
            onNavigate={handleNavigation}
          />
        );
      case "community":
        if (activeRole !== "adulto_mayor") return null;
        return (
          <CommunityView
            posts={communityPostsState}
            setPosts={setCommunityPosts}
            users={communityUsers}
            currentUser={currentUser}
            followingIds={followingIds}
            setFollowingIds={setFollowingIds}
            likedPostIds={likedPostIds}
            setLikedPostIds={setLikedPostIds}
            setNotifications={setNotifications}
          />
        );
      case "activity-detail":
        if (activeRole !== "adulto_mayor" && activeRole !== "visitante") return null;
        return (
          <DetailView
            activity={selectedActivity}
            onBack={() => setView("activities")}
            onChatOpen={() => handleNavigation("messages")}
            onReserve={handleReserveActivity}
            onToggleSaved={handleToggleSaved}
            saved={savedIds.includes(selectedActivity.id)}
          />
        );
      case "calendar":
        return (
          <CalendarView
            reservations={reservations}
            setReservations={setReservations}
            onOpenReservation={handleOpenReservation}
          />
        );
      case "messages":
        if (activeRole === "proveedor") {
          return (
            <ProviderMessagesView
              activeChatId={activeProviderChatId}
              setActiveChatId={setActiveProviderChatId}
              threads={providerMessageThreads}
              setThreads={setProviderMessageThreads}
            />
          );
        }
        return <MessagesView threads={messageThreads} setThreads={setMessageThreads} />;
      case "register":
        return (
          <RegisterView
            registerErrors={registerErrors}
            registerForm={registerForm}
            registered={registered}
            setRegisterForm={setRegisterForm}
            submitRegister={handleSubmitRegister}
          />
        );
      case "profile":
        if (activeRole === "proveedor") return <ProviderProfileView currentUser={currentUser} />;
        if (activeRole === "administrador") {
          return (
            <AdminProfileView
              currentUser={currentUser}
              onEditResponsible={(responsible) => openAdminModal("responsible", responsible)}
              responsibles={adminResponsiblesState}
            />
          );
        }
        return <ProfileView currentUser={currentUser} settings={settings} />;
      case "provider-bookings":
        return (
          <ProviderBookingsView
            onOpenConversation={handleOpenProviderConversation}
            onSelectRequest={setProviderSelectedRequestId}
            onUpdateRequestStatus={handleUpdateProviderRequestStatus}
            requests={providerRequestsState}
            selectedRequestId={providerSelectedRequestId}
          />
        );
      case "admin-users":
        return <AdminUsersView onEditUser={(user) => openAdminModal("user", user)} users={adminUsersState} />;
      case "admin-reports":
        return <AdminReportsView onEditReport={(report) => openAdminModal("report", report)} reports={adminReportsState} />;
      default:
        return null;
    }
  })();

  return (
    <div
      className={[
        "app-shell",
        `text-${settings.textSize}`,
        `contrast-${settings.contrast}`,
        `color-${settings.colorMode}`,
      ].join(" ")}
    >
      <Sidebar
        activeView={view}
        isAuthenticated={isAuthenticated}
        navItems={navItems}
        onHelpOpen={() => setShowHelp(true)}
        onLogout={handleLogout}
        onOpenLogin={() => setAuthMode("login")}
        setView={handleNavigation}
      />

      <div className="app-main">
        <Topbar
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          notifications={notifications}
          onOpenLogin={() => setAuthMode("login")}
          onSearchSubmit={() => setView("activities")}
          onToggleNotifications={() => setShowNotifications((current) => !current)}
          onNavigate={handleNavigation}
          query={filters.query}
          setQuery={(value) => setFilters((current) => ({ ...current, query: value }))}
          showNotifications={showNotifications}
        />

        <Toast feedback={feedback} onClose={() => setFeedback(null)} />

        <main className="main-content">{renderedView}</main>
      </div>

      <button
        aria-label="Abrir accesibilidad"
        className="floating-accessibility-button"
        onClick={() => setShowAccessibility(true)}
        type="button"
      >
        <Icon name="accessibility" size={22} />
      </button>

      {providerActivityModal.mode && (
        <ProviderActivityModal
          activity={providerActivities.find((activity) => activity.id === providerActivityModal.activityId)}
          form={providerActivityForm}
          mode={providerActivityModal.mode}
          onClose={closeProviderActivityModal}
          onEdit={openEditProviderActivity}
          onFormChange={handleProviderActivityFormChange}
          onSubmit={handleSubmitProviderActivity}
        />
      )}
      {adminModal.kind && (
        <AdminModal
          form={adminForm}
          kind={adminModal.kind}
          onChange={handleAdminFormChange}
          onClose={closeAdminModal}
          onSubmit={handleSaveAdminModal}
          title={
            adminModal.kind === "user"
              ? "Editar usuario"
              : adminModal.kind === "moderation"
                ? "Revisar actividad"
                : adminModal.kind === "report"
                  ? "Editar indicador"
                  : "Editar responsable"
          }
        />
      )}
      {showTutorial && <TutorialModal onClose={closeTutorial} setStep={setTutorialStep} step={tutorialStep} />}
      {showHelp && <HelpDrawer onClose={() => setShowHelp(false)} />}
      {showAccessibility && (
        <AccessibilityDrawer
          onClose={() => setShowAccessibility(false)}
          setSettings={setSettings}
          settings={settings}
        />
      )}

      {authMode === "login" && (
        <LoginView
          errorMessage={loginError}
          form={loginForm}
          helperUsers={authUsers.filter((user) => user.estado_cuenta === "activo")}
          onClose={() => {
            setAuthMode(null);
            setLoginError("");
          }}
          onGoToRegister={() => setAuthMode("register")}
          onSubmit={handleLoginSubmit}
          onUseDemoUser={(user) => {
            setLoginError("");
            setLoginForm({
              role: user.rol,
              correo: user.correo,
              contrasena: user.contrasena,
            });
          }}
          setForm={setLoginForm}
        />
      )}

      {authMode === "register" && (
        <div className="auth-stage auth-stage-register auth-stage-overlay">
          <div className="auth-register-topbar">
            <button
              className="text-button"
              onClick={() => {
                setAuthMode("login");
                setRegistered(false);
              }}
              type="button"
            >
              Volver al inicio de sesión
            </button>
            <button
              className="text-button"
              onClick={() => {
                setAuthMode(null);
                setRegistered(false);
              }}
              type="button"
            >
              Seguir explorando
            </button>
          </div>
          <RegisterView
            registerErrors={registerErrors}
            registerForm={registerForm}
            registered={registered}
            setRegisterForm={setRegisterForm}
            submitRegister={handleSubmitRegister}
          />
        </div>
      )}
    </div>
  );
}
