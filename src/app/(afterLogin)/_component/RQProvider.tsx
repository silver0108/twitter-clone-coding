"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }:Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        }
      }
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* 개발 모드에서 devtools 띄움, 활성화 유무는 env에서 관리 */}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}/>
    </QueryClientProvider>
  )
}

export default RQProvider;