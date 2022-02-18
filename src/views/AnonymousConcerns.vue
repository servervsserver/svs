<template>
  <div class="container">
    <h1>Anonymous Concerns</h1>
    <section v-if="isWriting">
      <p>
        <brand-name-short /> is, and has always been, a community focused and community led event.
        That is why it is vital that you, as a member of the <brand-name-short /> community,
        have a platform to voice any concerns you may have about the event,
        the way it is run, or anything else related to <brand-name-short />, so that we can continue to make
        <brand-name-short /> better for you and everyone involved.
      </p>

      <p>
        Due to the fact this form is anonymous, your message will be given a unique link.<br>
        We will respond to your message on this link but cannot notify you when.
        Do not lose the link before we can answer, or we will not have any means to get back to you.
      </p>

      <form @submit.prevent="onSubmit">
        <div class="field">
          <textarea
            v-model="message"
            class="textarea"
            placeholder="Type your message here."
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
      <p>
        You message is being sent, don't close the page before you copied your
        link!
      </p>
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

    <section v-if="isPendingAnswer">
      <p>Thank you for your message.</p>
      <p>
        When we have read your message we will update this page with our
        response. <br>
        Due to the anonymous nature of submissions, we are unable to
        notify you of any new responses. <br>
        Make sure to regularly check the url below:
      </p>
      <button
        v-clipboard="link"
        class="button is-medium"
      >
        {{ link }}
      </button>
    </section>

    <section v-if="isAnswered">
      <p>
        We got your message, sorry for the wait. You can check our answer below!
      </p>
      <h4>Your original message</h4>
      <blockquote class="message-block">
        {{ message }}
      </blockquote>
      <h4 class="has-text-right">
        Our answer
      </h4>
      <blockquote class="message-block">
        {{ answer }}
      </blockquote>
    </section>
    <!-- <iframe
    src="https://svs-website.vercel.app/concerns">
    </iframe> -->
  </div>
</template>

<script>

const ConcernState = Object.freeze({
  WRITING: 0,
  SENDING: 1,
  PENDING_ANSWER: 2,
  ANSWER: 3,
  SENDING_FAILURE: 4,
});

export default {
  name: "AnonymousConcerns",
  props: {
    id: { type: String, default: "123456789" },
  },
  data: function () {
    return {
      msgId : undefined,
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
    isAnswered() {
      return this.state == ConcernState.ANSWERED;
    },
    isPendingAnswer() {
      return this.state == ConcernState.PENDING_ANSWER;
    },
    isFailedToSend() {
      return this.state == ConcernState.SENDING_FAILURE;
    },
    link() {
      return `${window.location.origin}${this.$route.path}/${this.msgId}`;
    },
  },
  mounted() {

    if (this.$route.params.id) {
      this.$svsBackend.getAnonymousConcernsTicketById(this.$route.params.id)
        .then(res => {
          if (!res) {
            this.$router.push({ name: 'AnonymousConcerns', replace: true })
          } else {
            this.msgId = res.id
            this.message = res.message
            this.answer = res.answer
            this.date = res.date
            this.state = this.answer ? ConcernState.ANSWERED : ConcernState.PENDING_ANSWER
          }
        })
    }

  },
  methods: {
    onSubmit() {
      this.state = ConcernState.SENDING;
      this.$svsBackend.createAnonymousConcernsTicket(this.message)
        .then(res => {
          this.state = ConcernState.PENDING_ANSWER
          this.msgId = res.id
        })
        .catch(err => {
          this.state = ConcernState.SENDING_FAILURE;
          this.errorMessage = "Hugh... something went south. It may just be server shortage, try again later."
        })

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
