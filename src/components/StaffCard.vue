<template>
  <div class="staff-card flex-container shadow-depth-1 flat-background">
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
            @{{ staff.extraSocialsLinks.twitter }}
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
        <!-- <i
          class="fab fa-twitter"
          style="font-size: 1.5em;"
        />
        <p class="socials-text"> @cutealicem </p> -->
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
    padding: 10px;
  }

  .avatar {
    border-radius: 50%;
    border: 0px solid #FFFADE;
    box-shadow: 0px 0px 1px 1px #FFFADE;
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
    text-transform: capitalize;
  }

  .bodytext {
    margin: 0px;
    padding-top: 10px;
    font-size: 14px;
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
