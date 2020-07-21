import Head from 'next/head'

import EventForm from '../components/EventForm'

import { addEvent } from '../services/eventService'

import { useState } from 'react'
import { useField, useHTMLSelect, useBoolean } from '../hooks/index'

export default function New() {

  ///////////////
  // HOOK CITY //
  ///////////////

  const eventName = useField('text')
  const eventDescription = useField('textarea')
  const eventDate = useField('date', new Date().toISOString().substring(0, 10))
  const eventTime = useField('time', '12:00')

  const eventDurationHr = useHTMLSelect('1') // select
  const eventDurationMin = useHTMLSelect('0') // select

  const eventRecurring = useBoolean(false)
  const [recurrenceType, setRecurrenceType] = useState('daily') 

  // DAILY RECURRENCE
  const dailyRepeat = useHTMLSelect('1')

  // WEEKLY RECURRENCE
  const weeklyRepeat = useHTMLSelect('1')
  const [weeklyDays, setWeeklyDays] = useState({}) // will need to write function for setting weeklyDays based on which days are checked
  
  // MONTHLY RECURRENCE
  const monthlyRepeat = useHTMLSelect('1')
  const [monthlyRecurrenceType, setMonthlyRecurrenceType] = useState('') // radio

  const monthlyByDate = useHTMLSelect('')
  const monthlyByOccurencesOrdinal = useHTMLSelect('')
  const monthlyByOccurencesDay = useHTMLSelect('')

  const [endType, setEndType] = useState('') // radio
  const endByDate = useField('date') // effect hook to calculate default date whenever recurrenceType changes?
  const endByOccurences = useHTMLSelect('')

  const maxParticipants = useField('number', 10)
  const priorityCarmel = useBoolean(false)

   ///////////////////////
   // FUNCTION JUNCTION //
   ///////////////////////
  
  const resetForm = () => console.log('reset state of all hooks to default')

  const handleDailyRecurrence = (date) => {
    console.log(date)
    console.log("how many days to repeat:",dailyRepeat.inputProps.value)
    console.log("end:",endType)
    console.log("by date,",endByDate.inputProps.value,"by occurences",endByOccurences.inputProps.value)
    
    if (endType==="by") {
      console.log('youve chosen to end by a certain date')
    }
    if (endType==="after") {
      console.log('youve chose to end after a set number of occurences')
      for (let i=0;i<endByOccurences.inputProps.value;i++) {
          console.log(i)
      }
    }
  }

  const processDates = () => {

    if (!eventRecurring) return [initialDate]

    // input for recurrence handler must have 
    if (recurrenceType==="daily") { 
      return handleDailyRecurrence(initialDate)
    }
    // if (recurrenceType==="weekly") handleWeeklyRecurrence()
    // if (recurrenceType==="monthly") handleMonthlyRecurrence()
    
    // This will need to be done as a .map() on the array returned from the recurrence handler
    // const initialDate = {
    //   day: parseInt(eventDate.inputProps.value.substring(8), 10),
    //   month: parseInt(eventDate.inputProps.value.substring(5,7),10),
    //   year: parseInt(eventDate.inputProps.value.substring(0,4),10),
    // }


    return [initialDate]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
        
    const dates = processDates()
    const newEvent = {
        name: eventName.inputProps.value,
        description: eventDescription.inputProps.value,
        dates,
        time: eventTime.inputProps.value,
        duration: `${eventDurationHr.inputProps.value} hr, ${eventDurationMin.inputProps.value} min`,
        registered: [],
        maxParticipants: parseInt(maxParticipants.inputProps.value,10),
        priorityCarmel: priorityCarmel.value,
    }

    console.log(newEvent)

        // // POST REQUEST TO 'API/EVENTS'
        // addEvent(newEvent)
        //   .then(newEvent=>console.log(newEvent))

        // eventName.reset()
        // eventDescription.reset()
        // eventDate.reset()
        // eventTime.reset()
  }

  return (
  <div className="container">
    <Head>
      <title>reed library | events</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <EventForm 
          // basic event details
          name={eventName}
          description={eventDescription}
          date={eventDate}
          time={eventTime}
          durationHr={eventDurationHr}
          durationMin={eventDurationMin}
          
          // type of recurrence
          recurring={eventRecurring} 
          recurrenceType={recurrenceType}
          setRecurrenceType={setRecurrenceType}

          // daily
          dailyRepeat={dailyRepeat}

          // weekly
          weeklyRepeat={weeklyRepeat}
          weeklyDays={weeklyDays}
          setWeeklyDays={setWeeklyDays} // need to write actual function tho

          // monthly
          monthlyRepeat={monthlyRepeat}
          handleMonthlyRecurrence={setMonthlyRecurrenceType}
          monthlyByDate={monthlyByDate}
          monthlyByOccurencesOrdinal={monthlyByOccurencesOrdinal}
          monthlyByOccurencesDay={monthlyByOccurencesDay}

          // endDate
          handleEndType={setEndType}
          endByDate={endByDate}
          endByOccurences={endByOccurences}

          // other
          maxParticipants={maxParticipants}
          priorityCarmel={priorityCarmel}

          handleSubmit={handleSubmit}
        />
        <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }
      `}</style>
  </div>
  )
}


