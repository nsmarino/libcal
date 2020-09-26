import EndRadio from './EndRadio'
import DailyRecurrence from './DailyRecurrence'
import WeeklyRecurrence from './WeeklyRecurrence'
import MonthlyRecurrence from './MonthlyRecurrence'
import SegmentedBtns from './SegmentedBtns'
import SimpleSegmentBtn from './SimpleSegmentBtn'

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
      <SegmentedBtns>
        <SimpleSegmentBtn 
          register={register} 
          name='recurrenceType' 
          value='daily' 
          label='daily' 
          currentValue={watchRecurrenceSelect} 
        />
        <SimpleSegmentBtn 
          register={register} 
          name='recurrenceType' 
          value='weekly' 
          label='weekly' 
          currentValue={watchRecurrenceSelect} 
        />
        <SimpleSegmentBtn 
          register={register} 
          name='recurrenceType' 
          value='monthly' 
          label='monthly' 
          currentValue={watchRecurrenceSelect} 
        />
      </SegmentedBtns>

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

      <EndRadio register={register} errors={errors} watch={watch} getValues={getValues} setValue={setValue} />

    </div>
    )
  }
  
  export default RecurrenceContainer