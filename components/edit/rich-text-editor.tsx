"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import QuillEditor from "../quill-editor";

export default function RichTextEditor({ content }: { content: any }) {
  const [htmlStr, setHtmlStr] = useState("");

  return (
    <QuillEditor
      content={content}
      htmlStr={htmlStr}
      setHtmlStr={setHtmlStr}
    />
  );
}
