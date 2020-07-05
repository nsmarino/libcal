import Link from 'next/link'

import { getEventData, getEvent } from '../../lib/eventLib'

export default function EventPage({ event }) {
    console.log(event)
    return (
        <div>
            <h2>{event.name}</h2>
            <p>{event.time}</p>
            <p>Registered: {event.registered.length}</p>
            <p>{event.description}</p>
            <button>register</button>
            <Link href="/">
              <a>
                <button>back</button>
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