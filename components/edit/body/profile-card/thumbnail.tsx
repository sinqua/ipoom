import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";
import Card from "@/components/card/card";
import CardHeader from "@/components/card/header";
import CardBody from "@/components/card/body";
import UploadImage from "./upload-image";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Thumbnail() {
  const session = await getServerSession(authOptions);
  
  return (
    <Card>
      <CardHeader title={"프로필 사진"}>
        최소 200 x 200 크기의 JPEG 또는 PNG 파일을 사용해주세요.
        <br />
        타인에게 불쾌감을 주는 프로필 사진은 고객지원센터에서 임의로 변경할 수
        있습니다.
      </CardHeader>
      <CardBody>
        <div className="flex items-center ph:space-x-[32px] space-x-[24px]">
          <Image
            src={emptyImg}
            width={160}
            height={160}
            className="ph:h-[160px] h-[100px] ph:w-[160px] w-[100px] bg-gray-200 rounded-full border-none"
            alt=""
          />
          <UploadImage />
        </div>
      </CardBody>
    </Card>
  );
}
