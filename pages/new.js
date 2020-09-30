import Layout from '../components/Layout'
import EventForm from '../components/EventForm/EventForm'
import Header from '../components/DefaultHeader'
import { useAdmin } from '../context/admin'

const NewEventPage = () => {
  const {admin} = useAdmin()
  
  return (
    <>{admin ? 
      <Layout>
        <Header title="New Event" />          
        <EventForm />
      </Layout>
      : null}
    </> 
  )
}

export default NewEventPage