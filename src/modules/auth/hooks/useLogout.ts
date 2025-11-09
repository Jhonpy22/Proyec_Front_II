import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'
import { useRouter } from '@tanstack/react-router'

export function useLogout() {
    const qc = useQueryClient()
    const { navigate } = useRouter()

        return useMutation({
            mutationFn: () => Promise.resolve(authService.logout()),
            onSuccess: () => {
            qc.removeQueries({ queryKey: ['me'], exact: true })
        toast('Sesión cerrada')
        navigate({ to: '/login', replace: true })
        },
        onError: (err: unknown) => {
            const message = err instanceof Error ? err.message : 'No se pudo cerrar sesión'
            toast.error(message)
        },
    })
}
