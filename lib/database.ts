import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const getSupabaseAuth = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string,
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
        autoRefreshToken: false,
      },
      db: {
        schema: "next_auth",
      },
    }
  );

  return supabase;
};

const getSupabase = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
        autoRefreshToken: false,
      },
      db: {
        schema: "public",
      },
    }
  );

  return supabase;
};

export { getSupabaseAuth, getSupabase };

// export const supabaseAuth = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//   process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string,
//   {
//     auth: {
//       persistSession: false,
//       detectSessionInUrl: false,
//       autoRefreshToken: false,
//     },
//     db: {
//       schema: "next_auth",
//     },
//   }
// );

// export const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
//   {
//     auth: {
//       persistSession: false,
//       detectSessionInUrl: false,
//       autoRefreshToken: false,
//     },
//     db: {
//       schema: "public",
//     }
//   }
// );
