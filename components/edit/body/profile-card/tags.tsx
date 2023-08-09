'use client';
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

export default function Tags() {
  const [currentTags, setCurrentTags] = useState<any>(null);

  return (
    <div className="mb-[20px]">
      <CreatableSelect
        isMulti
        //   options={mostUsedTags}
        value={currentTags}
        instanceId={""}
        onChange={(e: any) => {
          setCurrentTags(e);
        }}
        className="flex w-full items-center ph:w-[482px] h-[47px]"
        placeholder={"태그를 입력해주세요"}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: "100%",
            width: "100%",
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: "#CCCCCC",
          }),
        }}
      />
    </div>
  );
}
