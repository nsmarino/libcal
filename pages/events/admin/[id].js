import { useState, useEffect } from 'react'
import { useAdmin } from '../../../context/admin'

import styled from '@emotion/styled'

import { getEvent, updateEvent } from '../../../services/eventService'

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
  const { admin } = useAdmin()
  const [patrons, setPatrons] = useState([])

  useEffect(() => {
    setPatrons(event.registered)  
  }, [])

  // const router = useRouter()

  const removePatron = (patron) => {
    const updatedPatrons = event.registered.filter(r => r._id !== patron._id)
    const updatedEvent = {...event, registered: updatedPatrons}
    updateEvent(event.id, updatedEvent)
      .then(returnedEvent => setPatrons(returnedEvent.registered))
  }

  return (
  <>{admin ?
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
    </Layout> : null}
    </>  
  )
}

// This gets called on every request
export async function getServerSideProps({ params }) {
    const event = await getEvent(params.id)
    // Pass data to the page via props
    return { props: { event } }
  }