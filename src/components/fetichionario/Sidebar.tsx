import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronRight, Users, BookOpen, Heart, Shield, Calendar, MapPin, Stethoscope, Brain, AlertTriangle, Wrench, Info, Star, FileText, Scale } from 'lucide-react';

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stats?: {
    articles: number;
    words: number;
    approvedEdits: number;
    pendingEdits: number;
    contributors: number;
  };
}

const navigationSections = [
  { id: 'welcome', name: 'Bienvenida', icon: Heart, href: '/fetichionario' },
  { id: 'ykinmk', name: 'Tu Kink No Es Mi Kink', icon: Users, href: '/fetichionario/tu-kink-no-es-mi-kink' },
  { id: 'consent', name: 'Consentimiento', icon: Shield, href: '/fetichionario/consentimiento' },
  { id: 'genders', name: 'Géneros', icon: Users, href: '/fetichionario/generos' },
  { id: 'sexual-orientations', name: 'Orientaciones Sexuales', icon: Heart, href: '/fetichionario/orientaciones-sexuales' },
  { id: 'romantic-orientations', name: 'Orientaciones Románticas', icon: Heart, href: '/fetichionario/orientaciones-romanticas' },
  { id: 'relationships', name: 'Relaciones', icon: Users, href: '/fetichionario/relaciones' },
  { id: 'roles', name: 'Roles', icon: Star, href: '/fetichionario/roles' },
  { id: 'kink-activities', name: 'Actividades Kink', icon: Heart, href: '/fetichionario/actividades-kink' },
  { id: 'sexual-activities', name: 'Actividades Sexuales', icon: Heart, href: '/fetichionario/actividades-sexuales' },
  { id: 'philia-fetish', name: 'Filia/Fetiche', icon: Heart, href: '/fetiches' },
  { id: 'toys-equipment', name: 'Juguetes y Equipamiento', icon: Wrench, href: '/fetichionario/juguetes-equipamiento' },
  { id: 'play-spaces', name: 'Espacios de Juego', icon: MapPin, href: '/fetichionario/espacios-juego' },
  { id: 'events', name: 'Eventos', icon: Calendar, href: '/fetichionario/eventos' },
  { id: 'sexual-health', name: 'Salud Sexual', icon: Stethoscope, href: '/fetichionario/salud-sexual' },
  { id: 'mental-health', name: 'Salud Mental', icon: Brain, href: '/fetichionario/salud-mental' },
  { id: 'scene-safety', name: 'Seguridad en Escena', icon: AlertTriangle, href: '/fetichionario/seguridad' },
  { id: 'safety-resources', name: 'Recursos de Seguridad', icon: Shield, href: '/fetichionario/recursos-seguridad' },
  { id: 'glossary', name: 'Glosario', icon: BookOpen, href: '/fetichionario/glosario' },
  { id: 'abbreviations', name: 'Abreviaciones', icon: FileText, href: '/fetichionario/abreviaciones' },
  { id: 'license', name: 'Licencia', icon: Scale, href: '/fetichionario/licencia' },
];

const defaultStats = {
  articles: 1429,
  words: 203796,
  approvedEdits: 4878,
  pendingEdits: 13,
  contributors: 753
};

export const Sidebar = ({ searchQuery, onSearchChange, stats = defaultStats }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <div className="w-80 bg-gray-800 min-h-screen p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Fetichionario</h1>
        <p className="text-gray-400 text-sm">
          Saca las anteojeras y echa un vistazo a las definiciones.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en Fetichionario"
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {navigationSections.map((section) => {
          const Icon = section.icon;
          const isActive = location.pathname === section.href;
          return (
            <Link
              key={section.id}
              to={section.href}
              className={`w-full flex items-center justify-between px-3 py-2 text-left ${
                isActive 
                  ? 'text-white bg-gray-700 font-medium' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              } rounded-md transition-colors group`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-4 w-4" />
                <span>{section.name}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-gray-300" />
            </Link>
          );
        })}
      </nav>

      {/* Statistics */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">{stats.articles.toLocaleString()} artículos</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{stats.words.toLocaleString()} palabras</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">
              {stats.approvedEdits.toLocaleString()} ediciones aprobadas · {stats.pendingEdits} pendientes
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">
              {stats.contributors} colaboradores
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
