<template>
  <div class="staff-card">
    <div class="columns">
      <div class="column is-narrow avatar-container is-hidden-mobile">
        <img
          class="avatar"
          :src="staff.avatarUrl"
          alt="Avatar"
        >
      </div>
      <div class="column">
        <div class="header is-hidden-mobile">
          <div class="side-by-side">
            <h2 class="name">
              {{ staff.name }}
            </h2>
            <p> {{ staff.pronouns }} </p>
          </div>
          <h5> {{ staff.role }} </h5>
        </div>

        <div
          class="columns is-mobile is-hidden-tablet"
          style="margin-bottom: 0px;"
        >
          <div class="column is-8">
            <div class="side-by-side">
              <h2 class="name">
                {{ staff.name }}
              </h2>
              <p> {{ staff.pronouns }} </p>
            </div>
            <h5> {{ staff.role }} </h5>
          </div>
          <div class="column is-4">
            <img
              class="avatar"
              :src="staff.avatarUrl"
              alt="Avatar"
            >
          </div>
        </div>

        <p class="bodytext">
          {{ staff.description }}
        </p>

        <div class="center-side-by-side">
          <div>
            <p class="socials-text">
              <i
                class="fab fa-discord"
              />
              <span style="white-space: nowrap;"> {{ staff.discordTag }}</span>
            </p>
          </div>

          <div v-if="staff.extraSocialsLinks.twitter">
            <p class="socials-text">
              <i
                class="fab fa-twitter"
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

.staff-card {

  border-radius: 5px;
  padding: 10px;

  .avatar-container {
    padding: 20px;
    display: flex;
    color: #FFFADE;
    align-items: center;

    .avatar {
      max-width: 130px;
    }
  }

  .avatar {
    border-radius: 50%;
    border: 1px solid #FFFADE;
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
    padding-top: 1em;
    font-size: 1em;
    padding-bottom: 1em;
  }

  .name {
    padding-right: 6px;
  }

  .socials-text {
    padding-right: 20px;
    font-size: 12px;
    text-align: center;

    i {
      vertical-align: middle;
      font-size: 1.5em;
    }

    .fab {
      padding-right: 5px;
    }

    a {
      text-decoration: none;
      font-weight: normal;
    }
  }

  @media (max-width: 768px) {
    .avatar {
      border-radius: 50% 15% 50% 50%;
    }
  }

  @media (min-width: 769px) {
    .bodytext {
      min-height: 10em;
    }
  }
}
</style>
