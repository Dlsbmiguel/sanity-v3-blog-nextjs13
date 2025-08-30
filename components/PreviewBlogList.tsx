"use client";

import { useLiveQuery } from "next-sanity/preview";
import BlogList from "./BlogList";

type Props = {
  query: string;
};

const PreviewBlogList = ({ query }: Props) => {
  const [data] = useLiveQuery([], query, {});

  return <BlogList posts={data || []} />;
};

export default PreviewBlogList;
