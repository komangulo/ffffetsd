import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { upcomingEvents } from '@/data/events';
import { NexusButton } from '@/components/ui/nexus-button';
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const event = upcomingEvents.find(e => e.id.toString() === id);

  if (!event) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold nexus-hero-text">Evento no encontrado</h1>
          <p className="text-muted-foreground mt-4">No pudimos encontrar el evento que buscas.</p>
          <NexusButton asChild className="mt-6">
            <Link to="/events">Volver a Eventos</Link>
          </NexusButton>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link to="/events" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a todos los eventos
        </Link>

        <div className="nexus-card p-8 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-2">
                {event.category}
              </span>
              <h1 className="text-3xl font-bold text-foreground">{event.title}</h1>
            </div>
            <div className="text-2xl font-bold text-primary flex-shrink-0 pt-2">
              {event.price}
            </div>
          </div>

          <p className="text-muted-foreground text-lg mb-6">{event.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-b border-border py-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="font-semibold text-foreground">{formatDate(event.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hora</p>
                <p className="font-semibold text-foreground">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ubicación</p>
                <p className="font-semibold text-foreground">{event.location}, {event.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Asistencia</p>
                <p className="font-semibold text-foreground">{event.attendees} / {event.maxAttendees} confirmados</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <NexusButton variant="nexus" size="lg" className="w-full">
              Confirmar Asistencia
            </NexusButton>
            <NexusButton variant="nexusOutline" size="lg" className="w-full">
              Compartir Evento
            </NexusButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
