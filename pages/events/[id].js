import { getEvent } from '../../services/eventService'
import getCurrentMonth from '../../utils/getCurrentMonth'

import Layout from '../../components/Layout'
import DefaultHeader from '../../components/DefaultHeader'
import EventInfo from '../../components/EventInfo'

export default function EventPage({ event, monthData }) {

  return (
  <Layout>
    <DefaultHeader title='Events' />
    <EventInfo event={event} month={monthData} /> 
  </Layout>
  )
}


// This gets called on every request
export async function getServerSideProps({ params }) {
    const event = await getEvent(params.id)
    const monthData = getCurrentMonth()
    // Pass data to the page via props
    return { props: { event, monthData } }
  }