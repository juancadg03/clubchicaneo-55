import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  purple: "#6C5CE7",
  purpleLight: "#A29BFE",
  purplePale: "#F0EEFF",
  purpleDark: "#4A3CB8",
  teal: "#00B894",
  tealLight: "#55EFC4",
  tealPale: "#E8FDF5",
  coral: "#E17055",
  coralPale: "#FEF0EC",
  amber: "#FDCB6E",
  amberPale: "#FFF8E7",
  textPrimary: "#1A1A2E",
  textSecondary: "#6B6B8A",
  textMuted: "#A0A0BC",
  bg: "#F8F7FF",
  surface: "#FFFFFF",
  border: "#E8E6F0",
  success: "#00B894",
  danger: "#E17055",
};

const styles = {
  app: {
    fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
    background: C.bg,
    minHeight: "100vh",
    color: C.textPrimary,
    fontSize: 16,
  },
  sidebar: {
    width: 240,
    background: C.surface,
    borderRight: `1.5px solid ${C.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 100,
  },
  logo: {
    padding: "0 24px 24px",
    borderBottom: `1px solid ${C.border}`,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 800,
    color: C.purple,
    lineHeight: 1.2,
  },
  logoSub: { fontSize: 13, color: C.textMuted, fontWeight: 500 },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 24px",
    cursor: "pointer",
    borderRadius: 0,
    background: active ? C.purplePale : "transparent",
    color: active ? C.purple : C.textSecondary,
    fontWeight: active ? 700 : 500,
    fontSize: 15,
    borderLeft: active ? `3px solid ${C.purple}` : "3px solid transparent",
    transition: "all 0.15s",
  }),
  topbar: {
    height: 64,
    background: C.surface,
    borderBottom: `1.5px solid ${C.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    position: "fixed",
    top: 0,
    left: 240,
    right: 0,
    zIndex: 99,
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    background: C.bg,
    border: `1.5px solid ${C.border}`,
    borderRadius: 40,
    padding: "8px 18px",
    gap: 10,
    width: 320,
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: 15,
    color: C.textPrimary,
    width: "100%",
  },
  avatar: (size = 40) => ({
    width: size,
    height: size,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: size * 0.35,
    flexShrink: 0,
  }),
  main: {
    marginLeft: 240,
    marginTop: 64,
    padding: 32,
    minHeight: "calc(100vh - 64px)",
  },
  card: {
    background: C.surface,
    borderRadius: 16,
    border: `1.5px solid ${C.border}`,
    overflow: "hidden",
  },
  btn: (variant = "primary", size = "md") => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: size === "sm" ? "8px 16px" : size === "lg" ? "14px 28px" : "10px 20px",
    borderRadius: 40,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: size === "sm" ? 13 : size === "lg" ? 17 : 15,
    fontFamily: "inherit",
    background:
      variant === "primary" ? C.purple
        : variant === "secondary" ? C.purplePale
        : variant === "outline" ? "transparent"
        : variant === "success" ? C.teal
        : variant === "danger" ? C.coral
        : C.bg,
    color:
      variant === "primary" ? "#fff"
        : variant === "secondary" ? C.purple
        : variant === "outline" ? C.purple
        : variant === "success" ? "#fff"
        : variant === "danger" ? "#fff"
        : C.textPrimary,
    border:
      variant === "outline" ? `2px solid ${C.purple}`
        : "none",
    transition: "opacity 0.15s, transform 0.1s",
  }),
  badge: (color = "purple") => ({
    display: "inline-block",
    padding: "3px 12px",
    borderRadius: 40,
    fontSize: 12,
    fontWeight: 700,
    background:
      color === "purple" ? C.purplePale
        : color === "teal" ? C.tealPale
        : color === "coral" ? C.coralPale
        : color === "amber" ? C.amberPale
        : C.bg,
    color:
      color === "purple" ? C.purpleDark
        : color === "teal" ? "#006B5A"
        : color === "coral" ? "#8B3A22"
        : color === "amber" ? "#7A5000"
        : C.textSecondary,
  }),
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: `1.5px solid ${C.border}`,
    fontSize: 15,
    fontFamily: "inherit",
    color: C.textPrimary,
    background: C.surface,
    outline: "none",
    boxSizing: "border-box",
  },
  label: {
    fontSize: 14,
    fontWeight: 700,
    color: C.textSecondary,
    marginBottom: 6,
    display: "block",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: C.textPrimary,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 15,
    color: C.textSecondary,
    marginBottom: 24,
  },
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockActivities = [
  { id: 1, title: "Recorrido Cultural por el Centro Histórico", category: "Cultura", categoryColor: "purple", date: "30 mayo, 2026", time: "9:00 a.m.", location: "Centro Histórico de Cali", cost: "Gratuito", provider: "Secretaría de Cultura de Cali", intensity: "Baja", spots: 20, image: "🏛️", description: "Conoce la riqueza histórica y cultural de nuestra ciudad en un recorrido guiado por los lugares más emblemáticos del centro de Cali.", tags: ["Accesible", "Grupal"] },
  { id: 2, title: "Taller de Pintura Acuarela", category: "Arte", categoryColor: "coral", date: "20 mayo, 2026", time: "10:00 a.m.", location: "Museo La Tertulia", cost: "$20.000", provider: "Museo La Tertulia", intensity: "Baja", spots: 15, image: "🎨", description: "Aprende técnicas básicas de pintura en acuarela con artistas profesionales.", tags: ["Creativo", "Material incluido"] },
  { id: 3, title: "Yoga para Todos", category: "Salud", categoryColor: "teal", date: "22 mayo, 2026", time: "8:30 a.m.", location: "Escuela Nacional del Deporte", cost: "Gratuito", provider: "Liga de Yoga de Cali", intensity: "Baja", spots: 30, image: "🧘", description: "Sesión de yoga adaptada para adultos mayores. Mejora tu flexibilidad y bienestar mental.", tags: ["Accesible", "Ropa cómoda"] },
  { id: 4, title: "Caminata Ecológica Parque del Perro", category: "Deporte", categoryColor: "teal", date: "25 mayo, 2026", time: "7:00 a.m.", location: "Parque del Perro", cost: "Gratuito", provider: "Alcaldía de Cali", intensity: "Media", spots: 50, image: "🌿", description: "Disfruta una caminata guiada por el hermoso Parque del Perro con compañía.", tags: ["Naturaleza", "Grupal"] },
  { id: 5, title: "Taller de Fotografía Digital", category: "Educación", categoryColor: "amber", date: "28 mayo, 2026", time: "2:00 p.m.", location: "Biblioteca Departamental", cost: "$15.000", provider: "Instituto de Fotografía", intensity: "Baja", spots: 12, image: "📷", description: "Aprende a tomar mejores fotos con tu celular o cámara digital.", tags: ["Tecnología", "Material incluido"] },
  { id: 6, title: "Tarde de Tango y Salsa", category: "Cultura", categoryColor: "purple", date: "1 junio, 2026", time: "4:00 p.m.", location: "Casa de la Cultura del Valle", cost: "$10.000", provider: "Academia de Baile Cali", intensity: "Media", spots: 25, image: "💃", description: "Una tarde llena de ritmo, baile y alegría con instructores expertos.", tags: ["Activo", "Parejas"] },
];

