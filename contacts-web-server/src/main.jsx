import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { ContactContextProvider } from './ContactContext.jsx'

createRoot(document.getElementById('root')).render(
  // <ContactContextProvider>
    <App />
  // </ContactContextProvider>
    
)
