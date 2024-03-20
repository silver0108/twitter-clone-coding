import { auth } from "@/auth";
import Main from "./_component/Main";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth(); // userSession의 서버 버전, 내 정보 불러오기
  // 로그인 후, /으로 이동하면 로그인 화면이 아닌 /home으로 이동하도록
  if (session?.user) {
    redirect('/home');
    return null;
  }
  return <Main/>
}