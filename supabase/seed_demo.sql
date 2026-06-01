begin;

insert into categoria_actividad (id_categoria, nombre_categoria, descripcion_categoria)
values
  (1, 'Cultura', 'Actividades culturales y artisticas.'),
  (2, 'Deporte', 'Actividades fisicas y recreativas.'),
  (3, 'Salud', 'Bienestar, respiracion y movimiento guiado.'),
  (4, 'Turismo', 'Experiencias de paseo y exploracion.')
on conflict (id_categoria) do update
set
  nombre_categoria = excluded.nombre_categoria,
  descripcion_categoria = excluded.descripcion_categoria;

insert into usuario (
  id_usuario, nombre, apellido, correo, contrasena, telefono, fecha_nacimiento, ciudad, direccion, rol, estado_cuenta
)
values
  (1, 'Maria', 'Gonzalez', 'maria@clubchicaneo55.com', 'maria123', '3001234567', '1958-05-11', 'Cali', 'Barrio San Fernando', 'adulto_mayor', 'activo'),
  (2, 'Carlos', 'Herrera', 'carlos@clubchicaneo55.com', 'carlos123', '3005551212', '1954-08-02', 'Cali', 'Barrio El Ingenio', 'adulto_mayor', 'activo'),
  (3, 'Lucia', 'Ramirez', 'lucia@clubchicaneo55.com', 'lucia123', '3008884545', '1960-11-14', 'Palmira', 'Centro', 'adulto_mayor', 'inactivo'),
  (4, 'Adriana', 'Cruz', 'proveedor@clubchicaneo55.com', 'proveedor123', '3007778899', '1980-04-23', 'Cali', 'Centro Historico', 'proveedor', 'activo'),
  (5, 'Juan Carlos', 'Diaz', 'admin1@clubchicaneo55.com', 'admin123', '3004443322', '1985-01-17', 'Cali', 'Edificio Administrativo', 'administrador', 'activo'),
  (6, 'Valentina', 'Feijoo', 'admin2@clubchicaneo55.com', 'admin234', '3004443323', '1990-07-21', 'Cali', 'Edificio Administrativo', 'administrador', 'activo'),
  (7, 'Federico', 'Teran', 'admin3@clubchicaneo55.com', 'admin345', '3004443324', '1988-03-03', 'Cali', 'Edificio Administrativo', 'administrador', 'activo')
on conflict (id_usuario) do update
set
  nombre = excluded.nombre,
  apellido = excluded.apellido,
  correo = excluded.correo,
  contrasena = excluded.contrasena,
  telefono = excluded.telefono,
  fecha_nacimiento = excluded.fecha_nacimiento,
  ciudad = excluded.ciudad,
  direccion = excluded.direccion,
  rol = excluded.rol,
  estado_cuenta = excluded.estado_cuenta;

insert into proveedor_actividad (
  id_proveedor, id_usuario, nombre_entidad, nit, correo_contacto, telefono_contacto, descripcion, estado_validacion
)
values
  (1, 4, 'Secretaria de Cultura de Cali', '900123456-7', 'contacto@clubchicaneo55.com', '6021234567', 'Proveedor institucional para actividades culturales.', 'aprobado')
on conflict (id_proveedor) do update
set
  id_usuario = excluded.id_usuario,
  nombre_entidad = excluded.nombre_entidad,
  nit = excluded.nit,
  correo_contacto = excluded.correo_contacto,
  telefono_contacto = excluded.telefono_contacto,
  descripcion = excluded.descripcion,
  estado_validacion = excluded.estado_validacion;

insert into administrador_sistema (id_administrador, id_usuario, nivel_permiso)
values
  (1, 5, 'general'),
  (2, 6, 'operativo'),
  (3, 7, 'moderacion')
on conflict (id_administrador) do update
set
  id_usuario = excluded.id_usuario,
  nivel_permiso = excluded.nivel_permiso;

