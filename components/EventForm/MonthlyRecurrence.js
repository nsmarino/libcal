import { useEffect } from 'react'

import moment from 'moment'

import RangeSelect from './RangeSelect'
import MonthlyRadio from './MonthlyRadio'

const MonthlyRecurrence = ({ register, errors, getValues, setDates, watch }) => {

  const watchStartDate = watch("startDate")
  const watchEndType = watch("endType")
  const watchMonthlyInterval = watch("weeklyInterval")
  const watchMonthlyType = watch("monthlyType")
  const watchNumberedDay = watch("numberedDay")
  const watchOrdinalOfMonth = watch("ordinalOfMonth")
  const watchOrdinalOfWeek = watch("ordinalOfWeek")
  const watchEndDate = watch("endDate")
  const watchEndAfter = watch("endAfter")

  useEffect(() => {
    getDates()
  }, [
    watchStartDate,
    watchEndType, 
    watchMonthlyInterval,
    watchMonthlyType,
    watchNumberedDay,
    watchOrdinalOfMonth,
    watchOrdinalOfWeek, 
    watchEndDate, 
    watchEndAfter
  ])


  const getDates = () => {

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

    const handler = {
      numberedDay: {
        untilDate: () => {
          const event = {
            start: getValues('startDate'),
            endDate: getValues('endDate'),
            interval: parseInt(getValues('monthlyInterval'),10),   // 2
            patternDate: parseInt(getValues('numberedDay'),10)
          }
          const dates = []
          const startDate = moment(event.start)
          const spacer = startDate.clone().startOf('month')

          const endDate = moment(event.endDate)
          while (!spacer.isAfter(endDate)) {
            const date = spacer.clone().date(event.patternDate)
            if ((date.isSame(startDate) || date.isAfter(startDate)) && !date.isAfter(endDate)) {
              const dateObj = {
                dayOfWeek: date.day(),
                day: date.date(),
                month: date.month(),
                year: date.year(),
              }
              dates.push(dateObj)
            }
            spacer.add(event.interval,'month')
          }
          setDates(dates)      
        },
        afterOccurrences: () => {
          const event = {
            start: getValues('startDate'),
            occurrences: parseInt(getValues('endAfter'),10),
            interval: parseInt(getValues('monthlyInterval'),10),   // 2
            patternDate: parseInt(getValues('numberedDay'),10)
          }
          
          const dates = []
          const startDate = moment(event.start)
          const spacer = startDate.clone().startOf('month')

          let i=0; 
          while (i < event.occurrences) {
            const date = spacer.clone().date(event.patternDate)
            if ((date.isSame(startDate) || date.isAfter(startDate)) && i < event.occurrences) {
              const dateObj = {
                dayOfWeek: date.day(),
                day: date.date(),
                month: date.month(),
                year: date.year(),
              }
              dates.push(dateObj)
              i++
            }
            spacer.add(event.interval,'month')
          }
          setDates(dates)   
        },
      },
      namedDay: {
        untilDate: () => {
          const event = {
            start: getValues('startDate'),
            endDate: getValues('endDate'),
            interval: parseInt(getValues('monthlyInterval'),10),   // 2
            patternWhich: getValues('ordinalOfMonth'),
            patternDay: getValues('ordinalOfWeek'),
          }
          const dates = []
          const startDate = moment(event.start)
          const spacer = startDate.clone().startOf('month')

          const endDate = moment(event.endDate)
          while (!spacer.isAfter(endDate)) {
            const date = nthWeekdayInMonth(event.patternWhich, event.patternDay, spacer.clone()) 
            if ((date.isSame(startDate) || date.isAfter(startDate)) && !date.isAfter(endDate)) {
              const dateObj = {
                dayOfWeek: date.day(),
                day: date.date(),
                month: date.month(),
                year: date.year(),
              }
              dates.push(dateObj)
              }
              spacer.add(event.interval,'month')
            }
          setDates(dates)
        },
        afterOccurrences: () => {
          const event = {
            start: getValues('startDate'),
            occurrences: parseInt(getValues('endAfter'),10),
            interval: parseInt(getValues('monthlyInterval'),10),   // 2
            patternWhich: getValues('ordinalOfMonth'),
            patternDay: getValues('ordinalOfWeek'),
          }
          const dates = []
          const startDate = moment(event.start)
          const spacer = startDate.clone().startOf('month')

          let i=0; 
          while (i < event.occurrences) {
            const date = nthWeekdayInMonth(event.patternWhich, event.patternDay, spacer.clone()) 
            if ((date.isSame(startDate) || date.isAfter(startDate)) && i < event.occurrences) {
              const dateObj = {
                dayOfWeek: date.day(),
                day: date.date(),
                month: date.month(),
                year: date.year(),
              }
              dates.push(dateObj)
              i++
            }
            spacer.add(event.interval,'month')
          }
          setDates(dates)  
        },
      },
    }
    return handler[getValues('monthlyType')][getValues('endType')]()
  }

  return (
  <div>
    <p>Repeat every <RangeSelect register={register} name='monthlyInterval' min={1} max={3} /> months</p>
    <MonthlyRadio register={register} errors={errors} />
  </div>
  )
}

export default MonthlyRecurrence