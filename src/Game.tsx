import { useCallback, useEffect, useRef, useState } from 'react';
import Fade from './components/Fade';
import { locations, TOTAL } from './data/locations';
import FinalSuccess from './screens/FinalSuccess';
import IntroScreen from './screens/IntroScreen';
import MapScreen from './screens/MapScreen';
import MarkSuccess from './screens/MarkSuccess';
import SplashScreen from './screens/SplashScreen';
import SpotSheet from './screens/SpotSheet';
import { useStore } from './store';

type View = 'splash' | 'intro' | 'map';

export default function Game() {
  const { started, marks, start, mark, unmark } = useStore();
  const [view, setView] = useState<View>(started ? 'map' : 'splash');
  const [spot, setSpot] = useState<number | null>(null);
  const [success, setSuccess] = useState<number | null>(null);
  const [final, setFinal] = useState(false);
  const mapIntro = useRef(true);

  // Final-Success, sobald alle Standorte erreicht werden (nicht beim Laden).
  const previousCount = useRef(marks.length);
  useEffect(() => {
    if (previousCount.current < TOTAL && marks.length >= TOTAL) setFinal(true);
    previousCount.current = marks.length;
  }, [marks]);

  const closeSuccess = useCallback(() => setSuccess(null), []);

  const catchSpot = (id: number) => {
    mark(id);
    setSpot(null);
    setSuccess(id);
  };

  if (success !== null) {
    const location = locations.find((l) => l.id === success)!;
    return (
      <Fade key="success">
        <MarkSuccess location={location} count={marks.length} onDone={closeSuccess} />
      </Fade>
    );
  }
  if (final) {
    return (
      <Fade key="final">
        <FinalSuccess onBack={() => setFinal(false)} />
      </Fade>
    );
  }

  if (view === 'splash') {
    return (
      <Fade key="splash">
        <SplashScreen onStart={() => setView('intro')} />
      </Fade>
    );
  }
  if (view === 'intro') {
    return (
      <Fade key="intro">
        <IntroScreen
          onStart={() => {
            start();
            mapIntro.current = true;
            setView('map');
          }}
          onBack={() => setView('splash')}
        />
      </Fade>
    );
  }

  const selected = locations.find((l) => l.id === spot);

  return (
    <>
      <Fade key="map">
        <MapScreen
          marks={marks}
          onSelect={setSpot}
          onShowFinal={() => setFinal(true)}
          onHome={() => {
            setSpot(null);
            setView('splash');
          }}
          intro={mapIntro.current}
          onIntroPlayed={() => {
            mapIntro.current = false;
          }}
        />
      </Fade>
      {selected && (
        <SpotSheet
          key={selected.id}
          location={selected}
          caught={marks.includes(selected.id)}
          onMark={() => catchSpot(selected.id)}
          onUnmark={() => unmark(selected.id)}
          onClose={() => setSpot(null)}
        />
      )}
    </>
  );
}
