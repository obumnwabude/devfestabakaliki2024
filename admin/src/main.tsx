import { FirebaseProvider } from '@/contexts/FirebaseContext.tsx';
import { ToastProvider } from '@/contexts/ToastContext.tsx';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind, ripple: true }}>
      <ToastProvider>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </ToastProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
