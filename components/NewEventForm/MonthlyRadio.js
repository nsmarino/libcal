import RangeSelect from './RangeSelect'
import OptionSelect from './OptionSelect'

const MonthlyRadio = ({ register, errors}) => {
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

  return (
  <div>
  <h3>Occurs on</h3>

  <div>
    <input type="radio" ref={register} name="monthlyType" value="numberedDay" />
    Day <RangeSelect register={register} name="numberedDay" min={1} max={28} /> of the month
  </div>

  <div>
    <label>
      <input type="radio" ref={register} name="monthlyType" value="namedDay" />
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
  </div>

  </div> 
  )
}

export default MonthlyRadio