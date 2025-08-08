import { createClient } from '@supabase/supabase-js';
import { Database } from '@shared/supabase';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Create Supabase client only if environment variables are provided
export const supabase = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // Set to true if you need authentication
      },
      realtime: {
        params: {
          eventsPerSecond: 10, // Limit real-time events
        },
      },
    })
  : null;

if (!isSupabaseConfigured()) {
  console.warn('Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}
