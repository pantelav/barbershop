// @ts-ignore
export const useApiFetch: typeof useFetch = async (path, options?) => {
  const url = 'http://127.0.0.1:8000/api'
  await nextTick()
  return useFetch(path, { baseURL: url, ...options })
}