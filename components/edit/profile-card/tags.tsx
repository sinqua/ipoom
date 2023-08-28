"use client";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import SaveChange from "./save-change";

export default function Tags({
  list,
  mostUsedTags,
}: {
  list: any[];
  mostUsedTags: any[];
}) {
  const [currentTags, setCurrentTags] = useState<any>(
    list.map((tag: any) => ({
      label: tag.tag,
      value: tag.tag,
    }))
  );

  return (
    <Card>
      <CardHeader title={"태그"}>
        한 눈에 알아보기 쉽도록 태그를 추가해보아요. (최대 5개)
      </CardHeader>
      <div className="flex ph:w-auto w-full space-x-[16px]">
        <CreatableSelect
          isMulti
          options={mostUsedTags}
          value={currentTags}
          instanceId={""}
          onChange={(e: any) => {
            setCurrentTags(e);
          }}
          className="flex w-auto ph:grow-0 grow items-center ph:w-[392px] h-[47px]"
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
