import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import styles from "./home.module.css";
import { getPostRecommends } from "./_lib/getPostRecommends";
import TabDecider from "./_component/TabDecider";

export default async function Home() {
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
    <main className={styles.main}>
      {/* 서버에서 가져온 데이터를 클라이언트에 맞는 react-query로 만듦 */}
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
