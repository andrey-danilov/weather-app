import Vue from 'vue'
import {
  ADD_PLACES,
  ADD_PLACE,
  ADD_CURRENT_PAGE,
  REPLACE_PLACE_ITEM,
  ADD_SELECTED_PLACE,
  DELETE_PLACE_ITEM,
} from '@/store/place/config/mutations.type'
import {
  SET_PLACES,
  SET_PLACE,
  SET_CURRENT_PAGE,
  SELECT_PLACE,
  DELETE_PLACE,
} from '@/store/place/config/actions.type'
import { SET_RESET_STATE } from '@/store/config/actions.type'
import {
  ADD_ERROR_MESSAGE,
  RESET_STATE,
  SET_PROCESSING_FLAG,
} from '@/store/config/mutations.type'
import { SET_WEATHER } from '~/store/weather/config/actions.type'

const PROCESSING_TYPES = {
  onLoad: 'onLoad',
  onAdd: 'onAdd',
  onEdit: 'onEdit',
  onDelete: 'onDelete',
}

const defaultState = {
  selectedPlace: null,
  processing: {
    onLoad: false,
    onAdd: false,
    onEdit: false,
    onSelect: false,
    onDelete: false,
  },
  meta: {
    currentPage: 1,
    limit: 5,
  },
  errorMessage: '',
  places: [],
}

export const state = () => ({
  selectedPlace: defaultState.selectedPlace,
  processing: defaultState.processing,
  errorMessage: defaultState.errorMessage,
  meta: defaultState.meta,
  places: defaultState.places,
})

export const mutations = {
  [ADD_PLACES](state, payload) {
    state.places = payload
  },

  [ADD_PLACE](state, payload) {
    state.places.push(payload)
  },

  [SET_PROCESSING_FLAG](state, { key, value = false }) {
    state.processing[key] = value
  },

  [ADD_SELECTED_PLACE](state, place) {
    state.selectedPlace = place
  },

  [ADD_CURRENT_PAGE](state, page) {
    state.meta.currentPage = page
  },

  [ADD_ERROR_MESSAGE](state, message) {
    state.errorMessage = message
  },

  [REPLACE_PLACE_ITEM]: (state, item) => {
    const index = state.data.findIndex((x) => x.id === item.id)
    Vue.set(state.data, index, item)
  },

  [DELETE_PLACE_ITEM](state, index) {
    state.places.splice(index, 1)
  },

  [RESET_STATE](state) {
    Object.keys(defaultState).forEach((key) => {
      state[key] = defaultState[key]
    })
  },
}

export const actions = {
  async [SET_PLACES]({ commit }) {
    try {
      commit(SET_PROCESSING_FLAG, { key: PROCESSING_TYPES.onLoad, value: true })

      const places = await this.$indexedDb.db.places.toArray()
      commit(ADD_PLACES, places)
    } catch (error) {
      commit(
        ADD_ERROR_MESSAGE,
        this.app.i18n.t(`places.error.${PROCESSING_TYPES.onLoad}`)
      )

      return false
    } finally {
      commit(SET_PROCESSING_FLAG, { key: PROCESSING_TYPES.onLoad })
    }
  },

  async [SET_PLACE]({ commit }, place) {
    try {
      commit(SET_PROCESSING_FLAG, { key: PROCESSING_TYPES.onAdd, value: true })

      await this.$indexedDb.db.places.add(place)
      commit(ADD_PLACE, place)
    } catch (error) {
      commit(
        ADD_ERROR_MESSAGE,
        this.app.i18n.t(`places.error.${PROCESSING_TYPES.onAdd}`)
      )

      return false
    } finally {
      commit(SET_PROCESSING_FLAG, { key: PROCESSING_TYPES.onAdd })
    }
  },

  [SET_CURRENT_PAGE]({ commit }, page) {
    commit(ADD_CURRENT_PAGE, page)
  },

  [SELECT_PLACE]({ commit, getters }, placeId) {
    try {
      commit(SET_PROCESSING_FLAG, {
        key: PROCESSING_TYPES.onSelect,
        value: true,
      })

      const place = getters.getPlaceById(placeId)
      commit(ADD_SELECTED_PLACE, place)

      this.dispatch(`weather/${SET_WEATHER}`, place.location)
    } catch (error) {
      commit(
        ADD_ERROR_MESSAGE,
        this.app.i18n.t(`places.error.${PROCESSING_TYPES.onSelect}`)
      )

      return false
    } finally {
      commit(SET_PROCESSING_FLAG, { key: PROCESSING_TYPES.onAdd })
    }
  },

  async [REPLACE_PLACE_ITEM]({ commit }, place) {
    try {
      commit(SET_PROCESSING_FLAG, { key: PROCESSING_TYPES.onEdit, value: true })

      await this.$indexedDb.db.places.put(place, place.id)
      commit(REPLACE_PLACE_ITEM, place)
    } catch (error) {
      commit(
        ADD_ERROR_MESSAGE,
        this.app.i18n.t(`places.error.${PROCESSING_TYPES.onEdit}`)
      )

      return false
    } finally {
      commit(SET_PROCESSING_FLAG, { key: PROCESSING_TYPES.onEdit })
    }
  },

  async [DELETE_PLACE]({ commit, getters }, placeId) {
    try {
      commit(SET_PROCESSING_FLAG, {
        key: PROCESSING_TYPES.onDelete,
        value: true,
      })

      const placeIndex = getters.getPlaceIndex(placeId)
      await this.$indexedDb.db.places.delete(placeId)

      commit(DELETE_PLACE_ITEM, placeIndex)
    } catch (error) {
      commit(
        ADD_ERROR_MESSAGE,
        this.app.i18n.t(`places.error.${PROCESSING_TYPES.onDelete}`)
      )

      return false
    } finally {
      commit(SET_PROCESSING_FLAG, { key: PROCESSING_TYPES.onDelete })
    }
  },

  [SET_RESET_STATE]({ commit }) {
    commit(RESET_STATE)
  },
}

export const getters = {
  getPlaceIndex: (state) => (placeId) => {
    return state.places.findIndex((place) => place.id === placeId)
  },

  getPlaceById: (state) => (placeId) => {
    return state.places.find((place) => place.id === placeId)
  },

  getPlacesByPage(state) {
    return state.places.slice(
      (state.meta.currentPage - 1) * state.meta.limit,
      state.meta.currentPage * state.meta.limit
    )
  },

  getSelectedPlace(state) {
    return state.selectedPlace
  },
}
