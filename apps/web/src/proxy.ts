import type { NextProxy } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

export const proxy: NextProxy = async (request) => {
  return updateSession(request);
};

export const config = {
  matcher: [
    // كل المسارات ما عدا الملفات الثابتة والصور والـ metadata
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
