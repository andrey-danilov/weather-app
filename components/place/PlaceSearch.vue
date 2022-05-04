<template>
  <div class="place-search">
    <div class="place-search__wrapper">
      <input
        id="search-input"
        class="place-search__search"
        :value="address"
        :disabled="processing.onAdd"
      />
    </div>
    <transition name="fade">
      <p v-if="errorMessage" class="place-search__error-message">
        {{ errorMessage }}
      </p>
    </transition>

    <transition name="fade" mode="out-in">
      <div v-if="processing.onLoad">{{ $t('places.loading') }}</div>
      <div v-else>
        <div
          v-for="item in getPlacesByPage"
          :key="item.id"
          class="place-item"
          @click="onSelectPlace(item.id)"
        >
          <p>{{ item.vicinity }}</p>

          <t-button
            small
            color="danger"
            :load="processing.onDelete"
            @click.stop="onDeletePlace(item.id)"
          >
            {{ $t('button.delete') }}
          </t-button>
        </div>

        <pagination-component
          v-if="places.length"
          v-model="currentPage"
          class="place-search__pagination"
          :records="places.length"
          :per-page="metaData.limit"
          :options="{
            template: 't-pagination',
            hasChunksNav: true,
            chunk: 4,
            edgeNavigation: false,
            chunksNavigation: 'fixed',
            texts: {},
          }"
        />
        <div v-if="!places.length">
          {{ $t('places.noItems') }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {
  DELETE_PLACE,
  SELECT_PLACE,
  SET_CURRENT_PAGE,
  SET_PLACE,
  SET_PLACES,
} from '@/store/place/config/actions.type'

export default {
  name: 'PlaceSearch',
  data() {
    return {
      address: '',
      localLimit: 5,
    }
  },
  fetch() {
    this.$store.dispatch(`place/${SET_PLACES}`)
  },
  fetchOnServer: false,
  computed: {
    ...mapState('place', {
      metaData: (state) => state.meta,
      places: (state) => state.places,
      processing: (state) => state.processing,
      selectedPlace: (state) => state.selectedPlace,
      errorMessage: (state) => state.errorMessage,
    }),

    ...mapGetters('place', ['getPlacesByPage']),

    currentPage: {
      get() {
        return +this.metaData.currentPage
      },
      set(value) {
        this.$store.dispatch(`place/${SET_CURRENT_PAGE}`, value)
      },
    },
  },
  async mounted() {
    const searchBoxInput = document.getElementById('search-input')
    if (searchBoxInput) {
      await this.$googleService.loadGoogleInstance()
      await this.$googleService.loadMapInstance()
      this.$googleService.loadSearchBox(searchBoxInput)

      this.$googleService.searchBox.addListener('places_changed', () => {
        const places = this.$googleService.searchBox.getPlaces()
        if (!places.length) {
          return
        }

        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            return false
          }

          this.addCity(
            place.place_id,
            place.geometry.location.toJSON(),
            place.vicinity
          )
        })
      })
    }
  },
  methods: {
    addCity(id, location, vicinity) {
      this.$store.dispatch(`place/${SET_PLACE}`, { id, location, vicinity })
    },

    onSelectPlace(placeId) {
      this.$store.dispatch(`place/${SELECT_PLACE}`, placeId)
    },

    onDeletePlace(placeId) {
      this.$store.dispatch(`place/${DELETE_PLACE}`, placeId)
    },
  },
}
</script>

<style lang="scss">
.place-search {
  padding-top: 10px;

  &__search {
    width: 100%;
    border: none;
    height: 48px;
    z-index: 1;

    padding: 15px 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 6px rgba($black, 0.08);
    border-radius: 4px;

    font-weight: 500;
    font-size: 14px;
    line-height: 18px;

    color: $gray1;
    margin-bottom: 10px;

    &:focus {
      outline: none;
    }
  }

  &__error-message {
    color: $red;
  }

  .place-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid $gray1;
    cursor: pointer;
  }
}
</style>
