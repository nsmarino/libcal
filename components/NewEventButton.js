import Link from 'next/link'
import styled from '@emotion/styled'

const StyledNewEventButton = styled.button`
background: black;
position: fixed;
right: 0;
bottom: 0;
color: white;
padding: 1rem;
border: none;
&:hover {
  cursor: pointer;
  color: yellow;
}
`
const NewEventButton = ({href, text, dynamic}) => {
    return (
    <Link href={href} as={dynamic ? `${dynamic}` : `${href}`}>
      <a>
        <StyledNewEventButton>{text}</StyledNewEventButton>
      </a>
    </Link>
    )
}

export default NewEventButton