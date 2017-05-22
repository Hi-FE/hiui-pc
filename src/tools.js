export const getStyles = (obj) => {
  let result = {}
  for (let key in obj) {
    if (obj[key]) {
      result[key] = obj[key]
    }
  }
  return Object.keys(result).length > 0 ? result : null
}

export const isValid = (rule, val) => {
  return rule.some((str) => str === val)
}

export const on = (elem, type, fn) => {
  elem.addEventListener(type, fn, false)
}

export const off = (elem, type, fn) => {
  elem.removeEventListener(type, fn, false)
}