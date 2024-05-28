"use client";

import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import Post from "../../_component/Post";
import { getSearchResult } from "../_lib/getSearchResult";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};
export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]] // 4번째 자리는 dynamic한 QueryKey 타입
  >({
    queryKey: ["posts", "search", searchParams], // searchParams는 객체
    queryFn: getSearchResult,
    staleTime: 60 * 1000, // Fresh -> Stale 타임, 5분이라는 기준
    gcTime: 300 * 100, // 안 쓰는 데이터 정리, inactive 상태일 때 돌아감, 기본 5분
  });
  return data?.map((post) => <Post key={post.postId} post={post} />);
}
