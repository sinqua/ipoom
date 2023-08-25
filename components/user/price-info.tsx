'use client'
import parse from "html-react-parser";

export default function PriceInfo({ content }: { content: string | undefined }) {
  return (
    <div className="ql-editor relative grow w-full dt:px-0 px-[16px] py-[40px] !pt-0">
      {content && parse(content)}
    </div>
  );
}
