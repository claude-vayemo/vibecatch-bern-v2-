import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Mode = 'solo' | 'team' | null;

type State = {
  name: string;
  mode: Mode;
  teamId: number | null;
  soloMarks: number[];
  setName: (name: string) => void;
  startSolo: () => void;
  joinTeam: (teamId: number) => void;
  leaveTeam: () => void;
  markSolo: (locationId: number) => void;
  reset: () => void;
};

const initial = { name: '', mode: null as Mode, teamId: null as number | null, soloMarks: [] as number[] };

export const useStore = create<State>()(
  persist(
    (set) => ({
      ...initial,
      setName: (name) => set({ name }),
      startSolo: () => set({ mode: 'solo', teamId: null }),
      joinTeam: (teamId) => set({ mode: 'team', teamId }),
      leaveTeam: () => set({ mode: null, teamId: null }),
      markSolo: (locationId) =>
        set((s) => (s.soloMarks.includes(locationId) ? s : { soloMarks: [...s.soloMarks, locationId] })),
      reset: () => set(initial),
    }),
    { name: 'vibecatch' },
  ),
);
