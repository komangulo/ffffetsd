import { useState } from "react"
import { Calendar, MapPin, Clock, Users, Filter, Plus } from "lucide-react"
import { NexusButton } from "@/components/ui/nexus-button"
import { Link } from "react-router-dom"
import Layout from "@/components/Layout"
import CreateEventModal from "@/components/CreateEventModal"
import Toast from "@/components/ui/toast"

interface EventFormData {
  title: string
  category: string
  price: string
  description: string
  date: string
  time: string
  location: string
  capacity: string
  organizer: string
}

const Events = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Taller de Introducción al Shibari",
      category: "Educación",
      price: "25€",
      description: "Aprende las técnicas básicas del shibari en un ambiente seguro y respetuoso.",
      date: "2024-08-15",
      time: "19:00",
      location: "Centro Cultural Madrid, Madrid",
      confirmed: 24,
      capacity: 30,
      organizer: "BDSM Madrid"
    },
    {
      id: 2,
      title: "Fiesta Fetish Barcelona",
      category: "Fiesta",
      price: "15€",
      description: "Una noche de diversión y conexión en un ambiente seguro y consensuado.",
      date: "2024-08-20",
      time: "22:00",
      location: "Club Privado, Barcelona",
      confirmed: 45,
      capacity: 60,
      organizer: "Fetish Barcelona"
    },
    {
      id: 3,
      title: "Conferencia sobre Consentimiento",
      category: "Conferencia",
      price: "Gratis",
      description: "Charla sobre la importancia del consentimiento en las relaciones BDSM.",
      date: "2024-08-25",
      time: "18:30",
      location: "Universidad Complutense, Madrid",
      confirmed: 12,
      capacity: 50,
      organizer: "BDSM Education"
    }
  ])

  const eventCategories = [
    "Todos", "Educación", "Taller", "Fiesta", "Conferencia", "Encuentro", "Exhibición", "Networking"
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return date.toLocaleDateString('es-ES', options)
  }

  const handleCreateEvent = (eventData: EventFormData) => {
    // Crear nuevo evento con ID único
    const newEvent = {
      id: Math.max(...events.map(e => e.id)) + 1,
      title: eventData.title,
      category: eventData.category,
      price: eventData.price || "Gratis",
      description: eventData.description,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      confirmed: 0, // Sin confirmaciones inicialmente
      capacity: parseInt(eventData.capacity),
      organizer: eventData.organizer
    }

    // Agregar el nuevo evento a la lista
    setEvents(prev => [newEvent, ...prev])

    // Mostrar notificación de éxito
    setToastMessage(`¡Evento "${eventData.title}" creado exitosamente!`)
    setShowToast(true)

    console.log("Evento creado:", newEvent)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold nexus-hero-text">Eventos de la Comunidad</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre talleres, conferencias, fiestas y encuentros sociales.
            Conecta con la comunidad en eventos seguros y respetuosos.
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar eventos por título, categoría o ubicación..."
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
            Crear Evento
          </NexusButton>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {eventCategories.map((category) => (
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

        {/* Events List */}
        <div className="space-y-6 mb-12">
          {events.map((event) => (
            <div key={event.id} className="nexus-card p-6 rounded-xl hover:shadow-glow transition-all duration-300">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                          {event.category}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {event.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {event.confirmed}/{event.capacity} confirmados
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 lg:ml-6">
                  <NexusButton variant="nexus" size="sm" className="w-full">
                    Asistir
                  </NexusButton>
                  <Link to={`/events/${event.id}`}>
                    <NexusButton variant="nexusOutline" size="sm" className="w-full">
                      Ver Detalles
                    </NexusButton>
                  </Link>
                  <NexusButton variant="nexusGhost" size="sm" className="w-full">
                    Compartir
                  </NexusButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <NexusButton variant="nexusOutline" size="lg">
            Cargar Más Eventos
          </NexusButton>
        </div>

        {/* Create Event Modal */}
        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateEvent}
        />

        {/* Toast Notification */}
        <Toast
          message={toastMessage}
          type="success"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </Layout>
  )
}

export default Events