const mockUsers = [
  { id: 1, name: "María González", age: 68, city: "Cali", avatar: "MG", interests: ["Arte", "Cultura", "Salud"], followers: 124, following: 89, posts: 32 },
  { id: 2, name: "Carlos Herrera", age: 72, city: "Cali", avatar: "CH", interests: ["Deporte", "Educación"], followers: 67, following: 45, posts: 18 },
  { id: 3, name: "Rosa Martínez", age: 65, city: "Palmira", avatar: "RM", interests: ["Arte", "Yoga"], followers: 203, following: 156, posts: 87 },
  { id: 4, name: "Julio Ospina", age: 70, city: "Cali", avatar: "JO", interests: ["Fotografía", "Turismo"], followers: 89, following: 72, posts: 45 },
];

const mockPosts = [
  { id: 1, user: mockUsers[0], content: "¡Qué experiencia tan hermosa la caminata de hoy por el Parque del Perro! El grupo fue increíble 🌿", image: "🌳", likes: 34, comments: 12, time: "Hace 2 horas", activity: "Caminata Ecológica" },
  { id: 2, user: mockUsers[2], content: "Terminé mi primera acuarela en el taller del Museo La Tertulia. Nunca creí que a mis 65 años podría hacer algo así 🎨✨", image: "🖼️", likes: 87, comments: 24, time: "Hace 5 horas", activity: "Taller de Pintura" },
  { id: 3, user: mockUsers[3], content: "El recorrido por el centro histórico fue fascinante. ¡Aprendí tanto de nuestra ciudad! Recomendado 100%", image: "🏛️", likes: 56, comments: 18, time: "Ayer", activity: "Recorrido Cultural" },
  { id: 4, user: mockUsers[1], content: "Tercer día de yoga consecutivo. Me siento renovado y con mucha energía. ¡Gracias instructor Pedro! 🧘", image: "🌅", likes: 42, comments: 9, time: "Ayer", activity: "Yoga para Todos" },
];

const mockCalendar = [
  { id: 1, activityId: 1, date: "2026-05-30", status: "confirmado" },
  { id: 2, activityId: 3, date: "2026-05-22", status: "confirmado" },
  { id: 3, activityId: 2, date: "2026-05-20", status: "pendiente" },
];

const mockProviderActivities = [
  { id: 1, title: "Taller de Pintura Acuarela", status: "Activo", inscripciones: 12, cupos: 15, fecha: "20 mayo" },
  { id: 2, title: "Tarde de Tango y Salsa", status: "Próximo", inscripciones: 8, cupos: 25, fecha: "1 junio" },
  { id: 3, title: "Historia del Arte Colombiano", status: "Finalizado", inscripciones: 20, cupos: 20, fecha: "10 mayo" },
];

const mockAdminStats = {
  totalUsers: 1284,
  totalActivities: 87,
  totalProviders: 34,
  activeToday: 234,
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const Icon = ({ emoji, size = 20 }) => <span style={{ fontSize: size }}>{emoji}</span>;

const Badge = ({ children, color = "purple" }) => (
  <span style={styles.badge(color)}>{children}</span>
);

const Button = ({ children, variant = "primary", size = "md", onClick, style = {} }) => (
  <button style={{ ...styles.btn(variant, size), ...style }} onClick={onClick}>
    {children}
  </button>
);

const ActivityCard = ({ activity, onClick, saved, onSave }) => (
  <div
    style={{ ...styles.card, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
    onClick={() => onClick && onClick(activity)}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
  >
    <div style={{
      background: `linear-gradient(135deg, ${C.purplePale}, ${C.tealPale})`,
      height: 140,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 56,
    }}>
      {activity.image}
    </div>
    <div style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <Badge color={activity.categoryColor}>{activity.category}</Badge>
        <button
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: saved ? C.coral : C.textMuted }}
          onClick={e => { e.stopPropagation(); onSave && onSave(activity.id); }}
        >
          {saved ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ fontSize: 17, fontWeight: 800, color: C.textPrimary, marginBottom: 6, lineHeight: 1.3 }}>
        {activity.title}
      </div>
      <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 12 }}>
        📅 {activity.date} &nbsp;⏰ {activity.time}
      </div>
      <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 12 }}>
        📍 {activity.location}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 800, color: activity.cost === "Gratuito" ? C.teal : C.textPrimary, fontSize: 15 }}>
          {activity.cost}
        </span>
        <span style={{ fontSize: 12, color: C.textMuted }}>
          {activity.spots} cupos disponibles
        </span>
      </div>
    </div>
  </div>
);

