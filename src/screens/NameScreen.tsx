import BackLink from '../components/BackLink';
import Button from '../components/Button';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import TextInput from '../components/TextInput';
import { useStore } from '../store';

type Props = { onSolo: () => void; onChooseTeam: () => void; onBack: () => void };

export default function NameScreen({ onSolo, onChooseTeam, onBack }: Props) {
  const name = useStore((s) => s.name);
  const setName = useStore((s) => s.setName);

  return (
    <Screen
      footer={
        <>
          <Button variant="white" onClick={onSolo}>
            Erkundungsmodus (Einzelspieler)
          </Button>
          <Button disabled={name.trim() === ''} onClick={onChooseTeam}>
            Team wählen
          </Button>
          <BackLink onClick={onBack} />
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
