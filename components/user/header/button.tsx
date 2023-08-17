export default function Button({
  children,
  style
}: {
  children: React.ReactNode;
  style: string;
}) {
  return (
    <div className={`${style} justify-center items-center whitespace-nowrap px-[16px] py-[11px] rounded-[8px] bg-[#368ADC] text-[#FFFFFF] cursor-pointer`}>
      {children}
    </div>
  );
}
