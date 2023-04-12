export const useSteps = () => useState('steps', () => 1)

export const useSelectBarber = () => useState('selected-barber', () => null)

export const useSelectService = () => useState('selected-service', () => [''])

export const useSelectTime = () => useState('selected-time', () => null)

export const useClearState = () => {
  const steps = useSteps()
  const barber = useSelectBarber()
  const service = useSelectService()
  const time = useSelectTime()

  steps.value = 1
  barber.value = null
  service.value = ['']
  time.value = null
}