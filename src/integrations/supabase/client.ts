// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pfxhmjayzgyodbdeybbo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeGhtamF5emd5b2RiZGV5YmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NjgxNjEsImV4cCI6MjA1ODA0NDE2MX0.-vlTY1ia48lL01oQ3tDTJgLwrclZbCMh4woFajod3Q0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);