import { StatusCodes } from 'http-status-codes'
import {
  ADD_ERROR_MESSAGE,
  ADD_WEATHER_ITEM,
  RESET_STATE,
  SET_PROCESSING_FLAG,
  ADD_SELECTED_DAY,
} from '@/store/weather/config/mutations.type'
import {
  SET_RESET_STATE,
  SET_SELECTED_DAY,
  SET_WEATHER,
} from '@/store/weather/config/actions.type'

const defaultState = {
  processing: false,
  errorMessage: '',
  weather: null,
  places: [
    {
      name: 'Kherson',
      lat: 46,
      lon: 31,
    },
  ],
}

export const state = () => ({
  processing: defaultState.processing,
  errorMessage: defaultState.errorMessage,
  weather: defaultState.weather,
  selectedDay: null,
  places: defaultState.places,
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
  async [SET_WEATHER]({ commit, getters }) {
    try {
      commit(SET_PROCESSING_FLAG, true)

      const { data, status } = await this.$api.weather.getWeatherByCoordinates(
        getters.getCoordinates
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
  entityState(state) {
    return state
  },

  getCoordinates(state) {
    return state.places[0]
  },

  getWeatherBySelectedDay(state) {
    return state.selectedDay ? state.weather?.get(state.selectedDay) : null
  },
}
