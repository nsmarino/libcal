import { useState } from 'react'
import Link from 'next/link'

import styled from '@emotion/styled'
import SideBar from './SideBar'

const StyledHeader = styled.header`
position: sticky;
z-index: 500;
width: 100%;
top: 0;
background: white;
border-bottom: 2px solid black;

  h1 {
    font-size: 2rem;
    margin: 0;
    padding: 0;
  }
  max-width: 75vw;
  @media screen and (max-width: 1400px) {
    max-width: 100%;
  }

`
const StyledFlex = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const StyledLogoDiv = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 0.25rem;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-size: 75%;
  letter-spacing: 0.1rem;
  color: black;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  :hover {
    color: white;
    background: black;
  }
  `
const StyledTitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const StyledMenuNav = styled.nav`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = ({ title }) => {
  const [sideBarVis, setSideBarVis] = useState(false)

  return (
  <StyledHeader>

    <StyledFlex>
      <Link href="/">
        <a>
          <StyledLogoDiv>Back to Today</StyledLogoDiv>
        </a>
      </Link>

      <StyledTitleDiv>
        <h1>{title}</h1>      
      </StyledTitleDiv>

      <StyledMenuNav onClick={() => setSideBarVis(!sideBarVis)}>
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </StyledMenuNav>
    </StyledFlex>
    <SideBar vis={sideBarVis} setVis={setSideBarVis} />
  </StyledHeader>  
  )
}

export default Header