import { WeatherParser } from '@/service/weatherPerser'

export default (context, inject) => {
  const weatherParser = new WeatherParser(context.$dayjs)

  inject('weatherParser', weatherParser)
}
