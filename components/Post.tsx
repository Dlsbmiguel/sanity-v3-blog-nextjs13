import { urlFor } from "@/lib/urlFor";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import ClientSideRoute from "./ClientSideRoute";

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <ClientSideRoute key={post._id} route={`/post/${post.slug.current}`}>
      <div className="flex flex-col cursor-pointer group">
        <div className="relative w-full transition-transform duration-200 ease-out h-80 drop-shadow-xl group-hover:scale-105">
          <Image
            className="object-cover object-left lg:object-center"
            src={urlFor(post.mainImage).url()}
            alt={post.author.name}
            fill
          />
          <div
            //backdrop-blur-lg
            className="absolute bottom-0 flex justify-between w-full p-5 text-white bg-black rounded bg-opacity-20 drop-shadow-lg"
          >
            <div>
              <p className="font-bold">{post.title}</p>
              <p>
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex flex-col items-center md:flex-row gap-y-2 md:gap-x-2">
              {post.categories.map((category) => (
                <div
                  className="bg-[#F7AB0A] text-center text-black px-3 py-1 rounded-full text-sm font-semibold"
                  key={category._id}
                >
                  <p className="">{category.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 mt-5">
          <p className="text-lg font-bold underline">{post.title}</p>
          <p className="text-gray-500 line-clamp-2">{post.description}</p>
        </div>
        <p className="flex items-center mt-5 font-bold group-hover:underline">
          Read Post <ArrowUpRightIcon className="w-4 h-4 ml-2" />
        </p>
      </div>
    </ClientSideRoute>
  );
};

export default Post;
