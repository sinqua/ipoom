import Image from "next/image";
import Link from "next/link";
import Temp from "@/app/assets/images3/mainModel.png"

export default function InputGuide() {

  return (
    <div className="relative w-auto dt:h-[240px] ph:h-[233px] h-[240px] rounded-[8px] overflow-hidden">
      <div
        className="relative w-full h-full cursor-pointer rounded-[8px] overflow-hidden bg-[#F6F6F6]"
      >
        <Link href={`/upload`} className="flex justify-center items-center w-full h-full">
          <Image
            src={Temp}
            width={128}
            height={128}
            className="object-cover"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}
