import { useState } from 'react'

import RegistrationForm from './RegistrationForm'

const PatronCard = ({ event, patron, removePatron }) => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      { update ?
        <RegistrationForm event={event} patron={patron} />
        :
        <div>
          <p>{patron.firstName} {patron.lastName} {patron.email}</p>
        </div>
      }
      <button onClick={() => removePatron(patron)}>Remove</button>
      <button onClick={() => setUpdate(!update)}>{update ? "cancel" : "edit"}</button>
    </>
    )
}

export default PatronCard