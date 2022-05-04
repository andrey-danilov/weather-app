export default (axios, config) => ({
  getWeatherByCoordinates({
    lat,
    lng,
    appid = config.apiKey,
    units = 'metric',
    lang = 'uk',
  }) {
    return axios.get(`/forecast`, {
      params: { lat, lon: lng, appid, units, lang },
    })
  },
})
