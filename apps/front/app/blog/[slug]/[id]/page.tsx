import { fetchPostById } from "@/lib/actions/postActions";
import Image from "next/image";
import SanitizedContent from "./_components/SanitizedContent";
import Comments from "./_components/comments";
import { getSession } from "@/lib/session";
import Like from "./_components/like";

type Props = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params }: Props) => {
  const postid = (await params).id;
  const post = await fetchPostById(Number(postid));
  const session = await getSession();
  return (
    <main className="container mx-auto px-4 py-8 mt-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-800 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
          <span>By {post.author.name}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <div className="ml-auto">
            <Like postId={post.id} user={session?.user} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Content Column */}
        <div className="lg:w-2/3 order-2 lg:order-1">
          <SanitizedContent
            content={post.content}
            className="prose prose-slate max-w-none prose-lg prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500"
          />

          {/* Comments Section */}
          <div className="mt-2 pt-6 border-t border-slate-200">
            <Comments user={session?.user} postId={post.id} />
          </div>
        </div>

        {/* Image Column */}
        <div className="lg:w-1/2 order-1 lg:order-2">
          <div className="sticky top-24">
            <div className="relative w-full aspect-video lg:aspect-4/3 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={post.thumbnail ?? "/no-image.png"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Optional: Add related tags or share buttons here in the future */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
