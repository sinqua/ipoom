import Image from "next/image";
import uploadImg from "@/app/assets/images2/upload.svg";

export default function UploadWork() {
    return (
        <div className="px-[32px] py-[24px]">
          <div className="flex justify-center items-center w-full h-[46px] rounded-[10px] bg-[#368ADC] hover:bg-[#5EA1E3] text-white cursor-pointer">
            <div className="flex items-center space-x-[16px]">
              <Image
                src={uploadImg}
                className="w-[24px] h-[24px]"
                alt=""
                priority
              />
              <p className="text-[16px]">업로드</p>
            </div>
          </div>
        </div>
    )
}