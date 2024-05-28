"use client";

import { usePathname } from "next/navigation";
import Trend from "./Trend";
import styles from "./trendSection.module.css";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";

export default function TrendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // Fresh -> Stale 타임, 5분이라는 기준
    gcTime: 300 * 100, // 안 쓰는 데이터 정리, inactive 상태일 때 돌아감, 기본 5분
    enabled: !!session?.user, // 로그인 한 경우에만 가져오기
  });

  const pathname = usePathname();

  if (pathname === "/explore") {
    return null;
  }

  if (session?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => (
            <Trend key={trend.tagId} trend={trend} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.trendBg}>
      <div className={styles.noTrend}>트렌드를 볼 수 없습니다.</div>
    </div>
  );
}
