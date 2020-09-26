import Link from 'next/link'
import styled from '@emotion/styled'

const StyledLinkButton = styled.button`
background: black;
color: white;
padding: 0.5rem;
margin: 0.25rem;
border: none;
&:hover {
  cursor: pointer;
  color: yellow;
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