import styled from '@emotion/styled'

import DateInput from './DateInput'
import NumberInput from './NumberInput'
import SegmentedBtns from './SegmentedBtns'

const IntervalStyles = styled.div`
display: flex;
justify-content: center;
align-items: center;
`


const EndRadio = ({ register, errors, watch, getValues, setValue }) => {
  const selected = watch('endType')
  return (
  <SegmentedBtns>
  <label htmlFor="untilDate" className={selected==='untilDate' ? 'selected' : ''}>
    <input 
      type="radio" 
      ref={register} 
      name="endType" 
      id="untilDate" 
      value="untilDate" 
    />
    <IntervalStyles>
    <span style={{marginRight: '0.5rem'}}>End by</span>
    <DateInput 
      name="endDate" 
      label="End by" 
      register={register} 
      errors={errors} 
      required={false}
    />
    </IntervalStyles>
  </label>

  <label 
    htmlFor="afterOccurrences" 
    className={selected==='afterOccurrences' ? 'selected' : ''}
  >
    <input 
      type="radio" 
      ref={register} 
      name="endType" 
      id="afterOccurrences" 
      value="afterOccurrences" 
    />
    <IntervalStyles>End after
      <NumberInput 
        name='endAfter' 
        register={register} 
        errors={errors} 
        getValues={getValues} 
        setValue={setValue} 
      /> events
    </IntervalStyles>
  </label>    

  </SegmentedBtns> 
  )
}

export default EndRadio