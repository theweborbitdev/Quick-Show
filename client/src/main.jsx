import { ClerkProvider } from '@clerk/clerk-react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const app = (
  <BrowserRouter>
    <App authEnabled={Boolean(clerkPublishableKey)} />
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(
  clerkPublishableKey ? (
    <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">
      {app}
    </ClerkProvider>
  ) : app,
)
