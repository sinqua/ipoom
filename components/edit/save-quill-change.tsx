"use client";
import { supabase } from "@/lib/database";
import { UploadQuillImage } from "@/lib/storage";
import React, { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { v4 as uuidv4 } from "uuid";

import Image from "next/image";
import checkImg from "@/app/assets/images/check_blue.svg";
import { generatePublicUrl } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function SaveQuillChange({
  label,
  htmlStr,
}: {
  label: any;
  htmlStr: any;
}) {
  const supabase = createClientComponentClient<Database>();

  const [status, setStatus] = useState("");

  const handleClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setStatus("save");

    await handleSaveQuill(user?.id, label, htmlStr);

    setStatus("done");
  };

  useEffect(() => {
    if (status === "done") {
      setTimeout(() => {
        setStatus("");
      }, 1000);
    }
  }, [status]);

  return (
    <>
      <button
        className="flex justify-center items-center w-[60px] ph:h-[47px] h-[34px] text-white bg-[#368ADC] rounded-[10px]"
        onClick={handleClick}
      >
        저장
      </button>
      {status !== "" && (
        <div className="fixed inset-0 flex justify-center items-center w-full h-full z-50 !m-0">
          <div className="flex justify-center items-center w-[180px] h-[180px] bg-[#FFFFFF] rounded-[8px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
            <div className="flex flex-col items-center space-y-[24px]">
              {status === "save" ? (
                <>
                  <FadeLoader
                    color="#2778C7"
                    className="!left-[22.5px] !w-[55px] !h-[55px]"
                  />
                  <p className="text-[18px] font-semibold">저장 중</p>
                </>
              ) : (
                <>
                  <Image src={checkImg} alt="" />
                  <p className="text-[18px] font-semibold">저장 완료</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const handleSaveQuill = async (userId: any, label: any, htmlStr: any) => {
  if (label === "description") {
    for (let i = 0; i < htmlStr.ops.length; i++) {
      if (Object.keys(htmlStr.ops[i].insert).includes("image")) {
        if (htmlStr.ops[i].insert.image.includes("base64")) {
          var uuid = uuidv4();

          await UploadQuillImage(
            userId,
            `${uuid}.png`,
            htmlStr.ops[i].insert.image
          ).then(async (data) => {
            htmlStr.ops[i].insert.image = generatePublicUrl(
              "quill",
              data!.path
            );
          });
        }
      }
    }

    const { data, error } = await supabase
      .from("user_details")
      .update({ description: JSON.stringify({ ...htmlStr.ops }) })
      .eq("user_id", userId)
      .select();

    return;
  }

  if (label === "price-info") {
    for (let i = 0; i < htmlStr.ops.length; i++) {
      if (Object.keys(htmlStr.ops[i].insert).includes("image")) {
        if (htmlStr.ops[i].insert.image.includes("base64")) {
          var uuid = uuidv4();

          await UploadQuillImage(
            userId,
            `${uuid}.png`,
            htmlStr.ops[i].insert.image
          ).then(async (data) => {
            htmlStr.ops[i].insert.image = generatePublicUrl(
              "quill",
              data!.path
            );
          });
        }
      }
    }

    const { data, error } = await supabase
      .from("user_details")
      .update({ price_info: JSON.stringify({ ...htmlStr.ops }) })
      .eq("user_id", userId)
      .select();

    return;
  }
};
