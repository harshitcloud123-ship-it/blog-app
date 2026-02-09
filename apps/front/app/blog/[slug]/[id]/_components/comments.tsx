"use client";
import { getPostComments } from "@/lib/actions/commentActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { comment } from "postcss";
import { useState } from "react";
import CommentCard from "./commentCard";
import CommentPagination from "./commentPagination";
import CommentCardSkeleton from "./commentCardSkeleton";
import { SessionUser } from "@/lib/session";
import AddComment from "./addComment";
type Props = {
  postId: number;
  user?: SessionUser;
};
const Comments = ({ postId, user }: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () =>
      await getPostComments({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);
  return (
    <div className="py-2 rounded-md shadow-md">
      <button onClick={() => refetch()}></button>
      <div className="flex flex-col gap-4 mx-8 my-2 justify-between">
        <AddComment user={user} postId={postId} refetch={refetch} />
      </div>
      <h6 className="text-lg text-center font-bold text-slate-700 my-6">
        Comments
      </h6>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <CommentCardSkeleton key={index} />
          ))
        : data?.comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      <CommentPagination
        className="p-2"
        currentPage={page}
        setCurrentPage={(p) => setPage(p)}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Comments;
