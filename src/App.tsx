import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ensureSession } from './lib/auth';
import NameScreen from './screens/NameScreen';
import { useStore } from './store';

function Game() {
  const mode = useStore((s) => s.mode);
  const [choosingTeam, setChoosingTeam] = useState(false);

  if (mode) return <p className="p-6">Map (folgt)</p>;
  if (choosingTeam) return <p className="p-6">Team-Auswahl (folgt)</p>;
  return <NameScreen onChooseTeam={() => setChoosingTeam(true)} />;
}

export default function App() {
  useEffect(() => {
    void ensureSession();
  }, []);

  return (
    <BrowserRouter>
      <div className="mx-auto min-h-dvh max-w-[480px]">
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/reset" element={<p className="p-6">Reset</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
