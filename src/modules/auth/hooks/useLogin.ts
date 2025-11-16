import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import toast from 'react-hot-toast'
import { useRouter } from '@tanstack/react-router'



export const useLogin = () => {

    const { navigate } = useRouter()

    const mutation = useMutation({
        mutationFn: authService.Login,
        onSuccess: (res) =>{
            localStorage.setItem('token', res);
            console.log("Login successful, token stored:", res);
            toast.success('¡Login exitoso!')
            navigate({ to: '/admin' })
        }
    })
    return mutation;
}