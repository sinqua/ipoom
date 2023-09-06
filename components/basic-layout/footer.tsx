import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi_small.png";
import emptyImg from "@/app/assets/images/empty.png";

export default function Footer() {
  return (
    <div className="flex justify-center w-full py-[80px] bg-[#F6F6F6] text-[14px]">
      <div className="flex ph:flex-row flex-col justify-between ph:items-start items-center dt:max-w-[1008px] w-full px-[32px] dt:space-x-0 ph:space-x-[150px] space-x-0 ph:space-y-0 space-y-[40px]">
        <div className="flex flex-col ph:items-start items-center ph:w-[310px] w-full">
          <Image src={moopiLogo} className="w-[40px] h-[40px]" alt="" />
          <div className="w-full mt-[24px] ph:text-left text-center">
            Moopy is a platform that helps people access 3D content more easily.
            Find your avatar right now
          </div>
          <div className="flex mt-[40px]">
            <div className="flex justify-center items-center p-[8px]">
              <Image src={emptyImg} className="w-[20px] h-[20px]" alt="" />
            </div>
            <div className="flex justify-center items-center p-[8px]">
              <Image src={emptyImg} className="w-[20px] h-[20px]" alt="" />
            </div>
            <div className="flex justify-center items-center p-[8px]">
              <Image src={emptyImg} className="w-[20px] h-[20px]" alt="" />
            </div>
            <div className="flex justify-center items-center p-[8px]">
              <Image src={emptyImg} className="w-[20px] h-[20px]" alt="" />
            </div>
          </div>
          <p className="ph:block hidden mt-[80px]">
            Copyright ⓒ MOOPI Corp. All rights reserved
          </p>
        </div>
        <div className="flex ph:flex-row flex-col flex-wrap dt:w-[560px] w-auto justify-between">
          <div className="flex flex-col ph:items-start items-center w-[160px] mb-[40px] space-y-[24px] whitespace-nowrap">
            <p className="font-semibold">MOOPI</p>
            <div className="flex flex-col ph:items-start items-center space-y-[16px]">
              <p>About us</p>
              <p>Contact us</p>
              <p>FAQ</p>
            </div>
          </div>
          <div className="flex flex-col ph:items-start items-center w-[160px] mb-[40px] space-y-[24px] whitespace-nowrap">
            <p className="font-semibold">LEGAL</p>
            <div className="flex flex-col ph:items-start items-center space-y-[16px]">
              <p>Terms and Condition</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          <div className="flex flex-col ph:items-start items-center w-[160px] mb-[40px] space-y-[24px] whitespace-nowrap">
            <p className="font-semibold">MOOPI</p>
            <div className="flex flex-col ph:items-start items-center space-y-[16px]">
              <p>moopi@offing.me</p>
            </div>
          </div>
        </div>
        <p className="ph:hidden block !mt-[80px]">
          Copyright ⓒ MOOPI Corp. All rights reserved
        </p>
      </div>
    </div>
  );
}
