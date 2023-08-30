"use client";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("../quill-editor"), { ssr: false });

export default function RichTextEditor({
  content,
  htmlStr,
  setHtmlStr,
}: {
  content: any;
  htmlStr: any;
  setHtmlStr: any;
}) {
  return (
    <QuillEditor content={content} htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
  );
}
