import Dexie from 'dexie'

export default class IndexedDb {
  constructor() {
    this.DB_NAME = 'weather-db'
    this.db = new Dexie(this.DB_NAME)

    this.db.version(1).stores({
      places: '++id, location, cityName',
    })
  }
}
