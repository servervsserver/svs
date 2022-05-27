<template>
  <!-- <coming-soon :type="'page'"> -->
  <div class="container">
    <h1>Awards votes!</h1>
    <p>
      Now that we listened to all the EPs, it's time to vote for the
      awards!<br>
      You can take your time and listen again to the EPs here:
      <router-link :to="'/svs-iv/radio'">
        SvS IV EPs
      </router-link>
    </p>
    <h2>How does it work?</h2>
    <ul>
      <li><strong>Your voice count!</strong> Each individual can vote. The votes are then agregatted per server.</li>

      <li>
        <strong>Don't vote for yourself</strong>. You musn't vote for the server you are voting on behalf of.
      </li>
      <li>
        <strong>Pick your favs, don't rank your top! </strong> The votes entries aren't ordered. They all have the same weight.
      </li>
      <li>
        All picks are mandatory in each award (5 for tracks picks, 3 for albums, visualizers and artwork)
      </li>
      <li>
        Each community has equal weighting, so server size doesn't influence
        votes.
      </li>
      <li>
        When you vote you have to pick the server in which your vote will be
        counted.
      </li>
      <li>
        <strong>Spectactor not participant? Partake in the "Community vote"</strong> If you didn't participate in a server, you can still vote using the "Community Vote" option!  <em>-&nbsp;should be the last in the dropdown&nbsp;-</em>
      </li>
      <li>
        If your server is not in the list of your servers you can get the full list by toggling off the switch below the server choice.
      </li>
    </ul>
    <br>
      
    <blockquote v-if="!isAuthenticated">
      You must be authenticated to cast a vote!
    </blockquote>

    <form
      v-if="isAuthenticated"
      @submit.prevent="submit()"
    >
      <div class="columns is-mobile">
        <div class="column is-8">
          <select-input
            :value="selectedServerOption"
            :label="'Voting on behalf of'"
            :unselected-text="'- Pick your server -'"
            :options="serverOptions"
            @change="onServerChange($event)"
          />
          <br>
          <span>
            {{ filterUserServers ? "Shows only the servers you participated in" : "Show every servers" }}&nbsp;<!--
            --><toggle-input
              v-model="filterUserServers"
              />
          </span>
        </div>
        <div class="column is-4">
          <squared-image-box
            v-if="selectedServer"
            style="width: 100px"
          >
            <img :src="'https://' + selectedServer.icon_url">
          </squared-image-box>
        </div>
      </div>

      <section>
        <h2>Cast your vote</h2>
        <award-vote
          v-for="av of awardVotesList"
          :key="av.id"
          :award-vote="av"
          :collection="collection"
          :albums="albums"
          :servers="servers"
          :tracks="tracks"
          @awardVoteChange="onAwardVoteChange($event, av)"
        />
        <button
          type="submit"
          class="button"
        >
          Send your vote!
        </button>
      </section>
    </form>
    <modal
      ref="submitmodal"
      :open="true"
    >
      <template v-slot:header>
        <strong v-if="isIdle">Nothing...</strong>
        <strong
          v-if="isCheckingValidity"
        >Checking submission validity...</strong>
        <strong
          v-if="isReportingErrors"
        >You can't submit this Vote because</strong>
        <strong v-if="isSending">Vote submission in Progress...</strong>
        <strong
          v-if="isReportingSendingErrors"
        >Bad things happened during the submission...</strong>
        <strong v-if="isSent">Vote submitted!</strong>
      </template>
      <template v-slot:default>
        <spinner v-if="isCheckingValidity" />
        <spinner v-if="isSending" />
        <div v-if="isReportingErrors">
          <ul>
            <li
              v-for="(m, i) of modalSubmissionErrorMessages"
              :key="i"
            >
              {{ m }}
            </li>
          </ul>
        </div>
        <div v-if="isReportingSendingErrors">
          Try again to vote and contact an admin.
        </div>
        <div v-if="isSent">
          Thank you for your submission!
        </div>
      </template>
    </modal>
  </div>
  <!-- </coming-soon> -->
</template>

<script>
import * as Archive from "../../modules/catalog/models";
import * as Forms from "../../modules/forms";
import * as Firestore from "../../plugins/backend/firestore";
import VoteComponentVue from "./vote/VoteComponent.vue";
import ModalComponent from "@/components/Modal.vue";

