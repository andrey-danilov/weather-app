<template>
  <img
    class="weather-icon"
    :src="`http://openweathermap.org/img/wn/${iconCode}@2x.png`"
    :alt="description"
    :title="description"
  />
</template>

<script>
export default {
  name: 'WeatherIcon',
  props: {
    iconCode: {
      type: String,
      default() {
        return ''
      },
    },
    description: {
      type: String,
      default() {
        return ''
      },
    },
  },
}
</script>

<style lang="scss">
.weather-icon {
  width: 100%;
  height: 100%;
}
</style>
