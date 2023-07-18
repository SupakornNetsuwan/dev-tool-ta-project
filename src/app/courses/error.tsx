"use client"; // Error components must be Client Components

import ErrorLayout from "@/core/layouts/ErrorLayout";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return <ErrorLayout>{error.message}</ErrorLayout>;
}
