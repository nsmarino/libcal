import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import moment from 'moment'
import styled from '@emotion/styled'

import { addEvent, updateEvent } from '../../services/eventService'

import TextInput from './TextInput'
import TextAreaInput from './TextAreaInput'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import CheckboxInput from './CheckboxInput'
import RecurrenceContainer from './RecurrenceContainer';
import NumberInput from './NumberInput';
import DateList from './DateList'

const StyledForm = styled.form`
  border: 2px solid black;
  margin: 1rem;
  background: white;
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  input[type="submit"] {
    color: yellow;
    background: black;
    border: none;
    height: 2rem;
  }

`

const StyledContainer = styled.div`
  display: flex;
  border-bottom: 1px solid grey;
  
`

const StyledCheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  
`

const EventForm = ({event}) => {
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
        interval: '2',
        weeklyInterval: '2',
        monthlyInterval: '2',
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
    updateEvent(event.id, updatedEvent)
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
    if (event) {
      submitUpdatedEvent(data)
    } else {
    const newEvent = {
      dates,
      formData: data,
      registered: [],
    }
    addEvent(newEvent)
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

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
       <p>{errorMessage}</p>
        <TextInput register={register} name="title" label="Title" errors={errors} />
        <TextAreaInput name="description" label="Description" register={register} errors={errors} />
        
        <StyledContainer>
        <DateInput name="startDate" label="Date" register={register} errors={errors} required={true} />
        <TimeInput name="startTime" label="From" register={register} errors={errors} />
        <TimeInput name="endTime" label="to" register={register} errors={errors} />
        </StyledContainer>

        <StyledContainer>      
          <NumberInput 
            name="classSize" 
            label="Max size" 
            register={register} 
            errors={errors} 
            getValues={getValues} 
            setValue={setValue} 
          />
        
          <StyledCheckBoxContainer>
            <CheckboxInput name="registrationRequired" label="Registration required" register={register} errors={errors} />
            <CheckboxInput name="carmelOnly" label="Prioritize Carmel residents" register={register} errors={errors} />
          </StyledCheckBoxContainer>

        </StyledContainer> 
        <StyledContainer>
          <div>
          <CheckboxInput 
            name="recurring" 
            label="Recurring event" 
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
          </div>    
          
        <DateList dates={dates} /> 

        </StyledContainer>

     


        <input type="submit" disabled={dates.length===0}value={event ? "Update Event" : "Create Event"} />

      </StyledForm>
    )
}

export default EventForm