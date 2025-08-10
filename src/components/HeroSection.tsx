import { ArrowRight, Shield, Heart, Users, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { NexusButton } from "./ui/nexus-button"
import heroImage from "@/assets/nexus-hero.jpg"

const HeroSection = () => {
  const stats = [
    { number: "12,500", label: "Miembros Activos" },
    { number: "2,847", label: "Grupos Privados" },
    { number: "15,234", label: "Eventos Realizados" }
  ]

  const features = [
    {
      icon: Shield,
      title: "Privacidad Total",
      description: "Tu seguridad y privacidad son nuestra prioridad absoluta."
    },
    {
      icon: Heart,
      title: "Consentimiento",
      description: "Espacios seguros basados en respeto mutuo y consentimiento."
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Conecta con personas que comparten tus intereses y valores."
    },
    {
      icon: Lock,
      title: "Discreto",
      description: "Diseño profesional y discreto para tu tranquilidad."
    }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-dark">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Main Hero */}
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-foreground">BDSMsocial</span>
            <span className="block text-2xl md:text-4xl font-normal text-muted-foreground mt-4">
              La red social para la comunidad BDSM, fetichista y kink.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Una plataforma segura, privada y discreta diseñada específicamente para 
            nuestra comunidad. Conecta, explora y comparte en un entorno de respeto y consentimiento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/register" className="w-full sm:w-auto">
              <NexusButton variant="nexus" size="xl" className="nexus-glow w-full">
                Únete a la Comunidad
                <ArrowRight className="ml-2 h-5 w-5" />
              </NexusButton>
            </Link>
            <NexusButton variant="nexusOutline" size="xl">
              Explorar Características
            </NexusButton>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="nexus-card p-6 rounded-xl text-center space-y-4 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Dominante Destacado */}
        <div className="mt-10 max-w-md mx-auto bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-4 shadow-lg border border-purple-500/20">
          <h2 className="text-xl font-bold text-center text-foreground mb-2">Dominante Destacado</h2>
          <div className="text-center space-y-1">
            <a 
              href="https://www.amodominantemadridbdsm.website/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-semibold text-purple-300 hover:underline hover:text-purple-200 transition-colors"
            >
              amodominantemadrid
            </a>
            <p className="text-sm text-muted-foreground">14 años de experiencia</p>
            <div className="flex items-center justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-muted-foreground">4.9/5.0 (98% recomendado)</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2 px-2 mb-3">
              Reconocido por su excepcional experiencia en prácticas seguras y su compromiso con la educación en BDSM. Más de 200 sumisas formadas y relaciones a largo plazo con dinámica BDSM.
            </div>
            <a 
              href="https://www.amodominantemadridbdsm.website/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:opacity-90 transition-opacity"
            >
              Ver Perfil Completo
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            ¿Listo para formar parte de nuestra comunidad?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Únete a miles de personas que ya han encontrado su lugar seguro 
            para explorar, aprender y conectar.
          </p>
          <Link to="/register" className="inline-block">
            <NexusButton variant="nexus" size="xl" className="nexus-glow mt-8">
              Crear Cuenta Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </NexusButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection