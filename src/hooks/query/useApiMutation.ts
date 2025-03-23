// hooks/useApiMutation.ts
import { useMutation } from '@tanstack/react-query'
import { ToastAndroid } from 'react-native'

export const useApiMutation = <TData, TVariables>(
  mutationFn: (vars: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void
    onError?: (error: any) => void
    successMessage?: string
    errorMessage?: string
  },
) => {
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (options?.successMessage) {
        ToastAndroid.show(options.successMessage, ToastAndroid.SHORT)
      }
      options?.onSuccess?.(data)
    },
    onError: (err) => {
      console.error('API Error:', err)
      ToastAndroid.show(options?.errorMessage || 'Something went wrong.', ToastAndroid.SHORT)
      options?.onError?.(err)
    },
  })
}
