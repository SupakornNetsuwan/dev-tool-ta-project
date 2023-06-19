"use client";
import React from "react";
// Query cliet provider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ClientQueryClientProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ClientQueryClientProvider;
