<template>
  <div class="container">
    <cookie-policy />
  </div>
</template>

<script>
import CookiePolicy from '@/components/cookie/CookiePolicy.vue'

export default {
  components: {
    'cookie-policy': CookiePolicy
  }
}
</script>

<style scoped lang='scss'>

/* h1 {
    margin-top: 0;
}

.cookie_policy {
width: 80%;
margin: auto;
}
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
} */

</style>