const UserCard = ({ user }) => (
  <div style={{ ...styles.card, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
    <div style={styles.avatar(52)}>{user.avatar}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 800, fontSize: 16 }}>{user.name}</div>
      <div style={{ color: C.textSecondary, fontSize: 13 }}>📍 {user.city} · {user.age} años</div>
      <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
        <span style={{ fontSize: 13 }}><strong>{user.followers}</strong> <span style={{ color: C.textMuted }}>seguidores</span></span>
        <span style={{ fontSize: 13 }}><strong>{user.posts}</strong> <span style={{ color: C.textMuted }}>publicaciones</span></span>
      </div>
    </div>
    <Button variant="outline" size="sm">Seguir</Button>
  </div>
);

// ─── VIEWS ────────────────────────────────────────────────────────────────────

// LOGIN
const LoginView = ({ onLogin, switchTo }) => {
  const [tab, setTab] = useState("usuario");
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${C.purplePale} 0%, ${C.tealPale} 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{ ...styles.card, width: "100%", maxWidth: 460, padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 42, marginBottom: 8 }}>🌺</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: C.purple }}>Club Chicaneo</div>
          <div style={{ fontSize: 16, color: C.textSecondary, fontWeight: 600 }}>+55 · Activos, conectados y felices</div>
        </div>

        <div style={{ display: "flex", background: C.bg, borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {["usuario", "proveedor", "admin"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: 10,
              background: tab === t ? C.purple : "transparent",
              color: tab === t ? "#fff" : C.textSecondary,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              textTransform: "capitalize",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}>{t === "admin" ? "Admin" : t === "proveedor" ? "Proveedor" : "Usuario"}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={styles.label}>Correo electrónico</label>
            <input style={styles.input} placeholder="tu@correo.com" type="email" />
          </div>
          <div>
            <label style={styles.label}>Contraseña</label>
            <input style={styles.input} placeholder="••••••••" type="password" />
          </div>
          <Button onClick={() => onLogin(tab)} size="lg" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
            Ingresar
          </Button>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ color: C.textSecondary, fontSize: 14 }}>¿No tienes cuenta? </span>
          <span style={{ color: C.purple, fontWeight: 700, cursor: "pointer", fontSize: 14 }} onClick={() => switchTo("register")}>
            Regístrate gratis
          </span>
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span style={{ color: C.textMuted, fontSize: 13, cursor: "pointer" }}>¿Olvidaste tu contraseña?</span>
        </div>
      </div>
    </div>
  );
};

