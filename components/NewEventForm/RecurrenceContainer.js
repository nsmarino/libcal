import { useEffect } from 'react'
import DailyRecurrence from './DailyRecurrence'

const RecurrenceContainer = ({register, errors, watch, getValues}) => {
  

    const watchRecurrenceSelect = watch("recurrenceType", 'daily')
    return (
    <div>
      <label>Recurrence pattern:

      <select name="recurrenceType" ref={register({ required: true })}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      </label>

      {errors.recurrenceSelect && <p>This field is required</p>}

      {watchRecurrenceSelect==="daily" && (
        <DailyRecurrence 
          register={register} 
          errors={errors} 
          getValues={getValues}
        />
      )}
      {watchRecurrenceSelect==="weekly" && (
        <p>weekly</p>
      )}
      {watchRecurrenceSelect==="monthly" && (
        <p>monthly</p>
      )}
    </div>
    )
  }
  
  export default RecurrenceContainer