<template>
  <div class="layout">
    <lazy-header-component />
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="scss">
.layout {
  margin-top: 80px;
  padding-top: 20px;
  min-height: calc(100vh - 100px);
}
</style>
