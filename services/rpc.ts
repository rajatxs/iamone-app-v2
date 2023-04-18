import { HttpService } from './http'

export type RpcVersion = '1.0' | '2.0'
export interface RpcRequestPayload {
   jsonrpc: RpcVersion
   method: string
   params: Array<any>
   id: number
}

export interface RpcResponseErrorObject {
   statusCode?: number
   message?: string
   data?: any
}

export interface RpcResponse<ResultType> {
   jsonrpc: RpcVersion
   result: ResultType
   error?: string | RpcResponseErrorObject
   id: number
}

export class RpcService extends HttpService {
   private requestCounter: number = 0

   public constructor(public baseUrl: string) {
      super(baseUrl, 'json', {
         'Content-Type': 'application/json',
      })
   }

   public async call<ResultType>(method: string, params: Array<any> | any, id: number = NaN) {
      let payload: RpcRequestPayload
      let response: RpcResponse<ResultType>

      if (!Array.isArray(params)) {
         params = [params]
      }

      if (Number.isNaN(id)) {
         id = ++this.requestCounter
      }

      payload = {
         jsonrpc: '2.0',
         method,
         params,
         id,
      }

      response = await this.post<RpcResponse<ResultType>>('', payload)

      if (typeof response !== 'object') {
         throw new Error('something went wrong')
      }

      if (response.id !== id) {
         throw new Error('invalid request')
      }

      if (response.error) {
         if (typeof response.error === 'string') {
            throw new Error(response.error)
         } else if (typeof response.error === 'object') {
            throw new Error(response.error.message)
         } else {
            throw new Error('rpc response error')
         }
      }

      return response.result
   }
}
