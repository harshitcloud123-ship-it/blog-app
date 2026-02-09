"use client";
import { getPostLikeData, likePost, unLikePost } from "@/lib/actions/like";
import { SessionUser } from "@/lib/session";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

type Props = {
  postId: number;
  user?: SessionUser;
};
const Like = (props: Props) => {
  const router = useRouter();
  const { data, refetch: refetchPostLikeData } = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", props.postId],
    queryFn: async () => await getPostLikeData(props.postId),
  });

  const likeMutation = useMutation({
    mutationFn: () => likePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unLikePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  });

  const handleLikeChange = (type: "like" | "unlike") => {
    if (!props.user) {
      router.push("/auth/signin");
      return;
    }
    if (type === "like") {
      likeMutation.mutate();
    } else {
      unlikeMutation.mutate();
    }
  };

  return (
    <div className="mt-3 flex items-center justify-start gap-2">
      {data?.userLikedPost ? (
        <button onClick={() => handleLikeChange("unlike")}>
          <SolidHeartIcon className="w-6 text-rose-600" />
        </button>
      ) : (
        <button onClick={() => handleLikeChange("like")}>
          <HeartIcon className="w-6" />
        </button>
      )}
      <p className="text-slate-600">{data?.likeCount}</p>
    </div>
  );
};

export default Like;
