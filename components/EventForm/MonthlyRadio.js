import RangeSelect from './RangeSelect'
import OptionSelect from './OptionSelect'
import SegmentedBtns from './SegmentedBtns'
import SegmentedButtons from './SegmentedBtns'

const MonthlyRadio = ({ register, watch, errors}) => {
  const ordinalOptions = [
    {
      value: '1',
      displayText: 'First',
    },
    {
      value: '2',
      displayText: 'Second',
    },
    {
      value: '3',
      displayText: 'Third',
    },
    {
      value: '4',
      displayText: 'Fourth',
    },    
    {
      value: 'last',
      displayText: 'Last',
    }, 
  ]
  const whichDayOfWeekOptions = [
    {
      value: 'sunday',
      displayText: 'Sunday',
    },
    {
      value: 'monday',
      displayText: 'Monday',
    },
    {
      value: 'tuesday',
      displayText: 'Tuesday',
    },
    {
        value: 'wednesday',
        displayText: 'Wednesday',
      },
      {
        value: 'thursday',
        displayText: 'Thursday',
      },
      {
        value: 'friday',
        displayText: 'Friday',
      },
      {
        value: 'saturday',
        displayText: 'Saturday',
      },
  ]
  const selected = watch('monthlyType')
  return (
    <SegmentedButtons>
    <label htmlFor="numberedDay" className={selected==='numberedDay' ? 'selected' : ''}>
    <input type="radio" ref={register} id="numberedDay" name="monthlyType" value="numberedDay" />
    <span>Day</span><RangeSelect register={register} name="numberedDay" min={1} max={28} /><span>of the month</span>
    </label>

    <label htmlFor="namedDay" className={selected==='namedDay' ? 'selected' : ''}>
      <input type="radio" ref={register} id="namedDay" name="monthlyType" value="namedDay" />
      <OptionSelect 
        label="" 
        name="ordinalOfMonth"
        options={ordinalOptions}
        register={register}
      />
      <OptionSelect 
        label="" 
        name="ordinalOfWeek"
        options={whichDayOfWeekOptions}
        register={register}
      /> of the month
    </label>    
  </SegmentedButtons>
  )
}

export default MonthlyRadio