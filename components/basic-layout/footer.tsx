import Image from "next/image";
import moopiLogo from "@/app/assets/logos/offing.svg";

export default function Footer() {
  return (
    <div className="w-full dt:h-[239px] ph:h-[276px] h-[281px] ph:py-[60px] py-[50px] px-[17px] text-[14px] bg-[#F9F9F9] border-t-[1px] border-s2xyoon-gray font-sans">
      <div className="flex ph:justify-center ph:flex-row flex-col dt:h-[17px] h-auto ph:space-x-[28px] ph:space-y-0 space-y-[15px] font-semibold ph:mb-[40px] mb-[50px] flex-wrap">
        <div className="whitespace-nowrap">Terms of service</div>
        <div className="ph:block hidden">|</div>
        <div className="whitespace-nowrap">Privacy policy</div>
        <div className="ph:block hidden">|</div>
        <div className="whitespace-nowrap">
          Limitation of Liability and Disclaimer
        </div>
        <div className="ph:block hidden">|</div>
        <div className="whitespace-nowrap">Customer service center</div>
      </div>
      <div className="ph:flex hidden justify-center h-[17px] space-x-[10px] mb-[25px]">
        <div>MOOPI</div>
        <div>|</div>
        <div>contract@moopi.me</div>
        <div>|</div>
        <div>TEL. 010-1234-5678</div>
        <div>|</div>
        <div>registration No. 123-45-67890</div>
      </div>
      <div className="flex justify-center h-[20px] space-x-[20px]">
        <Image src={moopiLogo} className="w-auto h-[20px]" alt="" />
        <div className="ph:flex hidden justify-center space-x-[5px]">
          <div>CopyRight</div>
          <div>ⓒ</div>
          <div className="font-NanumSquareNeoHv">MOOPI Corp.</div>
          <div>All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
}
