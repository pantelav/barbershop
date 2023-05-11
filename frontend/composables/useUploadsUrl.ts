const dev = import.meta.env.DEV
const ip = dev ? '127.0.0.1' : '80.78.245.244'
const port = dev ? '8000' : '80'

export const useUploadsUrl = () => {
  return `http://${ip}:${port}/`
}