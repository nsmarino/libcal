import EndRadio from './EndRadio'
import DailyRecurrence from './DailyRecurrence'
import WeeklyRecurrence from './WeeklyRecurrence'
import MonthlyRecurrence from './MonthlyRecurrence'
import SegmentedButtons from './SegmentedButtons'

const RecurrenceContainer = ({register, errors, watch, getValues, setValue, setDates }) => {
    const watchRecurrenceSelect = watch("recurrenceType", 'daily')

    const recurrenceOptions = [
      {
        set: "recurrenceType",
        value: "daily",
        label: "Daily",
      },
      {
        set: "recurrenceType",
        value: "weekly",
        label: "Weekly",
      },
      {
        set: "recurrenceType",
        value: "monthly",
        label: "Monthly",
      },
    ]

    
    return (
    <div>


      <SegmentedButtons 
        options={recurrenceOptions}
        register={register}
        watch={watch}
      />

      {watchRecurrenceSelect==="daily" && (
        <DailyRecurrence 
          register={register} 
          errors={errors}
          setValue={setValue} 
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
          setValue={setValue}
          setDates={setDates}
          watch={watch}
        />
      )}
      {watchRecurrenceSelect==="monthly" && (
        <MonthlyRecurrence 
          register={register} 
          errors={errors} 
          getValues={getValues}
          setValue={setValue}
          setDates={setDates}
          watch={watch}
        />      
      )}

      <EndRadio register={register} errors={errors} />

    </div>
    )
  }
  
  export default RecurrenceContainer