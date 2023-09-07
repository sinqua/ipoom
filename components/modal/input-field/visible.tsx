import Select from "react-select";

interface VisibleProps {
  options: any;
  avatarStatus: any;
  setAvatarStatus: any;
}

export default function Visible({
  options,
  avatarStatus,
  setAvatarStatus,
}: VisibleProps) {
  return (
    <div className="flex flex-col space-y-[16px]">
      <p className="font-semibold text-[#333333]">공개 범위</p>
      <Select
        className="basic-single px-[1px]"
        classNamePrefix="select"
        value={options.filter((option: any) => {
          return option.label === avatarStatus;
        })}
        options={options}
        onChange={(e: any) => setAvatarStatus(e.label)}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#2778C7",
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: "100%",
            width: "100%",
            backgroundColor: "#FFFFFF80",
            borderRadius: "10px",
            paddingLeft: "14px",
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
