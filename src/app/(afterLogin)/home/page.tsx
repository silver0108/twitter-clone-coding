import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Post from "../_component/Post";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import styles from "./home.module.css";

async function getPostRecommends() {
  const res = await fetch('http://localhost:9090/api/postRecommends', {
    next: {
      tags: ['posts', 'recommends'], // next에서 지원, 캐시 초기화를 위한 태그
    },
    cache: 'no-store', // 캐싱 X
  });

  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const queryClient = new QueryClient();
  // queryKey를 갖고 있을 때, queryFn 실행해서 값을 가져오기
  await queryClient.prefetchQuery({queryKey: ['post', 'recommends'], queryFn: getPostRecommends});
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.main}>
      {/* 서버에서 가져온 데이터를 클라이언트에 맞게 hydrate */}
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  )
}