<template>
    <div class='vote_page'>
        <h1>

            Please rank your five favourite EPs from Highest to Lowest

        </h1>

<form>
        <div class="field">
        <div class="label">1 (Favourite)</div>
        <div class="select is-rounded">
        <select v-model='ballot[0]'>
             <option>Please select an EP</option>
             <option v-for='x in EPs' :key='x.name'> {{x.server}} - {{x.name}} </option>
        </select>
        </div>
        </div>

        <div class="field">
        <div class="label">2</div>
        <div class="select is-rounded">
        <select v-model='ballot[1]'>
             <option>Please select an EP</option>
             <option v-for='x in EPs' :key='x.name'> {{x.server}} - {{x.name}} </option>
        </select>
        </div>
        </div>

        <div class="field">
        <div class="label">3</div>
        <div class="select is-rounded">
        <select v-model='ballot[2]'>
             <option>Please select an EP</option>
             <option v-for='x in EPs' :key='x.name'> {{x.server}} - {{x.name}} </option>
        </select>
        </div>
        </div>

        <div class="field">
        <div class="label">4</div>
        <div class="select is-rounded">
        <select v-model='ballot[3]'>
             <option>Please select an EP</option>
             <option v-for='x in EPs' :key='x.name'> {{x.server}} - {{x.name}} </option>
        </select>
        </div>
        </div>

        <div class="field">
        <div class="label">5 (Least Favourite)</div>
        <div class="select is-rounded">
        <select v-model='ballot[4]'>
             <option>Please select an EP</option>
             <option v-for='x in EPs' :key='x.name'> {{x.server}} - {{x.name}} </option>
        </select>
        </div>
        </div>

        <div class="field submitbuttonvote">
        <label class="checkbox">
        <input type="checkbox" v-model='ballot[5]'>
        By voting, I agree to SVS's <a href="#">Terms of Voting</a> and <a href="https://cc.servervsserver.com/">Community Conduct</a>
        </label>
        </div>

        <div class="field">
        <div class="control">
        <input type="submit" class="button" value='Submit'/>
        </div>
        </div>
</form>

<div>{{ballot}}</div>

    </div>
</template>

<script>

export default ({
  data () {
    return (
      {
        EPs: [
          { name: 'EP 1', server: 'server 1' },
          { name: 'EP 2', server: 'server 2' },
          { name: 'EP 3', server: 'server 3' },
          { name: 'EP 4', server: 'server 4' }
        ],

        ballot: []
      }
    )
  }
})
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

</style>
