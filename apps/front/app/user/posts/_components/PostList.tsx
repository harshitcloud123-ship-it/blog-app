import { Post } from "@/lib/types/modelTypes";
import PostListItem from "./PostListItem";
import Pagination from "@/components/pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
};

export default PostList;
