import { getCommentProfile } from "@/lib/supabase";

import Image from "next/image";
import moreImg from "@/app/assets/images/more.svg";
import CommentInfo from "./info";
import Reply from "./reply";

interface CommentProps {
  userId: any;
  comment: any;
}

export default async function Comment({ userId, comment }: CommentProps) {
  const profile = await getCommentProfile(comment.writer_id);

  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between">
        <div className="flex items-center space-x-[16px] cursor-pointer">
          <Image
            src={profile.image!}
            className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
            width={512}
            height={512}
            alt=""
          />
          <p className="font-semibold text-[18px]">{profile.nickname}</p>
        </div>
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer">
          <Image src={moreImg} className="w-[24px] h-[24px]" alt="" />
        </div>
      </div>
      <div className="flex flex-col pl-[56px]">
        <p className="text-[14px] whitespace-pre-line">{comment.content}</p>
        <CommentInfo userId={userId} comment={comment} />
        <div className="flex flex-col mt-[24px]">
          {comment.replies.map((item: any, index: number) => {
            return index === 0 ? (
              <Reply userId={userId} reply={item} key={item.id} />
            ) : (
              <div className="flex flex-col" key={item.id}>
                <div className="w-full h-[1px] bg-[#D4D4D4] mt-[16px] mb-[16px]"></div>
                <Reply userId={userId} reply={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}