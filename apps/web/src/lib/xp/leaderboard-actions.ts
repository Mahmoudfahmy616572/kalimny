"use server";

import { createClient } from "@/lib/supabase/server";

type LeaderboardUser = {
  user_id: string;
  xp: number;
  streak: number;
  total_sessions: number;
  total_minutes: number;
  display_name?: string | null;
  email?: string | null;
};

export async function getLeaderboard() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("user_xp")
      .select("user_id, xp, streak, total_sessions, total_minutes")
      .order("xp", { ascending: false })
      .order("streak", { ascending: false })
      .limit(10);

    if (error || !data || data.length === 0) {
      return { users: [] as LeaderboardUser[], myRank: null, myXp: 0 };
    }

    let users: LeaderboardUser[] = data as LeaderboardUser[];

    const userIds = users.map((u) => u.user_id).filter(Boolean);
    if (userIds.length > 0) {
      try {
        const { data: names } = await supabase.rpc("get_leaderboard_names", {
          p_user_ids: userIds,
        } as never);

        if (Array.isArray(names)) {
          const map = new Map<string, Partial<LeaderboardUser>>();
          const rows = names as Array<{
            user_id?: string | null;
            display_name?: string | null;
            email?: string | null;
          }>;
          for (const n of rows) {
            if (n?.user_id) {
              map.set(n.user_id, {
                display_name: n.display_name,
                email: n.email,
              });
            }
          }
          users = users.map((u) => ({
            ...u,
            display_name: map.get(u.user_id)?.display_name ?? u.display_name,
            email: map.get(u.user_id)?.email ?? u.email,
          }));
        }
      } catch {
        // مفيش RPC أو مفيش صلاحيات — نكمل بدون أسماء
      }
    }

    let myRank: number | null = null;
    let myXp = 0;

    if (user) {
      const idx = users.findIndex((d) => d.user_id === user.id);
      if (idx !== -1) {
        myRank = idx + 1;
        myXp = users[idx].xp || 0;
      } else {
        try {
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
        } catch {
          myRank = null;
          myXp = 0;
        }
      }
    }

    return { users: users.slice(0, 10), myRank, myXp };
  } catch {
    return { users: [] as LeaderboardUser[], myRank: null, myXp: 0 };
  }
}
