const PUBLIC_ROUTES: Array<string> = [
  "/",
  "/login",
  "/register",
  "/reset-password",
];

export function isPublicRoute(route: string): boolean {
  return PUBLIC_ROUTES.includes(route);
}
