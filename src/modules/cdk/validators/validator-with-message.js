import { Validators } from "./validators.js"

export class ValidatorWithMessageEvaluation {

  constructor(validatorsWithMessage, value) {
    this.validatorsWithMessage = validatorsWithMessage || []
    this.invalidMessages = []
    this.validations = []
    this.validated = false
    this.value = value
    this._evaluate()
  }

  _evaluate() {
    let validated = true
    let validations = []
    let invalidMessages = []

    for (let validator of this.validatorsWithMessage) {
      if (validator.evaluate(this.value)) {
        validations.push(true)
      } else {
        validations.push(false)
        validated = false
        invalidMessages.push(validator.invalidMessage)
      }
    }
    this.validations = validations
    this.invalidMessages = invalidMessages
    this.validated = validated
    return this.validated
  }

}

export class ValidatorWithMessage {

  constructor(validatorFnc, invalidMessage) {
    this.validatorFnc = validatorFnc || Validators.validated
    this.invalidMessage = invalidMessage || ""
  }

  evaluate(value) {
    return this.validatorFnc(value)
  }

  static evaluateAll(validatorWithMessages, value) {
    return new ValidatorWithMessageEvaluation(validatorWithMessages, value)
  }

  static required(invalidMessage) {
    return new RequiredValidatorWithMessage(invalidMessage)
  }

  static mustBeTrue(invalidMessage) {
    return new MustBeTrueValidatorWithMessage(invalidMessage)
  }

  static mustAgree(invalidMessage) {
    return new MustBeTrueValidatorWithMessage(invalidMessage)
  }

  static min(min, invalidMessage) {
    return new MinValidatorWithMessage(min, invalidMessage)
  }

  static max(max, invalidMessage) {
    return new MaxValidatorWithMessage(max, invalidMessage)
  }

  static minCharCount(min, invalidMessage) {
    return new MinCharCountValidatorWithMessage(min, invalidMessage)
  }

  static maxCharCount(max, invalidMessage) {
    return new MaxCharCountValidatorWithMessage(max, invalidMessage)
  }

  static url(invalidMessage) {
    return new UrlValidatorWithMessage(invalidMessage)
  }
}

export class RequiredValidatorWithMessage extends ValidatorWithMessage {

  constructor(invalidMessage) {
    super(
      Validators.required,
      invalidMessage || "The field is required."
    )
  }

}

export class MustBeTrueValidatorWithMessage extends ValidatorWithMessage {

  constructor(invalidMessage) {
    super(
      Validators.requiredTrue,
      invalidMessage || "The field must be true."
    )
  }

}

export class MustAgreeValidatorWithMessage extends ValidatorWithMessage {

  constructor(invalidMessage) {
    super(
      Validators.requiredTrue,
      invalidMessage || "You must agree."
    )
  }
}

export class MinValidatorWithMessage extends ValidatorWithMessage {

  constructor(min, invalidMessage) {
    super(
      Validators.min(min),
      invalidMessage || `The minimum is ${min}.`
    )
  }

}

export class MaxValidatorWithMessage extends ValidatorWithMessage {

  constructor(max, invalidMessage) {
    super(
      Validators.max(max),
      invalidMessage || `The maximum is ${max}.`
    )
  }

}

export class MinCharCountValidatorWithMessage extends ValidatorWithMessage {

  constructor(min, invalidMessage) {
    super(
      Validators.minCharCount(min),
      invalidMessage || `The minimum number of chars is ${min}.`
    )
  }

}

export class MaxCharCountValidatorWithMessage extends ValidatorWithMessage {

  constructor(max, invalidMessage) {
    super(
      Validators.maxCharCount(max),
      invalidMessage || `The maximum number of chars is ${max}.`
    )
  }

}

export class UrlValidatorWithMessage extends ValidatorWithMessage {

  constructor(invalidMessage) {
    super(
      Validators.url,
      invalidMessage || `The field is not a valid url`
    )
  }

}
