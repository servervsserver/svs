<template>
  <blockquote class="cookie-table">
    <div v-if="!hasCookies">
      We don't use any cookie of this category.
    </div>
    <table v-if="hasCookies">
      <tr>
        <th>
          Cookie Name:
        </th>
        <th>
          Expires After:
        </th>
        <th>
          Purpose:
        </th>
      </tr>
      <tr
        v-for="cookie in cookies"
        :key="cookie.name"
      >
        <td>
          {{ cookie.name }}
        </td>
        <td>
          {{ cookie.humanlyReadableExpiracy }}
        </td>
        <td>
          {{ cookie.purpose }}
        </td>
      </tr>
    </table>
  </blockquote>
</template>

<script>
export default {
  props: {
    cookies: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasCookies () {
      return this.cookies && this.cookies.length
    }
  }
}
</script>

<style scoped lang='scss'>

.cookie-table {

  /* margin: 10px;
  padding: 10px; */

  table {
    width: 100%;
    color: inherit;
    border-collapse: collapse;
  }

  td {
    padding: 5px;
  }

  th {
    color: inherit;
  }
}
</style>
