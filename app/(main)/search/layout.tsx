import Tags from "@/components/home/header/tags";
import Header from "@/components/home/header";
import SearchInfo from "@/components/search/search-info";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-auto min-h-screen">
      <Header />
      <div className="relative flex flex-col items-center w-full grow">
        <Tags />
        <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full dt:px-0 px-[16px] tb:pt-[40px] pt-[24px] pb-[80px]">
          <SearchInfo />
          {children}
        </div>
      </div>
    </div>
  );
}
