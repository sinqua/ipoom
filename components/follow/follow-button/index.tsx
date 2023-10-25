"use client";

import { useState } from "react";
import Follow from "./follow";
import Unfollow from "./unfollow";

interface FollowButtonProps {
  userId: string;
  status: boolean;
}

export default function FollowButton({ userId, status }: FollowButtonProps) {
  const [followStatus, setFollowStatus] = useState(status);

  return followStatus ? (
    <Unfollow userId={userId} setFollowStatus={setFollowStatus} />
  ) : (
    <Follow userId={userId} setFollowStatus={setFollowStatus} />
  );
}
