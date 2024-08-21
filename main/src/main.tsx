import { FirebaseProvider } from '@/contexts/FirebaseContext.tsx';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@fontsource-variable/inter';
import "@fontsource-variable/dm-sans"  
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <FirebaseProvider> */}
      <PrimeReactProvider
        value={{ unstyled: true, pt: Tailwind, ripple: true }}
      >
        <App />
      </PrimeReactProvider>
    {/* </FirebaseProvider> */}
  </React.StrictMode>
);
