type toastType = 'success' | 'error'
export const useNotify = (type: toastType, message: string, life = 3000) => {
  const { $toast } = useNuxtApp()
  let header = 'Успех'
  if (type === 'error') header = 'Ошибка'
  // @ts-ignore
  $toast.add({ severity: type, summary: header, detail: message, life })
}