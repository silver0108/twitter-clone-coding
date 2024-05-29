"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number // initialPageParam의 type 자리
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId, // lastPage가장 최근에 불러왔던 게시글
    staleTime: 60 * 1000, // Fresh -> Stale 타임, 5분이라는 기준
    gcTime: 300 * 100, // 안 쓰는 데이터 정리, inactive 상태일 때 돌아감, 기본 5분
  });

  // 태그가 안 보이면 inView는 false
  const { ref, inView } = useInView({
    // threshold: 태그가 보이고 나서 몇 픽셀 정도에 호출할 것인지
    threshold: 0, // 보이자 마자 호출
    // delay: 그가 보인 후 몇 초 후에 호출할 것인지
    delay: 0, // 바로 호출
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  return (
    <>
      {/* data 안에는 pages가 들어있고 page는 2차원 배열 */}
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }}></div>
    </>
  );
}
