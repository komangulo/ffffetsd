import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react"
import { NexusButton } from "@/components/ui/nexus-button"
import Layout from "@/components/Layout"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirma tu contraseña"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    if (!agreedToTerms) {
      newErrors.terms = "Debes aceptar los términos y condiciones"
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
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simular registro exitoso
      alert("¡Cuenta creada exitosamente! Bienvenido a la comunidad.")
      navigate("/")
      
    } catch (error) {
      alert("Error al crear la cuenta. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = () => {
    const password = formData.password
    if (!password) return { strength: 0, color: "bg-gray-200", text: "" }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]
    const texts = ["Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte"]
    
    return {
      strength: Math.min(strength, 5),
      color: colors[Math.min(strength - 1, 4)],
      text: texts[Math.min(strength - 1, 4)]
    }
  }

  const strength = passwordStrength()

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
              Crear Cuenta
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Únete a nuestra comunidad
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="nexus-card p-8 rounded-xl space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name 
                      ? "border-red-500" 
                      : "border-border"
                  } bg-background text-foreground`}
                  placeholder="Tu nombre completo"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

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
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded ${
                          level <= strength.strength ? strength.color : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {strength.text}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.confirmPassword 
                      ? "border-red-500" 
                      : "border-border"
                  } bg-background text-foreground`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-1"
                />
                <div className="text-sm text-muted-foreground">
                  Acepto los{" "}
                  <Link to="/terms" className="text-primary hover:text-primary/80">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-primary hover:text-primary/80">
                    política de privacidad
                  </Link>
                </div>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <NexusButton
              type="submit"
              variant="nexus"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </NexusButton>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">O regístrate con</span>
              </div>
            </div>

            {/* Social Register */}
            <div className="grid grid-cols-2 gap-3">
              <NexusButton variant="nexusOutline" size="sm" className="w-full">
                Google
              </NexusButton>
              <NexusButton variant="nexusOutline" size="sm" className="w-full">
                Facebook
              </NexusButton>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link 
                  to="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register
