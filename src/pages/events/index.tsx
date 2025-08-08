import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/events/EventCard';
import { Plus } from 'lucide-react';

// Placeholder for the Event type - we will define this properly later
interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  isAttending?: boolean;
  attendees?: number;
}

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const fetchedEvents = await response.json();
        setEvents(fetchedEvents.map((e: any) => ({ ...e, isAttending: false, attendees: Math.floor(Math.random() * 100) })));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRsvp = async (eventId: string) => {
    setLoadingEventId(eventId);
    const originalEvents = [...events];
    setEvents(events.map(event => 
      event.id === eventId
        ? { ...event, isAttending: true, attendees: (event.attendees || 0) + 1 }
        : event
    ));

    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to RSVP');
    } catch (error) {
      console.error(error);
      setEvents(originalEvents);
    } finally {
      setLoadingEventId(null);
    }
  };

  const handleCancelRsvp = async (eventId: string) => {
    setLoadingEventId(eventId);
    const originalEvents = [...events];
    setEvents(events.map(event => 
      event.id === eventId
        ? { ...event, isAttending: false, attendees: Math.max(0, (event.attendees || 0) - 1) }
        : event
    ));

    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to cancel RSVP');
    } catch (error) {
      console.error(error);
      setEvents(originalEvents);
    } finally {
      setLoadingEventId(null);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout title="Events">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Find and join events hosted by groups and the community.
              </p>
            </div>
            <Button 
              variant="default" 
              onClick={() => router.push('/events/create')}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>

          {/* Events Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p>Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRsvp={() => handleRsvp(event.id)}
                  onCancelRsvp={() => handleCancelRsvp(event.id)}
                  isLoading={loadingEventId === event.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p>No events found.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
