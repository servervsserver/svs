
const kio = 1024
const mio = 1024 * kio
const gio = 1024 * mio
const tio = 1024 * gio

export function fileSize(value, targetUnit, digits) {
  if (value === undefined || value === null) return ""

  if (digits === undefined || digits < 3) digits = 3
  if (targetUnit === undefined) targetUnit = "nearest"

  switch(targetUnit) {
    case "nearest":
      if (value > tio) {
        return Math.round(value / tio) + " To"
      } else if(value > gio) {
        return Math.round(value / gio) + " Go"
      } else if(value > mio) {
        return Math.round(value / mio) + " Mo"
      } else if(value > kio) {
        return Math.round(value / kio) + " Ko"
      } else {
        return value + " B"
      }
  }

  return value + " B"
}
