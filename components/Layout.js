import Link from 'next/link'
import Head from 'next/head'

const Layout = ({children}) => {
return (
    <div>
    <Head>
      <title>Reed Events</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
    <Link href="/">
          <a>
              <h1>Reed Memorial Library</h1>
          </a>
        </Link>
    </header>        
    {children}
    <footer>
        <p>yard guy 2020</p>
    </footer>
    </div>
  )
}

export default Layout