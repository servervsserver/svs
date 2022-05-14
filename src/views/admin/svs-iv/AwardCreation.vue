<template>
  <section class="container">
    <h1>Awards creation</h1>
    <p>
      List of the awards of SvS IV
    </p>
    <form @submit.prevent="submit()">
      <blockquote>
        <div>id: <em>{{award.id}}</em></div>
        <div>collection: <em>{{award.album_collection_id}}</em></div>
      </blockquote>
      <text-input 
        v-model="award.label"
        :label="'Label'"
        :placeholder="'Chose a name for the Award'"
      />
      <textarea-input 
        v-model="award.description"
        :label="'Description'"
        :placeholder="'Describe the award'"
      />
      <select-input
        v-model="award.target"
        :icon="targetIcon"
        :options="targets"
        :label="'Select the target'" 
      />
      <button type="submit" :disabled="!canSubmit" class="button">Create</button>
    </form>
    <blockquote v-if="isSubmitted">
      Submitted!
    </blockquote>
    <div>
    </div>
  </section>
</template>

<script>

import * as Forms from "../../../modules/forms"

import * as Firestore from "../../../plugins/backend/firestore"

const SubmitState = Object.freeze({
  NOT_SUBMITTED: 0,
  SUBMITTING: 1,
  SUBMITTED: 2
})

export default {
  components: {
    'text-input': Forms.TextInputComponent,
    'textarea-input': Forms.TextAreaInputComponent,
    'select-input': Forms.SelectInputComponent
  },
  data() {
    return {
      award: new Firestore.AwardVote(),
      targets: ['artwork', 'visualizer', 'album', 'track'],
      submitState: SubmitState.NOT_SUBMITTED
    }
  },
  mounted() {
    this.award.album_collection_id = 'svs-iv'
    this.award.opening_date = new Date(Date.UTC(2022, 4, 15))
    this.award.closing_date = new Date(Date.UTC(2022, 4, 15 + 5))
    this.award.type = 'ordered_selection'
    this.award.options_count = 5
  },
  computed: {
    targetIcon() {
      switch(this.award.target) {
        case 'artwork':
          return "fa-solid fa-image"
        case 'visualizer':
          return "fa-solid fa-video"
        case 'album':
          return "fa-solid fa-compact-disc"
        case 'track':
          return "fa-solid fa-play"
      }
      return ""
    },
    canSubmit() {
      if (this.submitState !== SubmitState.NOT_SUBMITTED) 
        return false

      return !!this.award.label 
        && !!this.award.description
        && !!this.award.album_collection_id
        && !!this.award.target
        && !!this.award.type
        && !!this.award.options_count
    },
    isSubmitted() {
      return this.submitState === SubmitState.SUBMITTED
    }
  },
  methods: {
    async submit() {
      console.log(this.award, this.canSubmit)
      if (!this.canSubmit) return
      // this.award.
      this.submitState = SubmitState.SUBMITTING
      await this.$svsBackend.createAwardVote(this.award)
      this.submitState = SubmitState.SUBMITTED

      return false
    }
  }
}
</script>