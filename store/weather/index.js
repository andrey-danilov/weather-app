import { StatusCodes } from 'http-status-codes'
import {
  ADD_WEATHER_ITEM,
  ADD_SELECTED_DAY,
} from '@/store/weather/config/mutations.type'
import {
  SET_SELECTED_DAY,
  SET_WEATHER,
} from '@/store/weather/config/actions.type'
import {
  ADD_ERROR_MESSAGE,
  RESET_STATE,
  SET_PROCESSING_FLAG,
} from '@/store/config/mutations.type'
import { SET_RESET_STATE } from '@/store/config/actions.type'

const defaultState = {
  processing: false,
  errorMessage: '',
  weather: null,
}

export const state = () => ({
  processing: defaultState.processing,
  errorMessage: defaultState.errorMessage,
  weather: defaultState.weather,
  selectedDay: null,
})

export const mutations = {
  [ADD_WEATHER_ITEM](state, payload) {
    state.weather = payload
  },

  [ADD_SELECTED_DAY](state, selectedDay) {
    state.selectedDay = selectedDay
  },

  [ADD_ERROR_MESSAGE](state, message) {
    state.errorMessage = message
  },

  [SET_PROCESSING_FLAG](state, payload = false) {
    state.processing = payload
  },

  [RESET_STATE](state) {
    Object.keys(defaultState).forEach((key) => {
      state[key] = defaultState[key]
    })
  },
}

export const actions = {
  async [SET_WEATHER]({ commit }, location) {
    try {
      commit(SET_PROCESSING_FLAG, true)

      const { data, status } = await this.$api.weather.getWeatherByCoordinates(
        location
      )

      if (status === StatusCodes.OK) {
        const weatherList = this.$weatherParser.parseByDate(data.list)

        commit(ADD_WEATHER_ITEM, weatherList)
        commit(ADD_SELECTED_DAY, weatherList.keys().next().value)
      }
    } catch (error) {
      commit(ADD_ERROR_MESSAGE, '')

      return false
    } finally {
      commit(SET_PROCESSING_FLAG)
    }
  },

  [SET_SELECTED_DAY]({ commit }, selectedDay) {
    commit(ADD_SELECTED_DAY, selectedDay)
  },

  [SET_RESET_STATE]({ commit }) {
    commit(RESET_STATE)
  },
}

export const getters = {
  getCoordinates(state) {
    return state.places[0]
  },

  getWeatherBySelectedDay(state) {
    return state.selectedDay ? state.weather?.get(state.selectedDay) : null
  },
}
