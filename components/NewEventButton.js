import Link from 'next/link'
import styled from '@emotion/styled'
import Cookies from 'js-cookie'
import { useAdmin } from '../context/admin'


const StyledNewEventButton = styled.button`
background: black;
position: fixed;
font-family: Georgia;
font-size: 150%;
right: 10%;
bottom: 10%;
color: white;
height: 10rem;
width: 10rem;
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

const NewEventButton = ({href, text, dynamic}) => {
  const admin = useAdmin().admin
  if (!admin) return null

  return (
    <Link href={href} as={dynamic ? `${dynamic}` : `${href}`}>
      <a>
        <StyledNewEventButton>{text}</StyledNewEventButton>
      </a>
    </Link>
    )
}

export default NewEventButton