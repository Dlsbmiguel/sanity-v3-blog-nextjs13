"use client";

import { createClient } from "next-sanity";
import { projectId, dataset } from "./sanity.client";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export const usePreview = (query: string, params: any) => {
  return client.fetch(query, params);
};
