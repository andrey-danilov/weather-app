import { Loader } from 'google-maps'

export default class BaseGoogleService {
  constructor(nuxtContext) {
    this.nuxtContext = nuxtContext

    this.defaultCenter = {
      lat: 49.0383781,
      lng: 31.4512914,
    }

    this.googleInstance = null
    this.mapInstance = null
    this.searchBox = null
  }

  get map() {
    return this.mapInstance
  }

  get maps() {
    return this.googleInstance?.maps
  }

  async loadGoogleInstance() {
    if (this.googleInstance) {
      return this.googleInstance
    }

    const loader = new Loader(this.nuxtContext.$config.googleApiKey, {
      version: this.nuxtContext.$config.googleApiVersion,
      language: 'uk',
      region: 'RU',
      libraries: ['places'],
    })

    this.googleInstance = await loader.load()

    return this.googleInstance
  }

  async loadMapInstance() {
    if (!this.googleInstance) {
      await this.loadGoogleInstance()
    }

    const $node = document.createElement('div')
    $node.style.height = '100%'
    document.body.appendChild($node)

    if (this.mapInstance) {
      return this.mapInstance
    }

    this.mapInstance = new this.googleInstance.maps.Map($node)

    return this.mapInstance
  }

  loadSearchBox = ($searchBoxInput) => {
    this.searchBox = new this.maps.places.SearchBox($searchBoxInput)
    this.map.addListener('bounds_changed', () => {
      this.searchBox.setBounds(this.mapInstance.getBounds())
    })
  }
}
