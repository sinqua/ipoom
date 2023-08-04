import Image from "next/image";
import menuImg from "@/app/assets/images2/menu.svg";

export default function Hamburger({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="md:relative absolute flex md:w-auto w-full md:h-auto h-full">
      {children}
      <div className="absolute top-[12px] left-[16px] md:hidden flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#F6F6F6] z-10">
        <Image src={menuImg} className="w-[20px] h-[20px]" alt="" />
      </div>
    </div>
  );
}
