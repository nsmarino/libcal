import Link from 'next/link'

import { getEvent, updateEvent } from '../../../services/eventService'

import DefaultHeader from '../../../components/DefaultHeader'
import RegistrationForm from '../../../components/RegistrationForm'
import Layout from '../../../components/Layout'

export default function Registration({ event }) {

    return (
      <Layout>
        <DefaultHeader title={event.formData.title} />
        <RegistrationForm event={event} />
    
        <Link href="/events/[id]" as={`/events/${event.id}`}>
          <a>
            <button>cancel</button>
          </a>
        </Link>
      </Layout>
    )
}


// This gets called on every request
export async function getServerSideProps({ params }) {
    const event = await getEvent(params.id)
    // Pass data to the page via props
    return { props: { event } }
  }