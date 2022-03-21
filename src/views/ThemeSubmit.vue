<template>
  <div class="container">
    <h1>SvS IV Theme Submission</h1>
    <section v-if="isWriting">
      <p>Submit your Theme Ideas for <brand-name-short /> IV!!</p>
      <p>
        A key part of the competition is the theme chosen at the start. This
        theme is what all the EPs, including their cover art, are based on. It's
        a seed of inspiration meant to unify all the submissions as
        interpretations of a common concept. This round, we'd like to use ideas
        directly from the communities participating. Bear in mind this is NOT a
        genre prompt. Generally speaking, a word or short phrase, leaning
        towards imagery, metaphor, and abstract concepts (for example, our
        previous themes were Struggle and Dreams, another example might be
        Nostalgia rather than Retro) is ideal- something that lends itself to a
        variety of interpretations.
      </p>

      <form @submit.prevent="onSubmit">
        <div class="field">
          <textarea
            v-model="message"
            class="textarea"
            placeholder="Type your suggestions here."
          />
        </div>
        <div class="field">
          <button
            class="button"
            type="submit"
          >
            Submit&nbsp;<i class="fas fa-paper-plane" />
          </button>
        </div>
      </form>
    </section>

    <section v-if="isSending">
      <p>You suggestions is being sent, don't close the page!</p>
    </section>

    <section v-if="isFailedToSend">
      <p>
        Something unexpected happened and your message hasn't been sent. We are
        sorry for the inconvenience.
      </p>
      <p class="help is-danger">
        <strong>Problem:</strong>
        <br>{{ errorMessage }}
      </p>

      <h4>Your original message</h4>
      <blockquote class="message-block">
        {{ message }}
      </blockquote>
    </section>

    <section v-if="isSent">
      <p>Thank you for your suggestion!</p>
    </section>
  </div>
</template>

<script>
const ConcernState = Object.freeze({
  WRITING: 0,
  SENDING: 1,
  SENT: 2,
  SENDING_FAILURE: 4,
});

export default {
  name: "ThemeSubmit",
  data: function () {
    return {
      msgId: undefined,
      message: undefined,
      answer: undefined,
      state: ConcernState.WRITING,
      errorMessage: undefined,
    };
  },
  computed: {
    isWriting() {
      return this.state == ConcernState.WRITING;
    },
    isSending() {
      return this.state == ConcernState.SENDING;
    },
    isSent() {
      return this.state == ConcernState.SENT;
    },
    isFailedToSend() {
      return this.state == ConcernState.SENDING_FAILURE;
    },
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.state = ConcernState.SENDING;
      this.$svsBackend
        .submitThemeSuggestion(this.message)
        .then((res) => {
          this.state = ConcernState.SENT;
          this.msgId = res.id;
        })
        .catch((err) => {
          this.state = ConcernState.SENDING_FAILURE;
          this.errorMessage =
            "Hugh... something went south. It may just be server shortage, try again later.";
        });
    },
  },
};
</script>

<style scoped lang='scss'>
iframe {
  width: 100%;
  min-height: 60vh;
}

.message-block {
  white-space: break-spaces;
}
</style>
