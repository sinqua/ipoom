import React from "react";
import { supabase, supabaseAuth } from "@/lib/database";

export default function Avatar(props: any) {
  const { params } = props;

  return (
    <div className="fixed right-0 w-[300px] h-[300px] bg-green-200 z-50">
      this is page!
    </div>
  );
}
