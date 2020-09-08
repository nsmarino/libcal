import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import moment from 'moment'

import { addEvent } from '../../services/eventService'

import TitleInput from './TitleInput'
import DescriptionTextArea from './DescriptionTextArea'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import CheckboxInput from './CheckboxInput'
import RecurrenceContainer from './RecurrenceContainer';
import NumberInput from './NumberInput';
import DateListItem from './DateListItem'

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

  const watchRecurring = watch("recurring")


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

  const displayDates = () => {
    return dates.map(date => <DateListItem date={date} key={`${date.day}${date.month}${date.year}`}/>)
  }

  const onSubmit = (data) => {
    if (!watchRecurring) console.log("ONE TIME EVENT!")
    if (dates.length===0) {
      alert('This event has no dates set. Please set at least one date.')
      return
    }
    const newEvent = {
      dates,
      formData: data,
      registered: [],
    }
    console.log(newEvent)
    ///////////////////////////////////
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
          console.log(savedEvent)
          router.push(`/events/[id]`, `/events/${savedEvent.id}`)
        }
      })
      ///////////////////////////////////////
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <p>{errorMessage}</p>
        <TitleInput register={register} errors={errors} />
        <DescriptionTextArea register={register} errors={errors} />
        <DateInput name="startDate" label="Date" register={register} errors={errors} required={true} />
        <TimeInput name="startTime" label="Start at" register={register} errors={errors} />
        <TimeInput name="endTime" label="End at" register={register} errors={errors} />
        <CheckboxInput name="recurring" label="Recurring event" register={register} errors={errors} />
        <ul>{displayDates()}</ul> 

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

        <input type="submit" disabled={dates.length===0}value="Create Event" />

      </form>
    )
}

export default EventForm