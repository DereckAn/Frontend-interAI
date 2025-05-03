/**
 * Array of routes that anyone can access.
 * These ones do not required authentication.
 * @type {string[]}
 * */
export const publicRoutes = [
  "/",
  // Las rutas de API de autenticación deben ser accesibles sin autenticación
  // pero no deben incluirse aquí si están bajo /api/auth ya que el matcher del middleware las excluye
];

/**
 * Array of routes that are used for authentication.
 * These routes will redirect user to /settings after login.
 * @type {string[]}
 * */
export const authRoutes = ["/authentication"];

/**
 * Prefix for API routes that need authentication.
 * Routes that start with this prefix are use for API calls that require authentication.
 * @type {string}
 * */
export const apiAuthPrefix = "/api/auth";

/**
 * Default re-direct path after login.
 * @type {string}
 * */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

/**
 * Array de rutas protegidas que requieren autenticación.
 * Estas rutas no son accesibles sin iniciar sesión.
 * No es necesario incluirlas explícitamente en el middleware, ya que cualquier ruta
 * que no esté en publicRoutes o authRoutes se considera protegida por defecto.
 * @type {string[]}
 */
export const protectedRoutes = [
  "/settings",
  "/fill_information",
  "/historial",
  "/inteview",
  "/result",
];
