import Layout from '../components/Layout'
import EventForm from '../components/NewEventForm/EventForm'

const TestPage = () => {

    const event = {
      dates: [
        {
          dayOfWeek: 6,
          day: 5,
          month: 5,
          year: 2020,
        }
      ],
      formData: {
        title: 'foo',
        description: 'bar',
        startDate: '2020-09-05',
        startTime: '12:00',
        endTime: '14:00',

        recurring: true,
        recurrenceType: 'daily',
        interval: 3,
        endType: 'untilDate',
        endDate: '2020-09-10',

        classSize: 10,
        registrationRequired: false,
        carmelOnly: false,}
    }

    return (
        <Layout>
          <EventForm event={event} />
        </Layout>
    )
}

export default TestPage