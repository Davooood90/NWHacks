import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import Test from './Test.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< Updated upstream
      <App />
=======
    {/* <App /> */}
    <Test />
>>>>>>> Stashed changes
  </StrictMode>,
)