insert into actividad (
  id_actividad, id_proveedor, id_categoria, nombre_actividad, descripcion, fecha, hora_inicio, hora_fin, ubicacion,
  cupos_totales, cupos_disponibles, costo, imagen, nivel_dificultad, restricciones, estado_actividad
)
values
  (1, 1, 1, 'Taller de Pintura', 'Aprende color, composicion y expresion visual en una sesion guiada con materiales accesibles y acompanamiento cercano.', '2026-05-20', '10:00', '12:00', 'Museo La Tertulia', 12, 10, 0, 'painting', 'baja', 'Actividad de intensidad baja. No requiere experiencia previa. Material basico incluido.', 'activa'),
  (2, 1, 3, 'Yoga para todos', 'Sesion disenada para mejorar movilidad, respiracion y bienestar general con instrucciones claras y pausas frecuentes.', '2026-05-22', '08:30', '09:30', 'Escuela Nacional del Deporte', 20, 16, 0, 'yoga', 'baja', 'Usar ropa comoda. Se recomienda llevar agua. Actividad de intensidad baja.', 'activa'),
  (3, 1, 1, 'Visita guiada al museo', 'Descubre salas y colecciones en un recorrido cultural con grupos pequenos, tiempos de descanso y lenguaje cercano.', '2026-05-24', '11:00', '12:30', 'Museo de Arte Moderno', 18, 12, 15000, 'museum', 'baja', 'Actividad de intensidad baja. Incluye guia cultural. No incluye transporte.', 'activa'),
  (4, 1, 4, 'Caminata ecologica', 'Explora un entorno verde con acompanamiento guiado, actividades de observacion y una velocidad comoda para el grupo.', '2026-05-25', '07:00', '09:00', 'Parque del Perro', 25, 20, 0, 'walk', 'baja', 'Usar calzado comodo. No recomendable para movilidad muy reducida. Llevar gorra o sombrero.', 'activa'),
  (5, 1, 1, 'Recorrido cultural por el Centro Historico de Cali', 'Recorrido guiado por el centro historico para descubrir patrimonio, historias de la ciudad y puntos culturales destacados.', '2026-05-30', '09:00', '12:00', 'Centro Historico de Cali', 16, 11, 0, 'city-tour', 'baja', 'Actividad de intensidad baja. Uso de calzado comodo. No recomendable para movilidad muy reducida.', 'activa'),
  (6, 1, 4, 'Excursion a la playa', 'Disfruta un paseo de un dia con coordinacion previa, acompanamiento logistico y tiempos organizados de descanso.', '2026-05-28', '09:00', '17:00', 'Playa Ladrilleros', 10, 7, 30000, 'beach', 'media', 'Incluye transporte. No es una actividad gratuita. Requiere registro previo.', 'activa')
on conflict (id_actividad) do update
set
  id_proveedor = excluded.id_proveedor,
  id_categoria = excluded.id_categoria,
  nombre_actividad = excluded.nombre_actividad,
  descripcion = excluded.descripcion,
  fecha = excluded.fecha,
  hora_inicio = excluded.hora_inicio,
  hora_fin = excluded.hora_fin,
  ubicacion = excluded.ubicacion,
  cupos_totales = excluded.cupos_totales,
  cupos_disponibles = excluded.cupos_disponibles,
  costo = excluded.costo,
  imagen = excluded.imagen,
  nivel_dificultad = excluded.nivel_dificultad,
  restricciones = excluded.restricciones,
  estado_actividad = excluded.estado_actividad;

insert into lista_interes_usuario (id_usuario, id_actividad)
values
  (1, 1),
  (1, 5)
on conflict do nothing;

insert into inscripcion_actividad (id_inscripcion, id_usuario, id_actividad, estado_inscripcion, confirmacion_asistencia)
values
  (1, 1, 1, 'inscrito', false),
  (2, 1, 2, 'inscrito', false)
on conflict (id_inscripcion) do nothing;

insert into calendario_usuario (
  id_evento_calendario, id_usuario, id_actividad, titulo_evento, fecha, hora_inicio, hora_fin, descripcion_evento, estado_evento
)
values
  (1, 1, 1, 'Taller de Pintura', '2026-05-20', '10:00', '12:00', 'Reserva confirmada en Museo La Tertulia.', 'programado'),
  (2, 1, 2, 'Yoga para todos', '2026-05-22', '08:30', '09:30', 'Reserva confirmada en Escuela Nacional del Deporte.', 'programado')
on conflict (id_evento_calendario) do nothing;

select setval('usuario_id_usuario_seq', greatest((select max(id_usuario) from usuario), 1));
select setval('proveedor_actividad_id_proveedor_seq', greatest((select max(id_proveedor) from proveedor_actividad), 1));
select setval('categoria_actividad_id_categoria_seq', greatest((select max(id_categoria) from categoria_actividad), 1));
select setval('actividad_id_actividad_seq', greatest((select max(id_actividad) from actividad), 1));
select setval('inscripcion_actividad_id_inscripcion_seq', greatest((select max(id_inscripcion) from inscripcion_actividad), 1));
select setval('calendario_usuario_id_evento_calendario_seq', greatest((select max(id_evento_calendario) from calendario_usuario), 1));
select setval('administrador_sistema_id_administrador_seq', greatest((select max(id_administrador) from administrador_sistema), 1));

commit;
