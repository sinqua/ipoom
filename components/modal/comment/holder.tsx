import Comment from "./comment";

interface HolderProps {
  userId: any;
  comments: any;
}

export default async function Holder({
  userId,
  comments,
}: HolderProps) {
  return (
    <div className="flex flex-col">
      {comments.map((item: any, index: number) => {
        return index === 0 ? (
          <Comment userId={userId} comment={item} key={item.id} />
        ) : (
          <div className="flex flex-col" key={item.id}>
            <div className="w-full h-[1px] bg-[#D4D4D4] mt-[24px] mb-[24px]"></div>
            <Comment userId={userId} comment={item} />
          </div>
        );
      })}
    </div>
  );
}
