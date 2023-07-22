const PUBLIC_ROUTES: Array<string> = ["/", "/login", "/register"];

export function isPublicRoute(route: string): boolean {
  return PUBLIC_ROUTES.includes(route);
}
