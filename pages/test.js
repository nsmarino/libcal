import Layout from '../components/Layout'
import EventForm from '../components/NewEventForm/EventForm'

const TestPage = () => {

    const event = {
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

        // recurrence: {
        //   recurrenceType: 'daily',
        //   interval: 3,
        //   endType: 'by',
        //   endDate: '2020-09-10',
        // },

        classSize: 10,
        registrationRequired: false,
        carmelOnly: false,
    }

    return (
        <Layout>
          <EventForm event={event} />
        </Layout>
    )
}

export default TestPage