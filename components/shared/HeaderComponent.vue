<template>
  <header class="header">
    <div class="header__content">
      <div>WEATHER-APP</div>
      <div>sdfsdf</div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  border-bottom: 1px solid $gray1;
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 2;
  background: $gray7;

  &__content {
    @include make-container();

    display: flex;
    justify-content: space-between;
  }
}
</style>
