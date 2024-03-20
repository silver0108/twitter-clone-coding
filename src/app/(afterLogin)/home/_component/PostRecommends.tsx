"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({ 
    queryKey: ['posts', 'recommends'], 
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // Fresh -> Stale 타임, 5분이라는 기준
    gcTime: 300 * 100 // 안 쓰는 데이터 정리, inactive 상태일 때 돌아감, 기본 5분
  });

  return (
    <>
      {data?.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
}

