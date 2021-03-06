import {
  ValidatorWithMessage
} from "@/modules/cdk/validators"

/**
* Embarks the logic of an atomic input component validation.
*/
export let InputValidationMixin = {
  props: {
    /**
    * Array of validators with message that will be test against
    * the value of the input
    */
    validators: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    'validation-change' /// Emitted when the validation changes state
  ],
  data() {
    return {
      /**
      * @type {ValidatorWithMessageEvaluation} Results of the last evaluation if any
      */
      validatorEvaluation: null
    }
  },
  computed: {
    /**
     * 
     * @returns True if all the validators are true or if there is no validator at all. False otherwise.
     */
    isValidated() {
      if (!this.validatorEvaluation) {
        // this.updateValidation(null)
        return this.validators.length == 0
      }
      return this.validatorEvaluation.validated
    }
  },
  methods: {
    /**
    * Method to call when the input value changes
    * @param value Value of the input after the change
    */
    updateValidation(value) {
      let prevEval = this.validatorEvaluation
      let currentEval = ValidatorWithMessage.evaluateAll(this.validators, value)

      let hasChanged = prevEval === null || prevEval === undefined || (prevEval.validated != currentEval.validated)
      this.validatorEvaluation = currentEval
      
      if (hasChanged) {
        this.$emit('validation-change', currentEval.validated)
      }
    }
  }
}
