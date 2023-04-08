export function getUrl(): URL {
   return new URL(import.meta.env.VITE_APP_URL)
}

export function getHostname(): string {
   return getUrl().hostname
}

export function getOrigin() {
   return getUrl().origin
}

export function getLivePageUrl(username: string): string {
   return `${getHostname()}/${username}`
}
