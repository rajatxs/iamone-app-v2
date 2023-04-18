import { HttpService } from '../services/http'
import { RpcService } from '../services/rpc'

var _apiService: HttpService
var _rpcService: RpcService

export function api(): HttpService {
   if (!_apiService) {
      _apiService = new HttpService(import.meta.env.VITE_APP_API_URL, 'json', {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      })
   }

   return _apiService
}

export function rpc(): RpcService {
   if (!_rpcService) {
      const rpcUrl = `${import.meta.env.VITE_APP_RPC_URL}/x`
      _rpcService = new RpcService(rpcUrl)
   }

   return _rpcService
}
