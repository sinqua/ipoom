import React from "react";

export default function Header({
  title,
  saveButton,
  children,
}: {
  title: string;
  saveButton?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-between">
        <p className="mb-[16px] text-[20px] font-semibold">{title}</p>
        {saveButton}
      </div>
      <p className="mb-[24px] text-[#9D9D9D] leading-[25px]">{children}</p>
    </>
  );
}
