/**
 * Array of routes that anyone can access.
 * These ones do not required authentication.
 * @type {string[]}
 * */
export const publicRoutes = [
    "/",
];


/**
 * Array of routes that are used for authentication.
 * These routes will redirect user to /settings after login.
 * @type {string[]}
 * */
export const authRoutes = [
    "/login",
];


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