// REGISTER
const RegisterView = ({ switchTo }) => (
  <div style={{
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${C.purplePale} 0%, ${C.tealPale} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  }}>
    <div style={{ ...styles.card, width: "100%", maxWidth: 500, padding: 40 }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 36, marginBottom: 6 }}>🌺</div>
        <div style={{ fontSize: 24, fontWeight: 900, color: C.purple }}>Crear cuenta</div>
        <div style={{ fontSize: 14, color: C.textSecondary }}>Únete a nuestra comunidad +55</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={styles.label}>Nombre</label><input style={styles.input} placeholder="María" /></div>
          <div><label style={styles.label}>Apellido</label><input style={styles.input} placeholder="González" /></div>
        </div>
        <div><label style={styles.label}>Correo electrónico</label><input style={styles.input} placeholder="tu@correo.com" type="email" /></div>
        <div><label style={styles.label}>Contraseña</label><input style={styles.input} placeholder="Mínimo 8 caracteres" type="password" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={styles.label}>Edad</label><input style={styles.input} placeholder="65" type="number" /></div>
          <div><label style={styles.label}>Ciudad</label><input style={styles.input} placeholder="Cali" /></div>
        </div>
        <div>
          <label style={styles.label}>Intereses (selecciona varios)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {["Arte", "Cultura", "Deporte", "Salud", "Educación", "Turismo", "Música"].map(i => (
              <button key={i} style={{
                padding: "6px 14px",
                borderRadius: 40,
                border: `1.5px solid ${C.border}`,
                background: C.bg,
                color: C.textSecondary,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 600,
              }}>{i}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <input type="checkbox" id="terms" style={{ width: 18, height: 18 }} />
          <label htmlFor="terms" style={{ fontSize: 14, color: C.textSecondary }}>
            Acepto los <span style={{ color: C.purple, fontWeight: 700 }}>términos y condiciones</span>
          </label>
        </div>
        <Button size="lg" style={{ width: "100%", justifyContent: "center" }}>
          Crear mi cuenta
        </Button>
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <span style={{ color: C.textSecondary, fontSize: 14 }}>¿Ya tienes cuenta? </span>
        <span style={{ color: C.purple, fontWeight: 700, cursor: "pointer", fontSize: 14 }} onClick={() => switchTo("login")}>
          Inicia sesión
        </span>
      </div>
    </div>
  </div>
);

// HOME
const HomeView = ({ setView, setSelectedActivity }) => {
  const [saved, setSaved] = useState([]);
  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${C.purple} 0%, ${C.purpleLight} 100%)`,
        borderRadius: 20,
        padding: "40px 48px",
        color: "#fff",
        marginBottom: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "relative",
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 900, marginBottom: 8 }}>¡Hola María! 👋</div>
          <div style={{ fontSize: 18, opacity: 0.9, marginBottom: 20 }}>Disfruta, aprende y comparte</div>
          <Button variant="secondary" size="lg" onClick={() => setView("activities")}>
            Explorar actividades →
          </Button>
        </div>
        <div style={{ fontSize: 96, opacity: 0.2, position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)" }}>🌺</div>
      </div>

      {/* Categorías */}
      <div style={{ marginBottom: 32 }}>
        <div style={styles.sectionTitle}>Explora por categoría</div>
        <div style={styles.sectionSub}>Encuentra lo que más te apasiona</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {[
            { label: "Cultura", emoji: "🎭", count: 12, color: C.purple },
            { label: "Deporte", emoji: "🏃", count: 18, color: C.teal },
            { label: "Salud", emoji: "❤️", count: 10, color: C.coral },
            { label: "Turismo", emoji: "📸", count: 15, color: "#F39C12" },
            { label: "Educación", emoji: "📚", count: 8, color: C.purpleLight },
          ].map(cat => (
            <div key={cat.label} style={{
              ...styles.card,
              padding: "20px 16px",
              textAlign: "center",
              cursor: "pointer",
              borderTop: `3px solid ${cat.color}`,
            }} onClick={() => setView("activities")}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{cat.label}</div>
              <div style={{ color: C.textMuted, fontSize: 13 }}>{cat.count} actividades</div>
            </div>
          ))}
        </div>
      </div>

      {/* Próximas actividades */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={styles.sectionTitle}>Recomendadas para ti</div>
          <span style={{ color: C.purple, fontWeight: 700, cursor: "pointer" }} onClick={() => setView("activities")}>Ver todas →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {mockActivities.slice(0, 3).map(a => (
            <ActivityCard key={a.id} activity={a} saved={saved.includes(a.id)} onSave={toggleSave}
              onClick={(act) => { setSelectedActivity(act); setView("activity-detail"); }} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ACTIVITIES LIST
const ActivitiesView = ({ setView, setSelectedActivity }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  const toggleSave = (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const filtered = mockActivities.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || a.category.toLowerCase() === filter || (filter === "gratis" && a.cost === "Gratuito");
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div style={styles.sectionTitle}>Actividades disponibles</div>
      <div style={styles.sectionSub}>Descubre todo lo que Cali tiene para ti</div>

      {/* Filters */}
      <div style={{ ...styles.card, padding: "20px 24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 40, padding: "8px 16px", gap: 10, flex: 1, minWidth: 200 }}>
          <span>🔍</span>
          <input style={{ border: "none", background: "transparent", outline: "none", fontSize: 15, width: "100%", fontFamily: "inherit" }}
            placeholder="Buscar actividades..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["all", "Todas"], ["cultura", "Cultura"], ["salud", "Salud"], ["deporte", "Deporte"], ["educación", "Educación"], ["gratis", "Gratuitas"]].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{
              padding: "8px 16px",
              borderRadius: 40,
              border: `1.5px solid ${filter === val ? C.purple : C.border}`,
              background: filter === val ? C.purple : C.surface,
              color: filter === val ? "#fff" : C.textSecondary,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {filtered.map(a => (
          <ActivityCard key={a.id} activity={a} saved={saved.includes(a.id)} onSave={toggleSave}
            onClick={(act) => { setSelectedActivity(act); setView("activity-detail"); }} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: C.textMuted }}>
          <div style={{ fontSize: 48 }}>🔍</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>No encontramos actividades</div>
          <div>Intenta con otros filtros</div>
        </div>
      )}
    </div>
  );
};

// ACTIVITY DETAIL
const ActivityDetailView = ({ activity, setView }) => {
  const [inscribed, setInscribed] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!activity) return <div style={{ padding: 40, color: C.textMuted }}>Selecciona una actividad</div>;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button style={{ background: "none", border: "none", color: C.purple, cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "inherit" }}
          onClick={() => setView("activities")}>
          ← Volver a actividades
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28 }}>
        <div>
          <div style={{
            background: `linear-gradient(135deg, ${C.purplePale}, ${C.tealPale})`,
            borderRadius: 16,
            height: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 100,
            marginBottom: 20,
          }}>
            {activity.image}
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            {[activity.category, ...activity.tags].map((tag, i) => (
              <Badge key={i} color={i === 0 ? activity.categoryColor : "purple"}>{tag}</Badge>
            ))}
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 900, color: C.textPrimary, marginBottom: 8, lineHeight: 1.2 }}>
            {activity.title}
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              ["📅", "Fecha", activity.date],
              ["⏰", "Hora", activity.time],
              ["📍", "Lugar", activity.location],
              ["💰", "Costo", activity.cost],
              ["🏃", "Intensidad", activity.intensity],
              ["👥", "Cupos disponibles", `${activity.spots} personas`],
            ].map(([emoji, label, value]) => (
              <div key={label} style={{ ...styles.card, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 24 }}>{emoji}</span>
                <div>
                  <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 700 }}>{label}</div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Descripción</div>
              <div style={{ color: C.textSecondary, lineHeight: 1.7, fontSize: 16 }}>{activity.description}</div>
            </div>
            <div style={{ borderTop: `1.5px solid ${C.border}`, padding: "20px 24px" }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Restricciones e impedimentos</div>
              <ul style={{ color: C.textSecondary, paddingLeft: 20, lineHeight: 2 }}>
                <li>Actividad de intensidad {activity.intensity.toLowerCase()}.</li>
                <li>Uso de calzado cómodo.</li>
                {activity.intensity === "Baja" && <li>No recomendable para personas con movilidad muy reducida.</li>}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div style={{ ...styles.card, padding: 24, marginBottom: 20, position: "sticky", top: 80 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Proveedor</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={styles.avatar(44)}>SC</div>
              <div>
                <div style={{ fontWeight: 700 }}>{activity.provider}</div>
                <div style={{ fontSize: 13, color: C.teal }}>✓ Verificado</div>
              </div>
            </div>

            <div style={{ background: C.bg, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 700, marginBottom: 2 }}>Contacto</div>
              <div style={{ fontSize: 14, color: C.textSecondary }}>cultura@cali.gov.co</div>
              <div style={{ fontSize: 14, color: C.textSecondary }}>(602) 123 4567</div>
            </div>

            <div style={{ fontSize: 26, fontWeight: 900, color: activity.cost === "Gratuito" ? C.teal : C.textPrimary, textAlign: "center", marginBottom: 16 }}>
              {activity.cost}
            </div>

            <Button
              variant={inscribed ? "success" : "primary"}
              size="lg"
              style={{ width: "100%", justifyContent: "center", marginBottom: 12 }}
              onClick={() => setInscribed(!inscribed)}
            >
              {inscribed ? "✅ Inscrito" : "🎟️ Inscribirme"}
            </Button>

            <Button
              variant="outline"
              size="lg"
              style={{ width: "100%", justifyContent: "center", marginBottom: 16 }}
              onClick={() => setSaved(!saved)}
            >
              {saved ? "❤️ Guardado" : "🤍 Me interesa"}
            </Button>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Chat con el proveedor</div>
              <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 12 }}>Resuelve tus dudas directamente con el organizador.</div>
              <Button variant="secondary" style={{ width: "100%", justifyContent: "center" }}>
                💬 Abrir chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CALENDAR
const CalendarView = () => {
  const [events, setEvents] = useState(mockCalendar);
  const [showModal, setShowModal] = useState(false);

  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const calDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const getActivityForId = (id) => mockActivities.find(a => a.id === id);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={styles.sectionTitle}>Mi Calendario</div>
          <div style={styles.sectionSub}>Mayo 2026</div>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Agregar actividad</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        <div style={styles.card}>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>←</button>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Mayo 2026</div>
              <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>→</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 12 }}>
              {days.map(d => (
                <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 800, color: C.textMuted, padding: "4px 0" }}>{d}</div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {[...Array(4)].map((_, i) => <div key={`e${i}`} />)}
              {calDays.map(d => {
                const hasEvent = events.some(e => parseInt(e.date.split("-")[2]) === d);
                const isToday = d === 5;
                return (
                  <div key={d} style={{
                    textAlign: "center",
                    padding: "8px 4px",
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: isToday ? 900 : hasEvent ? 700 : 400,
                    background: isToday ? C.purple : hasEvent ? C.purplePale : "transparent",
                    color: isToday ? "#fff" : hasEvent ? C.purple : C.textPrimary,
                    cursor: "pointer",
                    position: "relative",
                  }}>
                    {d}
                    {hasEvent && !isToday && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.purple, margin: "2px auto 0" }} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Mis actividades inscritas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {events.map(ev => {
              const act = getActivityForId(ev.activityId);
              if (!act) return null;
              return (
                <div key={ev.id} style={{ ...styles.card, padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: C.purplePale,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}>{act.image}</div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 2 }}>{act.title}</div>
                        <div style={{ color: C.textSecondary, fontSize: 12 }}>📅 {act.date} · ⏰ {act.time}</div>
                        <Badge color={ev.status === "confirmado" ? "teal" : "amber"}>
                          {ev.status === "confirmado" ? "✓ Confirmado" : "⏳ Pendiente"}
                        </Badge>
                      </div>
                    </div>
                    <button
                      style={{ background: "none", border: "none", cursor: "pointer", color: C.danger, fontWeight: 700, fontSize: 18 }}
                      onClick={() => setEvents(e => e.filter(x => x.id !== ev.id))}
                    >✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 999,
        }}>
          <div style={{ ...styles.card, width: 440, padding: 32 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Agregar al calendario</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div><label style={styles.label}>Actividad</label>
                <select style={{ ...styles.input }}>
                  {mockActivities.map(a => <option key={a.id}>{a.title}</option>)}
                </select>
              </div>
              <div><label style={styles.label}>Fecha</label><input type="date" style={styles.input} /></div>
              <div><label style={styles.label}>Nota personal</label><textarea style={{ ...styles.input, resize: "vertical", minHeight: 80 }} /></div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <Button style={{ flex: 1, justifyContent: "center" }}>Agregar</Button>
              <Button variant="outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowModal(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PROFILE
const ProfileView = () => {
  const user = mockUsers[0];
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <div style={styles.sectionTitle}>Mi Perfil</div>
      <div style={{ ...styles.sectionSub, marginBottom: 24 }}>Administra tu información personal</div>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24 }}>
        <div>
          <div style={{ ...styles.card, padding: 28, textAlign: "center", marginBottom: 16 }}>
            <div style={{ ...styles.avatar(88), margin: "0 auto 16px", fontSize: 32 }}>{user.avatar}</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{user.name}</div>
            <div style={{ color: C.textSecondary, marginBottom: 6 }}>📍 {user.city} · {user.age} años</div>
            <div style={{ marginBottom: 20 }}>
              <Badge color="teal">Adulto Mayor Activo</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[["Seguidores", user.followers], ["Siguiendo", user.following], ["Posts", user.posts]].map(([label, val]) => (
                <div key={label} style={{ background: C.bg, borderRadius: 12, padding: "10px 6px" }}>
                  <div style={{ fontWeight: 900, fontSize: 18, color: C.purple }}>{val}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...styles.card, padding: 20 }}>
            <div style={{ fontWeight: 800, marginBottom: 12 }}>Mis intereses</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {user.interests.map(i => <Badge key={i} color="purple">{i}</Badge>)}
            </div>
          </div>
        </div>

        <div>
          <div style={{ ...styles.card, padding: 28, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Información personal</div>
              <Button variant={editMode ? "primary" : "outline"} size="sm" onClick={() => setEditMode(!editMode)}>
                {editMode ? "💾 Guardar" : "✏️ Editar"}
              </Button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                ["Nombre completo", "María González"],
                ["Correo", "maria@gmail.com"],
                ["Teléfono", "310 555 0123"],
                ["Ciudad", "Cali, Valle del Cauca"],
                ["Edad", "68 años"],
                ["Género", "Femenino"],
              ].map(([label, val]) => (
                <div key={label}>
                  <label style={styles.label}>{label}</label>
                  {editMode
                    ? <input style={styles.input} defaultValue={val} />
                    : <div style={{ fontSize: 16, fontWeight: 600, color: C.textPrimary, padding: "10px 0" }}>{val}</div>
                  }
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...styles.card, padding: 28 }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 20 }}>Accesibilidad</div>
            {[
              ["Modo daltonismo", "Desactivado"],
              ["Tamaño de fuente", "Grande (18px)"],
              ["Alto contraste", "Desactivado"],
              ["Modo oscuro", "Automático"],
            ].map(([opt, val]) => (
              <div key={opt} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontWeight: 600 }}>{opt}</span>
                <span style={{ color: C.textSecondary }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// FEED / PUBLICACIONES
const FeedView = () => {
  const [newPost, setNewPost] = useState("");

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={styles.sectionTitle}>Publicaciones</div>
      <div style={styles.sectionSub}>Comparte tus experiencias con la comunidad</div>

      <div style={{ ...styles.card, padding: 20, marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={styles.avatar(44)}>MG</div>
          <div style={{ flex: 1 }}>
            <textarea
              style={{ ...styles.input, resize: "none", minHeight: 80, marginBottom: 12 }}
              placeholder="¿Qué quieres compartir hoy? 😊"
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="secondary" size="sm">📷 Foto</Button>
              <Button variant="secondary" size="sm">🎯 Actividad</Button>
              <Button size="sm" style={{ marginLeft: "auto" }} disabled={!newPost}>Publicar</Button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {mockPosts.map(post => (
          <div key={post.id} style={{ ...styles.card, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={styles.avatar(44)}>{post.user.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{post.user.name}</div>
                <div style={{ color: C.textMuted, fontSize: 13 }}>
                  {post.time} · <span style={{ color: C.purple }}>📍 {post.activity}</span>
                </div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 20 }}>⋯</button>
            </div>

            <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16, color: C.textPrimary }}>
              {post.content}
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${C.purplePale}, ${C.tealPale})`,
              borderRadius: 12,
              height: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              marginBottom: 16,
            }}>
              {post.image}
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", gap: 24 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: C.textSecondary, fontWeight: 600, fontSize: 14, fontFamily: "inherit" }}>
                ❤️ {post.likes}
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: C.textSecondary, fontWeight: 600, fontSize: 14, fontFamily: "inherit" }}>
                💬 {post.comments} comentarios
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: C.textSecondary, fontWeight: 600, fontSize: 14, fontFamily: "inherit" }}>
                ↗ Compartir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ME INTERESA
