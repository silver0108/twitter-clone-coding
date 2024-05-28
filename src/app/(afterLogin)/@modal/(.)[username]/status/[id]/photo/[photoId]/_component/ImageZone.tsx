"use client"

import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import styles from "../photoModal.module.css";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};

export default function ImageZone({ id }: Props) {
  const { data: post } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ["post", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000, // Fresh -> Stale 타임, 5분이라는 기준
    gcTime: 300 * 100, // 안 쓰는 데이터 정리, inactive 상태일 때 돌아감, 기본 5분
  });

  if (!post?.Images[0]) {
    return null;
  }

  return (
    <div className={styles.imageZone}>
      <img src={post?.Images[0].link} alt={post.content} />
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${post?.Images[0].link})` }}
      ></div>
      <div className={styles.buttonZone}>
        <div className={styles.buttonInner}>
          <ActionButtons white />
        </div>
      </div>
    </div>
  );
}
