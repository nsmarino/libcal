import Link from 'next/link'

import style from './calendar.module.css'

const Calendar = ({ eventData, month }) => {
  if (!month) return null

  // this is presentational so it should go here
  const lastDaysOfPreviousMonth = () => console.log('last days of previous month')


  const findEvents = (day) => {
    // now that i understand the date object better i can probably make this less ugly
    const events = eventData.filter(event => parseInt(event.date.substring(8),10) === day)
    return events.map(event =>
    <Link href="/events/[id]" as={`/events/${event.id}`} key={event.id}>
      <a>{event.name}</a>
    </Link>
    )
  }

  const displayMonth = () => {
      const days = []
      for (let i=0; i<month.length; i++) {
          days.push(i+1)
      }
      return days.map(day => 
        <div className={style.day} key={day}>
          <p>{day}</p>
          {findEvents(day)}
        </div>
      )
  }

  return (
  <>
  <h2>{month.name} {month.year}</h2>
  <div className={style.calContainer}>
      {displayMonth()}
  </div>
  </>
  )
}

export default Calendar