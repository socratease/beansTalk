import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BeansTalkApp } from './components/BeansTalkApp'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BeansTalkApp />
  </StrictMode>,
)
