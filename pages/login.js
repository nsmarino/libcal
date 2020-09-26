import Layout from '../components/Layout'
import Header from '../components/DefaultHeader'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
    return (
        <Layout>
        <Header title="Admin Login" />          
        <LoginForm />
      </Layout>
    )
}

export default LoginPage