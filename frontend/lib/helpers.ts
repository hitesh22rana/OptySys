export function normalizeAccessToken(token: string): string {
  return token.replace(/"/g, "");
}
