import { WeatherParser } from '@/services/weatherPerser'

export default (context, inject) => {
  const weatherParser = new WeatherParser(context.$dayjs)

  inject('weatherParser', weatherParser)
}
