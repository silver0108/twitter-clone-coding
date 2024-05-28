"use client";

import { useQuery } from "@tanstack/react-query";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import { User } from "@/model/User";
import FollowRecommend from "./FollowRecommend";

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // Fresh -> Stale 타임, 5분이라는 기준
    gcTime: 300 * 100, // 안 쓰는 데이터 정리, inactive 상태일 때 돌아감, 기본 5분
    // enabled: !!session?.user, // 로그인 한 경우에만 가져오기
  });
  return data?.map((user) => <FollowRecommend key={user.id} user={user} />);
}
