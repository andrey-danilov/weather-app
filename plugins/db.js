import IndexedDb from '@/services/indexedDb'

export default (_, inject) => {
  const indexedDb = new IndexedDb()

  inject('indexedDb', indexedDb)
}
