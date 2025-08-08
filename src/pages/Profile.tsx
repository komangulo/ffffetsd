import { useState, useRef } from "react"
import { Edit, MapPin, Calendar, Users, Settings, Camera, Lock, Plus, MessageSquare } from "lucide-react"
import { NexusButton } from "@/components/ui/nexus-button"
import Layout from "@/components/Layout"
import { ChatWindow } from "@/components/chat/ChatWindow"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("about")
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userProfile, setUserProfile] = useState({
    username: "usuario_nuevo",
    displayName: "Usuario Nuevo",
    bio: "Haz clic en 'Editar Perfil' para agregar información sobre ti...",
    location: "Madrid, España",
    joinDate: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
    roles: ["sumiso", "Rope Bunny"],
    orientation: "Heterosexual Bicurioso",
    pronouns: "Ella/Elle",
    status: "Vivo el estilo de vida cuando puedo",
    lookingFor: ["Amistad", "Comunidad", "Eventos"],
    relationship: "dominante/sumiso",
    stats: {
      friends: 0,
      groups: 0,
      events: 0,
      photos: 6
    },
    privacy: {
      profileVisible: "Miembros",
      messagesFrom: "Amigos",
      albumsVisible: "Amigos"
    }
  })

  // Estado para edición del perfil
  const [editForm, setEditForm] = useState({
    displayName: userProfile.displayName,
    bio: userProfile.bio,
    location: userProfile.location,
    roles: [...userProfile.roles],
    orientation: userProfile.orientation,
    pronouns: userProfile.pronouns,
    status: userProfile.status,
    lookingFor: [...userProfile.lookingFor],
    relationship: userProfile.relationship
  })

  const friends = [] // Sin amigos inicialmente

  const groups = [] // Sin grupos inicialmente

  const albums = [] // Sin álbumes inicialmente

  const [isOwnProfile] = useState(true) // Cambiado a true para ver la versión de perfil propio
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)
  const [showAddWritingModal, setShowAddWritingModal] = useState(false)
  const [showAddFetishModal, setShowAddFetishModal] = useState(false)
  const [newPhoto, setNewPhoto] = useState<File | null>(null)
  const [newWriting, setNewWriting] = useState({ title: '', content: '' })
  const [newFetish, setNewFetish] = useState('')
  const [photos, setPhotos] = useState<Array<{id: string, url: string, caption: string}>>([])
  // Cargar escritos guardados al iniciar
  const [writings, setWritings] = useState<Array<{id: string, title: string, content: string, date: string}>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userWritings');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  })
  const [fetishes, setFetishes] = useState<Array<{id: string, name: string, description: string}>>([])
  
  // Estado para el chat
  const [showChat, setShowChat] = useState(false)
  const [currentRecipient, setCurrentRecipient] = useState('')

  const tabs = [
    { id: "about", label: "Acerca de", icon: Users },
    { id: "activity", label: "Actividad", icon: Calendar },
    { id: "photos", label: "Fotos", icon: Camera },
    { id: "writings", label: "Escritos", icon: Edit },
    { id: "fetishes", label: "Fetiches", icon: Lock },
  ]

  const handleSaveProfile = () => {
    setUserProfile(prev => ({
      ...prev,
      ...editForm
    }))
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditForm({
      displayName: userProfile.displayName,
      bio: userProfile.bio,
      location: userProfile.location,
      roles: [...userProfile.roles],
      orientation: userProfile.orientation,
      pronouns: userProfile.pronouns,
      status: userProfile.status,
      lookingFor: [...userProfile.lookingFor],
      relationship: userProfile.relationship
    })
    setIsEditing(false)
  }

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = () => {
    if (newPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, {
          id: Date.now().toString(),
          url: reader.result as string,
          caption: `Foto ${photos.length + 1}`
        }]);
        setShowAddPhotoModal(false);
        setNewPhoto(null);
      };
      reader.readAsDataURL(newPhoto);
    }
  };

  const handleAddWriting = () => {
    if (newWriting.title && newWriting.content) {
      const newWritings = [...writings, {
        id: Date.now().toString(),
        ...newWriting,
        date: new Date().toLocaleDateString()
      }];
      
      // Actualizar estado
      setWritings(newWritings);
      
      // Guardar en localStorage
      localStorage.setItem('userWritings', JSON.stringify(newWritings));
      
      // Limpiar y cerrar
      setNewWriting({ title: '', content: '' });
      setShowAddWritingModal(false);
    }
  };

  const handleAddFetish = () => {
    if (newFetish.trim()) {
      setFetishes(prev => [...prev, {
        id: Date.now().toString(),
        name: newFetish,
        description: 'Descripción del fetiche...'
      }]);
      setNewFetish('');
      setShowAddFetishModal(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="nexus-card rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar Section */}
            {/* Sección de foto de perfil */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Foto de perfil" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-4xl font-bold">
                      {userProfile.displayName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  onClick={handleChangePhoto}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <NexusButton 
                variant="nexusOutline" 
                size="sm" 
                className="mt-4"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
              </NexusButton>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              {!isEditing ? (
                <>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{userProfile.displayName}</h1>
                    <p className="text-xl text-primary">@{userProfile.username}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {userProfile.bio}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {userProfile.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      Miembro desde {userProfile.joinDate}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userProfile.stats.friends}</div>
                      <div className="text-sm text-muted-foreground">Amigos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userProfile.stats.groups}</div>
                      <div className="text-sm text-muted-foreground">Grupos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{userProfile.stats.events}</div>
                      <div className="text-sm text-muted-foreground">Eventos</div>
                    </div>
                  </div>
                </>
              ) : (
                /* Formulario de edición */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      value={editForm.displayName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      placeholder="Tu nombre de usuario"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Biografía
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      rows={3}
                      placeholder="Cuéntanos sobre ti..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Ubicación
                      </label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                        placeholder="Tu ubicación"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Rol en la comunidad
                      </label>
                      <select
                        value={editForm.roles[0] || ""}
                        onChange={(e) => setEditForm(prev => ({
                          ...prev,
                          roles: e.target.value ? [e.target.value, ...prev.roles.slice(1)] : prev.roles
                        }))}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="">Seleccionar rol principal</option>
                        <option value="Dominante">Dominante</option>
                        <option value="Sumiso">Sumiso</option>
                        <option value="Switch">Switch</option>
                        <option value="Vanilla">Vanilla</option>
                        <option value="Explorando">Explorando</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <NexusButton onClick={handleSaveProfile}>
                      Guardar Cambios
                    </NexusButton>
                    <NexusButton variant="nexusOutline" onClick={handleCancelEdit}>
                      Cancelar
                    </NexusButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-border overflow-x-auto">
            <nav className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "about" && (
            <div className="nexus-card rounded-xl p-6 space-y-6">
              {/* Sección de Fotos */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-foreground">Fotos</h3>
                  <button className="text-primary text-sm font-medium">
                    Ver fotos ({userProfile.stats.photos})
                  </button>
                </div>
                {/* Aquí iría la galería de fotos */}
                <div className="grid grid-cols-3 gap-2 rounded-lg overflow-hidden">
                  {photos.length > 0 ? (
                    photos.slice(0, 3).map((photo) => (
                      <div key={photo.id} className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${photo.url})` }} />
                    ))
                  ) : (
                    [...Array(Math.min(3, userProfile.stats.photos))].map((_, i) => (
                      <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                    ))
                  )}
                  {isOwnProfile && (
                    <button 
                      onClick={() => setShowAddPhotoModal(true)}
                      className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="h-6 w-6 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Añadir</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Información Básica */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Información</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <p className="text-foreground">{userProfile.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Relaciones</p>
                      <p className="text-foreground">{userProfile.relationship}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Roles</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userProfile.roles.map((role, i) => (
                          <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Orientación</p>
                      <p className="text-foreground">{userProfile.orientation}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Pronombres</p>
                      <p className="text-foreground">{userProfile.pronouns}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Estado</p>
                      <p className="text-foreground">{userProfile.status}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Busco</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userProfile.lookingFor.map((item, i) => (
                          <span key={i} className="px-3 py-1 bg-secondary/50 text-foreground rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Te uniste</p>
                      <p className="text-foreground">{userProfile.joinDate}</p>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-3">
                    <button className="text-sm text-primary hover:underline">Añadir nota</button>
                    <span className="text-border">•</span>
                    <button className="text-sm text-primary hover:underline">Regalar apoyo</button>
                    <span className="text-border">•</span>
                    <button className="text-sm text-primary hover:underline">Nuestras conversaciones</button>
                    <span className="text-border">•</span>
                    <button className="text-sm text-destructive hover:underline">Denunciar</button>
                    <span className="text-border">•</span>
                    <button className="text-sm text-destructive hover:underline">Silenciar</button>
                    <span className="text-border">•</span>
                    <button className="text-sm text-destructive hover:underline">Bloquear</button>
                    <span className="text-border">•</span>
                    <button 
                      onClick={() => {
                        setCurrentRecipient(userProfile.displayName);
                        setShowChat(true);
                      }}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <MessageSquare size={16} />
                      <span>Enviar mensaje</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "friends" && (
            <div className="nexus-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Amigos ({friends.length})</h3>
              {friends.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {friend.avatar}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{friend.name}</h4>
                        <p className="text-sm text-muted-foreground">{friend.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Aún no tienes amigos</p>
                  <p className="text-sm text-muted-foreground">Únete a grupos y eventos para conocer gente</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "groups" && (
            <div className="nexus-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Grupos ({groups.length})</h3>
              {groups.length > 0 ? (
                <div className="space-y-4">
                  {groups.map((group) => (
                    <div key={group.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-accent transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">{group.members} miembros</p>
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {group.role}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Aún no perteneces a ningún grupo</p>
                  <p className="text-sm text-muted-foreground">Explora grupos en la sección de Grupos</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "albums" && (
            <div className="nexus-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Álbumes ({albums.length})</h3>
              {albums.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {albums.map((album) => (
                    <div key={album.id} className="p-4 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{album.name}</h4>
                        <span className="text-sm text-muted-foreground">{album.photos} fotos</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{album.privacy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Aún no tienes álbumes</p>
                  <p className="text-sm text-muted-foreground">Crea álbumes para compartir tus fotos</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "writings" && (
            <div className="nexus-card rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-foreground">Mis escritos</h3>
                {isOwnProfile && (
                  <button
                    onClick={() => setShowAddWritingModal(true)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nuevo escrito</span>
                  </button>
                )}
              </div>
              
              {writings.length > 0 ? (
                <div className="space-y-4">
                  {writings.map((writing) => (
                    <div key={writing.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-foreground">{writing.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-3">{writing.content}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{writing.date}</span>
                        <button className="text-primary text-sm hover:underline">Leer más</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Edit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {isOwnProfile 
                      ? "Aún no has publicado ningún escrito"
                      : "Este usuario aún no ha publicado ningún escrito"}
                  </p>
                  {isOwnProfile && (
                    <button
                      onClick={() => setShowAddWritingModal(true)}
                      className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
                    >
                      Escribe tu primer artículo
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar foto */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Agregar foto</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPhoto(e.target.files?.[0] || null)}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {newPhoto ? newPhoto.name : 'Haz clic para seleccionar una imagen'}
                  </p>
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddPhotoModal(false);
                    setNewPhoto(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddPhoto}
                  disabled={!newPhoto}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                    newPhoto ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Subir foto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar escrito */}
      {showAddWritingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Nuevo escrito</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={newWriting.title}
                  onChange={(e) => setNewWriting({...newWriting, title: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Título del escrito"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contenido</label>
                <textarea
                  value={newWriting.content}
                  onChange={(e) => setNewWriting({...newWriting, content: e.target.value})}
                  className="w-full h-40 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Escribe tu contenido aquí..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddWritingModal(false);
                    setNewWriting({title: '', content: ''});
                  }}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddWriting}
                  disabled={!newWriting.title || !newWriting.content}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                    newWriting.title && newWriting.content ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar fetiche */}
      {showAddFetishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Agregar fetiche</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del fetiche</label>
                <input
                  type="text"
                  value={newFetish}
                  onChange={(e) => setNewFetish(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Ej. Bondage, Dominación, etc."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddFetishModal(false);
                    setNewFetish('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddFetish}
                  disabled={!newFetish.trim()}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                    newFetish.trim() ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Ventana de chat */}
      {showChat && (
        <ChatWindow 
          recipient={currentRecipient} 
          onClose={() => setShowChat(false)} 
        />
      )}
    </Layout>
  )
}

export default Profile