import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto min-h-dvh max-w-[480px]">
        <Routes>
          <Route path="/" element={<p className="p-6">Vibecatch Bern</p>} />
          <Route path="/reset" element={<p className="p-6">Reset</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
