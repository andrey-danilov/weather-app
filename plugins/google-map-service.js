import BaseGoogleService from '@/services/map/BaseGoogleService'

export default (context, inject) => {
  const googleService = new BaseGoogleService(context)

  inject('googleService', googleService)
}
