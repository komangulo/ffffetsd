import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PostCard from "@/components/posts/PostCard";
import PostComposer from "@/components/posts/PostComposer";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Search, MessageSquare, Calendar, Users, Settings, Plus, MoreHorizontal } from 'lucide-react';
import { Group, GroupPost as Post } from '@/types/group';



export default function GroupPage() {
  const router = useRouter();
  const { id } = router.query;
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('discussion');
  const [showComposer, setShowComposer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!id) {
        console.log('No group ID provided');
        return;
      }
      
      console.log('Fetching group details for ID:', id);
      setIsLoading(true);
      
      try {
        const apiUrl = `${window.location.origin}/api/groups/${id}`;
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch group details: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Received group data:', data);
        
        if (!data.group) {
          console.error('No group data in response:', data);
          throw new Error('No group data received from server');
        }
        
        setGroup(data.group);
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching group details:', error);
        setGroup(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  const handleJoinGroup = () => {
    if (!group) return;
    setGroup({
      ...group,
      isMember: true,
      memberCount: group.memberCount + 1,
    });
    // In a real app, you would call an API to join the group
  };

  const handleLeaveGroup = () => {
    if (!group) return;
    setGroup({
      ...group,
      isMember: false,
      memberCount: Math.max(0, group.memberCount - 1),
    });
    // In a real app, you would call an API to leave the group
  };

  const handlePostCreated = (content: string) => {
    const newPost: Post = {
      id: new Date().toISOString(), // Placeholder ID
      content,
      author: {
        id: 'user-1', // Placeholder user ID
        name: 'Current User', // Placeholder user name
        username: 'currentuser',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setShowComposer(false);
  };

  const handlePostDeleted = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEventAttendance = (eventId: string, attending: boolean) => {
    if (!group) return;
    
    setGroup({
      ...group,
      upcomingEvents: group.upcomingEvents.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              isAttending: attending,
              attendees: attending ? event.attendees + 1 : Math.max(0, event.attendees - 1)
            } 
          : event
      ),
    });
    // In a real app, you would call an API to update event attendance
  };

  if (isLoading || !group) {
    return (
      <ProtectedRoute>
        <DashboardLayout title="Loading...">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  const initials = group.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Grupo no encontrado</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">El grupo que estás buscando no existe o no tienes permiso para verlo.</p>
          <Button 
            onClick={() => router.push('/groups')} 
            className="mt-4"
          >
            Volver a Grupos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout title={`${group.name} | BDSMsocial`}>
        <div className="space-y-6">
          {/* Portada e información básica */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
              {group.coverImage && (
                <img
                  src={group.coverImage}
                  alt={`${group.name} portada`}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute -bottom-6 left-6">
                  <div className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden">
                    <Avatar className="h-full w-full">
                      {group.avatarUrl ? (
                        <AvatarImage src={group.avatarUrl} alt={group.name} />
                      ) : (
                        <AvatarFallback className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-2xl font-medium">
                          {initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {group.name}
                  </h1>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {group.memberCount.toLocaleString()} {group.memberCount === 1 ? 'miembro' : 'miembros'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {group.category}
                    </span>
                    {group.location && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {group.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {group.isMember ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLeaveGroup}
                      className="whitespace-nowrap"
                    >
                      Abandonar grupo
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={handleJoinGroup}
                      className="whitespace-nowrap"
                    >
                      Unirse al grupo
                    </Button>
                  )}
                </div>
              </div>

              {/* Pestaña única de información */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Información del Grupo</h2>
                
                <div className="mt-6 space-y-4">
                  {group.isMember ? (
                    <div className="flex space-x-2">
                      <Button 
                        variant="default"
                        size="sm"
                        onClick={() => setShowComposer(true)}
                        className="flex-1"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Crear publicación
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleLeaveGroup}
                      >
                        Abandonar grupo
                      </Button>
                      <Button variant="outline" size="sm" className="px-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={handleJoinGroup}
                        className="flex-1"
                      >
                        Unirse al grupo
                      </Button>
                      <Button variant="outline" size="sm" className="px-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {group.description && (
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {group.description}
                </p>
              )}
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Sección de Debates */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Debates Recientes</h3>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {group.isMember && (
                      <PostComposer 
                        author={{ name: 'Current User', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg'}}
                        onPostCreated={handlePostCreated} 
                      />
                    )}
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <PostCard key={post.id} post={post} onPostDeleted={handlePostDeleted} />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No posts yet</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Be the first to start a discussion.</p>
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              </div>

              {/* Sección de Miembros */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Miembros del Grupo ({group.memberCount})</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {group.recentMembers?.map(member => (
                      <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        <Avatar>
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{member.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Se unió recientemente</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sección de Eventos */}
              {group.upcomingEvents && group.upcomingEvents.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Próximos Eventos</h3>
                      {group.isAdmin && <Button>Crear Evento</Button>}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {group.upcomingEvents.map(event => (
                        <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">{event.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(event.date).toLocaleString()} · {event.attendees} asistiendo
                            </p>
                          </div>
                          <Button 
                            variant={event.isAttending ? 'outline' : 'default'}
                            onClick={() => handleEventAttendance(event.id, !event.isAttending)}
                          >
                            {event.isAttending ? 'Asistiré' : 'Confirmar asistencia'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Configuración del Grupo (solo para administradores) */}
              {group.isAdmin && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Configuración del Grupo</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                            <label htmlFor="group-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Nombre del Grupo
                            </label>
                            <Input 
                              id="group-name" 
                              defaultValue={group.name} 
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label htmlFor="group-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Descripción
                            </label>
                            <Textarea 
                              id="group-description" 
                              defaultValue={group.description} 
                              className="mt-1"
                              rows={4}
                            />
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Grupo Privado
                            </span>
                            <Switch defaultChecked={group.isPrivate} />
                          </div>
                          <div className="pt-4 flex justify-end space-x-2 border-t border-gray-200 dark:border-gray-700 mt-4">
                            <Button variant="outline">Cancelar</Button>
                            <Button variant="default">Guardar Cambios</Button>
                          </div>
                          <div className="border-t border-red-500/30 pt-4 mt-4">
                            <Button variant="destructive" className="w-full">Eliminar Grupo</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
            </div>

            {/* Columna derecha (Barra lateral) */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Acerca del Grupo</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Privacidad</h3>
                    <p className="text-gray-600 dark:text-gray-400">{group.isPrivate ? 'Privado' : 'Público'}</p>
                  </div>
                  {group.location && (
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300">Ubicación</h3>
                      <p className="text-gray-600 dark:text-gray-400">{group.location}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Creado el</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(group.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {group.rules && group.rules.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-700 dark:text-gray-300">Reglas</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                        {group.rules.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
