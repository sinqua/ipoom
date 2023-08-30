"use client";
import React, { useState } from "react";

import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";

import RichTextEditor from "./rich-text-editor";
import SaveQuillChange from "./save-quill-change";

export default function PriceInfo({ content }: { content: any }) {
  const [htmlStr, setHtmlStr] = useState<any>(null);

  return (
    <Card>
      <CardHeader
        title={"비용 안내"}
        saveButton={<SaveQuillChange label={"price-info"} htmlStr={htmlStr} />}
      >
        견적 계산에 참고할 수 있도록 가격정보를 게시합니다.
      </CardHeader>
      <div className="h-[500px]">
        <RichTextEditor
          content={content}
          htmlStr={htmlStr}
          setHtmlStr={setHtmlStr}
        />
      </div>
    </Card>
  );
}
