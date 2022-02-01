<template>
  <div class="bulk-edit">

    <section
      v-if="!hideTop"
      class="edit-section edit-header has-text-centered"
    >
      <div
        v-if="editable"
        class="columns is-centered"
      >
        <div
          v-if="!editing"
          class="column"
        >
          <button
            class="button svs-button-transparent"
            @click="startEditing()"
          >
            <span>Edit</span>&nbsp;<i class="fas fa-edit" />
          </button>
        </div>
      </div>

      <div
        v-if="editing"
        class="columns"
      >
        <div
          class="column"
          @click="cancelEdit()"
        >
          <button class="button svs-button-transparent">
            <span>Cancel</span>&nbsp;<i class="fas fa-undo" />
          </button>
        </div>
        <div
          class="column"
          @click="togglePreview()"
          v-if="canPreview"
        >
          <button class="button svs-button-transparent" v-if="!preview">
            <span>Preview</span>&nbsp;<i class="fas fa-edit" />
          </button>
          <button class="button svs-button-transparent" v-if="preview">
            <span>Edit</span>&nbsp;<i class="fas fa-edit" />
          </button>
        </div>
        <div
          class="column"
          @click="validateEdit()"
        >
          <button class="button svs-button-transparent">
            <span>Publish</span>&nbsp;<i class="fas fa-paper-plane" />
          </button>
        </div>
      </div>
    </section>

    <!-- SLOT -->
    <slot><strong>Editable content</strong></slot>
    <!-- SLOT -->

    <section
      v-if="!hideBottom"
      class="edit-section edit-footer has-text-centered"
    >
      <div
        v-if="editable"
        class="columns has-text-center is-centered"
      >
        <div
          v-if="!editing"
          class="column"
        >
          <button
            class="button svs-button-transparent"
            @click="startEditing()"
          >
            <span>Edit</span>&nbsp;<i class="fas fa-edit" />
          </button>
        </div>
      </div>

      <div
        v-if="editing"
        class="columns"
      >
        <div
          class="column"
          @click="cancelEdit()"
        >
          <button class="button svs-button-transparent">
            <span>Cancel</span>&nbsp;<i class="fas fa-undo" />
          </button>
        </div>
        <div
          class="column"
          @click="togglePreview()"
          v-if="canPreview"
        >
          <button class="button svs-button-transparent" v-if="!preview">
            <span>Preview</span>&nbsp;<i class="fas fa-edit" />
          </button>
          <button class="button svs-button-transparent" v-if="preview">
            <span>Edit</span>&nbsp;<i class="fas fa-edit" />
          </button>
        </div>
        <div
          class="column"
          @click="validateEdit()"
        >
          <button class="button svs-button-transparent">
            <span>Publish</span>&nbsp;<i class="fas fa-paper-plane" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BulkEdit',
  props: {
    editable: { type: Boolean, default: true },
    hideTop: { type: Boolean, default: false },
    hideBottom: { type: Boolean, default: false },
    canPreview: { type: Boolean, default: true }
  },
  data: function () {
    return {
      editing: false,
      preview: false
    }
  },
  methods: {
    startEditing () {
      this.editing = true
      this.$emit("editModeChange", this.editing)
    },
    toggleEditing () {
      this.editing = !this.editing
      this.$emit("editModeChange", this.editing)
    },
    cancelEdit () {
      this.editing = false
      this.$emit("editModeChange", this.editing)
    },
    togglePreview () {
      this.preview = !this.preview
      this.$emit("previewModeChange", this.preview)
    },
    validateEdit () {
      this.editing = false
      this.$emit("editModeChange", this.editing)
    }
  }
}
</script>
