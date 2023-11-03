import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";

import { getProfile } from "@/lib/supabase";
import KebabMenu from "./kebab-menu";
import LoginButton from "./login-button";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Redirect from "./redirect";

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const profile = await getProfile(session?.user.id!);
  
  return session ? (
    profile ? (
      <div className="relative flex justify-between items-center h-[88px] px-[32px] pr-[24px] border-t-[1px]">
        <Link href={`/${profile.user_id}`} className="w-full">
          <div className="flex grow items-center space-x-[16px]">
            <Image
              src={profile.image ? profile.image : emptyImg}
              className="object-cover w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
              width={40}
              height={40}
              alt=""
              priority
            />
            <p className="text-ellipsis overflow-hidden whitespace-nowrap text-[16px] text-[#637381]">{profile.nickname}</p>
          </div>
        </Link>
        {/* <KebabMenu /> */}
      </div>
    ) : (
      <Redirect />
    )
  ) : (
    <LoginButton />
  );
}
