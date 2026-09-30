import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './Game';
import { ensureSession } from './lib/auth';
import ResetScreen from './screens/ResetScreen';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void ensureSession().finally(() => setReady(true));
  }, []);

  return (
    <BrowserRouter>
      <div className="mx-auto min-h-dvh max-w-[480px] bg-brand">
        {ready && (
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/reset" element={<ResetScreen />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}
