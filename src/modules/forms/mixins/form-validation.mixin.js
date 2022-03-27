import Vue from "vue"

function toUpperCamelCase(name) {
  return name.split(/[ \t\r\n-]+/)
    .map(s => s.substring(0,1)
    .toUpperCase() + s.substring(1))
    .join("")
}

function toLowerCamelCase(name) {
  let UpperCamelCaseName = toUpperCamelCase(name)
  return UpperCamelCaseName.substring(0,1).toLowerCase()
    + UpperCamelCaseName.substring(1)
}

function arrayCoercion(value) {
  if (value === null || value === undefined) return null
  if (value instanceof Array) return value
  return [value]
}

function allOf(arr) {
  if (!(arr instanceof Array)) arr = Object.values(arr)
  return !!arr.reduce((agr, a) => agr && a, true)
}

function reactiveMap(reactiveObject, fnc) {
  let arr = []
  for(let a in reactiveObject) {
    arr.push(fnc(JSON.parse(JSON.stringify(reactiveObject[a]))))
  }
  return arr
}

/**
* Creates a mixin for a specific set of validators names.
* It will create a function named: "on<UpperCamelCasedName>ValidationChange" taking the result of a validation change event as parameter. It will also create some internal state.
* Example:
* - param -> "StrEaM liNk" will create "onStreamLinkValidationChange"
* @param validatorNames Array of validator names. Multi word names must be space or dash separated
* @param dynamicValidatorNames Array of validator names that are created with a v-for
*/
let forValidators = function(validatorNames, dynamicValidatorNames) {

  let validations = {}
  let dynamicValidations = {}
  let generatedMethods = {}

  // No validators, early exit
  // if (!validatorNames && !dynamicValidatorNames) return res

  let isAlreadyIn = function(lowerCamelCaseName) {
    if (dynamicValidations.hasOwnProperty(lowerCamelCaseName)) {
      console.warn("This validator name is already listed:", lowerCamelCaseName)
      return true
    }

    if (validations.hasOwnProperty(lowerCamelCaseName)) {
      console.warn("This validator name is already listed:", lowerCamelCaseName)
      return true
    }

    return false
  }

  let isNotAString = function(name) {
    if (typeof name !== "string") {
      console.warn("dynamicValidatorNames must contain strings:", name)
      return true
    }

    return false
  }

  // Handle dynamic validators

  if (dynamicValidatorNames = arrayCoercion(dynamicValidatorNames)) {

    for(let name of dynamicValidatorNames) {
      
      if (isNotAString(name)) continue

      let UpperCamelCaseName = toUpperCamelCase(name)
      let lowerCamelCaseName = toLowerCamelCase(name)

      if (isAlreadyIn(lowerCamelCaseName)) continue

      dynamicValidations[lowerCamelCaseName] = {}
      generatedMethods[`on${UpperCamelCaseName}ValidationChange`]
        = function(evt, key) {
          console.log(lowerCamelCaseName, key, evt)
          Vue.set(this.dynamicValidations[lowerCamelCaseName], key, evt)
          this.onValidationChange()
        }
      generatedMethods[`on${UpperCamelCaseName}ValidationDeleted`]
        = function(evt, key) {
          Vue.delete(this.dynamicValidations[lowerCamelCaseName], key)
          this.onValidationChange()
        }
    }

  }

  // Handle validators

  if (validatorNames = arrayCoercion(validatorNames)) {

    for(let name of validatorNames) {

      if (isNotAString(name)) continue

      let UpperCamelCaseName = toUpperCamelCase(name)
      let lowerCamelCaseName = toLowerCamelCase(name)

      if (isAlreadyIn(lowerCamelCaseName)) continue

      validations[lowerCamelCaseName] = false
      generatedMethods[`on${UpperCamelCaseName}ValidationChange`]
        = function(evt) {
          validations[lowerCamelCaseName] = evt
          this.onValidationChange()
        }
    }
    
  }

  generatedMethods.onValidationChange = function() {

    let valid = allOf(this.validations)
      && allOf(reactiveMap(this.dynamicValidations, allOf))

    // let a = allOf(this.validations)
    // let b = reactiveMap(this.dynamicValidations, allOf)
    // console.log(a, b, allOf(b), a && allOf(b))

    if (this.lastFormValidationState === valid) return

    this.lastFormValidationState = valid
    this.$emit("validation-change", valid)

  }
  
  let res = {
    data() {
      return {
        lastFormValidationState: null,
        validations: validations,
        dynamicValidations: dynamicValidations
      }
    },
    emits: [
      'validation-change' // Emitted when the validation changes state
    ],
    created() {
      console.log(this)
    },
    computed: {
      /**
       * @returns True if all the inputs are validated.
       */
      isFormValidated() {
        if (this.lastFormValidationState === null) {
          console.warn("Hum, undefined state of validation? What's the hol'up?")
        }
        return !!this.lastFormValidationState
      }
    },
    methods: generatedMethods
  }
  
  return res
}

export let FormValidationMixin = forValidators()

/**
* Creates a mixin for a specific set of validators names.
* It will create a function named: "on<UpperCamelCasedName>ValidationChange" taking the result of a validation change event as parameter. It will also create some internal state.
* Example:
* - param -> "StrEaM liNk" will create "onStreamLinkValidationChange"
* @param validatorNames Array of validator names. Multi word names must be space or dash separated
*/
FormValidationMixin.forValidators = forValidators

// createFormValidationMixin


// import Vue from "vue"

// function toUpperCamelCase(name) {
//   return name.split(/[ \t\r\n-]+/)
//     .map(s => s.substring(0,1)
//     .toUpperCase() + s.substring(1))
//     .join("")
// }

