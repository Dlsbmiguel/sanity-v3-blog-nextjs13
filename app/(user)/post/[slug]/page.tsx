import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/urlFor";
import { groq } from "next-sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/RichTextComponents";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 30; // revalidate this page every 30 seconds

export async function generateStaticParams() {
  try {
    const query = groq`
      *[_type=="post"]{
          slug
      }
    `;

    const slugs: Post[] = await sanityClient.fetch(query);
    const slugRoutes = slugs.map((slug) => slug.slug.current);

    return slugRoutes.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.warn("Failed to generate static params:", error);
    return [];
  }
}

const Post = async ({ params }: Props) => {
  const { slug } = await params;

  const query = groq`
    *[_type=="post" && slug.current == $slug][0]
    {
        ...,
        author->,
        categories[]->
    } 
  `;

  let post: Post;

  try {
    post = await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return (
      <article className="px-10 pb-28">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p>Unable to load the requested post.</p>
        </div>
      </article>
    );
  }

  if (!post) {
    return (
      <article className="px-10 pb-28">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p>The requested post could not be found.</p>
        </div>
      </article>
    );
  }

  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#F7AB0A] text-white">
        <div className="relative flex flex-col justify-between min-h-56 md:flex-row">
          <div className="absolute top-0 w-full h-full p-10 opacity-10 blur-sm">
            {post.mainImage ? (
              <Image
                className="object-cover object-center mx-auto"
                src={urlFor(post.mainImage).url()}
                alt={post.author.name}
                fill
              />
            ) : null}
          </div>

          <section className="p-5 bg-[#F7AB0A] w-full">
            <div className="flex flex-col justify-between md:flex-row gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt="author image"
                  width={40}
                  height={40}
                />

                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <div className="">{/* AUTHOR BIO */}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="pt-10 italic">{post.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post.categories.map((category) => (
                  <p
                    className="px-3 py-1 mt-4 text-sm font-semibold text-white bg-gray-800 rounded-full"
                    key={category._id}
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
};

export default Post;
