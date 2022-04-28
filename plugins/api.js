import Weather from '@/api/weather'

export default (context, inject) => {
  const factories = {
    weather: Weather(context.$axios, context.$config),
  }

  inject('api', factories)
}
