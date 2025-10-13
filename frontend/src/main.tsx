import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routes/AppRouter'
import { StoreProvider } from './store/Provider'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')!).render(
  <StoreProvider>
  <StrictMode>
    <AppRouter />
    <ToastContainer/>
  </StrictMode>
  </StoreProvider>
  ,
)
