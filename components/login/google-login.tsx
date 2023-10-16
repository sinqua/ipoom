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
    (searchParams.get("callbackUrl") ?? "/")) as string;

    const signInWithGoogle = async () => {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?urlTo=${callbackUrl}`,
        },
      });
  
      router.refresh();
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
