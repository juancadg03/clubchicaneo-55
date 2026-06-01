import { useState } from "react";
import brandWordmark from "../assets/brand-wordmark.png";
import heroHome from "../assets/hero-home.jpg";
import registerPortrait from "../assets/register-portrait.png";

function AuthIcon({ name, size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {name === "mail" && (
        <>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="m5 8 7 5 7-5" />
        </>
      )}
      {name === "lock" && (
        <>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 1 1 8 0v3" />
        </>
      )}
      {name === "eye" && (
        <>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      )}
      {name === "eye-off" && (
        <>
          <path d="m3 3 18 18" />
          <path d="M10.6 6.3A10.6 10.6 0 0 1 12 6c6.5 0 10 6 10 6a18.5 18.5 0 0 1-3.1 3.8" />
          <path d="M6.3 6.3A18.2 18.2 0 0 0 2 12s3.5 6 10 6a10.7 10.7 0 0 0 4.2-.8" />
        </>
      )}
      {name === "arrow-right" && (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      )}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M12 3 5 6v5c0 4.4 2.9 8.5 7 10 4.1-1.5 7-5.6 7-10V6Z" />
          <path d="m9.3 12 1.8 1.8 3.6-3.6" />
        </>
      )}
      {name === "help" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.8 9a2.4 2.4 0 1 1 3.9 2c-.8.6-1.7 1.1-1.7 2.5" />
          <path d="M12 17h.01" />
        </>
      )}
    </svg>
  );
}

export default function LoginView({
  errorMessage,
  form,
  helperUsers,
  onClose,
  onGoToRegister,
  onSubmit,
  onUseDemoUser,
  setForm,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const selectedRole = form.role ?? "adulto_mayor";
  const roleOptions = [
    { value: "adulto_mayor", label: "Usuario 55+" },
    { value: "proveedor", label: "Proveedor" },
    { value: "administrador", label: "Admin" },
  ];
  const visibleHelperUsers = helperUsers.filter((user) => user.rol === selectedRole);

  return (
    <div className="auth-stage">
      <div className="auth-layout">
        <section className="auth-visual">
          <div className="auth-brand-card">
            <img alt="Club Chicaneo +55" className="brand-wordmark auth-brand-wordmark" src={brandWordmark} />
          </div>

          <div className="auth-hero">
            <img alt="Adultos mayores compartiendo actividades" src={heroHome} />
            <div className="auth-hero-overlay" />
            <div className="auth-hero-copy">
              <span className="auth-hero-kicker">Bienvenida segura</span>
              <h1>Un espacio pensado para compartir, aprender y encontrar actividades que te hagan bien.</h1>
              <p>En Club Chicaneo +55 queremos que cada persona mayor se sienta acompañada, activa y bienvenida desde el primer momento.</p>
            </div>
          </div>

          <div className="auth-support-grid">
            <article className="auth-tip-card">
              <div className="auth-tip-icon">
                <AuthIcon name="mail" />
              </div>
              <div>
                <strong>Correo electrónico</strong>
                <p>Usa el correo con el que creaste tu cuenta.</p>
              </div>
            </article>
            <article className="auth-tip-card">
              <div className="auth-tip-icon">
                <AuthIcon name="lock" />
              </div>
              <div>
                <strong>Contraseña</strong>
                <p>Ingresa con tranquilidad y accede al espacio que corresponde a tu perfil dentro del sistema.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-card-topbar">
            <button className="text-button" onClick={onClose} type="button">
              Seguir explorando sin iniciar sesión
            </button>
          </div>

          <div className="auth-card-header">
            <img alt="Persona mayor usando la plataforma" className="auth-avatar-illustration" src={registerPortrait} />
            <div>
              <span className="auth-badge">Inicio de sesión</span>
              <h2>Entra a tu cuenta</h2>
              <p>Todo está pensado para que el acceso sea fácil de leer y entender.</p>
            </div>
          </div>

          <form className="auth-form" onSubmit={onSubmit}>
            <div className="field">
              <span>Tipo de acceso</span>
              <div className="auth-role-grid">
                {roleOptions.map((role) => (
                  <button
                    className={`auth-role-chip ${selectedRole === role.value ? "auth-role-chip-active" : ""}`}
                    key={role.value}
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        role: role.value,
                        correo: "",
                        contrasena: "",
                      }))
                    }
                    type="button"
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="field">
              <span>Correo electrónico</span>
              <div className="auth-input-shell">
                <AuthIcon name="mail" />
                <input
                  autoComplete="email"
                  onChange={(event) => setForm((current) => ({ ...current, correo: event.target.value }))}
                  placeholder="Ej: maria@email.com"
                  type="email"
                  value={form.correo}
                />
              </div>
            </label>

            <label className="field">
              <span>Contraseña</span>
              <div className="auth-input-shell">
                <AuthIcon name="lock" />
                <input
                  autoComplete="current-password"
                  onChange={(event) => setForm((current) => ({ ...current, contrasena: event.target.value }))}
                  placeholder="Ingresa tu contraseña"
                  type={showPassword ? "text" : "password"}
                  value={form.contrasena}
                />
                <button
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  type="button"
                >
                  <AuthIcon name={showPassword ? "eye-off" : "eye"} />
                </button>
              </div>
            </label>

            {errorMessage && (
              <div className="auth-error">
                <AuthIcon name="help" size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button className="button button-primary auth-submit" type="submit">
              <AuthIcon name="arrow-right" size={16} />
              Ingresar
            </button>
          </form>

          <div className="auth-helper-card">
            <div className="auth-helper-header">
              <div className="auth-tip-icon">
                <AuthIcon name="user" />
              </div>
              <div>
                <strong>Cuentas de prueba</strong>
                <p>Primero elige el perfil de acceso y luego carga una cuenta de ejemplo.</p>
              </div>
            </div>
            <div className="auth-helper-list auth-helper-list-grid">
              {visibleHelperUsers.map((user) => (
                <button className="auth-demo-account" key={user.id_usuario} onClick={() => onUseDemoUser(user)} type="button">
                  <strong>{user.rol === "adulto_mayor" ? "Adulto mayor" : user.rol === "proveedor" ? "Proveedor" : "Administrador"}</strong>
                  <span>{user.correo}</span>
                  <small>{user.contrasena}</small>
                </button>
              ))}
            </div>
          </div>

          {selectedRole === "adulto_mayor" && (
            <div className="auth-footer">
              <span>¿Aún no tienes cuenta como usuario 55+?</span>
              <button className="text-button" onClick={onGoToRegister} type="button">
                Crear cuenta
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
