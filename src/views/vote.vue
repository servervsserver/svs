<template>
  <!-- Render if user has voted -->

  <div
    v-if="isOpen == false"
    class="vote_page"
  >
    <div class="login">
      <h1>
        <i class="fa fa-thin fa-lock" /><br>
        Sorry, voting is currently closed
      </h1>
    </div>
  </div>  

  <div
    v-else-if="typeof this.$svsAuth.user.id == 'undefined'"
    class="vote_page"
  >
    <div class="login">
      <h1>
        <i class="fa-brands fa-discord" /><br>
      </h1>
    </div>
  </div>


  <div
    v-else-if="hasvoted"
    class="vote_page"
  >
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

  <div
    v-else
    class="vote_page"
  >
    <h1> Loading... </h1>
  </div>
</template>

<script>
import {ref, get, child, set, push} from 'firebase/database'
import ChoosePool from '../components/ChoosePoolButton.vue'
import {rtdb} from "@/assets/db.js"



//Create Reference for Database
const dbRef = ref(rtdb);

const bcrypt = require('bcryptjs');


const saltRounds = 10;

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
          { name: 'EP 4', server: 'server 4' },
          {name: 'EP 5', server : 'server 5'}
        ],

        isOpen : true,

        //Pool users vote goes to -> Can be server or community -> If > 1 in array, prompt user to choose pool
        pool: ['dsg','dsgdsg'],

        //User's Vote
        ballot: [false,false,false,false,false,false],

        VoteValidationErrorMessage : false
      }
    )
  },
updated() {
  if (typeof this.$svsAuth.user.id != 'undefined') {
            //Get Value of "Voters" -> List of discord IDs who have voted
    get(child(dbRef, `realTimeVoting/voters`)).then((snapshot) => {
      console.log('here')
      if (snapshot.exists()) {
        var foreachresults = []
        Object.values(snapshot.val()).forEach((element) => {
          foreachresults.push(bcrypt.compareSync(this.$svsAuth.user.id, element))
        })
        this.$data.hasvoted = foreachresults.includes(true)
      }
      else {
        this.$data.hasvoted = false
      }
      }
      ).catch((error) => {
        console.error(error)
      })
  }
},
mounted () {
  if (this.$data.pool.length < 1) {this.$data.pool = ['community']}
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
  var alreadyselected = []
  withoutcheckbox.forEach((element) => {

    if (!(valid_options.includes(element))) {
      returnvariable = false

    }

  })

  if (returnvariable == false) {
    this.$data.VoteValidationErrorMessage = ('* Make sure all inputs are complete')
    return false
  }


  withoutcheckbox.forEach((element) => {

    if (alreadyselected.includes(element)) {
      returnvariable = false
    }

    alreadyselected.push(element)

  })

  if (returnvariable == false) {
    this.$data.VoteValidationErrorMessage = ('* You cannot vote for the same EP twice')
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

        push(child(dbRef, `realTimeVoting/voters/`),bcrypt.hashSync(this.$svsAuth.user.id
, saltRounds))
        this.$data.hasvoted = true

       let ballot_location = `realTimeVoting/pools/` + this.$data.pool[0] + '/' + this.$svsAuth.user.id


       set(child(dbRef, ballot_location), JSON.parse(JSON.stringify(voteData.slice(1,(voteData.length)))))

      }

      },
    poolpop : function(e) {

      this.$data.pool = [this.$data.pool[e]]

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
    margin-top: 30px;
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
