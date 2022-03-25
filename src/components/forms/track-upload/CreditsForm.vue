<template>
    <div class="credit-line">
        <div
          class="columns"
        >
          <div 
            v-if="$slots.left"
            class="column is-narrow has-text-centered">
            <slot name="left" />
          </div>
          <!-- Artist name -->
          <div class="column is-3">
            <text-input
              v-model="credits.artistName"
              :label="'Artist name'"
              :placeholder="'The artist'"
              :icon="'fas fa-user'"
              :validators="nameValidators"
              @validation-change="onArtistNameValidationChange"
            />
          </div>
          <!-- Discord tag -->
          <div class="column is-3">
            <text-input
              v-model="credits.discordTag"
              :label="'Discord tag'"
              :placeholder="'TheArtist#1234'"
              :icon="'fab fa-discord'"
            />
          </div>
          <!-- Role(s) -->
          <div class="column is-3">
            <text-input
              v-model="credits.description"
              :label="'Role(s)'"
              :placeholder="'Mixing, mastering, bass'"
              :icon="'fas fa-user-tag'"
              :validators="roleValidators"
              @validation-change="onRoleValidationChange"
            />
          </div>
          <!-- Anonymous -->
          <div class="column is-wide">
            <label>
              Stay anonymous
              <tooltip
                :vertical="'top'"
                :horizontal="'left'"
                :mode="'hover'"
              >
                <span class="icon is-small is-left">
                  <i class="fas fa-info-circle" />
                </span>
                <template v-slot:message>
                  If this person doesn't want to appear in the credits, toggle this on.
                </template>
              </tooltip>
            </label>
            <switch-input
              v-model="credits.anonymous"
            />
          </div>
        </div>
    </div>
</template>

<script>

import {
  TextInputComponent,
  SwitchInputComponent
} from "@/modules/forms"

import {
  ValidatorWithMessage
} from "@/modules/cdk/validators"

import {
  FormValidationMixin
} from "@/modules/forms/mixins/form-validation.mixin"


import CreditEntry from "./credits.js"

console.log(FormValidationMixin.forValidators(['artist name', 'role']))

export default {
  components: {
    'text-input': TextInputComponent,
    'switch-input': SwitchInputComponent,
  },
  mixins: [
    FormValidationMixin.forValidators(['artist name', 'role'])
  ],
  props: {
    credits: {
      type: CreditEntry,
      required: true
    }
  },
  data() {
    return {
      nameValidators: [
        ValidatorWithMessage.required(),
        ValidatorWithMessage.maxCharCount(100)
      ],
      roleValidators: [
        ValidatorWithMessage.required()
      ]
    }
  },
  mounted() {
    this.onValidationChange()
  },
  methods: {

  }
}
</script>

<style scoped lang='scss'>
.credit-line {
  width: 100%;
}
</style>
