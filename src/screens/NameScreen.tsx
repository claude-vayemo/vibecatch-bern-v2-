import Button from '../components/Button';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import TextInput from '../components/TextInput';
import { useStore } from '../store';

type Props = { onChooseTeam: () => void };

export default function NameScreen({ onChooseTeam }: Props) {
  const name = useStore((s) => s.name);
  const setName = useStore((s) => s.setName);
  const startSolo = useStore((s) => s.startSolo);
  const empty = name.trim() === '';

  return (
    <Screen
      footer={
        <>
          <Button variant="white" onClick={startSolo}>
            Erkundungsmodus (Einzelspieler)
          </Button>
          <Button disabled={empty} onClick={onChooseTeam}>
            Team wählen
          </Button>
        </>
      }
    >
      <ScreenHeader title="DEIN NAME" subtitle="Erfasse bitte deinen Namen" />
      <TextInput
        placeholder="Insert Name"
        maxLength={40}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Screen>
  );
}
