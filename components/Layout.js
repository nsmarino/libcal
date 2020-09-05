import Link from 'next/link'

const Layout = ({children}) => {
return (
    <div>
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