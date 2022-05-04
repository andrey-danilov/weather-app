import groupBy from 'lodash.groupby'

export class WeatherParser {
  constructor(dayjs) {
    this.dayjs = dayjs
  }

  parseByDate(weathersList) {
    weathersList.forEach((item) => {
      item.dt = this.dayjs.getLocalDate(item.dt_txt)
      item.day = item.dt.get('date')
    })

    const map = new Map()
    Object.entries(groupBy(weathersList, 'day')).forEach(([key, value]) => {
      const [chunk] = value
      map.set(chunk.dt, value)
    })

    return map
  }
}
