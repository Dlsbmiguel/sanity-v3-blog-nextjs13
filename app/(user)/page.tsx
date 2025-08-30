import { draftMode } from "next/headers";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import { PreviewSuspense } from "@/components/PreviewSuspense";
import PreviewBlogList from "@/components/PreviewBlogList";
import BlogList from "@/components/BlogList";

const query = groq`
  *[_type == "post"] {
    ...,
    author->,
    categories[]->,
  } | order(_createdAt desc)
`;

export const revalidate = 30; // revalidate this page every 30 seconds

const HomePage = async () => {
  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return (
      <PreviewSuspense>
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  let posts;
  try {
    posts = await sanityClient.fetch(query);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    posts = [];
  }

  return <BlogList posts={posts} />;
};

export default HomePage;
