import LinkButton from './LinkButton'
import DateList from './EventForm/DateList'

const EventInfo = ({ event }) => {
    return (
      <div>
        <h2>{event.formData.title}</h2>
        <DateList dates={event.dates} />
        <p>{event.formData.description}</p>
        <p>{event.formData.startTime} to {event.formData.endTime}</p>
        { event.formData.registrationRequired &&
        <div>
          <h3>Registration required</h3>
          <p>Registered: {event.registered.length} / {event.formData.classSize}</p>
          <LinkButton 
            href="/events/register/[id]" 
            dynamic={`/events/register/${event.id}`} 
            text="Register" 
          />
        </div>
        }
        <LinkButton href="/" text="Current Month" />
        <LinkButton 
          href="/events/admin/[id]" 
          dynamic={`/events/admin/${event.id}`} 
          text="admin" 
        />
      </div>
    )
  }

export default EventInfo