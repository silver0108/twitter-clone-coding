export { auth as middleware } from './auth';

export const config = {
  // 미들웨어를 적용할 라우트 (로그인을 해야 접근할 수 있는 페이지)
  matcher: ['/compost/tweet', '/home', '/explore', '/messages', '/search'],
}