const WishlistView = ({ setView, setSelectedActivity }) => {
  const [saved, setSaved] = useState([1, 3, 5]);
  const remove = (id) => setSaved(s => s.filter(x => x !== id));
  const activities = mockActivities.filter(a => saved.includes(a.id));

  return (
    <div>
      <div style={styles.sectionTitle}>Me interesa</div>
      <div style={styles.sectionSub}>Actividades que guardaste para después</div>

      {activities.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: C.textMuted }}>
          <div style={{ fontSize: 56 }}>🤍</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Aún no has guardado nada</div>
          <div style={{ marginBottom: 20 }}>Explora actividades y guarda las que te interesen</div>
          <Button onClick={() => setView("activities")}>Explorar actividades</Button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {activities.map(a => (
            <ActivityCard key={a.id} activity={a} saved onClick={(act) => { setSelectedActivity(act); setView("activity-detail"); }} onSave={remove} />
          ))}
        </div>
      )}
    </div>
  );
};

// PROVIDER PANEL
const ProviderView = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div>
      <div style={styles.sectionTitle}>Panel de Proveedor</div>
      <div style={styles.sectionSub}>Museo La Tertulia · Gestiona tus actividades</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {[["dashboard", "📊 Dashboard"], ["activities", "🗂️ Mis Actividades"], ["create", "➕ Crear Actividad"]].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "10px 20px",
            border: `1.5px solid ${activeTab === tab ? C.purple : C.border}`,
            background: activeTab === tab ? C.purple : C.surface,
            color: activeTab === tab ? "#fff" : C.textSecondary,
            borderRadius: 40,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 14,
          }}>{label}</button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            {[
              ["🎯", "Actividades activas", "3", C.purple],
              ["👥", "Total inscritos", "40", C.teal],
              ["⭐", "Valoración media", "4.8", "#F39C12"],
              ["💰", "Ingresos del mes", "$600.000", C.teal],
            ].map(([emoji, label, val, color]) => (
              <div key={label} style={{ ...styles.card, padding: "20px 22px" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color }}>{val}</div>
                <div style={{ color: C.textMuted, fontSize: 13 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ ...styles.card, padding: 24 }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Actividades recientes</div>
            {mockProviderActivities.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{a.title}</div>
                  <div style={{ color: C.textMuted, fontSize: 13 }}>📅 {a.fecha}</div>
                </div>
                <Badge color={a.status === "Activo" ? "teal" : a.status === "Próximo" ? "purple" : "purple"}>
                  {a.status}
                </Badge>
                <div style={{ margin: "0 20px", textAlign: "center" }}>
                  <div style={{ fontWeight: 800 }}>{a.inscripciones}/{a.cupos}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>inscritos</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant="outline" size="sm">✏️ Editar</Button>
                  <Button variant="danger" size="sm">🗑️</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "activities" && (
        <div style={styles.card}>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Todas mis actividades</div>
              <Button size="sm" onClick={() => setActiveTab("create")}>+ Nueva</Button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["Actividad", "Fecha", "Cupos", "Inscritos", "Estado", "Acciones"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 800, color: C.textSecondary, fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockProviderActivities.map(a => (
                  <tr key={a.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{a.title}</td>
                    <td style={{ padding: "14px 16px", color: C.textSecondary }}>{a.fecha}</td>
                    <td style={{ padding: "14px 16px" }}>{a.cupos}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1, height: 6, background: C.bg, borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(a.inscripciones / a.cupos) * 100}%`, background: C.purple, borderRadius: 3 }} />
                        </div>
                        {a.inscripciones}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <Badge color={a.status === "Activo" ? "teal" : "purple"}>{a.status}</Badge>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Button variant="outline" size="sm">✏️</Button>
                        <Button variant="danger" size="sm">🗑️</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "create" && (
        <div style={{ ...styles.card, padding: 32, maxWidth: 700 }}>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 24 }}>Nueva Actividad</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div><label style={styles.label}>Nombre de la actividad</label><input style={styles.input} placeholder="Ej: Taller de Pintura..." /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label style={styles.label}>Categoría</label>
                <select style={styles.input}>
                  {["Cultura", "Deporte", "Salud", "Arte", "Educación", "Turismo"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={styles.label}>Costo</label><input style={styles.input} placeholder="Gratuito o $10.000" /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label style={styles.label}>Fecha</label><input type="date" style={styles.input} /></div>
              <div><label style={styles.label}>Hora</label><input type="time" style={styles.input} /></div>
            </div>
            <div><label style={styles.label}>Lugar</label><input style={styles.input} placeholder="Dirección o nombre del lugar" /></div>
            <div><label style={styles.label}>Cupos disponibles</label><input type="number" style={styles.input} placeholder="20" /></div>
            <div><label style={styles.label}>Descripción</label>
              <textarea style={{ ...styles.input, minHeight: 100, resize: "vertical" }} placeholder="Describe detalladamente la actividad..." />
            </div>
            <div><label style={styles.label}>Intensidad física</label>
              <div style={{ display: "flex", gap: 10 }}>
                {["Baja", "Media", "Alta"].map(i => (
                  <button key={i} style={{
                    padding: "8px 20px",
                    borderRadius: 40,
                    border: `1.5px solid ${C.border}`,
                    background: C.bg,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: 14,
                  }}>{i}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <Button size="lg" style={{ flex: 1, justifyContent: "center" }}>Publicar actividad 🎉</Button>
              <Button variant="outline" size="lg" style={{ justifyContent: "center" }} onClick={() => setActiveTab("activities")}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ADMIN PANEL
const AdminView = () => {
  const [tab, setTab] = useState("overview");

  return (
    <div>
      <div style={styles.sectionTitle}>Panel de Administrador</div>
      <div style={styles.sectionSub}>Gestión completa de la plataforma</div>

      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {[["overview", "📊 General"], ["users", "👥 Usuarios"], ["activities", "🗂️ Actividades"], ["providers", "🏢 Proveedores"]].map(([t, l]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "10px 20px",
            border: `1.5px solid ${tab === t ? C.purple : C.border}`,
            background: tab === t ? C.purple : C.surface,
            color: tab === t ? "#fff" : C.textSecondary,
            borderRadius: 40,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 14,
          }}>{l}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
            {[
              ["👥", "Usuarios totales", mockAdminStats.totalUsers, C.purple, "+12 esta semana"],
              ["🎯", "Actividades", mockAdminStats.totalActivities, C.teal, "+3 nuevas"],
              ["🏢", "Proveedores", mockAdminStats.totalProviders, "#F39C12", "2 pendientes"],
              ["🟢", "Activos hoy", mockAdminStats.activeToday, C.coral, "18% más que ayer"],
            ].map(([emoji, label, val, color, sub]) => (
              <div key={label} style={{ ...styles.card, padding: "22px 24px" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{emoji}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color }}>{val.toLocaleString()}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{label}</div>
                <div style={{ color: C.textMuted, fontSize: 12 }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ ...styles.card, padding: 24 }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Actividad por categoría</div>
              {[["Cultura", 28, C.purple], ["Deporte", 35, C.teal], ["Salud", 18, C.coral], ["Educación", 12, "#F39C12"], ["Turismo", 7, C.purpleLight]].map(([cat, pct, color]) => (
                <div key={cat} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{cat}</span>
                    <span style={{ color: C.textMuted, fontSize: 13 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 8, background: C.bg, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...styles.card, padding: 24 }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Solicitudes pendientes</div>
              {[
                { type: "🏢 Proveedor", name: "Academia de Danza Cali", action: "Verificar" },
                { type: "🎯 Actividad", name: "Tour por museos locales", action: "Aprobar" },
                { type: "👤 Reporte", name: "Contenido inapropiado #124", action: "Revisar" },
                { type: "🏢 Proveedor", name: "Club de Lectura del Valle", action: "Verificar" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{item.type}</div>
                    <div style={{ color: C.textSecondary, fontSize: 13 }}>{item.name}</div>
                  </div>
                  <Button variant="secondary" size="sm">{item.action}</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "users" && (
        <div style={styles.card}>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 40, padding: "8px 16px", gap: 10 }}>
                <span>🔍</span>
                <input style={{ border: "none", background: "transparent", outline: "none", fontSize: 14, fontFamily: "inherit" }} placeholder="Buscar usuarios..." />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Button variant="secondary" size="sm">Filtrar</Button>
                <Button size="sm">+ Nuevo usuario</Button>
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["Usuario", "Ciudad", "Edad", "Actividades", "Estado", "Acciones"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 800, color: C.textSecondary, fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={styles.avatar(36)}>{u.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 700 }}>{u.name}</div>
                          <div style={{ fontSize: 12, color: C.textMuted }}>{u.interests[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: C.textSecondary }}>{u.city}</td>
                    <td style={{ padding: "14px 16px" }}>{u.age} años</td>
                    <td style={{ padding: "14px 16px" }}>{u.posts}</td>
                    <td style={{ padding: "14px 16px" }}><Badge color="teal">Activo</Badge></td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Button variant="outline" size="sm">Ver</Button>
                        <Button variant="danger" size="sm">🚫</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "activities" && (
        <div style={styles.card}>
          <div style={{ padding: 24 }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 20 }}>Gestión de actividades</div>
            {mockActivities.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 28, marginRight: 14 }}>{a.image}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: C.textSecondary }}>{a.provider} · {a.date}</div>
                </div>
                <Badge color={a.categoryColor}>{a.category}</Badge>
                <div style={{ margin: "0 20px", fontWeight: 700, color: a.cost === "Gratuito" ? C.teal : C.textPrimary }}>{a.cost}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant="outline" size="sm">✏️</Button>
                  <Button variant="danger" size="sm">🗑️</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "providers" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { name: "Secretaría de Cultura de Cali", type: "Institución pública", activities: 8, verified: true },
            { name: "Museo La Tertulia", type: "Museo", activities: 5, verified: true },
            { name: "Liga de Yoga de Cali", type: "Organización deportiva", activities: 3, verified: true },
            { name: "Academia de Danza Cali", type: "Academia privada", activities: 0, verified: false },
          ].map((p, i) => (
            <div key={i} style={{ ...styles.card, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={styles.avatar(52)}>{p.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{p.name}</div>
                <div style={{ color: C.textSecondary, fontSize: 14 }}>{p.type} · {p.activities} actividades</div>
              </div>
              <Badge color={p.verified ? "teal" : "amber"}>{p.verified ? "✓ Verificado" : "⏳ Pendiente"}</Badge>
              <div style={{ display: "flex", gap: 10 }}>
                {!p.verified && <Button variant="success" size="sm">Verificar</Button>}
                <Button variant="outline" size="sm">Ver perfil</Button>
                <Button variant="danger" size="sm">Suspender</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── APP SHELL ────────────────────────────────────────────────────────────────
const navItems = [
  ["home", "🏠", "Inicio"],
  ["activities", "🎯", "Actividades"],
  ["calendar", "📅", "Mi calendario"],
  ["wishlist", "❤️", "Me interesa"],
  ["feed", "📝", "Publicaciones"],
  ["profile", "👤", "Mi perfil"],
];

const AppShell = ({ children, view, setView, role }) => {
  const extraNav = role === "proveedor"
    ? [["provider", "🏢", "Panel Proveedor"]]
    : role === "admin"
    ? [["admin", "⚙️", "Panel Admin"]]
    : [];

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>🌺</div>
          <div style={styles.logoText}>Club Chicaneo</div>
          <div style={styles.logoSub}>+55</div>
        </div>

        <nav style={{ flex: 1, overflowY: "auto" }}>
          {[...navItems, ...extraNav].map(([key, emoji, label]) => (
            <div key={key} style={styles.navItem(view === key)} onClick={() => setView(key)}>
              <span style={{ fontSize: 20 }}>{emoji}</span>
              <span>{label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: "16px 0 0", borderTop: `1px solid ${C.border}` }}>
          <div style={{ ...styles.navItem(false), gap: 12 }}>
            <span style={{ fontSize: 20 }}>❓</span><span>Ayuda</span>
          </div>
          <div style={{ ...styles.navItem(false), gap: 12 }}>
            <span style={{ fontSize: 20 }}>🚪</span><span>Cerrar sesión</span>
          </div>
        </div>
      </div>

      {/* Topbar */}
      <div style={styles.topbar}>
        <div style={styles.searchBar}>
          <span>🔍</span>
          <input style={styles.searchInput} placeholder="Buscar actividades, categorías, lugares..." />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", position: "relative" }}>
            🔔
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 8, height: 8, borderRadius: "50%",
              background: C.coral, border: "2px solid white",
            }} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={styles.avatar(38)}>MG</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Hola, María 👋</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>
                {role === "admin" ? "Administrador" : role === "proveedor" ? "Proveedor" : "Adulto Mayor"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main style={styles.main}>
        {children}
      </main>

      {/* AI Help Btn */}
      <div style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: C.purple,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(108,92,231,0.4)",
        zIndex: 200,
      }} title="Asistente con IA">
        🤖
      </div>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login"); // login | register | app
  const [view, setView] = useState("home");
  const [role, setRole] = useState("usuario");
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleLogin = (loginRole) => {
    setRole(loginRole);
    setScreen("app");
    if (loginRole === "proveedor") setView("provider");
    else if (loginRole === "admin") setView("admin");
    else setView("home");
  };

  if (screen === "login") return <LoginView onLogin={handleLogin} switchTo={setScreen} />;
  if (screen === "register") return <RegisterView switchTo={setScreen} />;

  const renderView = () => {
    switch (view) {
      case "home": return <HomeView setView={setView} setSelectedActivity={setSelectedActivity} />;
      case "activities": return <ActivitiesView setView={setView} setSelectedActivity={setSelectedActivity} />;
      case "activity-detail": return <ActivityDetailView activity={selectedActivity} setView={setView} />;
      case "calendar": return <CalendarView />;
      case "wishlist": return <WishlistView setView={setView} setSelectedActivity={setSelectedActivity} />;
      case "feed": return <FeedView />;
      case "profile": return <ProfileView />;
      case "provider": return <ProviderView />;
      case "admin": return <AdminView />;
      default: return <HomeView setView={setView} setSelectedActivity={setSelectedActivity} />;
    }
  };

  return (
    <AppShell view={view} setView={setView} role={role}>
      {renderView()}
    </AppShell>
  );
}
