import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import PreviewSuspense from "@/components/PreviewSuspense";
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
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-[#F7AB0A]">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  const posts = await sanityClient.fetch(query);

  return <BlogList posts={posts} />;
};

export default HomePage;
