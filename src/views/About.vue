<template>
  <div
    id="about"
    class="about container"
  >
    <h1>
      About Us
    </h1>
    <p>
      <brand-name-short /> SvS started in a Discord-based community called Artistry in April 2020. It started off as an idea to have a fun competition to work on during what was the early days of quarantine for most countries: 4 teams from different online music communities would be mandated to create an EP of original music during a set time period, concluding with a listening party / online festival to showcase all the completed music to all the communities involved. The nature of the event being between online communities based in different Discord Servers gave rise to the name Server versus Server.
    </p>
    <p>
      As more servers were contacted to take part, this small-scale idea quickly exploded in popularity, quickly growing into what was at the time Discord's largest inter-server event - 16 communities spent 3 weeks to craft a 12 minute EP within their servers. The output of all the hard work was celebrated with a 2 day festival held on Twitch and thus a tradition was born. 
    </p>
    <p>
      A few months passed and the music communities that had taken part in the first competition were itching for a second round: in July 2020 we kicked off our second edition of SvS - this time with 18 servers competing, this time each making 15 minute eps. SvS was becoming too big for a single community to run it so we formed a coalition of servers that would work to run cross-community events for the foreseeable future. 
    </p>
    <p>
      SvS II was a big success but the team wasn’t satisfied yet. After a recovery period the team got to work on the third installment of SvS. This time getting 30 servers involved. By this time communities were reaching out to us to join the event. Recognising the reach and audience SvS was developing, we strove to direct that energy and engagement towards social good, with the introduction of charity fundraising to our livestreams. 
    </p>
    <p>
      We set out with the goal of raising one thousand dollars for charity. Across the span of the event , this number quickly grew to 2 thousand, and then 3 thousand. We reached a whopping $3,275.58 cents raised for charity. We were also able to get Splice involved with SvS III to provide our audience with voucher codes for their website.
    </p>
    <p>
      In October of 2021 we were approached by Lucid Monday to help run a competitive event - a bracket tournament consisting of 16 10-member teams  who would face off in a series of beat battles (similar in nature to Versuz on IG) in the ultimate goal to win $1000 dollars. The event was a great success garnering thousands of views across the tournament. 
    </p>
    <p>
      In parallel our newly expanded team started plans to kick off SvS IV slated for a March 26th start date, after establishing a comprehensive Code of Conduct fitting of the scale of the event to firmly set expected behaviour within the event.
    </p>
    <h1>Meet our Team</h1>
      <p>
        Don't be afraid to message the SvS team members if you have questions about the event!
      </p>
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
