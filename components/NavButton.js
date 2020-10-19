import styled from '@emotion/styled'

const StyledButton = styled.button`
background: none;
margin: 0.5rem;
border: 1px solid black;
border-radius: 50%;
font-family: monospace;
width: 1.5rem;
height: 1.5rem;
font-size: 125%;
font-weight: bold;
:hover {
  background: white;
  cursor: pointer;
}
`

const NavButton = ({ text, handleClick }) => {
    return (
        <StyledButton onClick={handleClick}>
            {text}
        </StyledButton>
    )
}

export default NavButton