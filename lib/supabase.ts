import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient({
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
});
