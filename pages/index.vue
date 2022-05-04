<template>
  <div class="weather-page">
    <div id="info-block">
      <transition name="fade" mode="out-in">
        <lazy-weather-preloader
          v-if="isProcessing"
          :style="{ width: `${blockWidth}px` }"
        />
        <div v-else class="weather-info">
          <template v-if="weather">
            <perfect-scrollbar
              v-if="blockWidth"
              :style="{ width: `${blockWidth}px` }"
            >
              <div class="weather-list">
                <day-card
                  v-for="([date, items], index) in weather"
                  :key="`day_${index}`"
                  :day="date"
                  :weather="getFirstDayWeather(items)"
                />
              </div>
            </perfect-scrollbar>
            <div class="weather-info__list">
              <lazy-weather-info
                v-for="item in getWeatherBySelectedDay"
                :key="`${item.dt_txt}_day-info`"
                :weather="item"
              />
            </div>
          </template>
          <p v-else>
            {{ $t('weather.selectPlace') }}
          </p>
        </div>
      </transition>
    </div>
    <lazy-place-search />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { SET_WEATHER } from '@/store/weather/config/actions.type'
import setBlockWidth from '@/mixins/setBlockWidth'

export default {
  name: 'IndexPage',
  mixins: [setBlockWidth],
  fetch() {
    this.$store.dispatch(`weather/${SET_WEATHER}`)
  },
  fetchOnServer: false,
  computed: {
    ...mapState('weather', {
      weather: (state) => state.weather,
      isProcessing: (state) => state.processing,
    }),

    ...mapGetters('weather', ['getWeatherBySelectedDay']),
  },
  mounted() {
    this.setBlockWidth('#info-block')
  },
  methods: {
    getFirstDayWeather(weathers) {
      const [weather] = weathers
      return weather
    },
  },
}
</script>

<style lang="scss">
@import 'styles/components/weather/weather-info';

.weather-page {
  @include make-container();

  display: grid;
  grid-column-gap: 40px;
  grid-template-columns: 1fr 300px;
}

.weather-list {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(6, 200px);
  grid-column-gap: 20px;
  padding: 10px 15px;
}

.cities {
  background: $gray1;
}
</style>
