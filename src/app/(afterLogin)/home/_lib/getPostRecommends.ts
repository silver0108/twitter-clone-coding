type Props = { pageParam?: number };

// pageParam 처음은 initialParam인 0부터 5, 10, 15, ...
export async function getPostRecommends({ pageParam }: Props) {
  const res = await fetch(
    `http://localhost:9090/api/postRecommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"], // next에서 지원, 캐시 초기화를 위한 태그
      },
      cache: "no-store", // 캐싱 X
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
