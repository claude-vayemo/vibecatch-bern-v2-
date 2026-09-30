import { useCallback, useEffect, useRef, useState } from 'react';
import { locations, TOTAL } from './data/locations';
import { supabase } from './lib/supabase';
import { useHeartbeat, useResetListener, useTeamMarks, useTeamMembers } from './lib/team';
import FinalSuccess from './screens/FinalSuccess';
import LobbyScreen from './screens/LobbyScreen';
import MapScreen from './screens/MapScreen';
import MarkSuccess from './screens/MarkSuccess';
import NameScreen from './screens/NameScreen';
import SplashScreen from './screens/SplashScreen';
import SpotSheet from './screens/SpotSheet';
import TeamSelectScreen from './screens/TeamSelectScreen';
import { useStore } from './store';

type View = 'splash' | 'name' | 'teams' | 'lobby' | 'map';

export default function Game() {
  const { name, mode, teamId, soloMarks, startSolo, leaveTeam, markSolo, reset } = useStore();
  const [view, setView] = useState<View>(mode ? 'map' : 'splash');
  const [spot, setSpot] = useState<number | null>(null);
  const [success, setSuccess] = useState<number | null>(null);
  const [final, setFinal] = useState(false);
  const mapIntro = useRef(true);

  const enterMap = () => {
    mapIntro.current = true;
    setView('map');
  };

  const inTeam = mode === 'team' && teamId !== null;
  const members = useTeamMembers(inTeam ? teamId : null, name);
  const [teamMarks, reloadMarks] = useTeamMarks(inTeam);
  const marks = inTeam ? teamMarks : soloMarks;

  useHeartbeat(inTeam, () => {
    leaveTeam();
    setSpot(null);
    setView('teams');
  });

  useResetListener(() => {
    reset();
    setSpot(null);
    setSuccess(null);
    setFinal(false);
    setView('splash');
  });

  // Final-Success, sobald 12/12 erreicht werden (nicht beim Laden mit 12/12).
  const previousCount = useRef<number | null>(null);
  useEffect(() => {
    if (!marks) return;
    if (previousCount.current !== null && previousCount.current < TOTAL && marks.length >= TOTAL) {
      setFinal(true);
    }
    previousCount.current = marks.length;
  }, [marks]);

  const closeSuccess = useCallback(() => setSuccess(null), []);

  const mark = async (id: number) => {
    if (inTeam) {
      const { error } = await supabase.rpc('mark_location', { p_location: id });
      if (error) {
        window.alert('Markieren fehlgeschlagen. Bitte nochmals versuchen.');
        return;
      }
      void reloadMarks();
    } else {
      markSolo(id);
    }
    setSpot(null);
    setSuccess(id);
  };

  const backToTeams = async () => {
    await supabase.rpc('leave_team');
    leaveTeam();
    setView('teams');
  };

  if (success !== null) {
    const location = locations.find((l) => l.id === success)!;
    const count = new Set([...(marks ?? []), success]).size;
    return <MarkSuccess location={location} count={count} onDone={closeSuccess} />;
  }
  if (final) return <FinalSuccess onBack={() => setFinal(false)} />;

  if (view === 'splash') return <SplashScreen onStart={() => setView('name')} />;
  if (view === 'name') {
    return (
      <NameScreen
        onSolo={() => {
          startSolo();
          enterMap();
        }}
        onChooseTeam={() => setView('teams')}
        onBack={() => setView('splash')}
      />
    );
  }
  if (view === 'teams' || !mode) {
    return <TeamSelectScreen onJoined={() => setView('lobby')} onBack={() => setView('name')} />;
  }
  if (view === 'lobby' && inTeam) {
    return <LobbyScreen teamId={teamId} members={members} onEnter={enterMap} onBack={backToTeams} />;
  }

  const selected = locations.find((l) => l.id === spot);
  const marked = marks ?? [];

  return (
    <>
      <MapScreen
        marks={marked}
        teamId={inTeam ? teamId : null}
        onSelect={setSpot}
        onShowFinal={() => setFinal(true)}
        intro={mapIntro.current}
        onIntroPlayed={() => {
          mapIntro.current = false;
        }}
      />
      {selected && (
        <SpotSheet
          key={selected.id}
          location={selected}
          canMark={!marked.includes(selected.id) && (!inTeam || selected.teamId === teamId)}
          onMark={() => mark(selected.id)}
          onClose={() => setSpot(null)}
        />
      )}
    </>
  );
}
