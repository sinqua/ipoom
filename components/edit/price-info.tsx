"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";

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
        서비스에 대한 가격정보를 상세히 적어주세요.
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
