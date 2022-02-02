<template>
  <!-- Render if user has voted -->

  <div v-if="hasvoted">
    <h1> Thank you for voting ! </h1>
  </div>

  <div v-else-if="pool.length > 1 && hasvoted == false">
    <h1>
      We detected that you have participated in multiple servers
    </h1>
    <h2>
      To continue, select the Server you would like to vote on behalf of:
    </h2>
    <ChoosePool
      v-for="(y, index) in pool"
      :key="index"
      :msg="y"
      :array-index="index"
      @pool-button-click="poolpop"
    />
  </div>

  <!-- Render if user has not yet voted -->

  <div
    v-else-if="hasvoted == false"
    class="vote_page"
  >
    <h1>
      Please rank your five favourite EPs from Highest to Lowest
    </h1>

    <div>
      <div class="field">
        <div class="label">
          1 (Favourite)
        </div>
        <div class="select is-rounded">
          <select v-model="ballot[1]">
            <option>Please select an EP</option>
            <option
              v-for="x in EPs"
              :key="x.name"
            >
              {{ x.server }} - {{ x.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="label">
          2
        </div>
        <div class="select is-rounded">
          <select v-model="ballot[2]">
            <option>Please select an EP</option>
            <option
              v-for="x in EPs"
              :key="x.name"
            >
              {{ x.server }} - {{ x.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="label">
          3
        </div>
        <div class="select is-rounded">
          <select v-model="ballot[3]">
            <option>Please select an EP</option>
            <option
              v-for="x in EPs"
              :key="x.name"
            >
              {{ x.server }} - {{ x.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="label">
          4
        </div>
        <div class="select is-rounded">
          <select v-model="ballot[4]">
            <option>Please select an EP</option>
            <option
              v-for="x in EPs"
              :key="x.name"
            >
              {{ x.server }} - {{ x.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="label">
          5
        </div>
        <div class="select is-rounded">
          <select v-model="ballot[5]">
            <option>Please select an EP</option>
            <option
              v-for="x in EPs"
              :key="x.name"
            >
              {{ x.server }} - {{ x.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field submitbuttonvote">
        <label class="checkbox">
          <input
            v-model="ballot[0]"
            type="checkbox"
            value="false"
          >
          By voting, I agree to SVS's <a href="#">Terms of Voting</a> and <a href="https://cc.servervsserver.com/">Community Conduct</a>
        </label>
        <div
          v-if="VoteValidationErrorMessage"
          style="color: red"
        >
          {{ VoteValidationErrorMessage }}
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input
            type="submit"
            class="button"
            value="Submit"
            @click="submitvote"
          >
        </div>
      </div>
    </div>

  </div>

  <div v-else>
    <h1> Loading... </h1>
  </div>
</template>

<script>

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, child, set} from 'firebase/database'
import ChoosePool from '../components/ChoosePoolButton.vue'
const bcrypt = require('bcryptjs');


const saltRounds = 10;

//Config Firebase
const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//Get Database
const db = getDatabase(app)

//Create Reference for Database
const dbRef = ref(db);

export default ({
  components: {
    ChoosePool
  },
  data () {
    return (
      {
        hasvoted : null,

        //EPs available to vote for
        EPs: [
          { name: 'EP 1', server: 'server 1' },
          { name: 'EP 2', server: 'server 2' },
          { name: 'EP 3', server: 'server 3' },
          { name: 'EP 4', server: 'server 4' }
        ],

        //Discord ID of user
        discordID: 'abc246',

        //Pool users vote goes to -> Can be server or community -> If > 1 in array, prompt user to choose pool
        pool: ['server1','server2'],

        //User's Vote
        ballot: [false,false,false,false,false,false],

        VoteValidationErrorMessage : false
      }
    )
  },
  mounted () {
        //Get Value of "Voters" -> List of discord IDs who have voted
    get(child(dbRef, `realTimeVoting/voters`)).then((snapshot) => {
      if (snapshot.exists()) {
        var foreachresults = []
        snapshot.val().forEach((element) => {
          foreachresults.push(bcrypt.compareSync(this.$data.discordID, element))
        })
        this.$data.hasvoted = foreachresults.includes(true)
      }
      }).catch((error) => {
        console.error(error);
      });
  },
  methods: {
    validateVoteData : function (_data_, availableOptions) {
  //Check for no empty boxes & Checkbox ticked
  var valid_options = []
  availableOptions.forEach((element) => {

    valid_options.push(element.server + ' - ' + element.name)

  })
  var withoutcheckbox = _data_.slice(1,(_data_.length))
  var returnvariable = true
  withoutcheckbox.forEach((element) => {

    if (!(valid_options.includes(element))) {

      returnvariable = false

    }

  })

  if (returnvariable == false) {
    this.$data.VoteValidationErrorMessage = ('* Make sure all inputs are complete')
    return false
  }

  if (_data_[0] != true) {
    this.$data.VoteValidationErrorMessage =  ('* Please agree to the Terms of Voting and Code of Conduct')
    returnvariable = false
  }

  return returnvariable
  },
    submitvote: function () {



      let voteData = this.$data.ballot
      if (this.validateVoteData(voteData,this.$data.EPs) && this.$data.hasvoted == false) {

        get(child(dbRef, `realTimeVoting/voters`)).then((snapshot) => {
        var tempvoterobject = snapshot.val()

        set(child(dbRef, `realTimeVoting/voters/` + tempvoterobject.length ),bcrypt.hashSync(this.$data.discordID, saltRounds))
        this.$data.hasvoted = true


      }).catch((error) => {
        console.error(error);
      });}

      },
    poolpop : function(e) {

      this.$data.pool = [this.$data.pool[e]]
      console.log(this.$data.pool)

    }

    }
  }
)
</script>

<style scoped lang='scss'>

.field {
    width: 80%;
    margin-left: auto;
    margin-right: auto;

.select {
    width: 100%;
    select {
        width: 100%;
    }
}

}

label.checkbox {
    margin-top: 30px;
}

h1 {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    text-align: center;
    margin-bottom: 30px;
}

h2 {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 30px;
}

h1.RankNumber {
    text-align: left;
    margin-left: 20em;
}

div.label {
    color: inherit;
}

</style>
