import Link from 'next/link'
import styled from '@emotion/styled'
import moment from 'moment'

const dayArr = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
const monthObj = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
}

const DayCardDiv = styled.div`
  border: 1px solid black;
  background: white;
  width: calc(100% / 7);
  min-height: 8rem;
  p {
    color: black;
    border-bottom: 1px solid lightgrey;
    padding: 0.5rem;
    word-wrap: break-word;
  }
  p:hover {
    transform: translateY(-2px);
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  }
  .eventTime {
    padding-right: 0.5rem;
    margin-right: 0.5rem;
    border-right: 1px solid lightgrey;
  }
  h3 {
    border-bottom: 1px solid lightgrey;
    padding: 0.5rem;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    min-height: 0;
    border: none;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  }
`

const MobileH3 = styled.h3`
display: none;
@media screen and (max-width: 600px) {
      display: block;
      background-image: linear-gradient(to bottom,#dcefdc, #AFD9AF, #9abf9a);
      font-weight: normal;
      font-size: 85%;
      border-bottom: 1px solid black;
      padding-left: 1rem;
      padding-bottom: 0.25rem;
}
`
const MobileNoEventsH3 = styled.h3`
display: none;
@media screen and (max-width: 600px) {
      display: block;
      color: grey;
}
`
const DesktopH3 = styled.h3`
@media screen and (max-width: 600px) {
display: none;
}
`

const DayCard = ({ day, month, eventData }) => {
  const dayMoment = moment(`${month.year}-${month.number+1}-${day}`)
  
  const dayOfWeek = dayArr[dayMoment.day()]

  const findEvents = (day) => {
    const daysEvents = eventData.filter(event =>
      event.dates.some(date => {
      return date.day === day && date.month === month.number})
      )

    if (daysEvents.length !== 0) {
    return daysEvents.map(event =>
      <Link href="/events/[id]" as={`/events/${event.id}`} key={event.id}>
        <a>
          <p><span className="eventTime">{event.formData.startTime}</span>{event.formData.title}</p>
        </a>
      </Link>
      ) 
    } 
  }
  return (
    <DayCardDiv>

      { findEvents(day) ?
        <MobileH3>{dayOfWeek} {monthObj[month.name]} {day}</MobileH3>
        :
        <MobileNoEventsH3>{day}</MobileNoEventsH3>
      }

      <DesktopH3>{day}</DesktopH3>
      { findEvents(day) }  
    </DayCardDiv>
  )
}

export default DayCard