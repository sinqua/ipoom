import { twMerge } from "tailwind-merge";

interface TitleProps {
  avatarTitleInputRef: any;
  borderColor: string;
  avatarName?: any;
  isEmpty: boolean;
}

export default function Title({
  avatarTitleInputRef,
  borderColor,
  avatarName,
  isEmpty,
}: TitleProps) {
  return (
    <div className="flex flex-col space-y-[16px]">
      <p className="font-semibold text-[#333333]">타이틀</p>
      <input
        type="text"
        ref={avatarTitleInputRef}
        className={twMerge(
          "w-full h-[35px] px-[14px] rounded-[10px] bg-white border-solid border-[1px] outline-none",
          borderColor
        )}
        placeholder="타이틀을 입력해주세요"
        defaultValue={avatarName}
      ></input>
      <div className="!mt-[5px] pl-[5px] text-red-500">
        {isEmpty ? "아바타 이름이 필요합니다" : ""}
      </div>
    </div>
  );
}
