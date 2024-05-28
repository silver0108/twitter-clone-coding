import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; f?: string; pf?: string }]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;

  const res = await fetch(
    `http://localhost:9090/api/search/${
      searchParams.q
    }?${searchParams.toString()}`,
    {
      next: {
        tags: ["posts", "search", searchParams.q], // next에서 지원, 캐시 초기화를 위한 태그
      },
      cache: "no-store", // 캐싱 X
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
