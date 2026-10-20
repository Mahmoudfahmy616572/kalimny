"use server";

import { createClient } from "@/lib/supabase/server";

export async function getLeaderboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("user_xp")
    .select("user_id, xp, streak, total_sessions, total_minutes")
    .order("xp", { ascending: false })
    .limit(10);

  if (!data) return { users: [], myRank: null, myXp: 0 };

  let myRank: number | null = null;
  let myXp = 0;

  if (user) {
    const idx = data.findIndex((d) => d.user_id === user.id);
    if (idx !== -1) {
      myRank = idx + 1;
      myXp = data[idx].xp || 0;
    } else {
      const { data: me } = await supabase
        .from("user_xp")
        .select("xp")
        .eq("user_id", user.id)
        .maybeSingle();
      myXp = me?.xp || 0;
      const { count } = await supabase
        .from("user_xp")
        .select("*", { count: "exact", head: true })
        .gt("xp", myXp);
      myRank = (count || 0) + 1;
    }
  }

  return { users: data.slice(0, 10), myRank, myXp };
}
