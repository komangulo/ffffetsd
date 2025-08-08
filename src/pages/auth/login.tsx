import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import { NexusButton } from "@/components/ui/nexus-button"
import Layout from "@/components/Layout"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular login exitoso
      alert("¡Inicio de sesión exitoso!")
      navigate("/")
      
    } catch (error) {
      alert("Error al iniciar sesión. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Back to Home */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </div>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Iniciar Sesión
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Accede a tu cuenta para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="nexus-card p-8 rounded-xl space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.email 
                      ? "border-red-500" 
                      : "border-border"
                  } bg-background text-foreground`}
                  placeholder="tu@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.password 
                      ? "border-red-500" 
                      : "border-border"
                  } bg-background text-foreground`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <span className="ml-2 text-sm text-muted-foreground">Recordarme</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <NexusButton
              type="submit"
              variant="nexus"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </NexusButton>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">O continúa con</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <NexusButton variant="nexusOutline" size="sm" className="w-full">
                Google
              </NexusButton>
              <NexusButton variant="nexusOutline" size="sm" className="w-full">
                Facebook
              </NexusButton>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link 
                  to="/register" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login
