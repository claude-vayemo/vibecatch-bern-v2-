import BackLink from '../components/BackLink';
import Button from '../components/Button';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';

type Props = { onStart: () => void; onBack: () => void };

export default function IntroScreen({ onStart, onBack }: Props) {
  return (
    <Screen
      footer={
        <>
          <Button variant="white" onClick={onStart}>
            Zur Map
          </Button>
          <BackLink onClick={onBack} />
        </>
      }
    >
      <ScreenHeader title="VIBECATCH BERN" />
      <div className="-mt-5 flex w-full flex-col gap-[14px]">
        <p>
          Statt am Computer über Touchpoints und wie sie verbunden sind nachzudenken, holen wir uns die Inspiration
          in der Stadt.
        </p>
        <p>
          Ihr könnt selbstständig auswählen, welche Orte ihr euch anschauen möchtet. Dokumentiert sie mit Fotos,
          Videos oder Notizen.
        </p>
        <p>
          Ihr müsst nicht alle Orte besucht haben.
          <br />
          Wir besprechen sie am Schluss in der Klasse.
        </p>
        <p>Um 11:30 sehen wir uns wieder beim Treffpunkt am Bahnhof.</p>
      </div>
    </Screen>
  );
}
