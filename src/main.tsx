import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ColorsContextProvider } from './contexts/Colors.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorsContextProvider>
      <App />
    </ColorsContextProvider>
  </StrictMode>,
)
