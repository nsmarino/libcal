import { useState } from 'react'
import styled from '@emotion/styled'

import getCurrentMonth, { getMonthObject } from '../utils/getCurrentMonth'

import idGenerator from '../utils/idGenerator'
import PlaceholderCard from './PlaceholderCard'
import PreviewCard from './PreviewCard'
import NavButton from './NavButton'

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const CalendarDiv = styled.div`
  display: flex;
  background: whitesmoke;
  flex-wrap: wrap;
  justify-content: left;
  border: 1px solid black;
  width: 21rem;
`

const StyledButton = styled.button`
background: none;
margin: 0.5rem;
border: 1px solid black;
border-radius: 50%;
font-family: monospace;
width: 1.5rem;
height: 1.5rem;
font-size: 125%;
font-weight: bold;
:hover {
  background: white;
}
`

const PreviewCalendar = ({ monthData, dates }) => {
  const [month, setMonth] = useState(getCurrentMonth())
  
  const getPreviousMonth = async () => {
    const previousMonth = month.number === 0 ? 11 : month.number - 1
    const year = month.number === 0 ? month.year - 1 : month.year
    const previousMonthObject = getMonthObject(previousMonth, year)
    setMonth(previousMonthObject)
  }
  const getNextMonth = async () => {
    const nextMonth = month.number === 11 ? 0 : month.number + 1
    const year = month.number === 11 ? month.year + 1 : month.year
    const nextMonthObject = getMonthObject(nextMonth, year)
    setMonth(nextMonthObject)
  }
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
          <PreviewCard 
            day={day} 
            month={month} 
            event={dates.find(d=>d.day===day && d.month===month.number)} 
            key={idGenerator()} 
          />
          :
          <PlaceholderCard key={idGenerator()} />
      )
  }

  return (
    <Container>
    <div style={{display: 'flex', width: '21rem', justifyContent: 'space-between', alignItems: 'center'}}>
      <NavButton handleClick={getPreviousMonth} text='<' />
      <h4>{month.name} {month.year}</h4>
      <NavButton handleClick={getNextMonth} text='>' />
    </div>
    <CalendarDiv>
      {displayMonth()}
    </CalendarDiv>
    </Container>
  )
}

export default PreviewCalendar