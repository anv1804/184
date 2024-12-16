import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import Router from './routers/Router';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <Router />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
