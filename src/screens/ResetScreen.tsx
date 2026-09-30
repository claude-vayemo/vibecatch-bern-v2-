import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store';

export default function ResetScreen() {
  const [params] = useSearchParams();
  const key = params.get('key') ?? '';
  const [message, setMessage] = useState('…');
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    void supabase.rpc('reset_game', { p_key: key }).then(({ data }) => {
      if (data !== true) {
        setMessage('Ungültiger Key');
        return;
      }
      useStore.getState().reset();
      const channel = supabase.channel('game');
      channel.subscribe((status) => {
        if (status !== 'SUBSCRIBED') return;
        void channel
          .send({ type: 'broadcast', event: 'reset', payload: {} })
          .then(() => supabase.removeChannel(channel));
      });
      setMessage('Zurückgesetzt');
    });
  }, [key]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-brand text-black">
      <p className="font-display text-[16px] font-bold">{message}</p>
    </div>
  );
}
