import { twMerge } from "tailwind-merge";

interface TitleProps {
  avatarTitleInputRef: any;
  avatarName?: any;
  isEmpty: boolean;
}

export default function Title({
  avatarTitleInputRef,
  avatarName,
  isEmpty,
}: TitleProps) {
  return (
    <div className="flex flex-col space-y-[16px]">
      <p className="font-semibold text-[#333333]">타이틀</p>
      <input
        type="text"
        ref={avatarTitleInputRef}
        className="w-full h-[35px] px-[14px] bg-white rounded-[10px] border-solid border-[1px] border-[#CCCCCC] focus:border-[#CCCCCC] focus:ring-0 text-[14px]"
        placeholder="타이틀을 입력해주세요"
        defaultValue={avatarName}
      ></input>
      <div className="!mt-[5px] pl-[5px] text-red-500">
        {isEmpty ? "아바타 이름이 필요합니다" : ""}
      </div>
    </div>
  );
}
