import Link from 'next/link'

const DayCard = ({ day, eventData }) => {
  const findEvents = (day) => {
    const daysEvents = eventData.filter(event =>
      event.dates.some(date => 
      date.day === day)
      )
    return daysEvents.length === 0 ? null : daysEvents.map(event =>
      <Link href="/events/[id]" as={`/events/${event.id}`} key={event.id}>
        <a>
          <p>
            {event.formData.title}
          </p>
        </a>
      </Link>
    )
  }
  return (
    <div>
      <h3>{day}</h3>
      {findEvents(day)}
    <style jsx>{`
    div {
      border: 1px solid black;
      width: calc((100% / 7) - 1%);
      margin: 0.5%;
      min-height: 6rem;
      border-radius: 5%;
      }
    `}</style>   
    </div>
  )
}

export default DayCard