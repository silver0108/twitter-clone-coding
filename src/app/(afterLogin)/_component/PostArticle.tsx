"use client";

import { useRouter } from 'next/navigation';
import styles from './post.module.css';
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  post: {
    postId: number,
    content: string,
    User: {
      id: string,
      nickname: string,
      image: string,
    },
    createdAt: Date,
    Images: any[];
  }
}

export default function PostArticle({children, post} : Props) {
  const router = useRouter();

  const onClickPost = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  }

  return (
    <article className={styles.post} onClickCapture={onClickPost}>
      {children}
    </article>
  )
}