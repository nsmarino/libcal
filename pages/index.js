import { useState } from 'react'
import Link from 'next/link'

import { getEventsByMonth } from '../services/eventService'

import Calendar from '../components/Calendar'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'

const getMonthObject = (month, year) => {
  const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ];
  const name = monthArr[month]
  const startsOn = new Date(year, month, 1).getDay()
  const length = new Date(year, month+1, 0).getDate()
  return {
    name,
    length,
    startsOn,
    number: month,
    year,
  }
}
const getCurrentMonth = () => {
  const todaysDate = new Date()
  const currentMonth = todaysDate.getMonth()
  const currentYear = todaysDate.getFullYear() 
  const monthObject = getMonthObject(currentMonth, currentYear)
  return monthObject  
}

export default function Home({ monthData, eventData }) {  
  const [month, setMonth] = useState(monthData)
  const [events, setEvents] = useState(eventData)
  
  const backToCurrentMonth = async () => {
    const currentMonth = getCurrentMonth()
    setMonth(currentMonth)
    const events = await getEventsByMonth(currentMonth)
    setEvents(events)
  }
  const getPreviousMonth = async () => {
    const previousMonth = month.number === 0 ? 11 : month.number - 1
    const year = month.number === 0 ? month.year - 1 : month.year
    const previousMonthObject = getMonthObject(previousMonth, year)
    const previousMonthEvents = await getEventsByMonth(previousMonthObject)
    setEvents(previousMonthEvents)
    setMonth(previousMonthObject)
  }
  const getNextMonth = async () => {
    const nextMonth = month.number === 11 ? 0 : month.number + 1
    const year = month.number === 11 ? month.year + 1 : month.year
    const nextMonthObject = getMonthObject(nextMonth, year)
    const nextMonthEvents = await getEventsByMonth(nextMonthObject)
    setEvents(nextMonthEvents)
    setMonth(nextMonthObject)
  }

  return (
    <Layout>
      <main>
        <button onClick={getPreviousMonth}>previous</button>
        <button onClick={backToCurrentMonth}>current month</button>
        <button onClick={getNextMonth}>next</button>
        <div>
          <LinkButton href="/new" text="Create New Event" />
        {/* <Link href="/new">
          <a>
            <button>CREATE NEW EVENT</button>
          </a>
        </Link> */}
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

// [✓ 9/10/2020]

// Agile principles -- fully plan, code, and test part of system before moving on to next part.


