-- =========================================================
-- Bern Standorte App – Supabase Schema (MVP)
-- Wird von Claude Code per Supabase MCP (apply_migration) angewendet.
-- Anonymous sign-ins müssen im Dashboard manuell aktiviert werden.
-- =========================================================

-- ---------- Tabellen ----------
create table public.teams (
  id   int primary key,
  name text not null
);

create table public.locations (
  id      int primary key,
  team_id int not null references public.teams(id)
);

create table public.team_members (
  user_id   uuid primary key references auth.users(id) on delete cascade,
  team_id   int not null references public.teams(id),
  name      text not null,
  last_seen timestamptz not null default now()
);
create index team_members_team_idx on public.team_members(team_id);

create table public.location_marks (
  location_id int primary key references public.locations(id),
  team_id     int not null references public.teams(id),
  marked_by   uuid,
  marked_name text,
  marked_at   timestamptz not null default now()
);

create table public.app_config (
  key   text primary key,
  value text not null
);

-- ---------- RLS: Lesen für angemeldete (auch anonyme) User, Schreiben nur via RPC ----------
alter table public.teams          enable row level security;
alter table public.locations      enable row level security;
alter table public.team_members   enable row level security;
alter table public.location_marks enable row level security;
alter table public.app_config     enable row level security; -- keine Policy = nicht lesbar

create policy "read teams"          on public.teams          for select to authenticated using (true);
create policy "read locations"      on public.locations      for select to authenticated using (true);
create policy "read team_members"   on public.team_members   for select to authenticated using (true);
create policy "read location_marks" on public.location_marks for select to authenticated using (true);

-- ---------- View: aktive Mitglieder pro Team ----------
create view public.team_status with (security_invoker = true) as
select t.id as team_id,
       t.name,
       count(m.user_id) filter (where m.last_seen > now() - interval '2 minutes') as active_members
from public.teams t
left join public.team_members m on m.team_id = t.id
group by t.id, t.name;

-- ---------- RPC: Team beitreten (atomar, max. 3 aktive) ----------
create or replace function public.join_team(p_team int, p_name text)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_count int;
begin
  if auth.uid() is null then raise exception 'not_authenticated'; end if;

  perform 1 from teams where id = p_team for update; -- Lock pro Team
  if not found then raise exception 'team_not_found'; end if;

  delete from team_members where user_id = auth.uid();
  delete from team_members where team_id = p_team and last_seen <= now() - interval '2 minutes';

  select count(*) into v_count from team_members where team_id = p_team;
  if v_count >= 3 then raise exception 'team_full'; end if;

  insert into team_members (user_id, team_id, name)
  values (auth.uid(), p_team, left(trim(p_name), 40));
end $$;

-- ---------- RPC: Team verlassen ----------
create or replace function public.leave_team()
returns void
language sql security definer set search_path = public as $$
  delete from team_members where user_id = auth.uid();
$$;

-- ---------- RPC: Heartbeat (alle ~30s). false = nicht mehr Mitglied ----------
create or replace function public.heartbeat()
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  update team_members set last_seen = now() where user_id = auth.uid();
  return found;
end $$;

-- ---------- RPC: Standort markieren (nur eigenes Team) ----------
create or replace function public.mark_location(p_location int)
returns void
language plpgsql security definer set search_path = public as $$
declare
  v_team int;
  v_name text;
begin
  select team_id into v_team from locations where id = p_location;
  if v_team is null then raise exception 'location_not_found'; end if;

  select name into v_name from team_members where user_id = auth.uid() and team_id = v_team;
  if v_name is null then raise exception 'not_team_member'; end if;

  insert into location_marks (location_id, team_id, marked_by, marked_name)
  values (p_location, v_team, auth.uid(), v_name)
  on conflict (location_id) do nothing;

  update team_members set last_seen = now() where user_id = auth.uid();
end $$;

-- ---------- RPC: Reset (nur mit Key) ----------
create or replace function public.reset_game(p_key text)
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from app_config where key = 'reset_key' and value = p_key) then
    return false;
  end if;
  delete from location_marks where true;
  delete from team_members where true;
  return true;
end $$;

-- ---------- Rechte ----------
revoke all on function public.join_team(int, text), public.leave_team(), public.heartbeat(),
                       public.mark_location(int), public.reset_game(text) from public, anon;
grant execute on function public.join_team(int, text), public.leave_team(), public.heartbeat(),
                          public.mark_location(int), public.reset_game(text) to authenticated;

-- ---------- Realtime ----------
alter table public.team_members   replica identity full;
alter table public.location_marks replica identity full;
alter publication supabase_realtime add table public.team_members, public.location_marks;

-- ---------- Seed (Zuteilung bei Bedarf anpassen, IDs = IDs in src/data/locations.ts) ----------
insert into public.teams (id, name) values
  (1, 'Team 1'), (2, 'Team 2'), (3, 'Team 3'), (4, 'Team 4');

insert into public.locations (id, team_id) values
  (1, 1), (2, 1), (3, 1),
  (4, 2), (5, 2), (6, 2),
  (7, 3), (8, 3), (9, 3),
  (10, 4), (11, 4), (12, 4);

insert into public.app_config (key, value)
values ('reset_key', replace(gen_random_uuid()::text, '-', ''));

-- Reset-Key auslesen:
-- select value from public.app_config where key = 'reset_key';
-- Reset-Link: https://<app>.vercel.app/reset?key=<value>
