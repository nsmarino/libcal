const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ];
  const dayArr = [
    'Sunday',
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday', 
  ]

const DateListItem = ({date}) => {
    return (
      <li>{dayArr[date.dayOfWeek]}, {monthArr[date.month]} {date.day}, {date.year}</li>
    )
  }

export default DateListItem