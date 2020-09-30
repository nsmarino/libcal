const getMonthObject = (month, year) => {
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
    const name = monthArr[month]
    const startsOn = new Date(year, month, 1).getDay()
    const length = new Date(year, month+1, 0).getDate()
    return {
      name,
      length,
      startsOn,
      number: month,
      year,
    }
  }
  
const getCurrentMonth = () => {
const todaysDate = new Date()
const currentMonth = todaysDate.getMonth()
const currentYear = todaysDate.getFullYear() 
const monthObject = getMonthObject(currentMonth, currentYear)
return monthObject  
}

export { getMonthObject }
export default getCurrentMonth