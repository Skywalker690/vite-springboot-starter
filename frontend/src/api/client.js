// Small fetch wrapper for the Spring Boot API.
//
// In development, requests go to relative /api URLs and Vite proxies them to the
// backend (see vite.config.js), so no CORS setup is needed. Set VITE_API_BASE_URL
// only when the frontend is served from a different origin than the API.
const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(status, problem) {
    super(problem?.detail || problem?.title || `Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    // Field errors from the backend's validation handler, e.g. { title: 'must not be blank' }
    this.errors = problem?.errors ?? {};
  }
}

export async function request(path, { body, headers, ...options } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = response.headers.get('content-type')?.includes('json');
  const data = response.status === 204 || !isJson ? null : await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }
  return data;
}

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};
