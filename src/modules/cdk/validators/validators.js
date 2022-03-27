/**
* Collection of common validator functions
*/
export class Validators {

  /**
  * Always true (mainly for test)
  */
  static get validated () {
    return (_) => { return true }
  }

  /**
  * Check if a value is provided. 
  * Only undefined, null and empty strings are considered not provided
  */
  static get required () {
    return (value) => {
      return (value !== undefined) && (value !== null) && (value !== "")
    }
  }

  /**
  * Check if the value is true. No coerscion
  */
  static get requiredTrue () {
    return (value) => {
      return value === true
    }
  }

  /**
  * Checks if the value is greater or equal than min
  * {number} min : minimum value
  */
  static min (min) {
    return (value) => {
      return value >= min
    }
  }

  /**
  * Checks if the value is lower or equal than max
  * {number} max : maximum value
  */
  static max (max) {
    return (value) => {
      return value <= max
    }
  }

  /**
  * Checks if the number of elements in the array is above min
  * {number} min : minimum count
  */
  static minCount (min) {
    return (value) => {
      if (!value) return false
      if (!(value instanceof Array)) return false
      return value.length >= min
    }
  }

  /**
  * Checks if the char count is equal or greater than min
  * {number} min : minimum amount of chars
  */
  static minCharCount(min) {
    return (value) => {
      if (min == 0) return true
      if (typeof value !== "string") return false
      return value.length >= min
    }
  }

  /**
  * Checks if the char count is equal of lower than max
  * {number} max : maximum amount of chars
  */
  static maxCharCount(max) {
    return (value) => {
      if (max === 0) return false
      if (!value) return true
      if (typeof value !== "string") return false
      return value.length <= max
    }
  }

  /**
  * Checks if the value is a part of the values provided
  */
  static oneOf(array) {
    return (value) => {
      if (!array) return false
      return array.indexOf(value) != -1
    }
  }

  /**
  * Checks if the value matches the pattern
  * @param {RegExp} regexp - Expression to match
  * @param {boolean} loose - If false, matches the exact expression. If true validates if the regexp is found in the value
  */
  static pattern(regexp, loose) {

    if (!regexp) return (value) => { return true }
    if (loose) return (value) => {
      return regexp.test(value)
    }

    return (value) => {
      if (value === undefined || value === null) return false
      var match = value.match(regexp)
      return !!(match && value === match[0])
    }
  }

  static get url() {
    return Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
  }

  static get discordUserName() {
    return Validators.pattern(/^.{3,32}#[0-9]{4}$/)
  }

  static get discordInviteLink() {
    return Validators.pattern(/^(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|com)|discordapp\.com\/invite)\/.+[a-zA-Z0-9]$/)
  }
}


/**
* Generates a validator function that will validate all the validators given in parameter
*/
export function Validate(validators) {
  if (validators instanceof Array) {
    return function(value) {
      let validated = true
      for (let validator of validators) {
        let state = validator(value)
        validated = validated && !!state
      }
      return validated
    }
  } else {
    return validators
  }


}
