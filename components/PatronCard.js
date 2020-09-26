import { useState } from 'react'
import styled from '@emotion/styled'

import RegistrationForm from './RegistrationForm'

const StyledPatronCard = styled.div`
margin: 1rem;
padding: 1rem;
background: #AFD9AF;
display: flex;
justify-content: space-between;
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
border: 1px solid grey;
p {
  margin-bottom: 0.25rem;
}
.regOptions {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 600px) {
  width: 20rem;
}
`

const PatronCard = ({ event, patron, removePatron }) => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      { update ?
        <RegistrationForm event={event} patron={patron} setUpdate={setUpdate}/>
        :
        <StyledPatronCard>
          <div>
          <p>{patron.firstName} {patron.lastName}</p>
          <p>{patron.email}</p>
          <p>{patron.phone}</p>
          <p>{patron.address}</p>
          <p>{patron.libraryCard}</p>
          </div>
          
          <div className="regOptions">            
            <button onClick={() => setUpdate(!update)}>{update ? "cancel" : "edit"}</button>
            <button onClick={() => removePatron(patron)}>Remove</button>
          </div>
        </StyledPatronCard>
      }
    </>
    )
}

export default PatronCard