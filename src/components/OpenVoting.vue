<template>
  <div class="openvoting gradient-bg">
    <h1> Enable Voting </h1>
    <form>
      <div class="field">
        <label class="label">From:</label>
        <div class="control">
          <input
            v-model="startDate"
            class="input"
            type="date"
            placeholder="Text input"
            @change="validate"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">At:</label>
        <div class="control">
          <input
            v-model="startTime"
            class="input"
            type="time"
            placeholder="Text input"
            @change="validate"
          >
        </div>
      </div>
      <div class="field">
        <label class="label">Until:</label>
        <div class="control">
          <input
            v-model="endDate"
            class="input"
            type="date"
            placeholder="Text input"
            @change="validate"
          >
        </div>
      </div>
      <div class="field">
        <div class="field">
          <label class="label">At:</label>
          <div class="control">
            <input
              v-model="endTime"
              class="input"
              type="time"
              placeholder="Text input"
              @change="validate"
            >
          </div>
        </div>
      </div>
      <input
        class="button is-ghost"
        style="background: none"
        type="reset"
        value="Clear Input"
        @click="clearinput"
      >
    </form>
    <div
      class="is-divider"
      data-content="OR"
    />
    <div class="field">
      <div class="control">
        <div class="field">
          <input
            id="manualSwitch"
            v-model="manual"
            type="checkbox"
            name="manualSwitch"
            class="switch  is-rounded is-info"
            @change="validate"
          >
          <label for="manualSwitch">Enable voting from now until manually closed</label>
          <p class="help is-danger">
            {{ err }}
          </p>
        </div>
        <div
          class="button is-info"
          @click="openvoting"
        >
          Submit
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, child, set} from 'firebase/database'

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

export default({
    data () {
        return {
        startDate : '',
        startTime : '',
        endDate : '',
        endTime : '',
        manual : false,
        err: '',
    }},
    methods : {
        validate : function () {

            //This code is written like dogshit ik but i started doing it this way and i was in too deep

            if ((this.$data.startDate.length != 0 && this.$data.startTime.length != 0 && this.$data.endDate.length != 0 && this.$data.endTime.length != 0)) {
                if ((new Date((this.$data.startDate + ':' + this.$data.startTime).replace('-',':').replace('-',':'))).getTime() > (new Date((this.$data.endDate + ':' + this.$data.endTime).replace('-',':').replace('-',':'))).getTime()) {
                    this.$data.err = '* Error : Start time must be before end time'
                    return false
                }
                else {
                    return true
                }
            }
            
            else if ((this.$data.startDate.length != 0 || this.$data.startTime.length != 0 || this.$data.endDate.length != 0 || this.$data.endTime.length != 0)) {
                if (this.$data.manual == true) {
                    this.$data.err = '* Error : Incompatible inputs'
                    return false
                }

                else {
                this.$data.err = ''
                return true
            }
            }

            else {
                this.$data.err = ''
                return true}

        },
        
        openvoting : function () {
            if (this.validate() ) {
                if ((this.$data.startDate.length != 0 && this.$data.startTime.length != 0 && this.$data.endDate.length != 0 && this.$data.endTime.length != 0)) {
                        var dataobject = {
                        isOpen : true,
                        startTime : (new Date((this.$data.startDate + ':' + this.$data.startTime).replace('-',':').replace('-',':'))).getTime(),
                        endTime : (new Date((this.$data.endDate + ':' + this.$data.endTime).replace('-',':').replace('-',':'))).getTime()
                    }

                    set(child(dbRef, `realTimeVoting/isOpen`), JSON.parse(JSON.stringify(dataobject)))

                }
                else if (this.$data.manual == true) {
                        var dataobject = {
                        isOpen : true,
                        startTime : 'false',
                        endTime : 'false'
                    }

                        set(child(dbRef, `realTimeVoting/isOpen`), JSON.parse(JSON.stringify(dataobject)))
                }
                else {
                    this.$data.err = 'Please fill in all the inputs'
                }
            }
        },

        clearinput : function () {
            this.$data.startDate = ''
            this.$data.startTime = ''
            this.$data.endDate = ''
            this.$data.endTime = ''
            this.validate()
        }

    }
})
</script>


<style scoped lang='scss'>

.openvoting {
    padding: 20px;
    border-radius: 5px;
    box-shadow: 5px 0px 5px #00000040;
}

.label {
    color: inherit;
}


</style>