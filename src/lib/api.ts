const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Public base for image src attributes (works both SSR and client). */
export const API_BASE = API_URL;

export async function apiFetch<T = unknown>(
  path: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  const url = new URL(`${API_URL}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
