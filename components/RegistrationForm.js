import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { useAdmin } from '../context/admin'

import styled from '@emotion/styled'

import { updateEvent } from '../services/eventService'

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

const RegistrationForm = ({ event, patron, setUpdate }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const { admin } = useAdmin()

  const router = useRouter()

  const { 
    register, 
    handleSubmit, 
    errors, 
    setValue 
  } = useForm()

  useEffect(() => { 
    if (patron) {
      for (const property in patron) {
        setValue(property, patron[property])
      }
    }
  }, [])

  const onSubmit = (data) => {
    const updatedEvent = patron ?
    {
        ...event, 
        registered: event.registered.map(reg => 
          reg._id === patron._id ?
            data
            :
            reg
          )
      }
    :
    {...event, registered: [...event.registered, data]}
    
    updateEvent(event.id, updatedEvent, admin)
      .then(returnedEvent => {
        if (!returnedEvent) {
          setErrorMessage(
            `Unable to connect to database. Please ensure all information is correct.`
          )
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        } else {
          router.push(`/events/[id]`, `/events/${returnedEvent.id}`)
        }
      })
    }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {errorMessage}
      <TextInput register={register} name="firstName" label="First Name" errors={errors} />
      <TextInput register={register} name="lastName" label="Last Name" errors={errors} />
      <TextInput register={register} name="address" label="Address" errors={errors} />
      <TextInput register={register} name="phone" label="Phone Number" errors={errors} />
      <TextInput register={register} name="email" label="Email Address" errors={errors} />
      <TextInput register={register} name="libraryCard" label="Library Card" errors={errors} />
      
      <input type="submit" value={patron ? "Update Patron Information" : "Register"} /> 
      {patron && <button onClick={() => setUpdate(false)}>cancel</button>}

    </StyledForm>
  )
}

export default RegistrationForm