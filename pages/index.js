import Head from 'next/head'

import Calendar from '../components/Calendar'
import EventForm from '../components/EventForm'

const sampleData = [
  {
  title: 'oil painting',
  date: 1,
  time: '8:00',
  registered: [],
  id: 89981,
  },
  {
      title: 'book club',
      date: 3,
      time: '4:00',
      registered: [],
      id: 89708,
  },
  {
    title: 'knitting',
    date: 18,
    time: '4:00',
    registered: [],
    id: 66666,
}
]

const sampleMonth = {
  name: 'November',
  days: 30,
  startsOn: 'Sunday'
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>reed library | events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <header>
      <h1>reed memorial library</h1>
      <p>event calendar</p>
    </header>
      <main>
        <Calendar eventData={sampleData} month={sampleMonth} />
        <EventForm />
      </main>
    </div>
  )
}
