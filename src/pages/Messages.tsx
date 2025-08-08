import { useState } from "react"
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react"
import { NexusButton } from "@/components/ui/nexus-button"
import Navigation from "@/components/Navigation"

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Elena Martínez",
      avatar: "EM",
      lastMessage: "¿Vienes al taller de shibari este sábado?",
      time: "14:32",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Grupo: Principiantes Madrid",
      avatar: "PM",
      lastMessage: "Recordad traer vuestra propia cuerda al taller",
      time: "12:15",
      unread: 5,
      online: false,
      isGroup: true
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      avatar: "AR",
      lastMessage: "Gracias por los consejos sobre aftercare",
      time: "ayer",
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: "Comunidad Barcelona",
      avatar: "CB",
      lastMessage: "Nueva fiesta fetichista el próximo mes",
      time: "ayer",
      unread: 1,
      online: false,
      isGroup: true
    }
  ]

  const messages = [
    {
      id: 1,
      sender: "Elena Martínez",
      content: "¡Hola! ¿Cómo estás?",
      time: "14:30",
      isMine: false
    },
    {
      id: 2,
      sender: "Tú",
      content: "¡Muy bien! Preparándome para el taller del sábado",
      time: "14:31",
      isMine: true
    },
    {
      id: 3,
      sender: "Elena Martínez",
      content: "¿Vienes al taller de shibari este sábado? Va a estar genial, el instructor es muy bueno",
      time: "14:32",
      isMine: false
    }
  ]

  const currentChat = conversations.find(c => c.id === selectedChat)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16 h-screen flex">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-border flex flex-col bg-card">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Mensajes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar conversaciones..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-accent ${
                  selectedChat === conv.id ? "bg-accent" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground truncate">
                        {conv.name}
                        {conv.isGroup && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Grupo
                          </span>
                        )}
                      </h3>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {currentChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{currentChat.name}</h3>
                    {currentChat.online && !currentChat.isGroup && (
                      <p className="text-sm text-green-500">En línea</p>
                    )}
                    {currentChat.isGroup && (
                      <p className="text-sm text-muted-foreground">24 miembros</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!currentChat.isGroup && (
                    <>
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <Video className="h-5 w-5 text-muted-foreground" />
                      </button>
                    </>
                  )}
                  <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isMine
                          ? "bg-gradient-primary text-white"
                          : "nexus-card text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isMine ? "text-white/70" : "text-muted-foreground"
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <NexusButton 
                    variant="nexus" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </NexusButton>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto flex items-center justify-center">
                  <Send className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Selecciona una conversación
                </h3>
                <p className="text-muted-foreground">
                  Elige una conversación de la lista para comenzar a chatear
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages