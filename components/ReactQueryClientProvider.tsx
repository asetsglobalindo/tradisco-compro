"use client";
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}});
const ReactQueryClientProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryClientProvider;

