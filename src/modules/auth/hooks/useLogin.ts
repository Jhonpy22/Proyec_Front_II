import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'
import { useRouter } from '@tanstack/react-router'

export function useLogin(opts: { toastOnError?: boolean } = {}) {
    
    const { navigate } = useRouter()

    return useMutation({
        mutationFn: authService.login,
        onSuccess: async () => {
            toast.success('¡Login exitoso!')
            navigate({ to: '/admin' })
        },
        onError: (err: unknown) => {
            if (opts.toastOnError) {
                const message = err instanceof Error ? err.message : 'Error inesperado'
                toast.error(message)
            }
            console.error(err)
        },
    })
}
