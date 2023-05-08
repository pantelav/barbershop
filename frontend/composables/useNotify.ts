import { toast, type ToastOptions } from 'vue3-toastify'

type toastType = 'success' | 'error'
export const useNotify = (type: toastType, message: string, life = 3000) => {
  const toastOptions = {
    autoClose: life,
    position: toast.POSITION.TOP_RIGHT,
    theme: 'dark'
  } as ToastOptions
  if (type === 'success') {
    toast.success(message, toastOptions)
  }
  if (type === 'error') {
    toast.error(message, toastOptions)
  }
}