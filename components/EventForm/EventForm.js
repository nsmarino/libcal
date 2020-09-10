import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import moment from 'moment'

import { addEvent, updateEvent } from '../../services/eventService'

import TextInput from './TextInput'
import TextAreaInput from './TextAreaInput'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import CheckboxInput from './CheckboxInput'
import RecurrenceContainer from './RecurrenceContainer';
import NumberInput from './NumberInput';
import DateList from './DateList'

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
        monday: true,
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
    <form onSubmit={handleSubmit(onSubmit)}>
        <p>{errorMessage}</p>
        <TextInput register={register} name="title" label="Title" errors={errors} />
        <TextAreaInput name="description" label="Description" register={register} errors={errors} />
        <DateInput name="startDate" label="Date" register={register} errors={errors} required={true} />
        <TimeInput name="startTime" label="Start at" register={register} errors={errors} />
        <TimeInput name="endTime" label="End at" register={register} errors={errors} />
        <CheckboxInput name="recurring" label="Recurring event" register={register} errors={errors} />
        <DateList dates={dates} />

      {watchRecurring && (
        <RecurrenceContainer 
          register={register} 
          errors={errors} 
          watch={watch} 
          getValues={getValues} 
          setDates={setDates}
        />       
      )}

        <NumberInput name="classSize" label="Max number of participants" register={register} errors={errors} />
        <CheckboxInput name="registrationRequired" label="Registration required" register={register} errors={errors} />
        <CheckboxInput name="carmelOnly" label="Give priority to Carmel residents" register={register} errors={errors} />

        <input type="submit" disabled={dates.length===0}value={event ? "Update Event" : "Create Event"} />

      </form>
    )
}

export default EventForm