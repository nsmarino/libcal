import Layout from '../components/Layout'
import EventForm from '../components/EventForm/EventForm'
import Header from '../components/DefaultHeader'
 
const NewEventPage = () => {
    return (
      <Layout>
        <Header title="New Event" />          
        <EventForm />
      </Layout>
    )
}

export default NewEventPage