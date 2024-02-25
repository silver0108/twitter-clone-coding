"use client"

import { useRouter } from "next/navigation";
import Main from "../_component/Main";

export default function LoginPage() {
  const router = useRouter();
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

