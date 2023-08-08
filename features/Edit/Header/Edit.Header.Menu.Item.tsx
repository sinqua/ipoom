export default function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between h-full text-[#333333] cursor-pointer">
      <p>{children}</p> <div className="w-full h-[2px] bg-[#333333]"></div>
    </div>
    // text-[#9D9D9D]
  );
}
