/**
 * API Client abstraction for future backend integration.
 * When a backend server (FastAPI, Express, Supabase, Go, or Next.js Route Handlers)
 * is connected, configure NEXT_PUBLIC_API_URL in your environment.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com/v1";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      return {
        data: null,
        error: `HTTP error ${response.status}: ${response.statusText}`,
        status: response.status,
      };
    }

    const data = await response.json();
    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Network request failed",
      status: 500,
    };
  }
}
