
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
