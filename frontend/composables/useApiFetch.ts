// @ts-ignore
export const useApiFetch: typeof useFetch = async (path, options?) => {
  const config = useRuntimeConfig()
  await nextTick()
  return useFetch(path, { baseURL: config.public.api, ...options })
}