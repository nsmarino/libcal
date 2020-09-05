import { useState } from 'react'
import moment from 'moment'

import RangeSelect from './RangeSelect'
import EndRadio from './EndRadio'

const DailyRecurrence = ({ register, errors={errors}, getValues }) => {
  const [dates, setDates] = useState([])
  console.log(dates)

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

  const displayDates = () => {
    return dates.length
  }
  return (
  <div>
    <p>Repeat every <RangeSelect register={register} name='interval' min={1} max={14} /> days</p>
    
    <EndRadio register={register} errors={errors} />

    <button onClick={getDates}>get dates</button>
    <div>{displayDates()}</div> 
  </div>
  )
}

export default DailyRecurrence