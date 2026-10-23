"use server";

import { createClient } from "@/lib/supabase/server";

export type LeaderboardUser = {
  user_id: string;
  display_name: string;
  xp: number;
  streak: number;
  total_sessions: number;
  total_minutes: number;
  rank: number;
};

type LeaderboardRow = {
  user_id: string;
  display_name: string | null;
  xp: number | null;
  streak: number | null;
  total_sessions: number | null;
  total_minutes: number | null;
  rank: number | null;
};

type MyRankRow = { rank: number | null; xp: number | null };

function toUser(row: LeaderboardRow, index: number): LeaderboardUser {
  return {
    user_id: row.user_id,
    display_name: row.display_name?.trim() || "مستخدم",
    xp: row.xp ?? 0,
    streak: row.streak ?? 0,
    total_sessions: row.total_sessions ?? 0,
    total_minutes: row.total_minutes ?? 0,
    rank: row.rank ?? index + 1,
  };
}

/**
 * الليدر بورد بيقرا من RPC مش من الجدول مباشرة: RLS بتسمح لكل مستخدم
 * بصفه بس، والدالة SECURITY DEFINER هي اللي بترجع أعلى N + اسم العرض
 * الآمن (من غير إيميل).
 */
export async function getLeaderboard() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.rpc("get_leaderboard", {
      p_limit: 10,
    });

    if (error || !Array.isArray(data) || data.length === 0) {
      return { users: [] as LeaderboardUser[], myRank: null, myXp: 0 };
    }

    const users = (data as LeaderboardRow[]).map(toUser);

    let myRank: number | null = null;
    let myXp = 0;

    if (user) {
      const mine = users.find((u) => u.user_id === user.id);
      if (mine) {
        myRank = mine.rank;
        myXp = mine.xp;
      } else {
        const { data: rankRows } = await supabase.rpc("get_my_rank");
        const row = Array.isArray(rankRows) ? (rankRows[0] as MyRankRow) : null;
        if (row) {
          myRank = row.rank ?? null;
          myXp = row.xp ?? 0;
        }
      }
    }

    return { users, myRank, myXp };
  } catch {
    return { users: [] as LeaderboardUser[], myRank: null, myXp: 0 };
  }
}
