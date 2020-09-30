import { useState } from 'react'

import { getEventsByMonth } from '../services/eventService'

import Calendar from '../components/Calendar'
import Layout from '../components/Layout'
import Header from '../components/CalendarHeader' 
import NewEventButton from '../components/NewEventButton'
import getCurrentMonth from '../utils/getCurrentMonth'

export default function Home({ monthData, eventData }) {  
  const [month, setMonth] = useState(monthData)
  const [events, setEvents] = useState(eventData)

  return (
    <Layout month={month}>
      <main>
        <Header month={month} setMonth={setMonth} setEvents={setEvents} />
       
        <div>
          <NewEventButton href="/new" text="New Event" />
        </div>

        <Calendar month={month} eventData={events} />

      </main>
      </Layout>
  )
}
// This gets called on every request
export async function getServerSideProps() {
  const monthData = getCurrentMonth()
  const eventData = await getEventsByMonth(monthData)

  return { props: { monthData, eventData } }
}
