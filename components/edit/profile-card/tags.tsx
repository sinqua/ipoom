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
        기존의 태그를 선택하거나, 새로운 태그를 생성할 수 있습니다.
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
          className="flex w-auto ph:grow-0 grow items-center ph:w-[392px] min-h-[47px] h-auto text-sm"
          placeholder={"태그를 입력해주세요"}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: "100%",
              width: "100%",
              borderRadius: "10px",
              paddingLeft: "20px",
              borderColor: "#CCCCCC !important",
              boxShadow: "none !important",
            }),
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: "#898989",
              padding: "0",
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              padding: "0",
            }),
          }}
        />
        <SaveChange label="tags" tags={currentTags} />
      </div>
    </Card>
  );
}
