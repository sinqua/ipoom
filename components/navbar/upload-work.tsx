import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import uploadImg from "@/app/assets/images/upload.svg";

export default async function UploadWork() {
  const session = await getServerSession(authOptions);
  const url = session ? `/upload` : "";

  if (session === null) {
    return null;
  }
  return (
    <div className="px-[32px] py-[24px]">
      <div className="flex justify-center items-center w-full h-[46px] rounded-[10px] bg-[#368ADC] hover:bg-[#5EA1E3] text-white cursor-pointer">
        <Link href={url} className="flex items-center space-x-[16px]">
          <Image
            src={uploadImg}
            className="w-[24px] h-[24px]"
            alt=""
            priority
          />
          <p className="text-[16px]">업로드</p>
        </Link>
      </div>
    </div>
  );
}
