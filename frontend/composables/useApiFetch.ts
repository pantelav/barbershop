const dev = import.meta.env.DEV
const ip = dev ? '127.0.0.1' : '80.78.245.244'
const port = dev ? '8000' : '80'
// @ts-ignore
export const useApiFetch: typeof useFetch = async (path, options?) => {
  const url = `http://${ip}:${port}/api`
  await nextTick()
  return useFetch(path, { baseURL: url, ...options })
}