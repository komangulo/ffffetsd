import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Users, MessageSquare, Info, Calendar, MapPin, Shield, FileText, Lock } from "lucide-react"
import { NexusButton } from "@/components/ui/nexus-button"
import Layout from "@/components/Layout"

const GroupDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("about")
  const [joinedGroups, setJoinedGroups] = useState<Set<number>>(new Set())
  const groupId = parseInt(id || "1")
  const joined = joinedGroups.has(groupId)

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

  // Datos del grupo (en un caso real, esto vendría de una API)
  const groupData = {
    id: groupId,
    name: "Madrid",
    description: "Grupo de apoyo , aprendizaje y de la comunicad para personas en el BDSM en la comunidad de Madrid. Aquí encontrarás recursos, consejos y apoyo para comenzar tu viaje en el BDSM de forma segura y consensuada.",
    category: "Educación",
    isPrivate: true,
    members: 1247,
    location: "Madrid, España",
    createdAt: "Enero 2020",
    lastActivity: "2h",
    rules: [
      "Respeto mutuo es fundamental",
      "No se permite contenido explícito sin consentimiento",
      "Mantener la privacidad de los miembros",
      "No juzgar las preferencias de otros",
      "Siempre practicar SSC (Seguro, Sano y Consensuado)"
    ],
    stats: {
      totalMembers: 1247,
      activeMembers: 892,
      discussions: 156,
      events: 23
    },
    members: [
      { id: 1, name: "Ana M.", role: "Admin", avatar: "AM", joinDate: "2020", isOnline: true },
      { id: 2, name: "Carlos R.", role: "Moderador", avatar: "CR", joinDate: "2021", isOnline: false },
      { id: 3, name: "Elena S.", role: "Miembro", avatar: "ES", joinDate: "2022", isOnline: true },
      { id: 4, name: "David L.", role: "Miembro", avatar: "DL", joinDate: "2022", isOnline: false },
      { id: 5, name: "María P.", role: "Miembro", avatar: "MP", joinDate: "2023", isOnline: true }
    ],
    discussions: [
      {
        id: 1,
        title: "¿Cómo iniciar una conversación sobre BDSM con mi pareja?",
        author: "Elena S.",
        replies: 12,
        views: 89,
        lastActivity: "1h",
        isPinned: true
      },
      {
        id: 2,
        title: "Recomendaciones para primeros talleres de shibari",
        author: "Carlos R.",
        replies: 8,
        views: 156,
        lastActivity: "3h",
        isPinned: false
      },
      {
        id: 3,
        title: "Experiencias con aftercare - compartir consejos",
        author: "Ana M.",
        replies: 23,
        views: 234,
        lastActivity: "5h",
        isPinned: false
      }
    ]
  }

  const tabs = [
    { id: "about", label: "Acerca de y normas", icon: Info },
    { id: "discussions", label: "Debates", icon: MessageSquare },
    { id: "members", label: "Miembros", icon: Users }
  ]

  const handleLeaveGroup = () => {
    leaveGroup(groupId)
    navigate("/groups")
  }

  if (!groupData) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold nexus-hero-text">Grupo no encontrado</h1>
          <p className="text-muted-foreground mt-4">No pudimos encontrar el grupo que buscas.</p>
          <Link to="/groups">
            <NexusButton className="mt-6">Volver a Grupos</NexusButton>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/groups" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a todos los grupos
          </Link>

          <div className="nexus-card p-6 rounded-xl">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {groupData.category}
                  </span>
                  {groupData.isPrivate && (
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
                <h1 className="text-3xl font-bold text-foreground mb-2">{groupData.name}</h1>
                <p className="text-muted-foreground text-lg">{groupData.description}</p>
              </div>
              <div className="flex space-x-2">
                {joined ? (
                  <NexusButton 
                    variant="nexusOutline" 
                    size="lg"
                    onClick={handleLeaveGroup}
                  >
                    Dejar Grupo
                  </NexusButton>
                ) : (
                  <NexusButton 
                    variant="nexus" 
                    size="lg"
                    onClick={() => joinGroup(groupId)}
                  >
                    Unirse al Grupo
                  </NexusButton>
                )}
                {joined && (
                  <NexusButton variant="nexusOutline" size="lg">
                    Invitar
                  </NexusButton>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido restringido para no miembros */}
        {!joined && (
          <div className="nexus-card p-8 rounded-xl text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contenido Privado</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Este grupo es privado. Necesitas unirte para ver debates, miembros y contenido completo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NexusButton 
                variant="nexus" 
                size="lg"
                onClick={() => joinGroup(groupId)}
              >
                Unirse al Grupo
              </NexusButton>
              <Link to="/groups">
                <NexusButton variant="nexusOutline" size="lg">
                  Explorar Otros Grupos
                </NexusButton>
              </Link>
            </div>
          </div>
        )}

        {/* Contenido completo solo para miembros */}
        {joined && (
          <>
            {/* Tabs */}
            <div className="mb-8">
              <div className="border-b border-border">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "about" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Estadísticas del grupo */}
                  <div className="nexus-card p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <Info className="h-5 w-5 mr-2 text-primary" />
                      Estadísticas del grupo
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <div className="text-2xl font-bold text-primary">{groupData.stats.totalMembers}</div>
                        <div className="text-sm text-muted-foreground">Miembros totales</div>
                      </div>
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <div className="text-2xl font-bold text-primary">{groupData.stats.activeMembers}</div>
                        <div className="text-sm text-muted-foreground">Miembros activos</div>
                      </div>
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <div className="text-2xl font-bold text-primary">{groupData.stats.discussions}</div>
                        <div className="text-sm text-muted-foreground">Debates</div>
                      </div>
                      <div className="text-center p-4 bg-accent rounded-lg">
                        <div className="text-2xl font-bold text-primary">{groupData.stats.events}</div>
                        <div className="text-sm text-muted-foreground">Eventos</div>
                      </div>
                    </div>
                  </div>

                  {/* Información del grupo */}
                  <div className="nexus-card p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      Información del grupo
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-muted-foreground">Ubicación:</span>
                        <span className="ml-2 text-foreground">{groupData.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-muted-foreground">Creado:</span>
                        <span className="ml-2 text-foreground">{groupData.createdAt}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-muted-foreground">Miembros:</span>
                        <span className="ml-2 text-foreground">{groupData.members.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-muted-foreground">Tipo:</span>
                        <span className="ml-2 text-foreground">{groupData.isPrivate ? "Privado" : "Público"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Reglas */}
                  <div className="nexus-card p-6 rounded-xl lg:col-span-2">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Reglas del grupo
                    </h3>
                    <div className="space-y-3">
                      {groupData.rules.map((rule, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-muted-foreground">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "discussions" && (
                <div className="nexus-card p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Debates</h3>
                    <NexusButton variant="nexus" size="sm">
                      Nuevo Debate
                    </NexusButton>
                  </div>
                  <div className="space-y-4">
                    {groupData.discussions.map((discussion) => (
                      <div key={discussion.id} className="border border-border rounded-lg p-4 hover:bg-accent transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {discussion.isPinned && (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                  Fijado
                                </span>
                              )}
                              <h4 className="font-medium text-foreground">{discussion.title}</h4>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Por {discussion.author}</span>
                              <span>{discussion.replies} respuestas</span>
                              <span>{discussion.views} vistas</span>
                              <span>Hace {discussion.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "members" && (
                <div className="nexus-card p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Miembros ({groupData.members.length})</h3>
                    <NexusButton variant="nexusOutline" size="sm">
                      Invitar Miembros
                    </NexusButton>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupData.members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {member.avatar}
                          </div>
                          {member.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{member.name}</h4>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-muted-foreground">{member.role}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">Desde {member.joinDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default GroupDetail
