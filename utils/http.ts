import { HttpService } from '../services/http'

var _apiService: HttpService

export function api(): HttpService {
   if (!_apiService) {
      _apiService = new HttpService(import.meta.env.VITE_APP_API_URL, 'json', {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      })
   }

   return _apiService
}
