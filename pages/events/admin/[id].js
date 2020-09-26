import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import styled from '@emotion/styled'

import { getEvent, updateEvent, deleteEvent } from '../../../services/eventService'

import DefaultHeader from '../../../components/DefaultHeader'
import Layout from '../../../components/Layout'
import PatronCard from '../../../components/PatronCard'
import EventForm from '../../../components/EventForm/EventForm'

const AdminContainer = styled.div`
  display: flex;
  width: 75vw;    
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 100%
  }
`

const PatronContainer = styled.div`
margin: 1rem;
display: flex;
flex-direction: column;
h3 {
  margin-bottom: 2rem;
}
`

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

  // hoist submit functions to this page so can reset state upon edits? or at least do so for patrons...
  return (
    <Layout>
      <DefaultHeader title={`Edit: ${event.formData.title}`}/>
      <AdminContainer>
        <EventForm event={event} />
        <PatronContainer>
        <h3>Registered:</h3>
        {patrons.map(patron => 
          <PatronCard 
            event={event}
            key={patron._id} 
            patron={patron} 
            removePatron={removePatron} 
          />)
        }
        </PatronContainer>
      </AdminContainer>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps({ params }) {
    const event = await getEvent(params.id)
    // Pass data to the page via props
    return { props: { event } }
  }