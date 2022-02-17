<template>
  <div
    id="about"
    class="about container"
  >
    <h1>
      About Us
    </h1>
    <p>
      <brand-name-short />  is a Discord-based music-making competition that began in the spring of 2020 in response to the COVID-19 pandemic. Our objective  is  to  unite  the  rich  variety  of  online  music  communities  that  have  been  growing  on  Discord  through  the  simple shared goal of making music. By the end of the festival, each  server  that  participates has purely collaborative work showcasing the skills and creativity of all the musicians who  contributed  their  time  and  effort.  Their  work  is  then  played for all participants in a live Twitch festival at the end of  the  event. These streams, and more streams that take place within the competition, act as a charity fundraiser event as well.
    </p>
    <h1>Meet our team</h1>
    <div class="columns is-multiline is-6">
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
          "Ask the Storyteller",
          "he/him",
          "Head of Web Development and Event Coordination",
          "HI I'm Story. I founded SvS back in 2020. Since then I've seen it grow way past anything I could've imagined and I'm excited to help it grow.",
          "ask the storyteller#8411",
          "/staff/storyteller/avatar.jpg",
          { instagram: '__askthestoryteller'},
        ),
        new StaffCard(
          "Nyco",
          "she/her",
          "Head of Social Media Management, Branding and Design",
          "\"knee-co\", singer/songwriter, music producer and visual artist. I do a lot of the dirty work for our design team, if anything’s not centered right, it was probably me.",
          "nycomusic#7942",
          "/staff/nyco/avatar.jpg",
          { instagram: 'zhnyco'},
        ),
        new StaffCard(
          "trash.man",
          "he/him",
          "Head of Moderation",
          "Mod team lead. Music producer and sing-man. PhD in catching feelings. I made the highlight reels. My bad mixes are stylistic, I promise.",
          "trash.man#6716",
          "/staff/trashman/avatar.webp",
          { instagram: 'trash.m4n'},
        ),
        new StaffCard(
          "Blue",
          "he/him",
          "Head of Fundraising and Sponsorship, Stream Host, Development, Charity Outreach",
          "Vocalist, Songwriter, Producer, Engineer, and part-time Wallaby. I jumped in to the very first SvS and have helped organize as well as hosted our livestreams ever since. SvS is something special and we're going somewhere amazing.",
          "BlueAudioBen#0832",
          "/staff/blue/avatar.jpg",
          { twitter: 'blueben' }
        ),
        new StaffCard(
          "Benji",
          "he/they",
          "Web Design",
          "Hi! I'm Benji and I'm a music composer. I've been helping out with SvS since SvS II, and I enjoy helping run a competition many people enjoy.",
          "Benji#7528",
          "/staff/benji/avatar.png"
        ),
        new StaffCard(
          "DewKlaw",
          "she/her",
          "Branding and Design, Moderation",
          "Hey! I'm Dew, an audio engineer, artist, and photographer. I've been helping with SvS since the end of SvS II and I enjoy my craft. <3",
          "DewKlaw#1568",
          "/staff/dewklaw/avatar.png",
          { twitter: 'DewKlaw', twitch: 'DewKlaw' },
        ),
        new StaffCard(
          "Jiway",
          "he/him",
          "Web Development",
          "What's up slappers?",
          "Jiway#7289",
          "/staff/jiway/avatar.jpg",
          { instagram: 'jiway_jy' }
        ),
        new StaffCard(
          "Patrick Cline II",
          "he/him",
          "Fundraising and Sponsorship",
          "general svs helper. charity guy. tiny creative man. american living in germany. etc.",
          "patrhetoric#0653",
          "/staff/patrick/avatar.jpg",
          { instagram: 'patrhetoric' }
        ),
        new StaffCard(
          "Simiux",
          "he/him",
          "Stream Host, Branding and Design, Social Media Management",
          "Was poppin, I'm Simi, Artist, Producer, and multimedia creative. I basically make sure that we stay on track, and that you stay entertained.",
          "Simiux#8008",
          "/staff/simiux/avatar.jpg",
          { instagram: 'simiux'},
        ),
        new StaffCard(
          "Tim",
          "he/him",
          "Web Development",
          "Self appointed creative genius, king of profile pictures, and hater of repetition. and hater of repetition.",
          "timceharris#7942",
          "/staff/tim/avatar.png",
          { twitter: 'timceharris'},
        ),
      ]
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
