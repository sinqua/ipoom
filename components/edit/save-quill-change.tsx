"use client";
import { supabase, supabaseAuth } from "@/lib/database";
import { UploadQuillImage } from "@/lib/storage";
import { useSession } from "next-auth/react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function SaveQuillChange({
  label,
  htmlStr,
}: {
  label: any;
  htmlStr: any;
}) {
  const { data: session, status } = useSession();

  const handleClick = async () => {
    handleSaveQuill(session, label, htmlStr);
  };

  return (
    <button
      className="flex justify-center items-center w-[60px] h-[47px] text-white bg-[#368ADC] rounded-[10px]"
      onClick={handleClick}
    >
      저장
    </button>
  );
}

const handleSaveQuill = async (session: any, label: any, htmlStr: any) => {
  if (label === "description") {

    for (let i = 0; i < htmlStr.ops.length; i++) {
      if (Object.keys(htmlStr.ops[i].insert).includes("image")) {
        if (htmlStr.ops[i].insert.image.includes("base64")) {
          var uuid = uuidv4();

          await UploadQuillImage(
            session?.user.id,
            `${uuid}.png`,
            htmlStr.ops[i].insert.image
          ).then(async (data) => {
            htmlStr.ops[i].insert.image = data?.path;
          });
        } else {
          htmlStr.ops[i].insert.image = htmlStr.ops[i].insert.image
            .split("/image/")[1]
            .split("?")[0];
        }
      }
    }

    const { data, error } = await supabase
      .from("user_details")
      .update({ description: JSON.stringify({ ...htmlStr.ops }) })
      .eq("user_id", session?.user.id)
      .select();

    return;
  }

  if (label === "price-info") {
    for (let i = 0; i < htmlStr.ops.length; i++) {
      if (Object.keys(htmlStr.ops[i].insert).includes("image")) {
        if (htmlStr.ops[i].insert.image.includes("base64")) {
          var uuid = uuidv4();

          await UploadQuillImage(
            session?.user.id,
            `${uuid}.png`,
            htmlStr.ops[i].insert.image
          ).then(async (data) => {
            htmlStr.ops[i].insert.image = data?.path;
          });
        } else {
          htmlStr.ops[i].insert.image = htmlStr.ops[i].insert.image
            .split("/image/")[1]
            .split("?")[0];
        }
      }
    }

    const { data, error } = await supabase
      .from("user_details")
      .update({ price_info: JSON.stringify({ ...htmlStr.ops }) })
      .eq("user_id", session?.user.id)
      .select();

    return;
  }
};
