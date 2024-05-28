"use client";

import styles from "../../_component/trendSection.module.css";
import { useQuery } from "@tanstack/react-query";
import { Hashtag } from "@/model/Hashtag";
import { getTrends } from "../../_lib/getTrends";
import Trend from "../../_component/Trend";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // Fresh -> Stale 타임, 5분이라는 기준
    gcTime: 300 * 100, // 안 쓰는 데이터 정리, inactive 상태일 때 돌아감, 기본 5분
  });

  return (
    <div>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        {data?.map((trend) => (
          <Trend key={trend.tagId} trend={trend} />
        ))}
      </div>
    </div>
  );
}
