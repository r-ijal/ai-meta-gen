import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig();

const supabaseUrl = config.SUPABASE_URL;
const supabaseKey = config.SUPABASE_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
