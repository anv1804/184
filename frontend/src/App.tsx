import React from 'react';
import AppRouter from './routers/Router';
import { BrowserRouter, Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

// Import other components/pages as needed

const App = () => {
    return (
      <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <AppRouter />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
    );
};

export default App;
