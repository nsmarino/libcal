import Link from 'next/link'

import style from './calendar.module.css'

const Calendar = ({ eventData, month, newEventData }) => {
  console.log(newEventData)
  // parseInt(event.date.substring(8),10)

  const findEvents = (day) => {
    // const events = eventData.filter(event => event.date === day)
    const events = newEventData.filter(event => parseInt(event.date.substring(8),10) === day)
    return events.map(event =>
    <Link href="/events/[id]" as={`/events/${event.id}`} key={event.id}>
      <a>{event.name}</a>
    </Link>
    )
  }

  const displayMonth = () => {
      const days = []
      for (let i=0; i<month.days; i++) {
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
  <div className={style.calContainer}>
      {displayMonth()}
  </div>
  )
}

export default Calendar