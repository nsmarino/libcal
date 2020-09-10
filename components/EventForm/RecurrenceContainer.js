import EndRadio from './EndRadio'
import DailyRecurrence from './DailyRecurrence'
import WeeklyRecurrence from './WeeklyRecurrence'
import MonthlyRecurrence from './MonthlyRecurrence'
import OptionSelect from './OptionSelect'

const RecurrenceContainer = ({register, errors, watch, getValues, setDates }) => {
    const watchRecurrenceSelect = watch("recurrenceType", 'daily')
    
    const recurrenceOptions = [
      {
        value: 'daily',
        displayText: 'Daily',
      },
      {
        value: 'weekly',
        displayText: 'Weekly',
      },
      {
        value: 'monthly',
        displayText: 'Monthly',
      },
    ]
    
    return (
    <div>
      <OptionSelect 
        label="Recurrence pattern" 
        name="recurrenceType"
        options={recurrenceOptions}
        register={register}
      />

      {watchRecurrenceSelect==="daily" && (
        <DailyRecurrence 
          register={register} 
          errors={errors} 
          getValues={getValues}
          setDates={setDates}
          watch={watch}
        />
      )}
      {watchRecurrenceSelect==="weekly" && (
        <WeeklyRecurrence 
          register={register} 
          errors={errors} 
          getValues={getValues}
          setDates={setDates}
          watch={watch}
        />
      )}
      {watchRecurrenceSelect==="monthly" && (
        <MonthlyRecurrence 
          register={register} 
          errors={errors} 
          getValues={getValues}
          setDates={setDates}
          watch={watch}
        />      
      )}

      <EndRadio register={register} errors={errors} />
    </div>
    )
  }
  
  export default RecurrenceContainer