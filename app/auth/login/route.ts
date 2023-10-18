import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/lib/database.types";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    // options: {
    //   redirectTo: `${location.origin}/auth/callback`,
    // },
  });

  return NextResponse.redirect(data.url!, {
    status: 301,
  });
}
