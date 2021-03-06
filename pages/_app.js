import '../global.css'
import { AdminProvider } from '../context/admin'

// Wrap components in providers here
export default function App({ Component, pageProps }) {
    return <AdminProvider><Component {...pageProps} /></AdminProvider>
  }