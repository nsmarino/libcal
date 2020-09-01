import Link from 'next/link'

import { getEvent } from '../../services/eventService'

export default function EventPage({ event }) {
    return (
        <div>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>time: {event.time}</p>
            <p>Registered: {event.registered.length}</p>

            <Link href="/events/register/[id]" as={`/events/register/${event.id}`}>
              <a>            
                <button>register</button>
              </a>
            </Link>

            <Link href="/">
              <a>
                <button>back</button>
              </a>
            </Link>
            <Link href="/events/admin/[id]" as={`/events/admin/${event.id}`}>
              <a>            
                <button>ADMIN</button>
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