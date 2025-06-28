import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Error fetching from backend'));
  }, []);

  return (
    <div>
      <h1>React + Spring Boot</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
