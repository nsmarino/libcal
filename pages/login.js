import Layout from '../components/Layout'
import Header from '../components/DefaultHeader'
import LoginForm from '../components/LoginForm'
import { useAdmin } from '../context/admin'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const {admin} = useAdmin()

  return (
    <>
      {admin ?
      null
      :
      <Layout>
        <Header title="Admin Login" />          
        <LoginForm />
      </Layout>
      }
    </>
  )
}

export default LoginPage