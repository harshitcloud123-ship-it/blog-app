"use client";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { saveComment } from "@/lib/actions/commentActions";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/types/modelTypes";
import { cn } from "@/lib/utils";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

type Props = {
  postId: number;
  user?: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};
const AddComment = (props: Props) => {
  const router = useRouter();
  const [state, action] = useActionState(saveComment, undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.message) {
      if (state.ok) {
        toast.success(state.message);
        setOpen(false);
      } else {
        toast.error(state.message);
      }
    }
    if (state?.ok) props.refetch();
  }, [state]);

  // Sync state.open if needed, but managing local open state is safer for Dialog
  useEffect(() => {
    if (state?.open !== undefined) setOpen(state.open);
  }, [state?.open]);

  if (!props.user) {
    return (
      <Button onClick={() => router.push("/auth/signin")}>
        Leave Your Comment
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form action={action} className={cn(props.className)}>
          <input hidden name="postId" defaultValue={props.postId} />
          <Label htmlFor="comment" className="text-slate-700 m-2">
            Your Comment
          </Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              name="content"
            />
            {!!state?.errors?.content && (
              <p className="text-red-500 animate-shake">
                {state.errors.content}
              </p>
            )}
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>
            <span className="text-slate-700">{props.user.name}</span>
          </p>
          <SubmitButton className="mt-2">Submit</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
