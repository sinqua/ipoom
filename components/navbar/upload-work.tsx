import Image from "next/image";
import Link from "next/link";
import uploadImg from "@/app/assets/images/upload.svg";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function UploadWork() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  return (
    <div className="px-[32px] py-[24px]">
      <Link
        href={"/upload"}
        className="flex justify-center items-center w-full h-[46px] rounded-[10px] bg-[#368ADC] hover:bg-[#5EA1E3] text-white cursor-pointer"
        scroll={false}
      >
        <div className="flex items-center space-x-[16px]">
          <Image
            src={uploadImg}
            className="w-[24px] h-[24px]"
            alt=""
            priority
          />
          <p className="text-[16px]">업로드</p>
        </div>
      </Link>
    </div>
  );
}
