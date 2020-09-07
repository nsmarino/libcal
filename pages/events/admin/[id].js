import Link from 'next/link'
import { useRouter } from 'next/router'

import { getEvent, updateEvent, deleteEvent } from '../../../services/eventService'

const Registrant = ({ reg, removeRegistrant }) => {

    return (
    <div style={{border: '1px solid green', width: '20rem'}}>
      <p>{reg.lastName} {reg.email}</p>
      <button onClick={() => removeRegistrant(reg)}>remove</button>
    </div>)
}

export default function AdminPage({ event }) {
  const router = useRouter()

  const removeRegistrant = (reg) => {
    const updatedRegistrants = event.registered.filter(r => r._id !== reg._id)
    const updatedEvent = {...event, registered: updatedRegistrants}
    updateEvent(event.id, updatedEvent)
      .then(returnedEvent => returnedEvent)
  }

  const removeEvent = async () => {
    await deleteEvent(event.id)
    router.push('/')
  }

  return (
    <div>
        <h2>Admin: {event.name}</h2>
        <p>{event.description}</p>
        <p>time: {event.time}</p>
        <div>
            <h3>Registered:</h3>
            {event.registered.map(reg => 
              <Registrant 
                key={reg._id} 
                reg={reg} 
                removeRegistrant={removeRegistrant} 
              />)
            }
        </div>

        <Link href="/">
            <a>            
            <button>EDIT EVENT</button>
            <button onClick={removeEvent}>DELETE EVENT</button>
            </a>
        </Link>
    </div>
  )
}


// This gets called on every request
export async function getServerSideProps({ params }) {
    const event = await getEvent(params.id)
    // Pass data to the page via props
    return { props: { event } }
  }