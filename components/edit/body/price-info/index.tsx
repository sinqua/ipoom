"use client";
import dynamic from "next/dynamic";

import Card from "@/components/card/card";
import CardHeader from "@/components/card/header";
import CardBody from "@/components/card/body";
import MainAvatarCard from "@/components/edit/body/main-avatar/card";
import { useState } from "react";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export default function PriceInfo() {
  const [htmlStr, setHtmlStr] = useState<any>(null);

  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"가격정보"}>
            서비스에 대한 가격정보를 상세히 적어주세요.
          </CardHeader>
          <CardBody>
            <div className="h-[500px]">
              <Editor
                content={null}
                htmlStr={htmlStr}
                setHtmlStr={setHtmlStr}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
