import { useState } from "react"
import { Search, Plus, MapPin, Users, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { NexusButton } from "@/components/ui/nexus-button"
import Layout from "@/components/Layout"

interface GroupFormData {
  name: string
  description: string
  location: string
  restrictions: string
  privacy: "public" | "private"
}

const Groups = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [joinedGroups, setJoinedGroups] = useState<Set<number>>(new Set())
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Madrid",
      description: "Grupo de apoyo , aprendizaje y de la comunicad para personas en el BDSM en la comunidad de Madrid.",
      members: 1247,
      location: "Madrid, España",
      category: "Educación",
      isPrivate: true,
      lastActivity: "2h"
    },
    {
      id: 2,
      name: "Rope Bondage Barcelona",
      description: "Comunidad dedicada al shibari y bondage con cuerdas. Talleres y eventos regulares.",
      members: 834,
      location: "Barcelona, España",
      category: "Shibari",
      isPrivate: true,
      lastActivity: "4h"
    },
    {
      id: 3,
      name: "Dominatrices Profesionales",
      description: "Red de dominatrices profesionales para compartir experiencias y recursos.",
      members: 456,
      location: "Europa",
      category: "Profesional",
      isPrivate: true,
      lastActivity: "1d"
    },
    {
      id: 4,
      name: "Fetichismo del Látex",
      description: "Para amantes del látex, rubber y materiales similares. Discusiones y eventos.",
      members: 692,
      location: "Internacional",
      category: "Fetichismo",
      isPrivate: false,
      lastActivity: "6h"
    }
  ])

  const categories = [
    "Todos", "Educación", "Shibari", "Dominación", "Sumisión", "Fetichismo", "Profesional", "Social"
  ]

  const isJoined = (groupId: number) => joinedGroups.has(groupId)

  const joinGroup = (groupId: number) => {
    setJoinedGroups(prev => new Set([...prev, groupId]))
  }

  const leaveGroup = (groupId: number) => {
    setJoinedGroups(prev => {
      const newSet = new Set(prev)
      newSet.delete(groupId)
      return newSet
    })
  }

  const handleCreateGroup = (groupData: GroupFormData) => {
    // Crear nuevo grupo con ID único
    const newGroup = {
      id: Math.max(...groups.map(g => g.id)) + 1,
      name: groupData.name,
      description: groupData.description,
      members: 1, // El creador es el primer miembro
      location: groupData.location,
      category: "Nuevo", // Categoría por defecto
      isPrivate: groupData.privacy === "private",
      lastActivity: "Ahora",
      restrictions: groupData.restrictions || null
    }

    // Agregar el nuevo grupo a la lista
    setGroups(prev => [newGroup, ...prev])

    // Unirse automáticamente al grupo creado
    joinGroup(newGroup.id)

    // Mostrar notificación de éxito
    setToastMessage(`¡Grupo "${groupData.name}" creado exitosamente!`)
    setShowToast(true)

    console.log("Grupo creado:", newGroup)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold nexus-hero-text">Grupos de la Comunidad</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encuentra tu tribu. Únete a grupos privados y seguros donde puedes ser tú mismo 
            y compartir con personas que comparten tus intereses.
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar grupos por nombre, ubicación o intereses..."
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <NexusButton 
            variant="nexus" 
            size="lg" 
            className="lg:w-auto w-full"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Crear Grupo
          </NexusButton>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "Todos"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-accent text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => {
            const joined = isJoined(group.id)
            return (
              <div key={group.id} className="nexus-card p-6 rounded-xl hover:shadow-glow transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {group.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {group.category}
                      </span>
                      {group.isPrivate && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Privado
                        </span>
                      )}
                      {joined && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Miembro
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {group.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    {group.members.toLocaleString()} miembros
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {group.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    Última actividad {group.lastActivity}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {joined ? (
                    <NexusButton 
                      variant="nexusOutline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => leaveGroup(group.id)}
                    >
                      Dejar Grupo
                    </NexusButton>
                  ) : (
                    <NexusButton 
                      variant="nexus" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => joinGroup(group.id)}
                    >
                      Unirse
                    </NexusButton>
                  )}
                  <Link to={`/groups/${group.id}`}>
                    <NexusButton variant="nexusOutline" size="sm">
                      Ver Grupo
                    </NexusButton>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <NexusButton variant="nexusOutline" size="lg">
            Cargar Más Grupos
          </NexusButton>
        </div>

        {/* Create Group Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Crear Nuevo Grupo</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Funcionalidad de crear grupo temporalmente deshabilitada.
                </p>
                <div className="flex justify-end space-x-3 pt-6">
                  <NexusButton
                    variant="nexusOutline"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cerrar
                  </NexusButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2">
            <div className="flex items-center space-x-3 p-4 rounded-lg border shadow-lg bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{toastMessage}</p>
              <button 
                onClick={() => setShowToast(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Groups