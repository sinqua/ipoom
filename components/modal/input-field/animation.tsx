import Select from "react-select";

interface AnimationProps {
  animationOptions: any;
  animation: any;
  loadAnimation: any;
}

export default function Animation({
  animationOptions,
  animation,
  loadAnimation
}: AnimationProps) {
  return (
    <div className="flex flex-col space-y-[16px]">
      <p className="font-semibold text-[#333333]">애니메이션</p>
      <Select
        className="basic-single px-[1px]"
        classNamePrefix="select"
        value={animationOptions.filter((option: any) => {
          return option.label === animation;
        })}
        options={animationOptions}
        onChange={(e: any) => loadAnimation(e)}
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
            borderColor: "#CCCCCC !important",
            boxShadow: "none !important",
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
