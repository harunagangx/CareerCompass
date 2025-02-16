import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from '@/components/ui/sonner.tsx';
import { ThemeProvider } from '@/components/providers/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import App from './App.tsx';
import {store} from '@/store.ts';
import './index.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const toastOptions = {
  duration: 3000,
  style: {
    padding: '10px',
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
          <Toaster toastOptions={toastOptions} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
