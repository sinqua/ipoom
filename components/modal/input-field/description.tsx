interface DescriptionProps {
  avatarDescriptionInputRef: any;
  description?: string;
}

export default function Description({
  avatarDescriptionInputRef,
  description,
}: DescriptionProps) {
  return (
    <div className="flex flex-col space-y-[16px]">
      <p className="font-semibold text-[#333333]">설명</p>
      <textarea
        ref={avatarDescriptionInputRef}
        className="w-full h-[126px] p-[16px] rounded-[10px] resize-none bg-white border-solid border-[1px] border-[#CCCCCC] focus:border-[#CCCCCC] focus:ring-0 text-[14px]"
        placeholder="설명을 입력해주세요"
        defaultValue={description}
      />
    </div>
  );
}
