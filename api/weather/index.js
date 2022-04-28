export default (axios, config) => ({
  getWeatherByCoordinates({
    lat,
    lon,
    appid = config.apiKey,
    units = 'metric',
    lang = 'uk',
  }) {
    return axios.get(`/forecast`, {
      params: { lat, lon, appid, units, lang },
    })
  },
})
