import React from "react";
import { supabase, supabaseAuth } from "@/lib/database";

export default async function Avatar(props: any) {
  const { params } = props;

  return (
    <div className="fixed w-[300px] h-[300px] bg-green-200 z-50">
      this is modal!
    </div>
  );
}
