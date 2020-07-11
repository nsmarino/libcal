// FRAMEWORK:
import Head from 'next/head'

// COMPONENTS:
import Calendar from '../components/Calendar'
import EventForm from '../components/EventForm'

// API SERVICE:
import { addEvent, getEventsByMonth } from '../services/eventService'

// HOOKS:
import { useState } from 'react'
import { useField } from '../hooks/index'
// custom useMonth hook possible???

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
const dayArr = [
  'Sunday',
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday', 
]
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
  
  // custom hook for form handling:
  const eventName = useField('text')
  const eventDescription = useField('textarea')
  const eventDate = useField('date')
  const eventTime = useField('time')  

  // functions for buttons. updates month and
  // sends POST request to get events for month.
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

  // update to account for dates array
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
      <p></p>
    </header>
      <main>
        <button onClick={getPreviousMonth}>previous</button>
        <button onClick={backToCurrentMonth}>current month</button>
        <button onClick={getNextMonth}>next</button>

        <Calendar month={month} eventData={events} />
        
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
  const monthData = getCurrentMonth()
  const eventData = await getEventsByMonth(monthData)
  return { props: { monthData, eventData } }
}

// ROADMAP:

// 1. each time the month changes, fetch events for that month [✓ 7/11/20]
// 2. refine event object and creation form
// 3. add admin login - needed for creation form
// 4. email to registered patrons