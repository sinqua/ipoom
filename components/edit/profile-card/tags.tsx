"use client";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Card from "@/components/card";
import CardHeader from "@/components/card/header";
import SaveChange from "./save-change";

export default function Tags({ list }: { list: any[] }) {
  const [currentTags, setCurrentTags] = useState<any>(null);

  return (
    <Card>
      <CardHeader title={"태그"}>
        한 눈에 알아보기 쉽도록 태그를 추가해보아요. (최대 5개)
      </CardHeader>
      <div className="flex space-x-[17px]">
        <CreatableSelect
          isMulti
          //   options={mostUsedTags}
          value={currentTags}
          instanceId={""}
          onChange={(e: any) => {
            setCurrentTags(e);
          }}
          className="flex w-full items-center ph:w-[392px] h-[47px]"
          placeholder={"태그를 입력해주세요"}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: "100%",
              width: "100%",
              borderRadius: "10px",
            }),
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: "#CCCCCC",
            }),
          }}
        />
        <SaveChange label="tags" tags={currentTags} />
      </div>
    </Card>
  );
}
