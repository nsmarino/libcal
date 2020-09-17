import { useEffect } from 'react'

import styled from '@emotion/styled'

import DateInput from './DateInput'
import RangeSelect from './RangeSelect'

const StyledRadioDiv = styled.div`

/*
input[type="radio"] {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}*/
`

const EndRadio = ({ register, errors}) => {

  useEffect(() => {
    
  }, [])
  return (
  <StyledRadioDiv>
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

  </StyledRadioDiv> 
  )
}

export default EndRadio