import style from './calendar.module.css'
import idGenerator from '../utils/idGenerator'
import PlaceholderCard from './PlaceholderCard'
import DayCard from './DayCard'

const Calendar = ({ eventData, month }) => {
  if (!month) return null

  const displayMonth = () => {
      const days = []

      for (let i=0; i<month.length; i++) {
          days.push(i+1)
      }

      for (let i=0; i<month.startsOn; i++) { // adds placeholder cards at beginning of month
        days.unshift('')
      }

      return days.map(day => 
        day ?
          <DayCard day={day} eventData={eventData} key={idGenerator()} />
          :
          <PlaceholderCard key={idGenerator()} />
      )
  }

  return (
  <>
  <h2>{month.name} {month.year}</h2>
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