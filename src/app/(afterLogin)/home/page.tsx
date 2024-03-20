import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import styles from "./home.module.css";
import { getPostRecommends } from "./_lib/getPostRecommends";
import PostRecommends from "./_component/PostRecommends";

export default async function Home() {
  // react-query ssr
  const queryClient = new QueryClient();
  // queryKey를 갖고 있을 때, queryFn 실행해서 데이터를 가져오기
  await queryClient.prefetchQuery({queryKey: ['posts', 'recommends'], queryFn: getPostRecommends});
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.main}>
      {/* 서버에서 가져온 데이터를 클라이언트에 맞는 react-query로 만듦 */}
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}