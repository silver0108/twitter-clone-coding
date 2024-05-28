"use client";

import { Post as IPost } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  id: string;
  noImage?: boolean;
};

export default function SinglePost({ id, noImage }: Props) {
  const { data: post, error } = useQuery<
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

  if (error) {
    return (
      <div
        style={{
          height: 100,
          alignItems: "center",
          fontSize: 31,
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  // 로딩 중인 상황
  if (!post) {
    return null;
  }

  return <Post key={post.postId} post={post} noImage={noImage} />;
}
