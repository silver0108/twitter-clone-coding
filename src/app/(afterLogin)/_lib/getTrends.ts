export async function getTrends() {
  const res = await fetch("http://localhost:9090/api/trends", {
    next: {
      tags: ["trends"], // next에서 지원, 캐시 초기화를 위한 태그
    },
    cache: "no-store", // 캐싱 X
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
