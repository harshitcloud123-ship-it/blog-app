import { Post } from "@/lib/types/modelTypes";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import PostActions from "./PostActions";
type Props = {
  post: Post;
};
const PostListItem = ({ post }: Props) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-8 m-2 rounded-md overflow-hidden border shadow hover:scale-[101%] transition text-center bg-white items-center">
      <div className="relative w-full h-48 md:w-full md:h-32 col-span-2 md:col-span-1">
        <Image
          src={post.thumbnail || "/no-image.png"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-2 w-full md:col-span-2 text-left md:text-center">
        <p className="text-lg font-bold md:font-normal line-clamp-1 px-2 text-slate-700">
          {post.title}
        </p>
        <p className="text-sm line-clamp-3 px-1 text-slate-500">
          {post.content}
        </p>
      </div>

      {/* Mobile & Desktop: Labels included */}
      <div className="flex flex-row justify-between items-center w-full px-4 pb-2 md:contents">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">Date</span>
          <p className="flex justify-center items-center">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">Published</span>
          <div className="flex justify-center items-center">
            {post.published ? (
              <CheckIcon className="w-5 text-green-500" />
            ) : (
              <span className="text-gray-400">-</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">Likes</span>
          <div className="flex justify-center items-center">
            {post._count.likes}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">Comments</span>
          <div className="flex justify-center items-center">
            {post._count.comments}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <PostActions postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
