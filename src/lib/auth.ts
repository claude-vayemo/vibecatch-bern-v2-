import { supabase } from './supabase';

// Anonyme Session sicherstellen. Die Session bleibt im localStorage erhalten.
export async function ensureSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) return;
  const { error } = await supabase.auth.signInAnonymously();
  if (error) console.error('Anonyme Anmeldung fehlgeschlagen:', error.message);
}