const SUBMISSION_STATE = Object.freeze({
  IDLE: 0,
  VALIDITY_CHECK: 1,
  VALIDITY_ERRORS_REPORT: 2,
  SENDING: 3,
  SENDING_ERRORS: 4,
  SENT: 5,
});

export default {
  components: {
    // 'text-input': Forms.TextInputComponent,
    // 'textarea-input': Forms.TextAreaInputComponent,
    "toggle-input": Forms.SwitchInputComponent,
    "select-input": Forms.SelectInputComponent,
    modal: ModalComponent,
    "award-vote": VoteComponentVue,
  },
  data() {
    return {
      // /***
      //  * @type {string[]}
      //  */
      // serverOptions: [],
      selectedServerOption: null,
      /**
       * @type {a server type}
       */
      selectedServer: null,

      userServersIds: [],

      filterUserServers: true,

      /**
       * @type {Firestore.AwardVote[]}
       */
      awardVotesList: [],
      /**
       * @type {Archive.Server[]}
       */
      servers: [],
      /**
       * @type {Archive.Album[]}
       */
      albums: [],
      /**
       * @type {Map<string,Archive.Track>}
       */
      tracks: new Map(),
      /**
       * @type {Archive.AlbumCollection}
       */
      collection: null,
      /**
       * @type {Map<string, Array<Archive.Album> | Array<Archive.Album>}
       */
      votesSelections: new Map(),
      /**
       *
       */
      modalSubmissionErrorMessages: [],

      submissionState: SUBMISSION_STATE.IDLE,
    };
  },
  computed: {
    serverOptions() {
      // TODO: STORY FILTER THE OPTIONS
      let arr = this.servers.map(s => s) // Just create a new array
      if (this.filterUserServers && this.userServersIds) {
        arr = arr.filter(s => this.userServersIds.includes(s.id))
      } else {
      }
      arr = arr.map((s) => s.name);

      // arr.sort();
      return arr;
    },
    isAuthenticated() {
      return this.$svsAuth.isAuthenticated;
    },
    isIdle() {
      return this.submissionState == SUBMISSION_STATE.IDLE;
    },
    isCheckingValidity() {
      return this.submissionState == SUBMISSION_STATE.VALIDITY_CHECK;
    },
    isReportingErrors() {
      return this.submissionState == SUBMISSION_STATE.VALIDITY_ERRORS_REPORT;
    },
    isSending() {
      return this.submissionState == SUBMISSION_STATE.SENDING;
    },
    isReportingSendingErrors() {
      return this.submissionState == SUBMISSION_STATE.SENDING_ERRORS;
    },
    isSent() {
      return this.submissionState == SUBMISSION_STATE.SENT;
    },
    canShowSubmissionErrorModal() {
      return !!this.modalSubmissionErrorMessages.length;
    },
    /**
     * @returns {Archive.AsyncCatalog}
     */
    catalog() {
      return this.$svsCatalog.mainCatalog;
    },
  },
  async mounted() {
    // Workaround for catalog not being bridge yet
    setTimeout(async () => {
      let user_ser = await this.$svsBackend.getServersIdsOfDiscordtag(this.$svsAuth.user.discordTag)
      this.userServersIds = user_ser

      let collection = await this.catalog.asyncGetAlbumCollectionById("svs-iv");
      this.collection = collection;

      /**
       * @type {Firestore.AwardVote[]}
       */
      let avsMap = await this.$svsBackend.getAllAwardVotes();

      let avs = [];
      for (let avid in avsMap) {
        avs.push(avsMap[avid]);
      }
      this.awardVotesList = avs.filter(
        (av) => av.album_collection_id === "svs-iv"
      );

      this.albums = [];
      let albumsIds = collection.albumsIds.slice();
      for (let albumId of albumsIds) {
        let album = await this.catalog.asyncGetAlbumById(albumId);
        let serverId = album.author;
        let server = await this.catalog.asyncGetServerById(serverId);

        this.servers.push(server);
        this.albums.push(album);
      }

      this.servers.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name));

      let comServ = new Firestore.Server()
      comServ.id = "-1"
      comServ.name = "Community Vote"
      comServ.icon_url = "servervsserver.com/placeholders/server_placeholder_icon.png"
      comServ.admins = []
      comServ.description = "If you didn't participate in a server but still would like to vote!"
      this.servers.push(comServ)
      // for (let server of this.servers) {
      //   this.server;
      // }

      this.albums.sort((lhs, rhs) => lhs.title.localeCompare(rhs.title));

      for (let album of this.albums) {
        for (let trackId of album.trackIds) {
          let track = await this.catalog.asyncGetTrackById(trackId);
          this.tracks.set(track.id, track);
        }
      }
    }, 500);
  },
  methods: {
    onServerChange(event) {
      this.selectedServerOption = event;
      if (!event) {
        this.selectedServer = null;
      } else {
        this.selectedServer = this.servers.find(
          (s) => s.name === this.selectedServerOption
        );
        console.log(this.$svsCatalog.mainCatalog);
      }
    },
    /**
     * @param {Array<Archive.Album|Archive.Track>} selection
     * @param {Firestore.AwardVote} awardVote
     */
    onAwardVoteChange(selection, awardVote) {
      console.log(selection, awardVote);
      this.votesSelections.set(awardVote.id, selection);
    },
    computeSubmission() {
      this.submissionState = SUBMISSION_STATE.VALIDITY_CHECK;
      let additionalMessages = [];

      if (!this.selectedServer) {
        additionalMessages.push(
          "You must chose a server for which you are casting the vote"
        );
      }
      // For votes that aren't even started to be filled
      for (let av of this.awardVotesList) {
        let selection = this.votesSelections.get(av.id);
        if (!selection) {
          additionalMessages.push(`You didn't vote for '${av.label}'!`);
          continue;
        }
      }

      // For votes that are only partially filled
      for (let av of this.awardVotesList) {
        let selection = this.votesSelections.get(av.id);
        if (!selection) continue;

        let notFilledIndex = [];
        for (let idx = 0; idx < av.options_count; idx++) {
          let sel = selection[idx];
          if (!sel) {
            notFilledIndex.push(idx + 1);
          }
        }

        if (notFilledIndex.length) {
          let nfi = notFilledIndex.join(", ");
          additionalMessages.push(
            `You didn't provide values for the votes '${nfi}' of '${av.label}'`
          );
        }
      }

      // For votes that are dupped
      for (let av of this.awardVotesList) {
        let selection = this.votesSelections.get(av.id);
        if (!selection) continue;

        let opts = new Set();
        for (let idx = 0; idx < av.options_count; idx++) {
          let sel = selection[idx];
          if (!sel) continue;
          //  console.log(sel, this.selectedServer);
          if (opts.has(sel.id)) {
            additionalMessages.push(
              `You voted at least twice for '${sel.title}' in '${av.label}'`
            );
          } else {
            opts.add(sel.id);
          }
        }
      }

      this.modalSubmissionErrorMessages = additionalMessages;
      this.submissionState = SUBMISSION_STATE.VALIDITY_ERRORS_REPORT;

      return !this.modalSubmissionErrorMessages.length;
    },
    async submit() {
      this.$refs.submitmodal.open();
      if (!this.computeSubmission()) {
        console.warn("Form not validated, cannot submit");
        return;
      }

      this.submissionState = SUBMISSION_STATE.SENDING;

      try {
        this.submissionState = SUBMISSION_STATE.SENDING;

        let voter = new Firestore.DiscordVoter();
        voter.id = this.$svsAuth.user.id;
        voter.discord_tag = this.$svsAuth.user.discordTag;

        for (let av of this.awardVotesList) {
          let ave = new Firestore.AwardVoteEntry();
          ave.voter = Object.assign({}, voter); // Small hack until I do a real deep firestore trick
          ave.voted_on_behalf_of = this.selectedServer.id;
          ave.submission_date = new Date();
          ave.award_id = av.id;
          ave.vote_for = this.votesSelections.get(av.id).map((v) => v.id);
          await this.$svsBackend.createAwardVoteEntry(ave);
        }

        this.submissionState = SUBMISSION_STATE.SENT;
      } catch (error) {
        console.error(error);
        this.submissionState = SUBMISSION_STATE.SENDING_ERRORS;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.award-vote {
  padding: 10px;
  margin: 10px 0;
}
</style>