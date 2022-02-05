<template>
  <div class="container">
    <h1>Anonymous concerns</h1>
    <section v-if="isWriting">
      <p>
        SVS is, and has always, a community focused and community led event.
        That's why it is vital that you, as a member of the SVS community, have
        a platform to voice any concerns you may have about the event, the way
        it's run, or anything else related to SVS, so that we can continue to
        make SVS better for you and everyone involved.
      </p>

      <p>
        Due to the fact this is anonymous, your message will be given a unique
        link on which you can see the answer.<br />
        We will respond to your message on this link but can't notify you when.
        So don't lose the link before we can answer, we won't have any mean to
        give it back to you.
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
          <button class="button svs-button-transparent" type="submit">
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
        <br />{{ errorMessage }}
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
        response. Due to the anonymous nature of submissions, we are unable to
        notify you of any new responses. <br />
        Make sure to regularly check the url below:
      </p>
      <button class="button is-medium">
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
      <h4 class="has-text-right">Our answer</h4>
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
import { db } from "@/assets/db.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

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
      msgID : undefined,
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
      return `Link to this page with the ticket of id ${this.msgID}`;
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.msgID = id;
    if (id) {
      const docRef = doc(db, "feedback", id);
      getDoc(docRef).then(docSnap => {
        if(docSnap.exists()){
        let data = docSnap.data();
        this.state = data.answer ? ConcernState.ANSWERED: ConcernState.PENDING_ANSWER;
        this.message = data.message;
        this.answer = data.answer ? data.answer : "Sorry, we haven't gotten to your feedback yet. Please continue to check back!";
}
      });
          
        }

  },
  methods: {
    onSubmit() {
      this.state = ConcernState.SENDING;
      let feedObj = {
        message: this.message,
        timestamp: new Date(),
        answer: "",
      };
      const ref = doc(collection(db, "feedback"));
      let uid = ref.id;
      setDoc(ref, feedObj)
        .then(function (data) {
          this.state = ConcernState.PENDING_ANSWER;
          const appRef = ref(rtdb, "applications/");
          push(appRef, uid);
        })
        .catch((e) => {
          this.state = ConcernState.SENDING_FAILURE;
          this.errorMessage =
            "Well, I just don't want anyone to send messages.";
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
