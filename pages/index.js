import Head from 'next/head'

import Calendar from '../components/Calendar'
import EventForm from '../components/EventForm'

import data from '../sampleData'

import { getAllEvents } from '../lib/eventLib'

// ROADMAP:
// 1. "New Event" form templated on Zoom New Meeting form
// 2. Set up local mongodb url for development purposes
// 3. achieve CRUD
//      C - create events with minimal logic
//      R - fetch all events / fetch specific event
//      U - edit events as admin; register as patron
//      D - admin can delete
// 4. Add admin login and control panel
// 5. Event scheduling logic (every 2 weeks, etc)
// 6. Email blast integration - SendGrid?
// 7. CSS Party and status assessment

export default function Home({ data, eventData }) {

  console.log(eventData)
  return (
    <div className="container">
      <Head>
        <title>reed library | events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <header>
      <h1>event calendar</h1>
      <p>{data.sampleMonth.name}</p>
    </header>
      <main>
        <Calendar eventData={data.sampleData} month={data.sampleMonth} />
        <EventForm />


      </main>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const eventData = await getAllEvents()
  // Pass data to the page via props
  return { props: { data, eventData } }
}
