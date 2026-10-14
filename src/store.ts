import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  started: boolean; // Intro gesehen, beim nächsten Öffnen direkt zur Map
  marks: number[];
  start: () => void;
  mark: (locationId: number) => void;
  unmark: (locationId: number) => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      started: false,
      marks: [],
      start: () => set({ started: true }),
      mark: (locationId) => set((s) => (s.marks.includes(locationId) ? s : { marks: [...s.marks, locationId] })),
      unmark: (locationId) => set((s) => ({ marks: s.marks.filter((id) => id !== locationId) })),
    }),
    { name: 'vibecatch' },
  ),
);
