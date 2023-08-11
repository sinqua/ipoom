import { getServerSession } from "next-auth";

import Image from "next/image";
import faceImg from "@/app/assets/images/face.png";
import moreImg from "@/app/assets/images2/more.svg";
import { authOptions } from "@/lib/auth";
import { getProfile } from "@/lib/supabase";
import Meatball from "./meatball";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = await getProfile(session?.user.id!);

  return (
    <>
      <div className="relative flex justify-center items-center h-[88px] space-x-[44px] border-t-[1px]">
        <div className="flex items-center space-x-[16px]">
          <Image
            src={user.image!}
            className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
            width={40}
            height={40}
            alt=""
            priority
          />
          <p className="text-[16px] text-[#637381]">{user.id}</p>
        </div>
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer">
          <Image src={moreImg} className="w-[20px] h-[20px]" alt="" />
        </div>
        <div className="absolute bottom-[77px] ">
          <Meatball />
        </div>
      </div>
    </>
  );
}
