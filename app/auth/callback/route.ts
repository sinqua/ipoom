import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const urlTo = requestUrl.searchParams.get("urlTo");

  console.log("들어와");
  console.log("requestUrl", requestUrl);

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.json({"asdf" : requestUrl});

  // URL to redirect to after sign in process completes
  // return NextResponse.redirect(requestUrl.origin)
  // return NextResponse.redirect(`${requestUrl.origin}/${urlTo}`);
}
