"use client"

import { redirect, useRouter } from "next/navigation";
import Main from "../_component/Main";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  // 로그인 후, /으로 이동하면 로그인 화면이 아닌 /home으로 이동하도록
  if(session?.user) {
    router.replace('/home');
    return null;
  }

  router.replace('/i/flow/login');
  return <Main/>
}

// redirect는 서버에서 해주는 일

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 뒤로 가기 시 localhost:3000/login으로 이동해 localhost:3000/i/flow/login 반복

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 뒤로 가기 시 localhost:3000

