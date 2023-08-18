export default function Header({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <p className="mb-[16px] text-[20px] font-semibold">{title}</p>
      <p className="mb-[24px] text-[#9D9D9D] leading-[25px]">
        {children}
      </p>
    </>
  );
}
