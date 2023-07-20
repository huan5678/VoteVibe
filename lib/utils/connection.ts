import {createClient} from '@supabase/supabase-js';
const APP_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const APP_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!APP_SUPABASE_URL || !APP_SUPABASE_KEY) {
  throw new Error('Missing env variables APP_SUPABASE_URL or APP_SUPABASE_KEY');
}
export const supabase = createClient(APP_SUPABASE_URL, APP_SUPABASE_KEY);
