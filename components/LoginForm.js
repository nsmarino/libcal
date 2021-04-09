import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { login } from '../services/loginService'
import jsCookie from 'js-cookie';
import { useAdmin } from '../context/admin'

import styled from '@emotion/styled'

const StyledForm = styled.form`
  margin: 1rem;
  background: #AFD9AF;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

`

import TextInput from './EventForm/TextInput'
import PasswordInput from './EventForm/PasswordInput'

const LoginForm = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const { setAdmin} = useAdmin()

  const { 
    register, 
    handleSubmit, 
    errors, 
  } = useForm()

  const onSubmit = async (data) => {
    const loginData = await login(data)

    if (!loginData) {
      setErrorMessage('INVALID USERNAME OR PASSWORD')
    } else {
      jsCookie.set('token', loginData.token)
      setAdmin(loginData.token)
      router.push('/')
    }
    }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {errorMessage}
      <TextInput register={register} name="username" label="Username" errors={errors} />
      <PasswordInput register={register} name="password" label="Password" errors={errors} />
      <input type="submit" value="Login" /> 
    </StyledForm>
  )
}

export default LoginForm