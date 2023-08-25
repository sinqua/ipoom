"use client";
import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import RichTextEditor from "./rich-text-editor";
import SaveQuillChange from "./save-quill-change";

export default function Description({ content }: { content: any }) {
  const [htmlStr, setHtmlStr] = useState<any>(null);

  useEffect(() => {
    console.log(htmlStr);
  }, [htmlStr])

  return (
    <Card>
      <CardHeader
        title={"커미션 안내"}
        saveButton={<SaveQuillChange label={"description"} htmlStr={htmlStr} />}
      >
        커미션에 대한 주의 사항을 상세히 적어주세요.
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
