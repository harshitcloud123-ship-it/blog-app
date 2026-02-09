"use server";
import { getSession } from "../session";

import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import {
    CREATE_POST_MUTATION,
    DELETE_POST_MUTATION,
    GET_POST_BY_ID,
    GET_POSTS,
    GET_USER_POSTS,
    UPDATE_POST_MUTATION,
} from "../gqlQueries";
import { transformTakeSkip } from "../helpers";
import { Post } from "../types/modelTypes";
import { PostFormState } from "../types/formState";
import { PostFormSchema } from "../zodSchemas/postFormSchema"
import { uploadThumbnail } from "../upload";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const fetchPosts = async ({
    page,
    pageSize,
}: {
    page?: number;
    pageSize?: number;
}) => {
    const { skip, take } = transformTakeSkip({ page, pageSize });
    const data = await fetchGraphQL(print(GET_POSTS), { skip, take });

    return { posts: data.posts as Post[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
    const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });

    return data.getPostById as Post;
};

export async function fetchUserPosts({
    page,
    pageSize,
}: {
    page?: number;
    pageSize: number;
}) {
    const { take, skip } = transformTakeSkip({ page, pageSize });
    const data = await authFetchGraphQL(print(GET_USER_POSTS), {
        take,
        skip,
    });

    return {
        posts: data.getUserPosts as Post[],
        totalPosts: data.userPostCount as number,
    };
}

export async function saveNewPost(
    state: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    const session = await getSession();
    if (!session || !session.user) return { message: "You must be signed in to perform this action." };

    const validatedFields = PostFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success)
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors,
        };
    try {
        let thumbnailUrl = "";
        // Todo:Upload Thumbnail to supabase
        if (validatedFields.data.thumbnail && validatedFields.data.thumbnail.size > 0)
            thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);

        // Todo: call garphql api
        const { postId, ...inputs } = validatedFields.data;

        await authFetchGraphQL(print(CREATE_POST_MUTATION), {
            input: {
                ...inputs,
                thumbnail: thumbnailUrl,
            },
        });

        revalidatePath("/user/posts");
    } catch (error: any) {
        return {
            message: error.message || "Oops, Something Went Wrong",
            data: Object.fromEntries(formData.entries()),
        };
    }
    redirect("/user/posts");
}

export async function updatePost(
    state: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    const session = await getSession();
    if (!session || !session.user) return { message: "You must be signed in to perform this action." };

    const validatedFields = PostFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success)
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors,
        };

    try {
        // Todo: check if thumbnail has been changed
        const { thumbnail, ...inputs } = validatedFields.data;

        let thumbnailUrl = "";
        if (thumbnail && thumbnail.size > 0) thumbnailUrl = await uploadThumbnail(thumbnail);

        await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
            input: {
                ...inputs,
                ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
            },
        });

        revalidatePath("/user/posts");
    } catch (error: any) {
        return {
            message: error.message || "Oops, Something Went Wrong",
            data: Object.fromEntries(formData.entries()),
        };
    }
    redirect("/user/posts");
}

export async function deletePost(postId: number) {
    const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), {
        postId,
    });

    return data.deletePost;
}
