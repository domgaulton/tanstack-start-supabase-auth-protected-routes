import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// Fallbacks allow the app to boot and render the setup guide when env vars
// are not yet configured. The client won't be functional, but the app won't crash.
export const supabase = createClient<Database>(
	import.meta.env.VITE_SUPABASE_URL || "http://localhost",
	import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder",
);
