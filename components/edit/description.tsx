"use client";
import React, { useState } from "react";

import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import RichTextEditor from "./rich-text-editor";
import SaveQuillChange from "./save-quill-change";

export default function Description({ content }: { content: any }) {
  const [htmlStr, setHtmlStr] = useState<any>(null);

  return (
    <Card>
      <CardHeader
        title={"커미션 안내"}
        saveButton={<SaveQuillChange label={"description"} htmlStr={htmlStr} />}
      >
        커미션 의뢰를 받을 수 있도록 필요한 정보를 게시합니다.
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
