
/**
* Creates a mixin for a specific set of validators names.
* It will create a function named: "on<UpperCamelCasedName>ValidationChange" taking the result of a validation change event as parameter. It will also create some internal state.
* Example:
* - param -> "StrEaM liNk" will create "onStreamLinkValidationChange"
* @param validatorNames Array of validator names. Multi word names must be space or dash separated
*/
let forValidators = function(validatorNames) {

  let validations = {}
  let res = {
    data() {
      return {
        lastFormValidationState: false,
        validations: validations
      }
    },
    emits: [
      'validation-change' // Emitted when the validation changes state
    ],
    methods: {
      onValidationChange() {
        let valid = !!Object.values(this.validations)
          .reduce((agr, a) => agr && a, true)
        if (this.lastFormValidationState == valid) return

        this.lastFormValidationState = valid
        this.$emit("validation-change", valid)
      }
    },
  }

  if (!validatorNames) return res
  if (typeof validatorNames === "string")
    validatorNames = [validatorNames]

  for(let name of validatorNames) {
    if (typeof name !== "string") {
      console.warn("validatorNames must contain strings:", name)
      continue
    }

    let UpperCamelCaseName
      = name.split(/[ \t\r\n-]+/)
            .map(s => s.substring(0,1)
            .toUpperCase() + s.substring(1))
            .join("")
    let lowerCamelCaseName
      = UpperCamelCaseName.substring(0,1).toLowerCase()
        + UpperCamelCaseName.substring(1)

    if (validations.hasOwnProperty(lowerCamelCaseName)) {
      console.warn("This validator name is already listed:", lowerCamelCaseName)
      continue
    }

    validations[lowerCamelCaseName] = false
    res.methods[`on${UpperCamelCaseName}ValidationChange`]
      = function(evt) {
        validations[lowerCamelCaseName] = evt
        this.onValidationChange()
      }
  }
  res.data

  return res
}

export let FormValidationMixin = forValidators()
FormValidationMixin.forValidators = forValidators

// createFormValidationMixin
