import { api } from './client.js';

export const getHello = (options) => api.get('/api/hello', options);

export const listTodos = (options) => api.get('/api/todos', options);
export const createTodo = (title) => api.post('/api/todos', { title });
export const updateTodo = (id, changes) => api.patch(`/api/todos/${id}`, changes);
export const deleteTodo = (id) => api.delete(`/api/todos/${id}`);
