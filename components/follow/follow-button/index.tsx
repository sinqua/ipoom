"use client";

import { useState } from "react";
import Follow from "./follow";
import Unfollow from "./unfollow";

interface FollowButtonProps {
  sessionId: string | undefined;
  userId: string;
  status: boolean;
}

export default function FollowButton({
  sessionId,
  userId,
  status,
}: FollowButtonProps) {
  const [followStatus, setFollowStatus] = useState(status);

  return followStatus ? (
    <Unfollow
      sessionId={sessionId}
      userId={userId}
      setFollowStatus={setFollowStatus}
    />
  ) : (
    <Follow
      sessionId={sessionId}
      userId={userId}
      setFollowStatus={setFollowStatus}
    />
  );
}
