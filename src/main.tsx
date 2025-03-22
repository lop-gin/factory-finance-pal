
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import App from './App';
import { AuthProvider } from "@/components/auth/AuthProvider";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
