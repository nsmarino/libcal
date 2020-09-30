import styled from '@emotion/styled'
import { useAdmin } from '../context/admin'
import LinkButton from './LinkButton'
import DateList from './EventForm/DateList'
import PreviewCalendar from './PreviewCalendar'

const StyledEventInfo = styled.div`
margin: 1rem;
background: #AFD9AF;
display: flex;
flex-direction: column;
justify-content: center;
padding: 1rem;

min-width: 90%;
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
border: 1px solid grey;
input[type="submit"] {
  color: white;
  background: black;
  border: 1px solid grey;
  height: 4rem;
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

input[type="submit"]:disabled {
  background: grey;
}

@media screen and (min-width: 600px) {
  min-width: 40rem;
}
p {
  margin: 1rem;
}
`

export default function EventInfo({ event, month }) {

  const { admin } = useAdmin()
    return (
      <StyledEventInfo>
        <h2>{event.formData.title}</h2>

        { admin &&
          <LinkButton 
            href="/events/admin/[id]" 
            dynamic={`/events/admin/${event.id}`} 
            text="admin" 
          /> 
        }
        <p>{event.formData.startTime} to {event.formData.endTime}</p>

        <p>{event.formData.description}</p>
        
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

      <PreviewCalendar monthData={month} dates={event.dates} />
      <DateList dates={event.dates} />

      </StyledEventInfo>
    )
  }