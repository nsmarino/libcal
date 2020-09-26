import { useEffect } from 'react'

import moment from 'moment'

import NumberInput from './NumberInput'
import BlockCheckBox from './BlockCheckBox'

const WeeklyRecurrence = ({ register, errors={errors}, getValues, setValue, setDates, watch }) => {

  const watchStartDate = watch("startDate")
  const watchEndType = watch("endType")
  const watchWeeklyInterval = watch("weeklyInterval")
  const watchEndDate = watch("endDate")
  const watchEndAfter = watch("endAfter")
  const watchSunday = watch("sunday")
  const watchMonday = watch("monday")
  const watchTuesday = watch("tuesday")
  const watchWednesday = watch("wednesday")
  const watchThursday = watch("thursday")
  const watchFriday = watch("friday")
  const watchSaturday = watch("saturday")

  useEffect(() => {
    getDates()
  }, [
    watchStartDate,
    watchEndType, 
    watchWeeklyInterval, 
    watchEndDate, 
    watchEndAfter,
    watchSunday,
    watchMonday,
    watchTuesday,
    watchWednesday,
    watchThursday,
    watchFriday,
    watchSaturday,
  ])

  const getCheckedDaysAsArrayOfIntegers = () => {
    const onTheseDays = []

    const checkedDays = {
        sunday: getValues('sunday'),
        monday: getValues('monday'),
        tuesday: getValues('tuesday'),
        wednesday: getValues('wednesday'),
        thursday: getValues('thursday'),
        friday: getValues('friday'),
        saturday: getValues('saturday'),
    }

    const daysAsIntegers = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,  
    }

    for (const [key, value] of Object.entries(checkedDays)) {
      if (value) onTheseDays.push(daysAsIntegers[key])
    } 
    return onTheseDays          
  }
  
  const getDates = (e) => {
    if (e) e.preventDefault()

    switch(getValues('endType')) {
      case 'untilDate': {
        const event = {
            start: getValues('startDate'),
            endDate: getValues('endDate'),
            interval: parseInt(getValues('weeklyInterval'),10),   // 2
            onTheseDays: getCheckedDaysAsArrayOfIntegers() // [1,3,5],
          }
        if (event.onTheseDays.length===0) {
          setDates([])
          break;
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
                dayOfWeek: date.day(),
                day: date.date(),
                month: date.month(),
                year: date.year(),
              }
              dates.push(dateObj)
            }
          }
          spacer.add(event.interval,'week')
        }
        setDates(dates)
        break;
      }

      case 'afterOccurrences': {
        const event = {
          start: getValues('startDate'),
          occurrences: parseInt(getValues('endAfter'),10),
          interval: parseInt(getValues('weeklyInterval'),10),   // 2
          onTheseDays: getCheckedDaysAsArrayOfIntegers() // [1,3,5],
      }
      if (event.onTheseDays.length===0) {
        setDates([])
        break;
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
              dayOfWeek: date.day(),
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
      setDates(dates)  

      break;
       }
      default:
        setDates([])
    }
  }

  return (
  <div>    
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem'}}>Repeat every <NumberInput name='weeklyInterval' register={register} errors={errors} getValues={getValues} setValue={setValue}/> weeks</div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem'}}>

    <BlockCheckBox name="sunday" label="Su" register={register} checked={watchSunday} />
    <BlockCheckBox name="monday" label="M" register={register} checked={watchMonday} />
    <BlockCheckBox name="tuesday" label="Tu" register={register} checked={watchTuesday} />
    <BlockCheckBox name="wednesday" label="W" register={register} checked={watchWednesday} />
    <BlockCheckBox name="thursday" label="Th" register={register} checked={watchThursday} />
    <BlockCheckBox name="friday" label="F" register={register} checked={watchFriday} />
    <BlockCheckBox name="saturday" label="Sa" register={register} checked={watchSaturday} />
    </div>
    {/* <CheckboxInput name="sunday" label="Sunday" register={register} />
    <CheckboxInput name="monday" label="Monday" register={register} />
    <CheckboxInput name="tuesday" label="Tuesday" register={register} />
    <CheckboxInput name="wednesday" label="Wednesday" register={register} />
    <CheckboxInput name="thursday" label="Thursday" register={register} />
    <CheckboxInput name="friday" label="Friday" register={register} />
    <CheckboxInput name="saturday" label="Saturday" register={register} /> */}
  </div>
  )
}

export default WeeklyRecurrence