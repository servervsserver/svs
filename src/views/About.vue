<template>
  <div
    id="about"
    class="about container"
  >
    <h1>
      About Us
    </h1>
    <p>
      <brand-name-short />  is  a  Discord-based  music-making  event  that  began  Spring 2020 in response to the COVID-19 pandemic. Our objective  is  to  unite  the  rich  variety  of  online  music  communities  that  have  been  growing  on  Discord  through  the  simple shared goal of making music. By the end of the festival, each  server  that  participates  ends  with  purely  collaborative  work showcasing the skills and creativity of all the musicians who  contributed  their  time  and  effort.  Their  work  is  then  shared with all participants in a live Twitch festival at the end of  the  event,  which  also  acts  as  a  charity  fundraiser  event.
    </p>
    <h1>Who are the peps?</h1>
    <div class="columns is-multiline">
      <div
        v-for="member in staffMembers"
        :key="member.vueId"
        class="column is-6"
      >
        <staff-card :staff="member" />
      </div>
    </div>
  </div>
</template>

<script>
import StaffCardComponent from "@/components/StaffCard.vue"
import { StaffCard } from "@/models/staff-card"

export default {
  components: {
    'staff-card': StaffCardComponent
  },
  data () {
    return {
      staffMembers: [
        new StaffCard(
          "Benji",
          "he/they",
          "Event coordination",
          "Hi! I'm Benji and I'm a music composer. I've been helping out with SvS since SvS II, and I enjoy helping run a competition many people enjoy.",
          "Benji#7542",
          null,
          { twitter: 'cutealicem' }
        ),
        new StaffCard(
          "Jiway",
          "he/him",
          "Tech",
          "What's up slappers?",
          "Jiway#7289",
          "/staff/jiway/avatar.jpg",
          { instagram: 'jiway_jy' }
        ),
        new StaffCard()
      ]
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
