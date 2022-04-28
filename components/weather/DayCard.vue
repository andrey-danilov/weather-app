<template>
  <div class="day-card" @click="onSelectDay">
    <div class="day-card__main-info">
      <p class="day-card__date">{{ formattedDay }}</p>

      <p v-temperature-parse>{{ weather.main.temp }}</p>
    </div>
    <lazy-weather-icon
      :icon-code="weatherInfo.icon"
      :description="weatherInfo.description"
    />
  </div>
</template>

<script>
import { SET_SELECTED_DAY } from '@/store/weather/config/actions.type'
import weatherInfo from '@/mixins/weatherInfo'

export default {
  name: 'DayCard',
  mixins: [weatherInfo],
  props: {
    day: {
      type: Object,
      default() {
        return null
      },
    },
    weather: {
      type: Object,
      default() {
        return null
      },
    },
  },
  computed: {
    formattedDay() {
      return this.$dayjs.format(this.day, 'dd, D MMM')
    },
  },
  methods: {
    onSelectDay() {
      this.$store.dispatch(`weather/${SET_SELECTED_DAY}`, this.day)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'styles/components/weather/day-card';
</style>
