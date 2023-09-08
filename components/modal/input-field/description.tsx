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
        className="w-full h-[126px] p-[16px] rounded-[10px] resize-none bg-white border-solid border-[1px] border-[#CCCCCC] outline-none"
        placeholder="설명을 입력해주세요"
        defaultValue={description}
      />
    </div>
  );
}
