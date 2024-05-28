import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getUserPosts: QueryFunction<
  Post[],
  [_1: string, _2: string, username: string]
> = async ({ queryKey }) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, {
    next: {
      tags: ["posts", "users", username], // next에서 지원, 캐시 초기화를 위한 태그
    },
    cache: "no-store", // 캐싱 X
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
