"use client";

import { LiveQueryProvider } from "next-sanity/preview";
import { createClient } from "next-sanity";
import { projectId, dataset } from "../lib/sanity.client";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export function PreviewSuspense({ children }: { children: React.ReactNode }) {
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
