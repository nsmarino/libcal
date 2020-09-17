import styled from '@emotion/styled'

import idGenerator from '../utils/idGenerator'
import PlaceholderCard from './PlaceholderCard'
import DayCard from './DayCard'

const CalendarDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 50vw;
  justify-content: left;
  border: 1px solid black;
  max-width: 75vw;
  @media screen and (max-width: 1400px) {
    max-width: 100%;
  }
`

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
          <DayCard day={day} month={month} eventData={eventData} key={idGenerator()} />
          :
          <PlaceholderCard key={idGenerator()} />
      )
  }

  return (
    <CalendarDiv>
      {displayMonth()}
    </CalendarDiv>
  )
}

export default Calendar