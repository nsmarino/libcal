import { useEffect } from 'react'
import { useForm } from "react-hook-form";

import TitleInput from './TitleInput'
import DescriptionTextArea from './DescriptionTextArea'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import CheckboxInput from './CheckboxInput'
import RecurrenceContainer from './RecurrenceContainer';
import NumberInput from './NumberInput';

const EventForm = ({event}) => {
    const { register, handleSubmit, watch, errors, getValues, setValue } = useForm()
    
    const watchRecurring = watch("recurring")

    useEffect(() => {
      if (event) {
        for (const property in event) {
          setValue(property, event[property])
        }
      }    
    }, [watchRecurring])


    const onSubmit = (data) => console.log(data)

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleInput register={register} errors={errors} />
        <DescriptionTextArea register={register} errors={errors} />
        <DateInput name="startDate" label="Date" register={register} errors={errors} required={true} />
        <TimeInput name="startTime" label="Start at" register={register} errors={errors} />
        <TimeInput name="endTime" label="End at" register={register} errors={errors} />
        <CheckboxInput name="recurring" label="Recurring event" register={register} errors={errors} />

      {watchRecurring && (
        <RecurrenceContainer register={register} errors={errors} watch={watch} getValues={getValues} />
      )}

        <NumberInput name="classSize" label="Max number of participants" register={register} errors={errors} />
        <CheckboxInput name="registrationRequired" label="Registration required" register={register} errors={errors} />
        <CheckboxInput name="carmelOnly" label="Give priority to Carmel residents" register={register} errors={errors} />

        <input type="submit" value="Create Event" />

      </form>
    )
}

export default EventForm