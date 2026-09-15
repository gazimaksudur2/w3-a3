const API_URL = process.env.API_URL;

export function apiUrl(path: string) {
  if (!API_URL) {
    throw new Error("API_URL is not configured.");
  }

  return `${API_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}
