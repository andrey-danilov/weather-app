<template>
  <div class="weather-card">
    <p class="weather-card__time">{{ formattedTime }}</p>
    <lazy-weather-icon
      class="weather-card__image"
      :icon-code="weatherInfo.icon"
      :description="weatherInfo.description"
    />
    <p v-temperature-parse>{{ weather.main.temp }}</p>
    <p v-temperature-parse>{{ weather.main.feels_like }}</p>
  </div>
</template>

<script>
import weatherInfo from '@/mixins/weatherInfo'

export default {
  name: 'WeatherInfo',
  mixins: [weatherInfo],
  props: {
    weather: {
      type: Object,
      default() {
        return null
      },
    },
  },
  computed: {
    formattedTime() {
      return this.$dayjs.format(this.weather.dt, 'HH:mm')
    },
  },
}
</script>

<style lang="scss">
.weather-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__time {
    text-align: center;
  }

  &__image {
    width: 60px;
    height: 60px;
  }
}
</style>
