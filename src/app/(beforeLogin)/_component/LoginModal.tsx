"use client";

import Image from "next/image";
import zLogo from "../../../../public/zlogo.png";
import styles from "@/app/(beforeLogin)/_component/signup.module.css";
import { redirect, useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();
  
  const onClickClose = () => router.back(); // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => { setId(e.target.value) };
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => { setPassword(e.target.value) };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      })
      console.log('로그인되어야지')
      router.replace('/home');
    } catch (err) {
      console.error(err);
      console.log(err)
      setMessage('아이디와 비밀번호가 일치하지 않습니다.');
    }
  };
  // const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();
  //   setMessage('');

  //   try {
  //     // 클라이언트 next auth
  //     await signIn("credentials", {
  //       username: id,
  //       password: password,
  //       redirect: false, // true로 설정하면 서버 쪽에서 redirect
  //     })
  //     router.replace('/home');
  //   } catch(err) {
  //     console.error(err);
  //     setMessage('아이디와 비밀번호가 일치하지 않습니다.')
  //   }
    
  //   // fetch('http://localhost:9090/api/users', {
  //   //   method: 'post',
  //   //   body: JSON.stringify({
  //   //     id,
  //   //     password,
  //   //   }),
  //   //   credentials: 'include',
  //   // }).then((response: Response) => {
  //   //   console.log(response.status);
  //   //   if (response.status === 200) {
  //   //     router.replace('/home');
  //   //   }
  //   // }).catch((err) => {
  //   //   console.error(err);
  //   // });
  // }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <button className={styles.closeButton} onClick={onClickClose}>
              <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                <g>
                  <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </button>
            <Image className={styles.miniLogo} src={zLogo} alt="logo" />
          </div>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="id">아이디</label>
              <input id="id" className={styles.input} type="text" placeholder=""
                value={id}
                onChange={onChangeId}
              />
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="password">비밀번호</label>
              <input id="password" className={styles.input} type="password" placeholder=""
                value={password}
                onChange={onChangePassword}
              />
            </div>
          </div>
          <div className={styles.message}>{message}</div>
          <div className={styles.modalFooter}>
            <button className={styles.actionButton} disabled={!id && !password}>로그인하기</button>
          </div>
        </form>
      </div>
    </div>
  )
}