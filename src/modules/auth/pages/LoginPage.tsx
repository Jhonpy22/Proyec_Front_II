import { useState } from "react"
import { useForm } from '@tanstack/react-form';
import { FiLogIn } from "react-icons/fi"
import { MdEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { TiArrowBack } from "react-icons/ti"
import { useLogin } from "../hooks/useLogin";
import { LoginSchema } from "../schemas/Login.schema"
import { zodField, zodForm } from "../zod";


export default function LoginPage() {
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null);
  const loginMutation = useLogin({ toastOnError: false });

  const form = useForm({
    defaultValues: { email: '', password: '' },
    validators: { onSubmit: zodForm(LoginSchema), onChange: zodForm(LoginSchema) },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await loginMutation.mutateAsync(value);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
        setServerError(msg);
      }
    }
  });

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: "url(https://i.ibb.co/JWXCGSRz/white-black-computer-mono-pc-laptop-web-internet-385137.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-md bg-black/20 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Iniciar Sesión</h1>
        
        <form noValidate onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className="space-y-6">
          <form.Field
            name="email"
            validators={{ onBlur: zodField(LoginSchema.shape.email), onChange: zodField(LoginSchema.shape.email) }}
          >
            {(field) => (
              <div className="mb-6">
                <label 
                  htmlFor="email"
                  className={`text-lg gap-0.5 font-medium mb-2 transition-colors duration-300 inline-flex items-center ${
                    emailFocused || field.state.value ? "text-[#ffffff]" : "text-[#3dc2e4]"
                  }`}
                >
                  <MdEmail className="h-4 w-4" aria-hidden="true"/> Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => { setEmailFocused(false); field.handleBlur(); }}
                  aria-describedby={field.state.meta.errors?.length ? 'email-error' : undefined}
                  className="w-full py-3 px-4 bg-white/10 border-2 border-[#8E8E8E]/40 rounded-xl text-white placeholder-white/50 outline-none transition-all duration-300 hover:border-[#8E8E8E]/60 focus:border-[#2B7A8E] focus:bg-white/15 focus:shadow-lg focus:shadow-[#2B7A8E]/30"
                  placeholder="your@email.com"
                  required
                />
                {!!field.state.meta.errors?.length && (
                  <p id="email-error" className="text-red-400 text-sm mt-2" aria-live="polite">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onBlur: zodField(LoginSchema.shape.password), onChange: zodField(LoginSchema.shape.password) }}
          >
            {(field) => (
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className={`inline-flex items-center text-lg font-medium mb-2 gap-0.5 transition-colors duration-300 ${
                    passwordFocused || field.state.value ? "text-[#ffffff]" : "text-[#3dc2e4]"
                  }`}
                >
                  <RiLockPasswordFill className="h-4 w-4" aria-hidden="true" /> Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    maxLength={25}
                    autoComplete="current-password"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => { setPasswordFocused(false); field.handleBlur(); }}
                    aria-describedby={field.state.meta.errors?.length ? 'password-error' : undefined}
                    className="w-full py-3 px-4 bg-white/5 border-2 border-[#8E8E8E]/30 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-300 hover:border-[#8E8E8E]/50 focus:border-[#2B7A8E] focus:bg-white/10 focus:shadow-lg focus:shadow-[#2B7A8E]/30"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {!!field.state.meta.errors?.length && (
                  <p id="password-error" className="text-red-400 text-sm mt-2" aria-live="polite">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="inline-flex items-center justify-center gap-1 w-full py-3 bg-[#ff4444] hover:bg-[#ff5555] text-white font-bold text-base rounded-full transition-all duration-300 shadow-lg hover:shadow-[#ff4444]/50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-busy={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Accediendo...' : 'Acceder'} <FiLogIn className="h-4 w-4" aria-hidden="true"/>
          </button>
        </form>

        <p className="text-center text-white/70 text-sm mt-6">
          <a href="/" className="inline-flex items-center justify-center text-[#00ccff] hover:text-[#3A99B4] text-lg transition font-semibold">
            <TiArrowBack className="h-5 w-5" aria-hidden="true"/> Volver a inicio
          </a>
        </p>
      </div>
    </div>
  )
}