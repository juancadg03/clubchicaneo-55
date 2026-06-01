alter table public.usuario enable row level security;
alter table public.proveedor_actividad enable row level security;
alter table public.categoria_actividad enable row level security;
alter table public.actividad enable row level security;
alter table public.preferencia_usuario enable row level security;
alter table public.inscripcion_actividad enable row level security;
alter table public.calendario_usuario enable row level security;
alter table public.administrador_sistema enable row level security;
alter table public.lista_interes_usuario enable row level security;

drop policy if exists "demo_usuario_select" on public.usuario;
create policy "demo_usuario_select" on public.usuario for select using (true);

drop policy if exists "demo_usuario_insert" on public.usuario;
create policy "demo_usuario_insert" on public.usuario for insert with check (true);

drop policy if exists "demo_usuario_update" on public.usuario;
create policy "demo_usuario_update" on public.usuario for update using (true) with check (true);

drop policy if exists "demo_proveedor_select" on public.proveedor_actividad;
create policy "demo_proveedor_select" on public.proveedor_actividad for select using (true);

drop policy if exists "demo_categoria_select" on public.categoria_actividad;
create policy "demo_categoria_select" on public.categoria_actividad for select using (true);

drop policy if exists "demo_actividad_select" on public.actividad;
create policy "demo_actividad_select" on public.actividad for select using (true);

drop policy if exists "demo_actividad_update" on public.actividad;
create policy "demo_actividad_update" on public.actividad for update using (true) with check (true);

drop policy if exists "demo_inscripcion_select" on public.inscripcion_actividad;
create policy "demo_inscripcion_select" on public.inscripcion_actividad for select using (true);

drop policy if exists "demo_inscripcion_insert" on public.inscripcion_actividad;
create policy "demo_inscripcion_insert" on public.inscripcion_actividad for insert with check (true);

drop policy if exists "demo_calendario_select" on public.calendario_usuario;
create policy "demo_calendario_select" on public.calendario_usuario for select using (true);

drop policy if exists "demo_calendario_insert" on public.calendario_usuario;
create policy "demo_calendario_insert" on public.calendario_usuario for insert with check (true);

drop policy if exists "demo_lista_interes_select" on public.lista_interes_usuario;
create policy "demo_lista_interes_select" on public.lista_interes_usuario for select using (true);

drop policy if exists "demo_lista_interes_insert" on public.lista_interes_usuario;
create policy "demo_lista_interes_insert" on public.lista_interes_usuario for insert with check (true);

drop policy if exists "demo_lista_interes_delete" on public.lista_interes_usuario;
create policy "demo_lista_interes_delete" on public.lista_interes_usuario for delete using (true);

drop policy if exists "demo_admin_select" on public.administrador_sistema;
create policy "demo_admin_select" on public.administrador_sistema for select using (true);
