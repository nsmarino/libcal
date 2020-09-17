import Link from 'next/link'
import { getEventsByMonth } from '../services/eventService'

import LeftArrow from '../assets/arrow-left.svg'
import RightArrow from '../assets/arrow-right.svg'

import styled from '@emotion/styled'

const StyledHeader = styled.header`
position: sticky;
width: 100%;
top: 0;
background: white;

  h1 {
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
`
const StyledFlex = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const StyledLogoDiv = styled.div`
  width: 4rem;
  height: 4rem;
  border: 1px solid black;
`
const StyledTitleDiv = styled.div`
  display: flex;
  align-items: center;
`
const StyledMenuNav = styled.nav`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DayLabelsDiv = styled.div`
  display: flex;
  background: black;
  color: white;
  font-weight: bold;
  z-index: 99;
  padding: 0.25rem;
  div {
    text-align: center;
    width: calc(100% / 7);
  }
  @media screen and (max-width: 600px) {
    display: none;
  }

`

const getMonthObject = (month, year) => {
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

const Header = ({ month, setMonth, setEvents }) => {

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
  <StyledHeader>

    <StyledFlex>
      <StyledLogoDiv onClick={backToCurrentMonth}>Reed Events</StyledLogoDiv>

      <StyledTitleDiv>
        <LeftArrow onClick={getPreviousMonth} />
        <h1>{`${month.name} ${month.year}`}</h1>
        <RightArrow onClick={getNextMonth} />
      </StyledTitleDiv>

      <StyledMenuNav>
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </StyledMenuNav>
    </StyledFlex>

    <DayLabelsDiv>
      <div>Sun</div>
      <div>Mon</div>
      <div>Tues</div>
      <div>Wed</div>
      <div>Thurs</div>
      <div>Fri</div>
      <div>Sat</div>
    </DayLabelsDiv>

  </StyledHeader>  
  )
}

export default Header