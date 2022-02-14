<template>
  <div class="staff-card">

    <div class="columns">
      <!-- Left region -->
      <div class="column is-narrow avatar-container has-text-centered">
        <img
          class="avatar"
          :src="staff.avatarUrl"
          alt="Avatar"
        >
      </div>

      <!-- Right region -->
      <div class="column">

        <div class="side-by-side">
          <h2 class="name">{{ staff.name }} </h2>
          <p> {{ staff.pronouns }} </p>
        </div>
        <h5> {{ staff.role }} </h5>
        <p class="bodytext">
          {{ staff.description }}
        </p>

        <div class="center-side-by-side">
          <div>
            <p class="socials-text">
              <i
                class="fab fa-discord"
                style="font-size: 1.5em;"
              />
              {{ staff.discordTag }}
            </p>
          </div>

          <div v-if="staff.extraSocialsLinks.twitter">
            <p class="socials-text">
              <i
                class="fab fa-twitter"
                style="font-size: 1.5em;"
              />
              <a
                :href="'https://twitter.com/' + staff.extraSocialsLinks.twitter"
              >
                @{{ staff.extraSocialsLinks.twitter }}
              </a>
            </p>
          </div>

          <div v-if="staff.extraSocialsLinks.instagram">
            <p class="socials-text">
              <i
                class="fab fa-instagram"
                style="font-size: 1.5em;"
              />
              <a
                :href="'https://instagram.com/' + staff.extraSocialsLinks.instagram"
              >
                @{{ staff.extraSocialsLinks.instagram }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { StaffCard } from "@/models/staff-card"

export default {
  props: {
    staff: {
      type: StaffCard,
      default: () => new StaffCard()
    }
  }
}
</script>

<style scoped lang='scss'>

/* &.flex-container {
  display: flex;
  color: #FFFADE;
  align-items: center;
} */
.staff-card {

  border-radius: 5px;
  padding: 10px;

  .avatar-container {
    padding: 20px;
    display: flex;
    color: #FFFADE;
    align-items: center;
    justify-content: center;

    .avatar {
      border-radius: 50%;
      border: 2px solid #FFFADE;
      /* box-shadow: 0px 0px 3px 3px #00000040; */
      max-width: 130px;
    }

  }


  .side-by-side {
    display: flex;
    align-items: baseline;
    height: 43px;
  }

  .center-side-by-side {
    display: flex;
    align-items: center;
  }

  h2 {
    margin: 0px;
  }

  h5 {
    margin: 0px;
    font-weight: normal;
    color: #FFBA5E;
    text-transform: capitalize;
  }

  .bodytext {
    margin: 0px;
    padding-top: 1em;
    font-size: 1em;
    min-height: 10em;
  }

  .name {
    padding-right: 6px;
  }

  .socials-text {
    padding-left: 5px;
    padding-right: 20px;
    font-size: 12px;

    a {
      text-decoration: none;
    }
  }
}
</style>
