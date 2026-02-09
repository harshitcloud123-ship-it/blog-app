"use server";
import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { CreateCommentFormState } from "../types/formState";
import { CommentEntity } from "../types/modelTypes";
import { CommentFormSchema } from "../zodSchemas/commentFormSchema";

export async function getPostComments({
    postId,
    skip,
    take,
}: {
    postId: number;
    skip: number;
    take: number;
}) {
    const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
        postId,
        take,
        skip,
    });

    return {
        comments: data.getPostComments as CommentEntity[],
        count: data.postCommentCount as number,
    };
}

import { redirect } from "next/navigation";
import { getSession } from "../session";

export async function saveComment(
    state: CreateCommentFormState,
    formData: FormData
): Promise<CreateCommentFormState> {
    const session = await getSession();
    if (!session || !session.user) redirect("/auth/signin");

    const validatedFields = CommentFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success)
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors,
        };

    try {
        const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
            input: {
                ...validatedFields.data,
            },
        });

        if (data)
            return {
                message: "Success! Your comment saved!",
                ok: true,
                open: false,
            };
    } catch (error: any) {
        return {
            message: error.message || "Oops! Something went wrong!",
            ok: false,
            open: true,
            data: Object.fromEntries(formData.entries()),
        };
    }

    return {
        message: "Oops! Something went wrong!",
        ok: false,
        open: true,
        data: Object.fromEntries(formData.entries()),
    };
}