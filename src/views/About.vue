<template>
  <div
    id="about"
    class="about container"
  >
    <h1>
      About Us
    </h1>
    <p>
      <brand-name-short /> is a Discord-based music-making competition that began in the spring of 2020 in response to the COVID-19 pandemic. Our objective  is  to  unite  the  rich  variety  of  online  music  communities  that  have  been  growing  on  Discord  through  the  simple shared goal of making music. By the end of the festival, each  server  that  participates has purely collaborative work showcasing the skills and creativity of all the musicians who  contributed  their  time  and  effort.  Their  work  is  then  played for all participants in a live Twitch festival at the end of  the  event.
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
          "Head of Event Coordination and Web Development",
          "HI I'm Story. I founded SvS back in 2020. Since then I've seen it grow way past anything I could've imagined and I'm excited to help it grow.",
          "ask the storyteller#8411",
          "/staff/storyteller/avatar.jpg",
          { instagram: '__askthestoryteller'},
        ),
        new StaffCard(
          "Ben",
          "he/him",
          "Head of Event Coordination and Fundraising and Sponsorship Coordination, Server Outreach, Stream Host",
          "Hi, I'm Ben, I’ve been helping here since SvS II. I love bringing the world of online music-making a little closer together to achieve social good (and have some fun along the way, of course).",
          "Bean#5677",
          "/staff/bean/avatar.png",
          { twitch: 'SirVCS3'},
        ),
        new StaffCard(
          "Simiux",
          "he/him",
          "Head of Event Coordination, Stream Host, Branding and Design, Social Media Management",
          "Was poppin, I'm Simi, Artist, Producer, and multimedia creative. I basically make sure that we stay on track, and that you stay entertained.",
          "Simiux#8008",
          "/staff/simiux/avatar.jpg",
          { instagram: 'simiux'},
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
          "Head of Moderation, Social Media Management",
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
          "Aeobe",
          "he/him",
          "Head of Server Outreach",
          "Ello, I'm Aeobe. I head the Participant Outreach here at SvS. I also do music stuff. AKA Yeffs.",
          "Yeffs#6969",
          "/staff/aeobe/avatar.jpg",
          { twitter: 'aobsinceme',
            instagram: 'aobsinceme'},
        ),
        new StaffCard(
          "Benji",
          "they/them",
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
          "Front web Lead dev",
          "What's up slappers? Me slappin' lines of code almost as much as I slap the bass. If the site bugs, I'm guilty, if it's sleek, thank the team!",
          "Jiway#7289",
          "/staff/jiway/avatar.jpg",
          { instagram: 'jiway_jy' }
        ),
        new StaffCard(
          "Patrick Cline II",
          "he/him",
          "Fundraising and Sponsorship",
          "General SvS helper. Charity guy. Tiny creative man. American living in germany. Etc.",
          "patrhetoric#0653",
          "/staff/patrick/avatar.jpg",
          { instagram: 'patrhetoric' }
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
        new StaffCard(
          "Tiwonku",
          "he/they",
          "Live Stream development",
          "I'm a new media designer and installation artist! New to the SvS team, excited to be here and help build the livestream rig. Every1 is kin.",
          "tiwonku#1576",
          "/staff/tiwonku/avatar.jpg",
          { instagram: 'tiwonku'},
        ),
        new StaffCard(
          "Taran",
          "he/him",
          "Server Outreach, Charity Outreach",
          "Hi I'm Taran, I'm a 23 yr old music producer from Minnesota focusing on alternative rap and boom bap. Super excited to be a part of the SvS team and looking forward to the competition this year!",
          "Taran#8662",
          "/staff/taran/avatar.jpg",
          { instagram: 'taran.flp' }
        )
      ]
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
