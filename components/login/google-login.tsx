"use client";
import Image from "next/image";
// import { signIn } from "next-auth/react";
import googleLogo from "@/app/assets/logos/google.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function GoogleLogin() {
  const router = useRouter();
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

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}/auth/callback?urlTo=${callbackUrl}`,
      },
    });

    // if enabled, this will refresh the page at ios so gives bug
    // router.refresh();
  };

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-white border-[1px] border-s2xyoon-gray cursor-pointer"
      onClick={() => signInWithGoogle()}
    >
      <Image
        className="w-[23px] h-[23px] ml-[19px] absolute left-0"
        src={googleLogo}
        alt=""
      />
      <p className="text-black">구글로 시작하기</p>
    </div>
  );
}
