import Link from 'next/link'

import style from './calendar.module.css'

const Calendar = ({ eventData, month }) => {
  if (!month) return null

  // this is presentational so it belongs in this component
  const lastDaysOfPreviousMonth = () => console.log('last days of previous month')

  // places events on calendar
  const findEvents = (day) => {
    const daysEvents = eventData.filter(event =>
      event.dates.some(date => 
        date.day === day)
      )
    return daysEvents.length === 0 ? null : daysEvents.map(event =>
       <Link href="/events/[id]" as={`/events/${event.id}`} key={event.id}>
        <a>{event.name}</a>
      </Link>
      )
  }

  // creates div for each day of month
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