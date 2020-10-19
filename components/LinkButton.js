import Link from 'next/link'
import styled from '@emotion/styled'

const StyledLinkButton = styled.button`
background: black;
font-family: Georgia;
font-size: 100%;
color: white;
height: 5rem;
width: 5rem;
border-radius: 50%;
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
border: none;
&:hover {
  cursor: pointer;
  background: white;
  color: black;
  font-style: italic;
}
`
const LinkButton = ({href, text, dynamic}) => {
    return (
    <Link href={href} as={dynamic ? `${dynamic}` : `${href}`}>
      <a>
        <StyledLinkButton>{text}</StyledLinkButton>
      </a>
    </Link>
    )
}

export default LinkButton