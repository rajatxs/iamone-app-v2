export type HttpResponseType = 'text' | 'json' | 'blob'
export type HttpRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'
export type HttpRequestQueryParams = Record<string, number|string>
export type HttpHeaders = Record<string, string>
export interface HttpResponseEventDetail {
   status: number
   statusText: string
   ok: boolean
   body: any
}

export class HttpResponseError extends Error {
   constructor(
      public status: number, 
      public statusText: string, 
      public ok: boolean, 
      public body: any) {

      if (!body) {
         body = { message: 'Something went wrong!' }
      }
      super(body.message)
   }
}

export class HttpService extends EventTarget {
   public invalidStatusCodes: number[] = [
      400, 401,
      403, 404,
      500,
   ]

   constructor(
      public baseUrl: string, 
      public responseType: HttpResponseType = 'text', 
      public headers: HttpHeaders = {}) {
      super()
   }

   /**
    * Generates absolute url string from given `path` and `queryParams`
    * @param path - URL Endpoint
    * @param queryParams - URL Query parameters
    */
   public createUrl(path: string|URL, queryParams: HttpRequestQueryParams): string {
      const url = new URL(path, this.baseUrl)

      for (const key in queryParams) {
         url.searchParams.append(key, String(queryParams[key]))
      }

      return url.toString()
   }

   /**
    * Makes a new request with the GET method
    * @param path - URL Endpoint
    * @param queryParams - URL Query parameters
    * @param headers - Request headers
    */
   public get<ResponseType>(path: string, queryParams: HttpRequestQueryParams = {}, headers: HttpHeaders = {}): Promise<ResponseType> {
      return this.request('GET', path, queryParams, headers)
   }

   /**
    * Makes a new request with the POST method
    * @param path - URL Endpoint
    * @param data - Request body
    * @param headers - Request headers
    */
   public post<ResponseType>(path: string, data: any = {}, headers: HttpHeaders = {}): Promise<ResponseType> {
      return this.request('POST', path, data, headers)
   }
   
   /**
    * Makes a new request with the PUT method
    * @param path - URL Endpoint
    * @param data - Request body
    * @param headers - Request headers
    */
   public put<ResponseType>(path: string, data: any = {}, headers: HttpHeaders = {}): Promise<ResponseType> {
      return this.request('PUT', path, data, headers)
   }

   /**
    * Makes a new request with the PATCH method
    * @param path - URL Endpoint
    * @param data - Request body
    * @param headers - Request headers
    */
   public patch<ResponseType>(path: string, data: any = {}, headers: HttpHeaders = {}): Promise<ResponseType> {
      return this.request('PATCH', path, data, headers)
   }

   /**
    * Makes a new request with the DELETE method
    * @param path - URL Endpoint
    * @param queryParams - URL Query parameters
    * @param headers - Request headers
    */
   public delete<ResponseType>(path: string, queryParams: HttpRequestQueryParams = {}, headers: HttpHeaders = {}): Promise<ResponseType> {
      return this.request('DELETE', path, queryParams, headers)
   }

   /**
    * Makes a new request with the `method` 
    * @param method - Request method
    * @param path - URL Endpoint
    * @param data - Request body or query params
    * @param headers - Request headers
    */
   public async request<ResponseType>(method: HttpRequestMethods, path: string, data: any, headers: HttpHeaders): Promise<ResponseType> {
      let url: string
      let params: HttpRequestQueryParams = {}
      let options: RequestInit = {}
      let response: Response
      let responseData: ResponseType
      let eventDetail: HttpResponseEventDetail

      options.method = method
      options.headers = Object.assign(this.headers, headers)

      if (['POST', 'PUT', 'PATCH'].includes(method)) {
         switch (typeof data) {
            case 'object':
               options.body = JSON.stringify(data)
               break

            case 'string':
            case 'number':
               options.body = String(data)
               break
            
            case 'boolean':
               options.body = data? '1': '0'
               break
         }
      } else {
         if (typeof data === 'object') {
            params = data
         }
      }

      url = this.createUrl(path, params)
      response = await window.fetch(url, options)

      switch (this.responseType) {
         case 'text': 
            responseData = await response.text() as ResponseType
            break

         case 'json':
            responseData = await response.json() as ResponseType
            break

         case 'blob':
            responseData = await response.blob() as ResponseType
            break
      }

      eventDetail = {
         status: response.status,
         statusText: response.statusText,
         ok: response.ok,
         body: responseData,
      }

      if (this.invalidStatusCodes.includes(response.status)) {
         this.dispatchEvent(new CustomEvent('error', { detail: eventDetail }))
         throw new HttpResponseError(
            response.status, 
            response.statusText, 
            response.ok, 
            responseData
         )
      }

      this.dispatchEvent(new CustomEvent('ok', { detail: eventDetail }))

      return responseData
   }
}
