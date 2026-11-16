import { useEffect, useState } from 'react';
import { createTodo, deleteTodo, getHello, listTodos, updateTodo } from './api/todos.js';

function App() {
  const [hello, setHello] = useState(null);
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | offline
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([getHello({ signal: controller.signal }), listTodos({ signal: controller.signal })])
      .then(([helloResponse, todoList]) => {
        setHello(helloResponse);
        setTodos(todoList);
        setStatus('ready');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('offline');
      });
    return () => controller.abort();
  }, []);

  async function run(action) {
    setError('');
    try {
      await action();
    } catch (err) {
      setError(Object.values(err.errors ?? {})[0] ?? err.message);
    }
  }

  const handleAdd = (event) => {
    event.preventDefault();
    if (adding) return;
    const text = title;
    setAdding(true);
    setTitle(''); // clear right away so the user can keep typing
    run(async () => {
      try {
        const todo = await createTodo(text);
        setTodos((current) => [...current, todo]);
      } catch (err) {
        setTitle((current) => current || text); // give the text back if saving failed
        throw err;
      }
    }).finally(() => setAdding(false));
  };

  const handleToggle = (todo) =>
    run(async () => {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos((current) => current.map((t) => (t.id === updated.id ? updated : t)));
    });

  const handleDelete = (todo) =>
    run(async () => {
      await deleteTodo(todo.id);
      setTodos((current) => current.filter((t) => t.id !== todo.id));
    });

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="container">
      <header>
        <h1>Vite + Spring Boot</h1>
        <p className={`status status--${status}`}>
          {status === 'loading' && 'Connecting to backend…'}
          {status === 'ready' && hello?.message}
          {status === 'offline' && (
            <>
              Backend unreachable. Start it with <code>./mvnw spring-boot:run</code> in <code>backend/</code>.
            </>
          )}
        </p>
      </header>

      <section className="card" aria-labelledby="todos-heading">
        <h2 id="todos-heading">Todos</h2>
        <p className="muted">
          Example CRUD feature: React → <code>/api/todos</code> → Spring Boot → JPA.
        </p>

        <form className="add-form" onSubmit={handleAdd}>
          <label htmlFor="new-todo" className="visually-hidden">
            New todo
          </label>
          <input
            id="new-todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs doing?"
            maxLength={200}
            disabled={status !== 'ready'}
          />
          <button type="submit" disabled={status !== 'ready' || adding || !title.trim()}>
            Add
          </button>
        </form>

        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}

        {status === 'ready' && todos.length === 0 && <p className="muted">Nothing here yet. Add your first todo.</p>}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'done' : undefined}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo)} />
                <span>{todo.title}</span>
              </label>
              <button className="ghost" onClick={() => handleDelete(todo)} aria-label={`Delete "${todo.title}"`}>
                ✕
              </button>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <p className="muted small">
            {remaining} of {todos.length} remaining
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
