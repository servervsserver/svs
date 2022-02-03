<template>
  <div class="server-application container">
    <h1>
      Wanna join the event?
    </h1>
    <h2>If you are in lead position in your discord, fill this form and we will get back to you!</h2>

    <div>
      <div>

        <div class="columns">

          <div class="column is-two-thirds">

            <div class="field">
              <label>Name of the Discord server</label>
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="My awesome Discord server">
                <span class="icon is-small is-left"><i class="fas fa-discord"></i></span>
              </div>
            </div>

            <div class="field">
              <label>Permanent invite link</label>
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="https://discord.gg/my-permanent-link">
                <span class="icon is-small is-left"><i class="fas fa-link"></i></span>
              </div>
            </div>

            <div class="field">
              <label>Description</label>
              <div class="control has-icons-left">
                <textarea class="textarea" placeholder="My Discord is awesome because we have cookies! Loads of cookies!"></textarea>
              </div>
            </div>

          </div>

          <div class="column">

            <div class="field ">
              <label>Server image</label>
              <div class="has-text-centered">
                <div class="file has-name is-boxed">
                  <label class="file-label">
                    <input class="file-input" type="file" name="resume">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span class="file-name">
                      Server icon
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div class="field">
              <label>Discord tag of people in charge <span class="icon is-small is-left"><i class="fas fa-info-circle"></i></span></label>
              <div class="columns">

                <div class="column is-three-quarters">
                  <div class="control has-icons-left">
                    <input class="input" type="text" placeholder="ImTheChief#1234">
                    <tooltip :vertical="'top'">
                      <template v-slot:message></template>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </tooltip>

                  </div>
                </div>

                <div class="column">
                  <button class="button">
                    <span class="icon is-small">
                      <i class="fas fa-user-plus"></i>
                    </span>
                  </button>
                </div>

              </div>
            </div>

            <div class="field is-grouped is-grouped-multiline">
              <div class="control">
                <div class="tags has-addons">
                  <a class="tag is-link">Technology</a>
                  <a class="tag is-delete"></a>
                </div>
              </div>

              <div class="control">
                <div class="tags has-addons">
                  <a class="tag is-link">CSS</a>
                  <a class="tag is-delete"></a>
                </div>
              </div>
            </div>

          </div>

        </div>
        <!-- <div class="field">
          <label>Server icon</label>
          <input class="input" type="file" />
        </div> -->
<!--
        <span>Server Size (number of people in the server)</span>
        <input
          type="number"
          step="1"
        > -->

      </div>
    </div>
  </div>
</template>

<script scoped lang="scss">

</script>
