'use client'
import Image from "next/image";
import cancelImg from "@/app/assets/images/cancel.svg";
import { useRouter } from "next/navigation";
import ModalCanvas from "./ModalCanvas";


export default function AvatarModal({ avatar, modelUrl }: { avatar: any, modelUrl: any }) {
    const router = useRouter();

    return (
        <div className="fixed inset-0 flex justify-center w-full h-full pt-[80px] bg-[#00000050] z-50">
            <div className="relative w-full max-w-[1288px] h-full bg-gray-300 rounded-t-[10px]">
                <Image
                    className="absolute right-0 top-[-44px] w-[20px] h-[20px] cursor-pointer"
                    src={cancelImg}
                    alt=""
                    loading="eager"
                    priority
                    onClick={() => router.back()}
                />
                <div className="w-full h-full flex rounded-t-[10px] overflow-hidden">
                    <ModalCanvas
                        modelUrl={modelUrl?.signedUrl}
                        animation={avatar.animation}
                    />
                    <div className="flex flex-col w-[352px] h-full p-[24px] bg-[#FFFFFF]">
                        <p className="text-[24px] font-semibold">{avatar.name}</p>
                        <div className="flex flex-col space-y-[40px]">
                            <div className="flex flex-col space-y-[16px]">
                                <p className="font-semibold text-[#9D9D9D]">업로드</p>
                                <p>-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
