import { createClient } from '@supabase/supabase-js';
const URL = 'https://yhpepihnxoyngijtltze.supabase.co';
const API_KEY = 'YOUR_API';
export const supabase = createClient(URL, API_KEY);
