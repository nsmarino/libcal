// FRAMEWORK:
import Head from 'next/head'
import Link from 'next/link'

// COMPONENTS:
import Calendar from '../components/Calendar'
import Layout from '../components/Layout'

// API SERVICE:
import { getEventsByMonth } from '../services/eventService'

// HOOKS:
import { useState } from 'react'

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

const getMonthObject = (month, year) => {
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
  <div className="container">
    <Layout>
      <main>
        <button onClick={getPreviousMonth}>previous</button>
        <button onClick={backToCurrentMonth}>current month</button>
        <button onClick={getNextMonth}>next</button>
        <div>
        <Link href="/test">
          <a>
            <button>CREATE NEW EVENT</button>
          </a>
        </Link>
        </div>

        <Calendar month={month} eventData={events} />

      </main>
      </Layout>
    </div>
  )
}
// This gets called on every request
export async function getServerSideProps() {
  const monthData = getCurrentMonth()
  console.log(monthData)
  const eventData = await getEventsByMonth(monthData)
  console.log(eventData)

  return { props: { monthData, eventData } }
}

// server side validation of event and patron schemas [✓ 9/2/2020]
// attempt to create event with insufficient info will trigger (crude) error notice on client side [✓ 9/3/2020]

// Agile principles -- fully plan, code, and test part of system before moving on to next part.

// - delete all events currently stored in database
// - update database model
// - handle submit (when to process dates? effect hook for live reload?)
// - Create -> Read -> Update -> Delete
// CREATE: send from form to DB
// READ: view on homepage
// UPDATE: admin page can edit all parts of event object
// DELETE: admin can delete event
// then work on some CSS.

// Event creation page
// -- Use react form hooks
// -- Client-side validation BEFORE sending to server
// -- Feedback to user
// -- Ability to re-load page with info of existing events so can make edits
// -- Display date array and information as settings change (EFFECT HOOK!!!)

// Main calendar page
// -- Improve navigation buttons
// -- Different options show for events if admin is logged in

// Admin page for event
// -- Model after zoom event page

// Patron registration page
// -- Ability to re-load page with info of existing registrant so can make edits
// -- Use react form hooks
// -- Client-side validation BEFORE sending to server
// -- Feedback to user
// -- Displays different

// This is all needed before other features can be added. I need to improve
// the way this app is written before adding further complexity.

