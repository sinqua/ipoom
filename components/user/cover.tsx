"use client";
import { SyncLoader } from "react-spinners";

export default function Cover() {
  return (
    <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-white/30 backdrop-blur-[1.5px]">
      <SyncLoader color="#2778C7" />
    </div>
  );
}
