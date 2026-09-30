import { useState } from 'react';
import BackLink from '../components/BackLink';
import Button from '../components/Button';
import Item from '../components/Item';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import { locations } from '../data/locations';
import { teams } from '../data/teams';
import { supabase } from '../lib/supabase';
import { useTeamStatus } from '../lib/team';
import { useStore } from '../store';

const MAX_MEMBERS = 3;

type Props = { onJoined: () => void; onBack: () => void };

export default function TeamSelectScreen({ onJoined, onBack }: Props) {
  const name = useStore((s) => s.name);
  const joinTeam = useStore((s) => s.joinTeam);
  const status = useTeamStatus();
  const [selected, setSelected] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const activeOf = (teamId: number) => status.find((s) => s.team_id === teamId)?.active_members ?? 0;

  const join = async () => {
    if (selected === null) return;
    setBusy(true);
    setError('');
    const { error } = await supabase.rpc('join_team', { p_team: selected, p_name: name.trim() });
    setBusy(false);
    if (error) {
      setError(error.message.includes('team_full') ? 'Dieses Team ist bereits voll.' : 'Beitritt fehlgeschlagen.');
      setSelected(null);
      return;
    }
    joinTeam(selected);
    onJoined();
  };

  return (
    <Screen
      footer={
        <>
          {error && <p>{error}</p>}
          <Button disabled={selected === null || busy} onClick={join}>
            Team beitreten
          </Button>
          <BackLink onClick={onBack} />
        </>
      }
    >
      <ScreenHeader title="TEAMS" subtitle="Pro Team max 3 Personen" />
      <div className="flex w-full flex-col gap-[17px]">
        {teams.map((team) => {
          const active = activeOf(team.id);
          return (
            <Item
              key={team.id}
              active={selected === team.id}
              disabled={active >= MAX_MEMBERS}
              onClick={() => setSelected(team.id)}
            >
              <span className="font-display font-bold uppercase">
                {team.name} ({active}/{MAX_MEMBERS}):{' '}
              </span>
              {locations
                .filter((l) => l.teamId === team.id)
                .map((l) => l.shortName)
                .join(' / ')}
            </Item>
          );
        })}
      </div>
    </Screen>
  );
}
