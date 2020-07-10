// // FRAMEWORK:
// import Head from 'next/head'

// // COMPONENTS:
// import Calendar from '../components/Calendar'
// import EventForm from '../components/EventForm'

// // API SERVICE:
// import { getAllEvents, addEvent, getEventsForCurrentMonth } from '../services/eventService'

// // HOOKS:
// import { useState, useEffect } from 'react'
// import { useField } from '../hooks/index'
// // custom useMonth hook possible???

// export default function Home({ eventData }) {
//   const [month, setMonth] = useState(null)
  
//   // custom hook for form handling:
//   const eventName = useField('text')
//   const eventDescription = useField('textarea')
//   const eventDate = useField('date')
//   const eventTime = useField('time')  

//   // obtain month and day names as strings
//   const monthArr = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//     ];
//   const dayArr = [
//     'Sunday',
//     'Monday', 
//     'Tuesday', 
//     'Wednesday', 
//     'Thursday', 
//     'Friday', 
//     'Saturday', 
//   ]
//   const getMonthObject = (month, year) => {
//     const name = monthArr[month]
//     const startsOn = new Date(year, month, 1).getDay()
//     const length = new Date(year, month+1, 0).getDate()
//     return {
//       name,
//       length,
//       startsOn,
//       number: month,
//       year,
//     }
//   }

//   const getCurrentMonth = () => {
//     console.log('setting current month...')
//     const todaysDate = new Date()
//     const currentMonth = todaysDate.getMonth()
//     const currentYear = todaysDate.getFullYear() 
//     const monthObject = getMonthObject(currentMonth, currentYear)
//     console.log(monthObject)
//     setMonth(monthObject)
//   }

//   const getPreviousMonth = () => {
//     console.log('setting previous month')
//     const previousMonth = month.number === 0 ? 11 : month.number - 1
//     const year = month.number === 0 ? month.year - 1 : month.year
//     const previousMonthObject = getMonthObject(previousMonth, year)
//     console.log(previousMonthObject)
//     setMonth(previousMonthObject)
//   }

//   const getNextMonth = () => {
//     console.log('setting next month')
//     const nextMonth = month.number === 11 ? 0 : month.number + 1
//     const year = month.number === 11 ? month.year + 1 : month.year
//     const nextMonthObject = getMonthObject(nextMonth, year)
//     console.log(nextMonthObject)
//     setMonth(nextMonthObject)
//   }

//   useEffect(() => {
//     getCurrentMonth()
//   }, [])

//   useEffect(() => {
//     console.log('month has changed')
//   }, [month])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log(typeof eventDate.inputProps.value)

//     const newEvent = {
//       name: eventName.inputProps.value,
//       description: eventDescription.inputProps.value,
//       date: eventDate.inputProps.value,
//       time: eventTime.inputProps.value,
//       registered: [],
//     }

//     // POST REQUEST TO 'API/EVENTS'
//     addEvent(newEvent)
//       .then(newEvent=>console.log(newEvent))

//     eventName.reset()
//     eventDescription.reset()
//     eventDate.reset()
//     eventTime.reset()
//   }

//   return (
//     <div className="container">
//       <Head>
//         <title>reed library | events</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//     <header>
//       <h1>event calendar</h1>
//       <p></p>
//     </header>
//       <main>
//         <button onClick={getPreviousMonth}>previous</button>
//         <button onClick={getCurrentMonth}>current month</button>
//         <button onClick={getNextMonth}>next</button>
//         <Calendar month={month} eventData={eventData} />
        
//         <EventForm 
//           name={eventName}
//           description={eventDescription}
//           date={eventDate}
//           time={eventTime}
//           handleSubmit={handleSubmit}
//         />

//       </main>
//     </div>
//   )
// }

// // This gets called on every request
// export async function getServerSideProps() {
//   const eventData = await getAllEvents()

//   const eventsInCurrentMonth = await getEventsForCurrentMonth()

//   // Pass data to the page via props
//   return { props: { eventData } }
// }