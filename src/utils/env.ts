// URL has a default in .env.example, so this is true once the files are copied
export const hasEnvFiles = Boolean(import.meta.env.VITE_SUPABASE_URL);

// True when both URL and anon key are set (keys are empty in .env.example)
export const hasEnvVars = Boolean(
	import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);
