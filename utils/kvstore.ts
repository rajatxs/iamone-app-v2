export type KVStoreValueType = StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor

export const kvStorePrefix = 'iamone'
export const kvStoreDelimiter = ':'

export const kvStore = {

   /**
    * Returns combined key of prefix and given key
    * @param key - Store key
    */
   getKey(key: string): string {
      return `${kvStorePrefix}${kvStoreDelimiter}${key}`
   },

   parse<T>(value: string | null, type: KVStoreValueType): T {
      let result: T

      switch(type) {
         case String:
            result = <T>(value === null? '': String(value))
            break

         case Number:
            result = <T>(value === null? NaN: Number(value))
            break

         case Boolean:
            result = <T>(value === null? false: Boolean(Number(value)))
            break

         case Object:
            try {
               result = <T>(value === null? {}: JSON.parse(value))
            } catch (error) {
               result = <T>null
            }
            break

         default:
            result = <T>null
            break
      }

      return result
   },

   /**
    * Returns value associated with given `key`
    * @param key - Store key
    * @param type - Store value type
    */
   get<T>(key: string, type: KVStoreValueType = String): T {
      return this.parse<T>(localStorage.getItem(this.getKey(key)), type)
   },

   /**
    * Checks if a value exists in localStorage associated with a given `key`
    * @param key - Store key
    */
   has(key: string): boolean {
      return localStorage.hasOwnPropery(this.getKey(key))
   },

   /**
    * Stores given value associated with given `key`
    * @param key - Store key
    * @param value - Store value type
    */
   set(key: string, value: string|number|boolean|object): void {
      let input: string

      switch (typeof value) {
         case 'string':
            input = value
            break
         
         case 'number':
            input = String(value)
            break

         case 'boolean':
            input = value? '1': '0'
            break

         case 'object':
            input = JSON.stringify(value)
            break

         default:
            input = ''
            break
      }

      localStorage.setItem(this.getKey(key), input)
   },

   /**
    * Removes value associated with given `key`
    * @param key - Store key
    */
   remove(key: string): void {
      localStorage.removeItem(this.getKey(key))
   }
}
