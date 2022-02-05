<template>
  <section class="container">
    <h1>Validator test</h1>

    <blockquote
      v-for="test in tests"
      :key="test.name"
      class="columns"
    >
      <div class="column is-three-quarters">
        {{ test.name }}
      </div>
      <div class="column">
        <span
          v-if="test.result"
          class="tag is-success"
        >Success</span>
        <span
          v-if="!test.result"
          class="tag is-danger"
        >Failed</span>
      </div>
    </blockquote>
  </section>
</template>

<script>

import { Validate, Validators } from '../../models/properties/validators'



export default {
  data: function () {
    return {
      tests: []
     }
  },
  mounted () {
    let tests = [
      {
        name: 'Solo validator validated',
        test () {
          return Validators.required(123)
        }
      },
      {
        name: 'required with number',
        test () {
          let validation = Validate([Validators.required])
          return validation(123) == true
        }
      },
      {
        name: 'required with string',
        test () {
          let validation = Validate([Validators.required])
          return validation("123") == true
        }
      },
      {
        name: 'required with null',
        test () {
          let validation = Validate([Validators.required])
          return validation(null) == true
        }
      },
      {
        name: 'required with undefined',
        test () {
          let validation = Validate([Validators.required])
          return validation(undefined) === false
        }
      },
      {
        name: 'min and max with 123 [0,1000]',
        test () {
          let validation = Validate([Validators.min(0), Validators.max(1000)])
          return validation(123) === true
        }
      },
      {
        name: 'min and max with 123 [0,10]',
        test () {
          let validation = Validate([Validators.min(0), Validators.max(10)])
          return validation(123) === false
        }
      },
      {
        name: 'requiredTrue true',
        test () {
          let validation = Validate([Validators.requiredTrue])
          return validation(true) === true
        }
      },
      {
        name: 'requiredTrue false',
        test () {
          let validation = Validate([Validators.requiredTrue])
          return validation(false) === false
        }
      },
      {
        name: 'One of 1, 2, null with 2',
        test () {
          let validation = Validate([Validators.oneOf([1,2, null])])
          return validation(2) === true
        }
      },
      {
        name: 'One of 1, null with 2',
        test () {
          let validation = Validate([Validators.oneOf([1, null])])
          return validation(2) === false
        }
      },
      {
        name: 'One of 1, null with null',
        test () {
          let validation = Validate([Validators.oneOf([1, null])])
          return validation(null) === true
        }
      }
    ]

    for (let test of tests) {
      test.result = test.test()
    }

    console.log( tests )

    this.tests = tests
  }
}
</script>
