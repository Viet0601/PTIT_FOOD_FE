import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter } from "react-router-dom"
import StoreContextProvider from './context/StoreContext.jsx';
import { persistor, store } from './redux/store.jsx';
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'react-perfect-scrollbar/dist/css/styles.css';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
const queryClient = new QueryClient() 
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ScrollToTop/>
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
        <QueryClientProvider client={queryClient}>
       <StoreContextProvider>
          <App />
      <ReactQueryDevtools initialIsOpen={false} />
   
  </StoreContextProvider>
    </QueryClientProvider>
      </PersistGate>
    </Provider>,
  
   
  </BrowserRouter>,
)
