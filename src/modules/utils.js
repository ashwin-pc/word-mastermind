export const getApiEndpoint = () => {
    const HOSTNAMES = ['localhost', '127.0.0.1', ]
    const { hostname, origin, pathname } = location
    return HOSTNAMES.includes(hostname) ? 'http://localhost:8000/' : `${origin}${pathname}`
}