<template>
  <blockquote class="cookie-table">
    <div v-if="!hasCookies">
      We don't use external services that are using cookies.
    </div>
    <table v-if="hasCookies">
      <tr>
        <th>
          Third party name:
        </th>
        <th>
          Cookie Type:
        </th>
        <th>
          Site Cookie Policy:
        </th>
      </tr>
      <tr
        v-for="cookie in cookies"
        :key="cookie.thirdPartyName"
      >
        <td>
          {{ cookie.thirdPartyName }}
        </td>
        <td>
          {{ cookie.humanlyReadableTypes }}
        </td>
        <td>
          <a :href="cookie.cookiePolicyLink">Policy</a>
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
