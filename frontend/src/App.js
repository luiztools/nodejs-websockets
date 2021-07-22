import logo from './logo.svg';
import './App.css';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';

function App() {

  const [numero, setNumero] = useState(0);

  const { lastJsonMessage, sendMessage } = useWebSocket('ws://localhost:3001', {
    onOpen: () => console.log(`Connected to App WS`),
    onMessage: () => {
      if (lastJsonMessage) {
        console.log(lastJsonMessage);
        setNumero(lastJsonMessage.n);
      }
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

export default App;
