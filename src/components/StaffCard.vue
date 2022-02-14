<template>
  <div class="staff-card flex-container">
    <div class="avatar-container">
      <img
        class="avatar"
        :src="staff.avatarUrl"
        alt="Avatar"
      >
    </div>
    <div>
      <div class="side-by-side">
        <h2 class="name">
          {{ staff.name }}
        </h2>
        <p> {{ staff.pronouns }} </p>
      </div>
      <h5> {{ staff.role }} </h5>
      <p class="bodytext">
        {{ staff.description }}
      </p>

      <div class="center-side-by-side">
        <div>
          <p class="socials-icon-text">
            <i
              class="fab fa-discord"
              style="font-size: 1.5em; padding-right: 5px;"
            />
            {{ staff.discordTag }}
          </p>
        </div>

        <div v-if="staff.extraSocialsLinks.twitch">
          <p class="socials-icon-text">
            <i
              class="fab fa-twitch"
              style="font-size: 1.5em; padding-right: 5px;"
            />
            <a
              :href="'https://twitch.com/' + staff.extraSocialsLinks.twitch"
            >
              @{{ staff.extraSocialsLinks.twitch }}
            </a>
          </p>
        </div>

        <div v-if="staff.extraSocialsLinks.twitter">
          <p class="socials-icon-text">
            <i
              class="fab fa-twitter"
              style="font-size: 1.5em; padding-right: 5px;"
            />
            <a
              :href="'https://twitter.com/' + staff.extraSocialsLinks.twitter"
            >
              @{{ staff.extraSocialsLinks.twitter }}
            </a>
          </p>
        </div>

        <div v-if="staff.extraSocialsLinks.instagram">
          <p class="socials-icon-text">
            <i
              class="fab fa-instagram"
              style="font-size: 1.5em; padding-right: 5px;"
            />
            <a
              :href="'https://instagram.com/' + staff.extraSocialsLinks.instagram"
            >
              @{{ staff.extraSocialsLinks.instagram }}
            </a>
          </p>
        </div>
        <!-- <i
          class="fab fa-twitter"
          style="font-size: 1.5em;"
        />
        <p class="socials-icon-text"> @cutealicem </p> -->
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

.staff-card {
  border-radius: 5px;

  &.flex-container {
    display: flex;
    color: #FFFADE;
    align-items: center;
  }

  .avatar-container {
    padding-right: 20px;
  }

  .avatar {
    border-radius: 50%;
    border: 2px solid #FFFADE;
    /* box-shadow: 0px 0px 1px 1px #FFFADE; */
    /* margin-right: 20px; */
    max-width: 100px;
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
  }

  .bodytext {
    margin: 0px;
    padding-top: 10px;
    font-size: 14px;
  }

  .name {
    padding-right: 6px;
  }

  .socials-icon-text {
    padding-right: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      font-weight: normal;
    }
  }
}
</style>
