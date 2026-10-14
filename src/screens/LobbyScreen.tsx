import BackLink from '../components/BackLink';
import Button from '../components/Button';
import Item from '../components/Item';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import { locations, TOTAL } from '../data/locations';
import { teams } from '../data/teams';

type Props = { teamId: number; members: string[]; onEnter: () => void; onBack: () => void };

export default function LobbyScreen({ teamId, members, onEnter, onBack }: Props) {
  const team = teams.find((t) => t.id === teamId);
  const spots = locations.filter((l) => l.teamId === teamId).map((l) => l.shortName);

  return (
    <Screen
      tone="black"
      footer={
        <>
          <Button variant="white" disabled={members.length === 0} onClick={onEnter}>
            Enter map
          </Button>
          <BackLink tone="white" onClick={onBack} />
        </>
      }
    >
      <ScreenHeader title={`${team?.name}\n${spots.join(' / ')}`.toUpperCase()} />
      <div className="flex w-full flex-col gap-[14px]">
        {[0, 1, 2].map((slot) => (
          <Item key={slot} active={slot < members.length}>
            <span className="font-display font-bold uppercase">{members[slot] ?? ''}</span>
          </Item>
        ))}
      </div>
      <div className="mt-7 flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-[16px] font-bold">YOUR MISSION</h2>
        <p className="max-w-[260px]">
          Together, document all {TOTAL} locations before 11:30.
          <br />
          <br />
          Your team can explore one location at a time.
        </p>
      </div>
    </Screen>
  );
}
