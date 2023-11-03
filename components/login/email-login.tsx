"use client";
import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi_small.png";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

export default function EmailLogin({ index }: { index: number }) {
  const supabase = createClientComponentClient<Database>();

  const router = useRouter();

  const signInWithEmail = async () => {
    await supabase.auth.signInWithPassword({
      email: `test${index}@offing.me`,
      password: "offing123!",
    });

    router.push("/verify?callbackUrl=/home");
  };

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#F6F6F6] cursor-pointer"
      onClick={() => signInWithEmail()}
    >
      <Image
        className="w-[22px] h-[22px] ml-[21px] absolute left-0"
        src={moopiLogo}
        alt=""
      />
      <p className="text-[#333333]">{`테스트계정${index}로 시작하기`}</p>
    </div>
  );
}
