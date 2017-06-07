const today = new Date()
const WEEK = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const TODAY_TIME = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()

const fromToday = (date, mode) => +date < TODAY_TIME

const fromTomorrow = (date, mode) => +date <= TODAY_TIME

const untilToday = (date, mode) => +date >= TODAY_TIME

const untilTomorrow = (date, mode) => +date > TODAY_TIME

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
  },
  year: {
  }
}