// FRAMEWORK:
import Head from 'next/head'

// COMPONENTS:
import Calendar from '../components/Calendar'
import EventForm from '../components/EventForm'

// API SERVICE:
import { getAllEvents, addEvent } from '../lib/eventLib'

// HOOKS:
import { useField } from '../hooks/index'

export default function Home({ eventData }) {
  const eventName = useField('text')
  const eventDescription = useField('textarea')
  const eventDate = useField('date')
  const eventTime = useField('time')  

  const sampleMonth = {
    name: 'JULY',
    days: 31,
    startsOn: 'Sunday'
    }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(typeof eventDate.inputProps.value)

    const newEvent = {
      name: eventName.inputProps.value,
      description: eventDescription.inputProps.value,
      date: eventDate.inputProps.value,
      time: eventTime.inputProps.value,
      registered: [],
    }

    // POST REQUEST TO 'API/EVENTS'
    addEvent(newEvent)
      .then(newEvent=>console.log(newEvent))

    eventName.reset()
    eventDescription.reset()
    eventDate.reset()
    eventTime.reset()
  }

  return (
    <div className="container">
      <Head>
        <title>reed library | events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <header>
      <h1>event calendar</h1>
      <p>{sampleMonth.name}</p>
    </header>
      <main>
        <Calendar month={sampleMonth} eventData={eventData} />
        
        <EventForm 
          name={eventName}
          description={eventDescription}
          date={eventDate}
          time={eventTime}
          handleSubmit={handleSubmit}
        />

      </main>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const eventData = await getAllEvents()
  // Pass data to the page via props
  return { props: { eventData } }
}

// ROADMAP:
// 1. Display events from MongoDB on calendar interface [yes]
// 2. Clicking on event gives you details view where you can register (PUT request)
// 3. Add all form parameters to event creation
// 4. Make event object more complex - multiple dates, validation of carmel patrons
// 5. Add all necessary features incl validation to registration form
// 6. Write tests for events API and registration.
// 7. Add admin panel.
// 8. Email integration.
// 9. CSS

// FEATURES:
// - Server-side-rendering with Next JS
// - Extensive use of Fetch API and Next JS Pages API
// - MongoDB integration with Mongoose
// - Testing suites ???
// - Admin panel ???
// - Email integration ???