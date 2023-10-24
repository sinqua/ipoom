import SearchAvatar from "@/components/search/search-avatar";
import SearchUser from "@/components/search/search-user";

export const revalidate = 0;

export default function Page() {
  return (
    <div className="flex flex-col space-y-[64px]">
      <SearchAvatar />
      <SearchUser />
    </div>
  );
}
