import Link from 'next/link'

import { getEventData } from '../../lib/eventLib'

export default function EventPage({ event }) {
    console.log(event)
    return (
        <div>
            <h2>{event.title}</h2>
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
    const event = getEventData(params.id)
    // Pass data to the page via props
    return { props: { event } }
  }