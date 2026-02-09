"use server";

import { authFetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import {
    LIKE_POST_MUTATION,
    POST_LIKES,
    UNLIKE_POST_MUTATION,
} from "../gqlQueries";
import { getSession } from "../session";
import { redirect } from "next/navigation";

export async function getPostLikeData(postId: number) {
    const data = await authFetchGraphQL(print(POST_LIKES), {
        postId,
    });

    return {
        likeCount: data.postLikesCount as number,
        userLikedPost: data.userLikedPost as boolean,
    };
}

export async function likePost(postId: number) {
    const session = await getSession();
    if (!session || !session.user) redirect("/auth/signin");

    try {
        await authFetchGraphQL(print(LIKE_POST_MUTATION), {
            postId,
        });
    } catch (error) {
        console.error("Failed to like post:", error);
    }
}

export async function unLikePost(postId: number) {
    const session = await getSession();
    if (!session || !session.user) redirect("/auth/signin");

    try {
        await authFetchGraphQL(print(UNLIKE_POST_MUTATION), {
            postId,
        });
    } catch (error) {
        console.error("Failed to unlike post:", error);
    }
}