import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";

import { updateEvent } from '../services/eventService'

import TextInput from './EventForm/TextInput'

const RegistrationForm = ({ event, patron }) => {
  const [errorMessage, setErrorMessage] = useState('')

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
    
    updateEvent(event.id, updatedEvent)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage}
      <TextInput register={register} name="firstName" label="First Name" errors={errors} />
      <TextInput register={register} name="lastName" label="Last Name" errors={errors} />
      <TextInput register={register} name="address" label="Address" errors={errors} />
      <TextInput register={register} name="phone" label="Phone Number" errors={errors} />
      <TextInput register={register} name="email" label="Email Address" errors={errors} />
      <TextInput register={register} name="libraryCard" label="Library Card" errors={errors} />
      
      <input type="submit" value={patron ? "Update Patron Information" : "Register"} /> 
    </form>
  )
}

export default RegistrationForm