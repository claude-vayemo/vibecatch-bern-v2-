import { useCallback, useEffect, useRef, useState } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type TeamStatus = { team_id: number; active_members: number };

// Aktive Mitglieder pro Team, live über Änderungen an team_members.
export function useTeamStatus() {
  const [status, setStatus] = useState<TeamStatus[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('team_status').select('team_id, active_members');
      if (data) setStatus(data);
    };
    void load();
    const channel = supabase
      .channel('team-status')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_members' }, load)
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return status;
}

// Markierte Standorte aller Teams, live. null = noch nicht geladen.
export function useTeamMarks(enabled: boolean) {
  const [marks, setMarks] = useState<number[] | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from('location_marks').select('location_id');
    if (data) setMarks(data.map((row) => row.location_id));
  }, []);

  useEffect(() => {
    if (!enabled) {
      setMarks(null);
      return;
    }
    void load();
    const channel = supabase
      .channel('location-marks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'location_marks' }, load)
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [enabled, load]);

  return [marks, load] as const;
}

// Presence auf team:{id}, solange der User im Team ist (Lobby und Map).
export function useTeamMembers(teamId: number | null, name: string) {
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    if (teamId === null) {
      setMembers([]);
      return;
    }
    let cancelled = false;
    let channel: RealtimeChannel | undefined;

    void supabase.auth.getSession().then(({ data }) => {
      const userId = data.session?.user.id;
      if (!userId || cancelled) return;
      const ch = supabase.channel(`team:${teamId}`, { config: { presence: { key: userId } } });
      channel = ch;
      ch.on('presence', { event: 'sync' }, () => {
        const state = ch.presenceState<{ name: string }>();
        setMembers(Object.values(state).map((entries) => entries[0].name));
      }).subscribe((status) => {
        if (status === 'SUBSCRIBED') void ch.track({ name });
      });
    });

    return () => {
      cancelled = true;
      if (channel) void supabase.removeChannel(channel);
    };
  }, [teamId, name]);

  return members;
}

// heartbeat() sofort, alle 30 s und beim Zurückkehren in den Tab.
// false = Platz verfallen oder Reset.
export function useHeartbeat(enabled: boolean, onLost: () => void) {
  const onLostRef = useRef(onLost);
  onLostRef.current = onLost;

  useEffect(() => {
    if (!enabled) return;
    const beat = async () => {
      const { data, error } = await supabase.rpc('heartbeat');
      if (!error && data === false) onLostRef.current();
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') void beat();
    };
    void beat();
    const timer = setInterval(beat, 30_000);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [enabled]);
}

// Broadcast „reset“ auf dem Channel game.
export function useResetListener(onReset: () => void) {
  const onResetRef = useRef(onReset);
  onResetRef.current = onReset;

  useEffect(() => {
    const channel = supabase
      .channel('game')
      .on('broadcast', { event: 'reset' }, () => onResetRef.current())
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);
}
