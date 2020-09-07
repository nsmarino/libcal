import Link from 'next/link'

import { getEvent, updateEvent } from '../../../services/eventService'
import { useField } from '../../../hooks/index'

import RegForm from '../../../components/RegForm'

export default function Registration({ event }) {
    const patronFirstName = useField('text')
    const patronLastName = useField('text')
    const patronAddress = useField('text')
    const patronLibraryCard = useField('text')
    const patronPhone = useField('text')
    const patronEmail = useField('text')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const patron = {
            firstName: patronFirstName.inputProps.value,
            lastName: patronLastName.inputProps.value,
            address: patronAddress.inputProps.value,
            phone: patronPhone.inputProps.value,
            email: patronEmail.inputProps.value,
            libraryCard: patronLibraryCard.inputProps.value,
        }

        const updatedEvent={...event, registered: event.registered.concat(patron)}
        const submittedEvent = await updateEvent(event.id, updatedEvent)

        patronFirstName.reset()
        patronLastName.reset()
        patronAddress.reset()
        patronLibraryCard.reset()
        patronPhone.reset()
        patronEmail.reset()
    }

    return (
      <div>
        <RegForm 
          event={event}
          firstName={patronFirstName}
          lastName={patronLastName}
          address={patronAddress}
          phone={patronPhone}
          email={patronEmail}
          libraryCard={patronLibraryCard}
          handleSubmit={handleSubmit} 
        />

        <Link href="/">
          <a>
            <button>back to calendar</button>
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