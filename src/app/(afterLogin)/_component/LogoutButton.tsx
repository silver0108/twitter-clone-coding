"use client";

import { signOut, useSession } from "next-auth/react";
import style from "./logoutButton.module.css";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  // 클라이언트에서만 사용 가능, 내 정보 불러오기
  // SessionProvider 필요
  const { data: me } = useSession(); 

  const onLogout = () => {
    signOut({ redirect: false})
      .then(() => {
        router.replace('/');
      })
  };

  if(!me?.user) return null; // 내 정보가 없으면 로그아웃 버튼 안 보여주기

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image!} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  )
}