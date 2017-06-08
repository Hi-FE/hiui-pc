const WEEK = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

const today = new Date()
const TODAY_TIME = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
const TOMONTH_TIME = new Date(today.getFullYear(), today.getMonth(), 1).getTime()

const fromToday = (date, mode) => {
  if (mode === 'date') {
    return +date < TODAY_TIME
  } else if (mode === 'month') {
    return +date < TOMONTH_TIME
  }
}

const fromTomorrow = (date, mode) => {
  if (mode === 'date') {
    return +date <= TODAY_TIME
  } else if (mode === 'month') {
    return +date < TOMONTH_TIME
  }
}

const untilToday = (date, mode) => {
  if (mode === 'date') {
    return +date >= TODAY_TIME
  } else if (mode === 'month') {
    return +date > TOMONTH_TIME
  }
}

const untilTomorrow = (date, mode) => {
  if (mode === 'date') {
    return +date > TODAY_TIME
  } else if (mode === 'month') {
    return +date > TOMONTH_TIME
  }
}

const getUnableWeek = () => {
  let obj = {}
  WEEK.map((name, i) => {
    obj[`unable${name}`] = (date, mode) => date.getDay() === i
  })
  return obj
}

export default {
  date: {
    fromToday,
    fromTomorrow,
    untilToday,
    untilTomorrow,
    ...getUnableWeek()
  },
  month: {
    fromToday,
    fromTomorrow,
    untilToday,
    untilTomorrow
  },
  year: {
  }
}