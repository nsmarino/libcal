import { getEvent } from '../../services/eventService'

import Layout from '../../components/Layout'
import EventInfo from '../../components/EventInfo'

export default function EventPage({ event }) {

  return (
  <Layout>

    <EventInfo event={event} /> 

  </Layout>
  )
}


// This gets called on every request
export async function getServerSideProps({ params }) {
    const event = await getEvent(params.id)
    // Pass data to the page via props
    return { props: { event } }
  }