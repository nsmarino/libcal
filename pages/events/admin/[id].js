import Link from 'next/link'

import { getEvent } from '../../../services/eventService'

const Registrant = ({ reg }) => {
    return (<div>
        <p>{reg.lastName} {reg.email}</p>
    </div>)
}

export default function AdminPage({ event }) {
    console.log(event)
    return (
        <div>
            <h2>Admin: {event.name}</h2>
            <p>{event.description}</p>
            <p>time: {event.time}</p>
            <div>Registered: {event.registered.map(reg => <Registrant key={reg._id} reg={reg} />)}</div>

            <Link href="/">
              <a>            
                <button>EDIT</button>
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