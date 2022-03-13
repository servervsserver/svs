
const kiB = 1024
const miB = 1024 * kiB
const giB = 1024 * miB
const tiB = 1024 * giB

export function fileSize(value, targetUnit, digits) {
  if (value === undefined || value === null) return ""

  if (digits === undefined || digits < 3) digits = 3
  if (targetUnit === undefined) targetUnit = "nearest"

  switch(targetUnit) {

    case "nearest":
    {
      let amount = 0
      let prefix = ""
      if (value > tiB) {
        amount = Math.round(value / tiB)
        prefix = "T"
      } else if(value > giB) {
        amount = Math.round(value / giB)
        prefix = "G"
      } else if(value > miB) {
        amount = Math.round(value / miB)
        prefix = "M"
      } else if(value > kiB) {
        amount = Math.round(value / kiB)
        prefix = "K"
      } else {
        amount = value
        prefix = ""
      }
      return `${amount} ${prefix}B`
    }
  }

  return value + " B"
}
