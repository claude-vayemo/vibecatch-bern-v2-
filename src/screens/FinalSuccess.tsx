import Button from '../components/Button';
import LocationCard from '../components/LocationCard';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import { locations, TOTAL } from '../data/locations';

type Props = { onBack: () => void };

export default function FinalSuccess({ onBack }: Props) {
  return (
    <Screen footer={<Button onClick={onBack}>VIEW THE MAP</Button>}>
      <ScreenHeader title="MISSION COMPLETE" />
      <div className="text-center font-display font-bold">
        <p className="text-[16px]">
          {TOTAL} / {TOTAL}
        </p>
        <p className="mt-2 text-[28px] leading-[1.05]">
          WE CAUGHT
          <br />
          THE VIBE
          <br />
          OF BERNE.
        </p>
      </div>
      <div className="grid w-full grid-cols-4 gap-2 pb-8">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </Screen>
  );
}
