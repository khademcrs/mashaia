import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwqjvnafzafojjppfrvx.supabase.co';
const supabaseKey = 'sb_publishable_2v5nWYAu5Ye-NKxQ3SbgdQ_EDdGPhli';

export const supabase = createClient(supabaseUrl, supabaseKey);
