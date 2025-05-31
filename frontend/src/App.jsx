import { useState } from 'react'
import useWebSocket from 'react-use-websocket';

function App() {
  const [numero, setNumero] = useState(0);

  useWebSocket('ws://localhost:3001', {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: (message) => {
      if (!message) return;
      const data = JSON.parse(message.data);
      console.log(data);
      setNumero(data.n);
    },
    queryParams: { 'token': '123456' },
    onError: (event) => { console.error(event); },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000
  });

  return (
    <div className="App">
      <header className="App-header">
        {numero}
      </header>
    </div>
  );
}

export default App
