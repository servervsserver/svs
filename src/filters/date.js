
const MONTHS = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "Jully",
  "August",
  "September",
  "October",
  "November",
  "December"
])

const DAYS = Object.freeze([
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
])

/**
* {Date} date : date to format
* {string} format : format of the date
* {boolean} local : if true the date will be in local date, otherwise it's UTC
* {boolean} specialTimes : if true, enables hour:min to be replaced by midnight and midday
* Format replaced elements:
* yyyy: replaced by the year
* mm: replaced by the month number
* MONTH: replaced by the month full word
* dd: replaced by the day
* DAY: replaced by the full word
* hour: replaced by the hour (0-leftpadded)
* min: replaced by the minutes (0-leftpadded)
* sec: replaced by the seconds (0-leftpadded)
*/
export function date(date, format, local, specialTimes) {
  if (!date) return ""

  const UTC = local ? "" : "UTC"
  let result = format

  let h = date[`get${UTC}Hours`]()
  let m = date[`get${UTC}Minutes`]()
  let s = date[`get${UTC}Seconds`]()
  if (specialTimes) {
    if (h == 0 && m == 0 && s == 0) {
      result = result.replace(/hour:min:sec|hour:min|hour/g, "midnight")
    }
    if (h == 12 && m == 0 && s == 0) {
      result = result.replace(/hour:min:sec|hour:min|hour/g, "midnight")
    }
  }

  result = result.replace(/yyyy/g, date[`get${UTC}FullYear`]())
  result = result.replace(/mm/g, date[`get${UTC}Month`]() + 1)
  result = result.replace(/MONTH/g, MONTHS[date[`get${UTC}Month`]()])
  result = result.replace(/dd/g, date[`get${UTC}Date`]())
  result = result.replace(/DAY/g, DAYS[date[`get${UTC}Day`]()])
  result = result.replace(/hour/g, (""+h).padStart(2, '0'))
  result = result.replace(/min/g, (""+m).padStart(2, '0'))
  result = result.replace(/sec/g, (""+s).padStart(2, '0'))
  return result
}

export function duration(totalSeconds, showMilliseconds) {
  if (!totalSeconds || totalSeconds < 0) return "00:00"

  let ms = 0
  let s = 0
  let m = 0
  let h = 0

  if (showMilliseconds) {
    ms = Math.floor((totalSeconds % 1) * 1000)
  }
  totalSeconds = Math.floor(totalSeconds)
  s = totalSeconds % 60
  totalSeconds -= s
  totalSeconds /= 60
  m = totalSeconds % 60
  totalSeconds -= m
  totalSeconds /= 60
  h = totalSeconds

  let values = []
  if (h) values.push(h)
  values.push((m < 10 ? "0":"") + m)
  values.push((s < 10 ? "0":"") + s)
  if (showMilliseconds) values.push(` ${ms}ms`)
  return values.join(":")
}
