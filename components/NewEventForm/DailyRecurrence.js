import { useState } from 'react'
import moment from 'moment'

import RangeSelect from './RangeSelect'
import DateListItem from './DateListItem'

const DailyRecurrence = ({ register, errors={errors}, getValues, setDates }) => {

  const getDates = (e) => {
    e.preventDefault()

    switch(getValues('endType')) {
      case 'untilDate': {
        const event = {
          start: getValues('startDate'),
          endDate: getValues('endDate'),
          interval: parseInt(getValues('interval'),10),
        }
        const dates = []
        const startDate = moment(event.start)
        const spacer = startDate.clone()
        
        const endDate = moment(event.endDate)
        while (!spacer.isAfter(endDate)) {
          const date = spacer.clone()
          const dateObj = {
            dayOfWeek: date.day(),
            day: date.date(),
            month: date.month(),
            year: date.year(),
          }
          dates.push(dateObj)
          spacer.add(event.interval,'day')
        }
        setDates(dates)
        break;
      }

      case 'afterOccurrences': {
        const event = {
          start: getValues('startDate'),
          occurrences: parseInt(getValues('endAfter'),10),
          interval: parseInt(getValues('interval'),10),
        }
        const dates = []
        const startDate = moment(event.start)
        const spacer = startDate.clone()

        for (let i=0; i<event.occurrences; i++) {
          const date = spacer.clone()
          const dateObj = {
            dayOfWeek: date.day(),
            day: date.date(),
            month: date.month(),
            year: date.year(),
          }
          dates.push(dateObj)
          spacer.add(event.interval,'day')
        }
        setDates(dates)
        break;
      }
      default:
        setDates([])
    }
  }
  
  return (
  <div>
    <button onClick={getDates}>GET DAILY DATES</button>
    <p>Repeat every <RangeSelect register={register} name='interval' min={1} max={14} /> days</p>
  </div>
  )
}

export default DailyRecurrence