import Head from 'next/head'
import moment from 'moment'

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
  const [weeklyDays, setWeeklyDays] = useState({})
  
  // MONTHLY RECURRENCE
  const monthlyRepeat = useHTMLSelect('1')
  const [monthlyRecurrenceType, setMonthlyRecurrenceType] = useState('') // radio

  const monthlyByDate = useHTMLSelect('') // what is this?
  const monthlyNthWeekdayOrdinal = useHTMLSelect('')
  const monthlyNthWeekdayDay = useHTMLSelect('')

  const [endType, setEndType] = useState('') // radio
  const endByDate = useField('date') // effect hook to calculate default date whenever recurrenceType changes?
  const endByOccurrences = useHTMLSelect('1')

  const maxParticipants = useField('number', 10)
  const priorityCarmel = useBoolean(false)

   ///////////////////////
   // FUNCTION JUNCTION //
   ///////////////////////
  const resetForm = () => console.log('reset state of all hooks to default')

  const getDatesArray = () => {
    if (!eventRecurring.value) {
      return [eventDate.inputProps.value]
    }
    // helpers for recurrenceHandler
    const getCheckedDaysAsArrayOfIntegers = () => {
      const onTheseDays = []

      const daysAsIntegers = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,  
      }

      for (const [key, value] of Object.entries(weeklyDays)) {
        if (value) onTheseDays.push(daysAsIntegers[key])
      }  
      return onTheseDays          
    }
    const nthWeekdayInMonth = (n, weekday, moment) => { // EX: (1, 'Sunday', moment('2020-06-01')) => return date of first sunday in june 2020
      const allWeekdaysInMonth = [] // will be array of all instances of weekday in that month
      const day = moment.startOf('month').day(weekday)

      if (day.date() > 7) day.add(7,'d') // tests to ensure you dont have a day from prev month
      const month = day.month()
      while (month === day.month()) {
        const weekdayInMonth = day.clone()
        allWeekdaysInMonth.push(weekdayInMonth)
        day.add(7,'d')
      }
      const index = n==='last' ? allWeekdaysInMonth.length-1 : n-1
      return allWeekdaysInMonth[index]
    } 
    const recurrenceHandler = {
      daily: {
        byOccurrences: () => {
          const event = {
            start: eventDate.inputProps.value, // string in format 'YYYY-MM-DD'
            occurrences: parseInt(endByOccurrences.inputProps.value,10), // 8
            interval: parseInt(dailyRepeat.inputProps.value,10)   // 2
          }
          const dates = []
          const startDate = moment(event.start)
          const spacer = startDate.clone()

          for (let i=0; i<event.occurrences; i++) {
            const date = spacer.clone()
            const dateObj = {
              day: date.date(),
              month: date.month(),
              year: date.year(),
            }
            dates.push(dateObj)
            spacer.add(event.interval,'day')
          }
          return dates  
        },
        untilEndDate: () => {
          const event = {
            start: eventDate.inputProps.value,
            endDate: endByDate.inputProps.value,
            interval: parseInt(dailyRepeat.inputProps.value,10),
          }

          const dates = []
          const startDate = moment(event.start)
          const spacer = startDate.clone()
        
          const endDate = moment(event.endDate)
          while (!spacer.isAfter(endDate)) {
            const date = spacer.clone()
            const dateObj = {
              day: date.date(),
              month: date.month(),
              year: date.year(),
            }
            dates.push(dateObj)
            spacer.add(event.interval,'day')
          } 
          return dates  
        },
      },
      weekly: {
        byOccurrences: () => {
          const event = {
            start: eventDate.inputProps.value, // 'YYYY-MM-DD'
            occurrences: parseInt(endByOccurrences.inputProps.value,10), // 8
            interval: parseInt(weeklyRepeat.inputProps.value,10),   // 2
            onTheseDays: getCheckedDaysAsArrayOfIntegers() // [1,3,5],
          }
          const dates = []
          const startDate = moment(event.start)
          const spacer = startDate.clone().day(0)

          let i=0; 
          while (i < event.occurrences) {
            for (let day of event.onTheseDays) {
              const date = spacer.clone().day(day)
              if ((date.isSame(startDate) || date.isAfter(startDate)) && i < event.occurrences) {
                const dateObj = {
                  day: date.date(),
                  month: date.month(),
                  year: date.year(),
                }
                dates.push(dateObj)
                i++
              }
            }
            spacer.add(event.interval,'week')
          } 
          return dates  
        },
        untilEndDate: () => {
          const event = {
            start: eventDate.inputProps.value, // 'YYYY-MM-DD'
            endDate: endByDate.inputProps.value,
            interval: parseInt(weeklyRepeat.inputProps.value,10),   // 2
            onTheseDays: getCheckedDaysAsArrayOfIntegers() // [1,3,5],
          }
          const dates = []
          const startDate = moment(event.start)
          const spacer = startDate.clone().day(0)
          const endDate = moment(event.endDate)

          while (!spacer.isAfter(endDate)) {
            for (let day of event.onTheseDays) {
              const date = spacer.clone().day(day) // for example spacer.clone().day(0) returns the Sunday of that week
              if ((date.isSame(startDate) || date.isAfter(startDate)) && !date.isAfter(endDate)) {
                const dateObj = {
                  day: date.date(),
                  month: date.month(),
                  year: date.year(),
                }
                dates.push(dateObj)
              }
            }
            spacer.add(event.interval,'week')
          }
          return dates
        },
      },
      monthly: {
        date: {
          byOccurrences: () => {
            const event = {
              start: eventDate.inputProps.value, // 'YYYY-MM-DD'
              occurrences: parseInt(endByOccurrences.inputProps.value,10), // 8
              interval: parseInt(monthlyRepeat.inputProps.value,10),   // 2
              patternDate: parseInt(monthlyByOccurencesOrdinal.inputProps.value,10) // 15,
            }
            const dates = []
            const startDate = moment(event.start)
            const spacer = startDate.clone().startOf('month')

            let i=0; 
            while (i < event.occurrences) {
              const date = spacer.clone().date(event.patternDate)
              if ((date.isSame(startDate) || date.isAfter(startDate)) && i < event.occurrences) {
                const dateObj = {
                  day: date.date(),
                  month: date.month(),
                  year: date.year(),
                }
                dates.push(dateObj)
                i++
              }
              spacer.add(event.interval,'month')
            } 
            return dates 
          },

          untilEndDate: () => {
            const event = {
              start: eventDate.inputProps.value, // 'YYYY-MM-DD'
              endDate: endByDate.inputProps.value, // 'YYYY-MM-DD'
              interval: parseInt(monthlyRepeat.inputProps.value,10),   // 2
              patternDate: parseInt(monthlyByOccurencesOrdinal.inputProps.value,10) // 15,
            }
            const dates = []
            const startDate = moment(event.start)
            const spacer = startDate.clone().startOf('month')

            const endDate = moment(event.endDate)
            while (!spacer.isAfter(endDate)) {
              const date = spacer.clone().date(event.patternDate)
              if ((date.isSame(startDate) || date.isAfter(startDate)) && !date.isAfter(endDate)) {
                const dateObj = {
                  day: date.date(),
                  month: date.month(),
                  year: date.year(),
                }
                dates.push(dateObj)
              }
              spacer.add(event.interval,'month')
            }      
            return dates   
          },
        },
        day: {  // Next -- will need to bring in helper function (already written)
          byOccurrences: () => {
            const event = {
              start: eventDate.inputProps.value, // string in format 'YYYY-MM-DD'
              occurrences: parseInt(endByOccurrences.inputProps.value,10), // 8
              patternWhich: monthlyNthWeekdayOrdinal.inputProps.value,
              patternDay: monthlyNthWeekdayDay.inputProps.value,
              interval: parseInt(monthlyRepeat.inputProps.value,10),   // 2
            }
            const dates = []
            const startDate = moment(event.start)
            const spacer = startDate.clone().startOf('month')

            let i=0; 
            while (i < event.occurrences) {
              const date = nthWeekdayInMonth(event.patternWhich, event.patternDay, spacer.clone()) 
              if ((date.isSame(startDate) || date.isAfter(startDate)) && i < event.occurrences) {
                const dateObj = {
                  day: date.date(),
                  month: date.month(),
                  year: date.year(),
                }
                dates.push(dateObj)
                i++
              }
              spacer.add(event.interval,'month')
            }  
            return dates
          },
          untilEndDate: () => {
            const event = {
              start: eventDate.inputProps.value, // string in format 'YYYY-MM-DD'
              endDate: endByDate.inputProps.value, // 'YYYY-MM-DD'
              interval: parseInt(monthlyRepeat.inputProps.value,10),   // 2
              patternWhich: monthlyNthWeekdayOrdinal.inputProps.value,
              patternDay: monthlyNthWeekdayDay.inputProps.value,
            }
            const dates = []
            const startDate = moment(event.start)
            const spacer = startDate.clone().startOf('month')

            const endDate = moment(event.endDate)
            while (!spacer.isAfter(endDate)) {
              const date = nthWeekdayInMonth(event.patternWhich, event.patternDay, spacer.clone()) 
              if ((date.isSame(startDate) || date.isAfter(startDate)) && !date.isAfter(endDate)) {
                const dateObj = {
                  day: date.date(),
                  month: date.month(),
                  year: date.year(),
                }
                dates.push(dateObj)
              }
              spacer.add(event.interval,'month')
            }  
            return dates
          },
        }  
      },
    } 
    if (recurrenceType==='daily'||recurrenceType==='weekly') {
      return recurrenceHandler[recurrenceType][endType]()

    } else if (recurrenceType==='monthly') {
      return recurrenceHandler[recurrenceType][monthlyRecurrenceType][endType]()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
        
    const dates = getDatesArray()

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
          monthlyByOccurencesOrdinal={monthlyNthWeekdayOrdinal}
          monthlyByOccurencesDay={monthlyNthWeekdayDay}

          // endDate
          handleEndType={setEndType}
          endByDate={endByDate}
          endByOccurrences={endByOccurrences}

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


