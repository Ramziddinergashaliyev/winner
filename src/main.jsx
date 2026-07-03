import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
const App = lazy(() => import("./App.jsx"))
import "./styles/index.scss"
import Leazy from './components/leazy/Leazy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Leazy />}>
      <App />
    </Suspense>
  </StrictMode>,
)
