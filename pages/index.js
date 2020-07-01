import Head from 'next/head'

import Calendar from '../components/Calendar'
import EventForm from '../components/EventForm'

import data from '../sampleData'

// "New Event" form templated on Zoom New Meeting form
// Set up local mongodb url for development purposes
// achieve CRUD
// C - create events with minimal logic
// R - fetch all events / fetch specific event
// U - edit events as admin; register as patron
// D - admin can delete

export default function Home({ data }) {
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
  // Pass data to the page via props
  return { props: { data } }
}
