import Link from 'next/link'

import style from './calendar.module.css'
import idGenerator from '../utils/idGenerator'


const Calendar = ({ eventData, month }) => {
  if (!month) return null

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

      for (let i=0; i<month.startsOn; i++) {
        days.unshift('')
      }

      return days.map(day => 
        <div className={day==='' ? style.placeholder : style.day} key={idGenerator()}>
          <p>{day}</p>
          {findEvents(day)}
        </div>
      )
  }

  return (
  <>
  <h2 style={{textAlign: 'center'}}>{month.name} {month.year}</h2>
  <div className={style.dayLabels}>
    <div>Sun</div>
    <div>Mon</div>
    <div>Tues</div>
    <div>Wed</div>
    <div>Thurs</div>
    <div>Fri</div>
    <div>Sat</div>
  </div>
  <div className={style.calContainer}>
      {displayMonth()}
  </div>
  </>
  )
}

export default Calendar