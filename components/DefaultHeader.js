import Link from 'next/link'

import styled from '@emotion/styled'

const StyledHeader = styled.header`
position: sticky;
width: 100%;
top: 0;
background: white;
border-bottom: 2px solid black;

  h1 {
    font-size: 1rem;
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
  border: 1px solid black;
`
const StyledTitleDiv = styled.div`
  display: flex;
  align-items: center;
`
const StyledMenuNav = styled.nav`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = ({ title }) => {

  return (
  <StyledHeader>

    <StyledFlex>
      <Link href="/">
        <a>
          <StyledLogoDiv>Calendar</StyledLogoDiv>
        </a>
      </Link>

      <StyledTitleDiv>
        <h1>{title}</h1>      
      </StyledTitleDiv>

      <StyledMenuNav>
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </StyledMenuNav>
    </StyledFlex>

  </StyledHeader>  
  )
}

export default Header