// function toLowerCamelCase(name) {
//   let UpperCamelCaseName = toUpperCamelCase(name)
//   return UpperCamelCaseName.substring(0,1).toLowerCase()
//     + UpperCamelCaseName.substring(1)
// }

// function arrayCoercion(value) {
//   if (value === null || value === undefined) return null
//   if (value instanceof Array) return value
//   return [value]
// }

// function allOf(arr) {
//   if (!(arr instanceof Array)) arr = Object.values(arr)
//   return !!arr.reduce((agr, a) => agr && a, true)
// }

// function reactiveMap(reactiveObject, fnc) {
//   let arr = []
//   for(let a in reactiveObject) {
//     arr.push(fnc(JSON.parse(JSON.stringify(reactiveObject[a]))))
//   }
//   return arr
// }

// /**
// * Creates a mixin for a specific set of validators names.
// * It will create a function named: "on<UpperCamelCasedName>ValidationChange" taking the result of a validation change event as parameter. It will also create some internal state.
// * Example:
// * - param -> "StrEaM liNk" will create "onStreamLinkValidationChange"
// * @param validatorNames Array of validator names. Multi word names must be space or dash separated
// * @param dynamicValidatorNames Array of validator names that are created with a v-for
// */
// let forValidators = function(validatorNames, dynamicValidatorNames) {

//   let validations = {}
//   let dynamicValidations = {}

//   let res = {
//     data() {
//       return {
//         lastFormValidationState: null
//       }
//     },
//     emits: [
//       'validation-change' // Emitted when the validation changes state
//     ],
//     computed: {
//       /**
//        * @returns True if all the inputs are validated.
//        */
//       isFormValidated() {
//         if (this.lastFormValidationState === null) {
//           console.warn("Hum, undefined state of validation? What's the hol'up?")
//         }
//         return !!this.lastFormValidationState
//       }
//     },
//     methods: {
//       onValidationChange() {
//         console.log(validatorNames, dynamicValidatorNames)
//         console.warn(validations, dynamicValidations)
//         let valid = allOf(validations)
//           && allOf(Object.values(dynamicValidations).map(allOf))
//           // && allOf(reactiveMap(this.dynamicValidations, allOf))

//         // let a = allOf(validations)
//         // let b = reactiveMap(dynamicValidations, allOf)
//         // console.log(a, b, allOf(b), a && allOf(b))

//         // if (this.lastFormValidationState === valid) return

//         this.lastFormValidationState = valid
//         this.$emit("validation-change", valid)

//       }
//     },
//   }

//   // No validators, early exit
//   if (!validatorNames && !dynamicValidatorNames) return res

//   let isAlreadyIn = function(lowerCamelCaseName) {
//     if (dynamicValidations.hasOwnProperty(lowerCamelCaseName)) {
//       console.warn("This validator name is already listed:", lowerCamelCaseName)
//       return true
//     }

//     if (validations.hasOwnProperty(lowerCamelCaseName)) {
//       console.warn("This validator name is already listed:", lowerCamelCaseName)
//       return true
//     }

//     return false
//   }

//   let isNotAString = function(name) {
//     if (typeof name !== "string") {
//       console.warn("dynamicValidatorNames must contain strings:", name)
//       return true
//     }

//     return false
//   }

//   // Handle dynamic validators

//   if (dynamicValidatorNames = arrayCoercion(dynamicValidatorNames)) {

//     for(let name of dynamicValidatorNames) {
      
//       if (isNotAString(name)) continue

//       let UpperCamelCaseName = toUpperCamelCase(name)
//       let lowerCamelCaseName = toLowerCamelCase(name)

//       if (isAlreadyIn(lowerCamelCaseName)) continue

//       dynamicValidations[lowerCamelCaseName] = {}
//       res.methods[`on${UpperCamelCaseName}ValidationChange`]
//         = function(evt, key) {
//           // console.log(lowerCamelCaseName, key, evt)
//           dynamicValidations[lowerCamelCaseName][key] = evt
//           // Vue.set(this.dynamicValidations[lowerCamelCaseName], key, evt)
//           this.onValidationChange()
//         }
//       res.methods[`on${UpperCamelCaseName}ValidationDeleted`]
//         = function(_, key) {
//           delete dynamicValidations[lowerCamelCaseName][key]
//           // Vue.delete(this.dynamicValidations[lowerCamelCaseName], key)
//           this.onValidationChange()
//         }
//     }

//   }

//   // Handle validators

//   if (validatorNames = arrayCoercion(validatorNames)) {

//     for(let name of validatorNames) {

//       if (isNotAString(name)) continue

//       let UpperCamelCaseName = toUpperCamelCase(name)
//       let lowerCamelCaseName = toLowerCamelCase(name)

//       if (isAlreadyIn(lowerCamelCaseName)) continue

//       validations[lowerCamelCaseName] = false
//       res.methods[`on${UpperCamelCaseName}ValidationChange`]
//         = function(evt) {
//           validations[lowerCamelCaseName] = evt
//           this.onValidationChange()
//         }
//     }
    
//   }
  
//   return res
// }

// export let FormValidationMixin = forValidators()

// /**
// * Creates a mixin for a specific set of validators names.
// * It will create a function named: "on<UpperCamelCasedName>ValidationChange" taking the result of a validation change event as parameter. It will also create some internal state.
// * When working with dynamic forms, the v-form MUST have a key that is unique of the object. It can't be the index in the array
// * Example:
// * - param -> "StrEaM liNk" will create "onStreamLinkValidationChange"
// * @param validatorNames Array of validator names. Multi word names must be space or dash separated
// */
// FormValidationMixin.forValidators = forValidators

// // createFormValidationMixin
