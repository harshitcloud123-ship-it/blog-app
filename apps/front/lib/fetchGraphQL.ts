import { API_URL } from "./constants";
import { getSession } from "./session";

export const fetchGraphQL = async (query: string, variables?: {}) => {
    // Force HTTPS for cloud domains to prevent redirect-stripping of the body
    const safeApiUrl = API_URL.startsWith("http://") && !API_URL.includes("localhost")
        ? API_URL.replace("http://", "https://")
        : API_URL;

    try {
        const body = JSON.stringify({
            query,
            variables,
        });

        console.log(`Sending GraphQL Query to ${safeApiUrl}/graphql:`, {
            queryLength: query?.length,
            variables,
            bodyPreview: body.substring(0, 100) + "..."
        });

        const res = await fetch(`${safeApiUrl}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apollo-require-preflight": "true",
            },
            body,
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`API Error (${res.status}): ${errorText}`);
            throw new Error(`API returned ${res.status}`);
        }

        const result = await res.json();
        if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            throw new Error(result.errors[0].message);
        }
        return result.data;
    } catch (error) {
        console.error("fetchGraphQL failed:", error);
        throw error;
    }
};

export const authFetchGraphQL = async (query: string, variables = {}) => {
    const session = await getSession();
    try {
        const response = await fetch(`${API_URL}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
                "apollo-require-preflight": "true",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Auth API Error (${response.status}): ${errorText}`);
            throw new Error(`Auth API returned ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            throw new Error("Failed to fetch the data from GraphQL");
        }

        return result.data;
    } catch (error) {
        console.error("authFetchGraphQL failed:", error);
        throw error;
    }
};