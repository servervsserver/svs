<template>
  <div class="container">
    <h1>Anonymous concerns</h1>

    <section v-if="isWriting">
      <p>
        SVS is, and has always, a community focused and community led event. That's why it is vital that you, as a member of the SVS community, have a platform to voice any concerns you may have about the event, the way it's run, or anything else related to SVS, so that we can continue to make SVS better for you and everyone involved.
      </p>

      <p>
        Due to the fact this is anonymous, your message will be given a unique link on which you can see the answer.<br>
        We will respond to your message on this link but can't notify you when. So don't lose the link before we can answer, we won't have any mean to give it back to you.
      </p>

      <form @submit.prevent="onSubmit">
        <div class="field">
          <textarea
            class="textarea"
            placeholder="Type your message here."
            v-model="message">
          </textarea>
        </div>
        <div class="field">
          <button class="button svs-button-transparent" type="submit">
            Submit&nbsp;<i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </section>

    <section v-if="isSending">
      <p>
        You message is being sent, don't close the page before you copied your link!
      </p>
    </section>

    <section v-if="isFailedToSend">
      <p>
        Something unexpected happened and your message hasn't been sent. We are sorry for the inconvenience.
      </p>
      <p class="help is-danger">
        <strong>Problem:</strong>
        <br>{{errorMessage}}
      </p>

      <h4>Your original message</h4>
      <blockquote class="message-block">{{message}}</blockquote>
    </section>

    <section v-if="isPendingAnswer">
      <p>
        Thank you for your message.
      </p>
      <p>
        When we have read your message we will update this page with our response. Due to the anonymous nature of submissions, we are unable to notify you of any new responses. <br>
        Make sure to regularly check the url below:
      </p>
      <button class="button is-medium">{{link}}</button>
    </section>

    <section v-if="isAnswered">
      <p>
        We got your message, sorry for the wait. You can check our answer below!
      </p>
      <h4>Your original message</h4>
      <blockquote class="message-block">{{message}}</blockquote>
      <h4 class="has-text-right">Our answer</h4>
      <blockquote class="message-block">{{answer}}</blockquote>
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
  SENDING_FAILURE: 4
})
// enum ConcernState {
//
// }

export default {
  name: 'AnonymousConcerns',
  props: {
    id: { type: String, default: "123456789" }
  },
  data: function () {
    return {
      message: undefined,
      answer: undefined,
      state: ConcernState.WRITING,
      errorMessage: undefined
    }
  },
  computed: {
    isWriting () {
      return this.state == ConcernState.WRITING
    },
    isSending () {
      return this.state == ConcernState.SENDING
    },
    isAnswered () {
      return this.state == ConcernState.ANSWERED
    },
    isPendingAnswer () {
      return this.state == ConcernState.PENDING_ANSWER
    },
    isFailedToSend () {
      return this.state == ConcernState.SENDING_FAILURE
    },
    link () {
      return `Link to this page with the ticket of id ${this.id}`
    }
  },
  methods: {
    onSubmit () {
      console.log("Submitting", this.message)
      this.state = ConcernState.SENDING

      setTimeout(() => {
        this.state = ConcernState.SENDING_FAILURE
        this.errorMessage = "Well, I just don't want anyone to send messages."
      },2500)
      setTimeout(() => {
        this.state = ConcernState.PENDING_ANSWER
        setTimeout(() => {
          this.answer = "This is a really default answer because the system doesn't exist yet"
          this.state = ConcernState.ANSWERED
        }, 2500)
      }, 5000)

    }
  }
}
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
