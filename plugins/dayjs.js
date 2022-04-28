import dayjs from 'dayjs'

const utc = require('dayjs/plugin/utc')
require('dayjs/locale/ru')

dayjs.extend(utc)
dayjs.locale('ru')

export default (context, inject) => {
  const factories = {
    format(date, template) {
      return dayjs(date || new Date()).format(template)
    },

    formatLocal(date, template) {
      return dayjs(date || new Date())
        .utc()
        .format(template)
    },

    getLocalDate(date) {
      if (!date) {
        return ''
      }
      return dayjs(date)
    },

    add(date, value, type) {
      return dayjs(date || new Date()).add(value, type)
    },

    subtract(date, value, type) {
      return dayjs(date || new Date()).subtract(value, type)
    },

    getDate(date = new Date()) {
      return dayjs(date)
    },
  }

  inject('dayjs', factories)
}
