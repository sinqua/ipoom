import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(time: string) {
  const today = new Date();
  const createdDate = new Date(time);

  const betweenTime = Math.floor(
    (today.getTime() - createdDate.getTime()) / 1000 / 60
  );
  const betweenTimeHour = Math.floor(betweenTime / 60);
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

  return betweenTimeHour > 24
    ? `${betweenTimeDay}일 전`
    : betweenTime > 60
    ? `${betweenTimeHour}시간 전`
    : betweenTime > 5
    ? `${betweenTime}분 전`
    : "방금 전";
}
