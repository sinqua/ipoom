import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const cookieStore = cookies();
const supabase = createServerComponentClient({ cookies: () => cookieStore });

export const getProfile = async (id: string) => {
  const { data } = await supabase
    .from("profiles")
    .select(`*,  tags (tag)`)
    .eq("user_id", id)
    .single();

  return data;
};
