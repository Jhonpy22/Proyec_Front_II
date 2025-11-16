import { z } from 'zod'

export const LoginSchema = z.object({
    email: z
    .string().trim().min(1, 'El correo electrónico es obligatorio.').email('Formato de email inválido').max(50, 'El correo no puede tener más de 50 caracteres'),
    password: z
    .string().max(128, 'La contraseña no puede tener más de 128 caracteres'),
})

export type LoginDTO = z.infer<typeof LoginSchema>
