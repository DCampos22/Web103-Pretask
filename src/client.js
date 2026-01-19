import { createClient } from '@supabase/supabase-js';
const URL = 'https://yhpepihnxoyngijtltze.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlocGVwaWhueG95bmdpanRsdHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MTY3NDQsImV4cCI6MjA4NDE5Mjc0NH0.hmJpetMk7RzMTn28Yy3IgyXCpQfRWYcKNPL6m_aKnCE';
export const supabase = createClient(URL, API_KEY);
