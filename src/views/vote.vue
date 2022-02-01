<template>
  <!-- Render if user has not yet voted -->

  <div
    v-if="hasvoted == false"
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
          5 (Least Favourite)
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

    <div>{{ ballot }}</div>
  </div>

  <!-- Render if user has voted -->

  <div v-else-if="hasvoted">
    <h1> Thank you for voting ! </h1>
  </div>

  <div v-else>
    <h1> Loading... </h1>
  </div>
</template>

<script>

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, child, set} from 'firebase/database'
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


const validateVoteData = (_data_) => {
  //Check for no empty boxes & Checkbox ticked
  return (true)
}

export default ({
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
        pool: ['examplepool'],

        //User's Vote
        ballot: []
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
        console.log(foreachresults)
        this.$data.hasvoted = foreachresults.includes(true)
      } else {
        console.log("Voters not found");
      }
      }).catch((error) => {
        console.error(error);
      });
  },
  methods: {
    submitvote: function () {



      let voteData = this.$data.ballot
      if (validateVoteData(voteData)) {

        get(child(dbRef, `realTimeVoting/voters`)).then((snapshot) => {
        var tempvoterobject = snapshot.val()

        set(child(dbRef, `realTimeVoting/voters/` + tempvoterobject.length ),bcrypt.hashSync(this.$data.discordID, saltRounds))
        this.$data.hasvoted = true

        
      }).catch((error) => {
        console.error(error);
      });}

      }
      
    }
  }
)
</script>

<style lang='scss'>

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
    margin-top: 30px;
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
