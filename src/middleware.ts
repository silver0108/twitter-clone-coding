import { auth } from "./auth"
import { NextResponse } from "next/server";

// 세션 검사 시, 세션이 없으면 해당 url로 redirect
export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/i/flow/login');
  }
}
export const config = {
  // 미들웨어를 적용할 라우트 (로그인을 해야 접근할 수 있는 페이지)
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
}