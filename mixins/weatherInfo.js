export default {
  computed: {
    weatherInfo() {
      const [weather] = this.weather.weather
      return weather
    },
  },
}
