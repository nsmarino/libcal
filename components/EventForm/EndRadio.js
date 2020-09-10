import { useEffect } from 'react'

import DateInput from './DateInput'
import RangeSelect from './RangeSelect'

const EndRadio = ({ register, errors}) => {

  useEffect(() => {
    
  }, [])
  return (
  <div>
  <h3>End date</h3>

  <div>
    <input type="radio" ref={register} name="endType" value="untilDate" />
    <DateInput 
      name="endDate" 
      label="End by" 
      register={register} 
      errors={errors} 
      required={false}
    />
  </div>

  <div>
    <label>
      <input type="radio" ref={register} name="endType" value="afterOccurrences" />
      After <RangeSelect register={register} name="endAfter" min={1} max={30} /> occurrences
    </label>    
  </div>

  </div> 
  )
}

export default EndRadio