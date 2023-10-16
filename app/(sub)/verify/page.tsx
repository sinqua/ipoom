"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export const revalidate = 0;

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      return user?.id;
    };

    getUserData().then((userId) => {
      const getData = async () => {
        const { data } = await supabase
          .from("profiles")
          .select()
          .eq("user_id", userId!);

        if (data?.length! > 0) return true;
        else return false;
      };

      getData().then((isExist) => {
        if (isExist) {
          router.push(`${searchParams.get("callbackUrl")}`);
        } else {
          router.push("/join");
        }
      });
    });
  }, []);

  return <div className="w-full h-full">확인중</div>;
}
