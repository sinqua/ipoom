import Image from "next/image";

export default function Menu({ children }: { children: React.ReactNode }) {
  return <div className="grow flex flex-col">{children}</div>;
}
