import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { useAdmin } from '../../context/admin'
import moment from 'moment'
import styled from '@emotion/styled'

import { addEvent, updateEvent, deleteEvent } from '../../services/eventService'

import TextInput from './TextInput'
import TextAreaInput from './TextAreaInput'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import CheckboxInput from './CheckboxInput'
import RecurrenceContainer from './RecurrenceContainer';
import NumberInput from './NumberInput';
import DateList from './DateList'
import PreviewCalendar from '../PreviewCalendar';

const StyledForm = styled.form`
  margin: 1rem;
  background: #AFD9AF;
  display: flex;
  flex-direction: column;
  justify-content: center;
 
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  border: 1px solid grey;
  input[type="submit"] {
    font-family: inherit;
    font-size: 100%;
    color: white;
    background: black;
    border: 1px solid grey;
    height: 4rem;
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 1rem;
    margin-bottom: 2rem;
    &:hover {
      color: black;
      background: white;
      cursor: pointer;
    }
  }

  input[type="submit"]:disabled {
    background: grey;
  }

  @media screen and (min-width: 600px) {
    min-width: 40rem;
  }

`

const StyledContainer = styled.div`
  display: flex;
  width: 80%;
  margin-left: 10%;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid grey;
`

const StyledInfoContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 600px) {
   flex-direction: column;
  }
`

const StyledCheckBoxContainer = styled.div`
  display: flex;  
`

const AdminButton = styled.button`
font-family: inherit;
display: inline;
font-size: 100%;
color: black;
background: none;
border: 1px solid grey;
height: 4rem;
width: 40%;
margin-left: 30%;
margin-right: 30%;
margin-top: 1rem;
margin-bottom: 1rem;
&:hover {
  color: black;
  background: white;
  cursor: pointer;
}
`

const EventForm = ({event}) => {
  const { admin } = useAdmin()
  const router = useRouter()
  const [dates, setDates] = useState([])
  const [errorMessage, setErrorMessage] = useState('')


  const { 
    register, handleSubmit, watch, errors, getValues, setValue 
  } = useForm(
    { 
      defaultValues: {
        startDate: moment().format("YYYY-MM-DD"),
        startTime: "12:00",
        endTime: "14:00",
        endType: "afterOccurrences",
        endDate: moment().add(1,'months').format("YYYY-MM-DD"),
        endAfter: "5",
        monthlyType: "numberedDay",
        classSize: "10",
        interval: '1',
        weeklyInterval: '1',
        monthlyInterval: '1',
        monday: true,
        recurrenceType: "daily"
      }
    })

  const watchRecurring = watch("recurring") // used by effect hook below

  const getDate = () => { // generates date object if non-recurring event.
    const date = moment(getValues("startDate"))
    const dateObj = {
      dayOfWeek: date.day(),
      day: date.date(),
      month: date.month(),
      year: date.year(),
    }
    setDates([dateObj])
  } 

  useEffect(() => {  // called on initial render only -- otherwise feedback loop when checking/unchecking "Recurring event"
    if (event) {
      setValue("recurring", event.formData.recurring)
      }  
  }, [])

  useEffect(() => { 
    if (event) {
      for (const property in event.formData) {
        if (property !== "recurring") setValue(property, event.formData[property])
      }
    }
    if (!watchRecurring) {
      getDate()
    } 
  }, [watchRecurring])

  const watchStartDate = watch("startDate")

  useEffect(() => {
    if (!watchRecurring) {
      getDate()
    } 
  }, [watchStartDate])

  const submitUpdatedEvent = (data) => {
    const updatedEvent = {...event, dates: dates, formData: data}
    updateEvent(event.id, updatedEvent, admin)
      .then(returnedEvent => {
        if (!returnedEvent) {
          setErrorMessage(
            `Unable to update event. Please ensure all information is correct.`
          )
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        } else {
          router.push(`/events/[id]`, `/events/${returnedEvent.id}`)
        }
      })
  }

  const onSubmit = (data) => {
    if (dates.length===0) {
      alert('This event has no dates set. Please set at least one date.')
      return
    }
    if (!admin) {
      alert('Only administrators can add new events.')
    }
    if (event) {
      submitUpdatedEvent(data)
    } else {
    const newEvent = {
      dates,
      formData: data,
      registered: [],
    }
    addEvent(newEvent, admin)
      .then(savedEvent=>{
        if (!savedEvent) {
          setErrorMessage(
            `Unable to add event. Please ensure all required information is included.`
          )
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        } else {
          router.push(`/events/[id]`, `/events/${savedEvent.id}`)
        }
      })
    }  
  }

  const removeEvent = async (e) => {
    e.preventDefault()
    await deleteEvent(event.id, admin)
    router.push('/')
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
       <p>{errorMessage}</p>
        <TextInput register={register} name="title" label="Title" errors={errors} />
        <TextAreaInput name="description" label="Description" register={register} errors={errors} />
        
        <StyledInfoContainer>
          <DateInput name="startDate" label="Date" register={register} errors={errors} required={true} />
          <TimeInput name="startTime" label="From" register={register} errors={errors} />
          <TimeInput name="endTime" label="to" register={register} errors={errors} />
        </StyledInfoContainer>

        <StyledInfoContainer>      
          <div>Max size:
          <NumberInput 
            name="classSize" 
            label="Max size:" 
            register={register} 
            errors={errors} 
            getValues={getValues} 
            setValue={setValue} 
          />
            </div>
        
          <StyledCheckBoxContainer>
            <CheckboxInput name="registrationRequired" label="Registration required" register={register} errors={errors} />
            <CheckboxInput name="carmelOnly" label="Prioritize Carmel residents" register={register} errors={errors} />
          </StyledCheckBoxContainer>

        </StyledInfoContainer> 
        <StyledContainer>
          <CheckboxInput 
            name="recurring" 
            label="Recurring event?" 
            register={register} 
            errors={errors} 
          /> 
            
            {watchRecurring && (
            <RecurrenceContainer 
              register={register} 
              errors={errors} 
              watch={watch} 
              getValues={getValues} 
              setValue={setValue}
              setDates={setDates}
            />       
            )}

      </StyledContainer>
      <PreviewCalendar dates={dates} />
      <DateList dates={dates} /> 
     
      <input type="submit" disabled={dates.length===0} value={event ? "Update Event" : "Create Event"} />
        { event &&
        <div>
          <AdminButton onClick={(e) => removeEvent(e)}>Delete Event</AdminButton>
          <Link href="/events/[id]" as={`/events/${event.id}`}>
            <a>
              <AdminButton>Cancel</AdminButton>
            </a>
          </Link>
        </div>
        }
    </StyledForm>
  )
}

export default EventForm