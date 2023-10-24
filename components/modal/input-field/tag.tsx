import CreatableSelect from "react-select/creatable";

interface TagProps {
  mostUsedTags: any;
  avatarTags: any;
  setAvatarTags: any;
}

export default function Tag({
  mostUsedTags,
  avatarTags,
  setAvatarTags,
}: TagProps) {
  return (
    <div className="flex flex-col space-y-[16px]">
      <p className="font-semibold text-[#333333]">태그</p>
      <CreatableSelect
        isMulti
        options={mostUsedTags}
        value={avatarTags}
        instanceId={""}
        onChange={(e: any) => {
          setAvatarTags(e);
        }}
        className="flex items-center w-auto h-[35px] px-[1px] overflow-x-visible"
        placeholder={"태그를 입력해주세요"}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: "100%",
            width: "100%",
            borderRadius: "10px",
            paddingLeft: "14px",
            borderColor: "#CCCCCC !important",
            boxShadow: "none !important",
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: "#CCCCCC",
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            padding: "0",
          }),
        }}
      />
    </div>
  );
}
