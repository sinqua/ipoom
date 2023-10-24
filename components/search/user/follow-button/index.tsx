import Follow from "./follow";
import Unfollow from "./unfollow";

interface FollowButtonProps {
  userId: string;
  followStatus: boolean;
  setFollowStatus: any;
}

export default function FollowButton({
  userId,
  followStatus,
  setFollowStatus,
}: FollowButtonProps) {
  return followStatus ? (
    <Unfollow userId={userId} setFollowStatus={setFollowStatus} />
  ) : (
    <Follow userId={userId} setFollowStatus={setFollowStatus} />
  );
}
