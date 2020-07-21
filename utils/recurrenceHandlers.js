const moment = require('moment')

// Finding x weekday in a month:
const nthWeekdayInMonth = (n, weekday, moment) => { // EX: (1, 'Sunday', moment('2020-06-01')) => return date of first sunday in june 2020
  const allWeekdaysInMonth = [] // will be array of all instances of weekday in that month
  const day = moment.startOf('month').day(weekday)

  if (day.date() > 7) day.add(7,'d') // test to ensure you dont have a day from prev month
  const month = day.month()
  while (month === day.month()) {
    const weekdayInMonth = day.clone()
    allWeekdaysInMonth.push(weekdayInMonth)
    day.add(7,'d')
  }
  const index = n==='last' ? allWeekdaysInMonth.length-1 : n-1
  return allWeekdaysInMonth[index]
}

const dailyRecurrence = (event) => {
  const dates = []
  const startDate = moment(event.start)
  const spacer = startDate.clone()

  const addDateAndIncrementSpacer = () => {
    const date = spacer.clone()
    dates.push(date)
    spacer.add(event.interval,'day')
  }

  if (event.endType==='byOccurrences') {
    for (let i=0; i<event.occurrences; i++) {
      addDateAndIncrementSpacer()
    }  
  }
  if (event.endType==='untilEndDate') {
    const endDate = moment(event.endDate)
    while (!spacer.isAfter(endDate)) {
      addDateAndIncrementSpacer()
    } 
  }
  return dates
}

const weeklyRecurrence = (event) => {
  const dates = []
  const startDate = moment(event.start)
  const spacer = startDate.clone().day(0) 

  if (event.endType==='byOccurrences') {
    let i=0; 
    while (i < event.occurrences) {
      for (day of event.onTheseDays) {
        const date = spacer.clone().day(day)
        if ((date.isSame(startDate) || date.isAfter(startDate)) && i < event.occurrences) {
          dates.push(date)
          i++
        }
      }
      spacer.add(event.interval,'week')
    } 
  }

  if (event.endType==='untilEndDate') {
    const endDate = moment(event.endDate)
    while (!spacer.isAfter(endDate)) {
      for (day of event.onTheseDays) {
        const date = spacer.clone().day(day) // for example spacer.clone().day(0) returns the Sunday of that week
        if ((date.isSame(startDate) || date.isAfter(startDate)) && !date.isAfter(endDate)) {
          dates.push(date)
        }
      }
      spacer.add(event.interval,'week')
    }
  }
  return dates
}

const monthlyRecurrence = (event) => {
  const dates = []
  const startDate = moment(event.start)
  const spacer = startDate.clone().startOf('month') // KEEP AN EYE ON THIS

  const handleRecurrenceType = {
    date: {
      byOccurrences: () => {
          let i=0; 
          while (i < event.occurrences) {
            const date = spacer.clone().date(event.patternDate)
            if ((date.isSame(startDate) || date.isAfter(startDate)) && i < event.occurrences) {
              dates.push(date)
              i++
            }
            spacer.add(event.interval,'month')
          }  
        },
      untilEndDate: () => {
        const endDate = moment(event.endDate)
        while (!spacer.isAfter(endDate)) {
          const date = spacer.clone().date(event.patternDate)
          if ((date.isSame(startDate) || date.isAfter(startDate)) && !date.isAfter(endDate)) {
            dates.push(date)
          }
          spacer.add(event.interval,'month')
        }      
      },
    },
    day: {
      byOccurrences: () => {      
        let i=0; 
        while (i < event.occurrences) {
          const date = nthWeekdayInMonth(event.patternWhich, event.patternDay, spacer.clone()) 
          if ((date.isSame(startDate) || date.isAfter(startDate)) && i < event.occurrences) {
            dates.push(date)
            i++
          }
          spacer.add(event.interval,'month')
        }  
      },
      untilEndDate: () => {
        const endDate = moment(event.endDate)
        while (!spacer.isAfter(endDate)) {
          const date = nthWeekdayInMonth(event.patternWhich, event.patternDay, spacer.clone()) 
          if ((date.isSame(startDate) || date.isAfter(startDate)) && !date.isAfter(endDate)) {
            dates.push(date)
          }
          spacer.add(event.interval,'month')
        }  
      },
    },  
  }
  handleRecurrenceType[event.patternType][event.endType]()

  return dates
}

const recurrenceHandler = {
  daily: {
    byOccurrences,
    untilEndDate,
  },
  weekly: {
    byOccurrences,
    untilEndDate,
  },
  monthly: {
    date: {
      byOccurrences,
      untilEndDate,
      },
    day: {
      byOccurrences,
      untilEndDate,
      }  
  },
}

switch(recurrenceType) {
  case 'daily':
  case 'weekly':
      return recurrenceHandler[event.endType]()
  case 'monthly':
      return recurrenceHandler[event.patternType][event.endType]()
}

// console.log(dailyRecurrence(dailyEventByOccurrences))
// console.log(dailyRecurrence(dailyEventUntilEndDate))

// console.log(weeklyRecurrence(weeklyEventByOccurrences))
// console.log(weeklyRecurrence(weeklyEventUntilEndDate))

// console.log('date by occurrences',monthlyRecurrence(monthlyEventByOccurrencesDatePattern))
// console.log('day by occurrences',monthlyRecurrence(monthlyEventByOccurrencesDayPattern))
// console.log('date until end date',monthlyRecurrence(monthlyEventUntilEndDateDatePattern))
// console.log('day until end date',monthlyRecurrence(monthlyEventUntilEndDateDayPattern))