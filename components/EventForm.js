import CheckboxContainer from "./Checkbox"

const checkboxes = [
  {
      name: 'sunday',
      key: 'sunday',
      label: 'Sunday',
  },
  {
      name: 'monday',
      key: 'monday',
      label: 'Monday',
  },
  {
      name: 'tuesday',
      key: 'tuesday',
      label: 'Tuesday',
  },
  {
      name: 'wednesday',
      key: 'wednesday',
      label: 'Wednesday',
  },
  {
      name: 'thursday',
      key: 'thursday',
      label: 'Thursday',
  },
  {
      name: 'friday',
      key: 'friday',
      label: 'Friday',
  },
  {
      name: 'saturday',
      key: 'saturday',
      label: 'Saturday',
  },
]

const EventForm = ({ 
  name, 
  description, 
  date, 
  time,
  durationHr,
  durationMin,

  recurring,
  recurrenceType,
  setRecurrenceType,

  dailyRepeat,

  weeklyRepeat,
  weeklyDays,
  setWeeklyDays,

  monthlyRepeat,
  handleMonthlyRecurrence,
  monthlyByDate,
  monthlyByOccurencesOrdinal,
  monthlyByOccurencesDay,

  handleEndType,
  endByDate,
  endByOccurrences,

  maxParticipants,
  priorityCarmel,
  handleSubmit }) => {

    return (
        <div>
            <h2>Add an event</h2>
            <form onSubmit={handleSubmit} style={{width: '20em', display: 'flex', flexDirection: 'column'}}>
                Name of event <input {...name.inputProps} />
                Description <input {...description.inputProps}/>
                <p>When <input {...date.inputProps} /> <input {...time.inputProps} /></p>
                
                <p>Duration 
                <select name="hour" id="hour" {...durationHr.inputProps}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select> hr

                <select name="minutes" id="minutes" {...durationMin.inputProps}>
                  <option value="0">0</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select> min
                </p>
                <p>
                  <input
                    type="checkbox" 
                    name="recurring" 
                    id="recurring" 
                    onClick={recurring.toggle}
                  /> Recurring meeting
                  {recurring.value ?
                    <span style={{fontWeight:"bold"}}> This is a recurring meeting</span>
                  : null}
                </p>

                { recurring.value ? // BEGIN CONDITIONAL RENDER default: daily, every 1 day, for seven days
                  <>
                  <p>Recurrence 
                    <select name="recurrence" id="recurrence" onChange={(e) => setRecurrenceType(e.target.value)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </p> 
                  
                  { recurrenceType === 'daily' ? 
                    <p>(FOR DAILY RECURRENCE)Repeat every 
                        <select name="repeatDaily" id="repeatDaily" {...dailyRepeat.inputProps}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        </select> days
                    </p>                  
                  : null}

                  { recurrenceType === 'weekly' ? 
                    <>
                      <p>(FOR WEEKLY RECURRENCE)Repeat every 
                  <select name="repeatWeekly" id="repeatWeekly" {...weeklyRepeat.inputProps}>
                  <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select> weeks
                </p>                
                      <div>(FOR WEEKLY RECURRENCE) Occurs on
                        <CheckboxContainer 
                          checkboxes={checkboxes} 
                          checkedItems={weeklyDays} 
                          setCheckedItems={setWeeklyDays} 
                        />
                      </div>
                    </>
                  : null}

                  { recurrenceType === 'monthly' ?
                    <>
                      <div>(FOR MONTHLY RECURRENCE)Repeat every 
                        <select name="repeatMonthly" id="repeatMonthly" {...monthlyRepeat.inputProps}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select> months
                        </div>
                      <div>(FOR MONTHLY RECURRENCE) Occurs on
                        <div>
                            <input type="radio" name="monthlyOccur" id="date"  onClick={() => handleMonthlyRecurrence('date')} />
                            <label htmlFor="date">Day
                                <select name="occurOnDate" id="occurOnDate" {...monthlyByOccurencesOrdinal.inputProps}>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select> of the month
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="monthlyOccur" id="day" onClick={() => handleMonthlyRecurrence('day')} />
                            <label htmlFor="day">
                            <select name="occurOnDayFrequency" id="occurOnDayFrequency" {...monthlyByOccurencesOrdinal.inputProps}>
                                <option value="1">First</option> 
                                <option value="2">Second</option>
                                <option value="3">Third</option> 
                                <option value="4">Fourth</option>
                                <option value="last">Last</option> 
                            </select> 
                            <select name="occurOnDay" id="occurOnDay" {...monthlyByOccurencesDay.inputProps}>
                                <option value="sunday">Sunday</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                            </select> of the month
                            </label>
                        </div> 
                        </div>
                    </>
                  : null}

                <div>End date
                  <div>
                    <input type="radio" name="endDate" id="untilEndDate" onClick={() => handleEndType('untilEndDate')}/>
                    <label htmlFor="untilEndDate">By <input {...endByDate.inputProps}/></label>
                  </div>
                  <div>
                    <input type="radio" name="endDate" id="byOccurrences" onClick={() => handleEndType('byOccurrences')}/>
                    <label htmlFor="byOccurrences">After 
                        <select name="byOccurrences" id="byOccurrences" {...endByOccurrences.inputProps}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                        </select> Occurrences</label>
                  </div> 
                </div>

                </>
                : null // END CONDITIONAL RENDER
                }


                <p>
                Max participants: <input {...maxParticipants.inputProps}/>
                </p>
                <p>
                <input 
                  type="checkbox" 
                  name="residentPriority" 
                  id="residentPriority"
                  onClick={priorityCarmel.toggle}
                /> Prioritize Carmel residents
                </p>
                <p>...Other required fields for registration -- library card, email, address? etc</p>
                <button>submit</button>
            </form>
        </div>
    )
}

export default EventForm

// Add Event form
// // Options inside of radio buttons (done)
// // Break into components?
// // Show appropriate recurrence options (done)
// // Console log submit
// // Generate dates array from recurrence options
// // Connect to database