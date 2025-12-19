import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TmmLandingPage from "./TmmLandingPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TmmLandingPage />
  </StrictMode>,
)
