import { useEffect } from 'react'
import moment from 'moment'
import NumberInput from './NumberInput'
import RangeSelect from './RangeSelect'

const DailyRecurrence = ({ register, errors, getValues, setDates, setValue, watch }) => {

  const watchStartDate = watch("startDate")
  const watchEndType = watch("endType")
  const watchInterval = watch("interval")
  const watchEndDate = watch("endDate")
  const watchEndAfter = watch("endAfter")

  useEffect(() => {
    getDates()
  }, [watchStartDate, watchEndType, watchInterval, watchEndDate, watchEndAfter])

  const getDates = (e) => {
    if (e) e.preventDefault()

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
    {/* <p>Repeat every <RangeSelect register={register} name='interval' min={1} max={14} /> days</p> */}
    <div style={{display: 'inline-flex', alignItems: 'center'}}>Repeat every <NumberInput name='interval' register={register} errors={errors} getValues={getValues} setValue={setValue}/> days</div>
  </div>
  )
}

export default DailyRecurrence