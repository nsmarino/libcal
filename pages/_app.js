import '../global.css'
// ^^^ Global styles

// Wrap components in providers here
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }