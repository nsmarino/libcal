const myDailyEventByOccurrences = {
    start: '2020-07-01',
    recurrence: 'daily',
    endType: 'byOccurrences',
    occurrences: 8,
    interval:1,
  }
const dailyEventByOccurrences = () => {
    return {
        start,
        recurrence,
        endType,
        occurrences,
        interval
    }
}


const myDailyEventUntilEndDate = {
    start: '2020-07-01',
    recurrence: 'daily',
    endType: 'untilEndDate',
    endDate: '2020-07-15',
    interval:2,
}
const dailyEventUntilEndDate = () => {
    return {
        start,
        recurrence,
        endType,
        endDate,
        interval
    }
}








  const weeklyEventByOccurrences = {
    start: '2020-07-01',
    recurrence: 'weekly',
    endType: 'byOccurrences',
    occurrences: 9,
    onTheseDays: [1,3,5],
    interval:2,
  }
  const weeklyEventUntilEndDate = {
    start: '2020-07-01',
    recurrence: 'weekly',
    endType: 'untilEndDate',
    endDate: '2020-08-15',
    onTheseDays: [1,3,5],
    interval:1,
  }
  const monthlyEventByOccurrencesDatePattern = {
    start: '2020-07-01',
    recurrence: 'monthly',
    endType: 'byOccurrences',
    occurrences: 8,
    patternType: 'date',
    patternDate: 15,
    interval: 1,
  }
  const monthlyEventByOccurrencesDayPattern = {
    start: '2020-07-01',
    recurrence: 'monthly',
    endType: 'byOccurrences',
    occurrences: 8,
    patternType: 'day',
    patternDay: 'Sunday',
    patternWhich: 2,
    interval: 1,
  }
  const monthlyEventUntilEndDateDatePattern = {
    start: '2020-07-01',
    recurrence: 'monthly',
    endType: 'untilEndDate',
    endDate: '2020-11-01',
    patternType: 'date',
    patternDate: 15,
    interval: 1,
  }
  const monthlyEventUntilEndDateDayPattern = {
    start: '2020-07-01',
    recurrence: 'monthly',
    endType: 'untilEndDate',
    endDate: '2020-11-01',
    patternType: 'day',
    patternDay: 'Sunday',
    patternWhich: 2,
    interval: 1,
  }