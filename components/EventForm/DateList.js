import DateListItem from './DateListItem'

const DateList = ({ dates }) => {

  const displayDates = () => {
    return dates.map(date => <DateListItem date={date} key={`${date.day}${date.month}${date.year}`}/>)
  }

  return (
  <ul>
    {displayDates()}
  </ul>
  )
}

export default DateList