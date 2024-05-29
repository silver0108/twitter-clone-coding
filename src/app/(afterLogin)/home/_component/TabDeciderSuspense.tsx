import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  // react-query ssr
  const queryClient = new QueryClient();
  // queryKey를 갖고 있을 때, queryFn 실행해서 데이터를 가져오기
  // 무한 스크롤
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // cursor 값
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    // 서버에서 가져온 데이터를 클라이언트에 맞는 react-query로 만듦
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
