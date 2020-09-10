import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { getEvent, updateEvent, deleteEvent } from '../../../services/eventService'

import Layout from '../../../components/Layout'
import PatronCard from '../../../components/PatronCard'
import EventForm from '../../../components/EventForm/EventForm'

export default function AdminPage({ event }) {
  const [patrons, setPatrons] = useState([])

  useEffect(() => {
    setPatrons(event.registered)  
  }, [])

  const router = useRouter()

  const removePatron = (patron) => {
    const updatedPatrons = event.registered.filter(r => r._id !== patron._id)
    const updatedEvent = {...event, registered: updatedPatrons}
    updateEvent(event.id, updatedEvent)
      .then(returnedEvent => setPatrons(returnedEvent.registered))
  }

  const removeEvent = async () => {
    await deleteEvent(event.id)
    router.push('/')
  }
  // hoist submit functions to this page so can reset state upon edits? or at least do so for patrons...
  return (
    <Layout>
        <h2>Admin Panel: {event.formData.title}</h2>
        <EventForm event={event} />
        <h3>Registered:</h3>
        {patrons.map(patron => 
          <PatronCard 
            event={event}
            key={patron._id} 
            patron={patron} 
            removePatron={removePatron} 
          />)
        }
      <div>
        <Link href="/events/[id]" as={`/events/${event.id}`}>
          <a>
            <button>cancel</button>
          </a>
        </Link>
        <button onClick={removeEvent}>DELETE EVENT</button>
      </div>  
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps({ params }) {
    const event = await getEvent(params.id)
    // Pass data to the page via props
    return { props: { event } }
  }