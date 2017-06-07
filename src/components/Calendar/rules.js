const today = new Date()
const WEEK = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
const TODAY_TIME = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()

const fromToday = (date) => {
  if (+date >= TODAY_TIME) {
    return false
  }
  return true
}

const fromTomorrow = (date) => {
  if (+date > TODAY_TIME) {
    return false
  }
  return true
}

const untilToday = (date) => {
  if (+date < TODAY_TIME) {
    return false
  }
  return true
}

const untilTomorrow = (date) => {
  if (+date <= TODAY_TIME) {
    return false
  }
  return true
}

const getUnableWeek = () => {
  let obj = {}

  WEEK.map((name, i) => {
    obj[`unable${name}`] = (date) => {
      return date.getDay() === i
    }
  })

  return obj
}

export default {
  fromToday,
  fromTomorrow,
  untilToday,
  untilTomorrow,
  ...getUnableWeek()
}