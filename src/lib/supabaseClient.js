import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if keys exist to prevent crashes before user sets them up
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase keys are missing. Backend will operate in Mock Mode. Please add them to your .env file.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
