function buildApiUrl(baseUrl: string | undefined, path: string) {
  if (!baseUrl) {
    throw new Error("API URL is not configured.");
  }

  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function apiUrl(path: string) {
  return buildApiUrl(process.env.API_URL, path);
}

export function publicApiUrl(path: string) {
  return buildApiUrl(process.env.NEXT_PUBLIC_API_URL, path);
}
