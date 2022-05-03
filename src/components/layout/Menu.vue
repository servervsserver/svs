<template>
  <div class="menu">
    <ul
      v-for="(item, iidx) in menuItems"
      :key="iidx"
      class="menu-list"
    >
      <li>
        <span>{{ item.label }}</span>
        <ul v-if="item.children">
          <li
            v-for="(sitem, sidx) in item.children"
            :key="iidx + '-' + sidx"
          >
            <router-link :to="sitem.to">
              {{ sitem.label }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>

export class MenuItem {

  constructor() {

    this.label = ""

    /**
     * @type {boolean}
     */
    this.expanded = false

    /**
     * @type {string|null}
     */
    this.to = null

    this.active = false

    this.children = []
  }

}


export default {
  props: {
    menuItems: {
      type: Array,
      default: () => []
    }
  }
}
</script>