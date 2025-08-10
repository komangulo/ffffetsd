import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Users, Calendar, MessageCircle, User, Settings, Heart, ChevronDown } from "lucide-react"
import { NexusButton } from "./ui/nexus-button"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navItems = [
    { name: "Inicio", href: "/", icon: Users },
    { name: "Grupos", href: "/groups", icon: Users },
    { name: "Eventos", href: "/events", icon: Calendar },
    { name: "Mensajes", href: "/messages", icon: MessageCircle },
    { name: "Perfil", href: "/profile", icon: User },
  ]

  const dropdownItems = [
    { name: "Fetiches", href: "/fetiches", icon: Heart },
    { name: "Roles", href: "/roles", icon: Heart },
    { name: "Fetichionario", href: "/fetichionario", icon: Heart },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold">bdsmsocial</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            
            {/* Dropdown for Fetiches/Roles */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  (isActive("/fetiches") || isActive("/roles") || isActive("/fetichionario"))
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Heart className="h-4 w-4" />
                <span>Mas</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isDropdownOpen && "rotate-180")} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                  {dropdownItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors",
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <NexusButton variant="nexusOutline" size="sm">
                Iniciar Sesión
              </NexusButton>
            </Link>
            <Link to="/register">
              <NexusButton variant="nexus" size="sm">
                Registrarse
              </NexusButton>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium",
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              {/* Mobile dropdown for Fetiches/Roles */}
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium",
                    (isActive("/fetiches") || isActive("/roles"))
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Fetiches</span>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", isDropdownOpen && "rotate-180")} />
                </button>
                
                {isDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {dropdownItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => {
                            setIsOpen(false)
                            setIsDropdownOpen(false)
                          }}
                          className={cn(
                            "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium",
                            isActive(item.href)
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
              <div className="pt-4 space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <NexusButton variant="nexusOutline" size="sm" className="w-full">
                    Iniciar Sesión
                  </NexusButton>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <NexusButton variant="nexus" size="sm" className="w-full">
                    Registrarse
                  </NexusButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default Navigation