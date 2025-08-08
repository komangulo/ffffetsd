import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Loader2 } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  isAttending?: boolean;
  attendees?: number;
}

interface EventCardProps {
  event: Event;
  onRsvp: (eventId: string) => void;
  onCancelRsvp: (eventId: string) => void;
  isLoading?: boolean;
}

export function EventCard({ event, onRsvp, onCancelRsvp, isLoading = false }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col border-4 border-red-500">
      <p className="text-red-500 font-bold p-2">DEBUG: EventCard Component Loaded</p>
      <div className="h-32 bg-gradient-to-r from-blue-500 to-teal-500" />
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <Link href={`/events/${event.id}`} className="hover:underline">
            {event.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-1.5" />
          <span>{formattedDate}</span>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-4 w-4 mr-1.5" />
          <span>{event.location}</span>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow">
          {event.description}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {event.isAttending ? (
            <Button variant="outline" onClick={() => onCancelRsvp(event.id)} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Asistiendo'}
            </Button>
          ) : (
            <Button variant="default" onClick={() => onRsvp(event.id)} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar Asistencia
            </Button>
          )}
          <Button asChild variant="secondary">
            <Link href={`/events/${event.id}`}>Ver Detalles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
