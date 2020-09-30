import Link from 'next/link'
import Head from 'next/head'

import styled from '@emotion/styled'

const LayoutDiv = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
  }
  h1 {
    color: black;
  }

`

const Layout = ({children}) => {
return (
    <LayoutDiv>
    <Head>
      <title>Reed Events</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>          
    {children}
    <footer>
    </footer>
    </LayoutDiv>
  )
}

export default Layout