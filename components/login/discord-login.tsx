"use client";
import Image from "next/image";
import discordLogo from "@/app/assets/logos/discord.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function DiscordLogin() {
  const supabase = createClientComponentClient<Database>();
  const searchParams = useSearchParams();
  const callbackUrl = ("/verify?callbackUrl=" +
    (searchParams.get("callbackUrl") ?? "/home")) as string;

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const signInWithDiscord = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${getURL()}/auth/callback?urlTo=${callbackUrl}`,
      },
    });

    // if enabled, this will refresh the page at ios so gives bug
    // router.refresh();
  };

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#5865F2] cursor-pointer"
      onClick={() => signInWithDiscord()}
    >
      <Image
        className="w-[24px] h-[24px] ml-[20px] absolute left-0"
        src={discordLogo}
        alt=""
      />
      <p>디스코드로 시작하기</p>
    </div>
  );
}
