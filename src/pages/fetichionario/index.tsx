import { Link } from 'react-router-dom';
import { withFetichionarioLayout } from '@/components/fetichionario/withFetichionarioLayout';
import { Heart, ChevronRight } from 'lucide-react';

const navigationSections = [
  { id: 'welcome', name: 'Bienvenida', icon: Heart, href: '/fetichionario' },
  { id: 'ykinmk', name: 'Tu Kink No Es Mi Kink', icon: Heart, href: '/fetichionario/tu-kink-no-es-mi-kink' },
  { id: 'consent', name: 'Consentimiento', icon: Heart, href: '/fetichionario/consentimiento' },
  { id: 'genders', name: 'Géneros', icon: Heart, href: '/fetichionario/generos' },
  { id: 'sexual-orientations', name: 'Orientaciones Sexuales', icon: Heart, href: '/fetichionario/orientaciones-sexuales' },
  { id: 'romantic-orientations', name: 'Orientaciones Románticas', icon: Heart, href: '/fetichionario/orientaciones-romanticas' },
  { id: 'relationships', name: 'Relaciones', icon: Heart, href: '/fetichionario/relaciones' },
  { id: 'roles', name: 'Roles', icon: Heart, href: '/fetichionario/roles' },
  { id: 'kink-activities', name: 'Actividades Kink', icon: Heart, href: '/fetichionario/actividades-kink' },
  { id: 'sexual-activities', name: 'Actividades Sexuales', icon: Heart, href: '/fetichionario/actividades-sexuales' },
  { id: 'toys-equipment', name: 'Juguetes y Equipamiento', icon: Heart, href: '/fetichionario/juguetes-equipamiento' },
  { id: 'play-spaces', name: 'Espacios de Juego', icon: Heart, href: '/fetichionario/espacios-juego' },
  { id: 'events', name: 'Eventos', icon: Heart, href: '/fetichionario/eventos' },
  { id: 'sexual-health', name: 'Salud Sexual', icon: Heart, href: '/fetichionario/salud-sexual' },
  { id: 'mental-health', name: 'Salud Mental', icon: Heart, href: '/fetichionario/salud-mental' },
  { id: 'scene-safety', name: 'Seguridad en Escena', icon: Heart, href: '/fetichionario/seguridad' },
  { id: 'safety-resources', name: 'Recursos de Seguridad', icon: Heart, href: '/fetichionario/recursos-seguridad' },
  { id: 'glossary', name: 'Glosario', icon: Heart, href: '/fetichionario/glosario' },
  { id: 'abbreviations', name: 'Abreviaciones', icon: Heart, href: '/fetichionario/abreviaciones' },
  { id: 'license', name: 'Licencia', icon: Heart, href: '/fetichionario/licencia' },
];

const FetichionarioContent = () => {
  return (
    <div className="max-w-4xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Bienvenida</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-6">
            Bienvenido a Fetichionario. Fetichionario es un recurso en línea para y por kinksters. 
            Construido basándose en contribuciones de cientos de miembros de Fetlife de más de 10M+ miembros, 
            Fetichionario proporciona una mirada al lenguaje, conceptos y comunidad relacionados con kink y BDSM.
          </p>

          <p className="text-gray-300 mb-6">
            Como puedes imaginar, este es un tema resbaladizo - uno que está en constante evolución, y 
            donde la variación personal puede ser tan única como, bueno, ¡la gente! Como un Wiki, Fetichionario 
            nunca es perfecto, nunca está terminado. Pero se actualiza, se debate y se mejora cada día 
            por personas que se preocupan por la comunidad kink - y ayudan a otros a navegarla.
          </p>

          <p className="text-gray-300 mb-8">
            ¿Quieres ayudar a dar forma a Fetichionario y hacer sugerencias para mejorarlo? 
            Tenemos un grupo para eso aquí para miembros.
          </p>

          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Cómo Hacer una Sugerencia para Editar una Página
          </h2>

          <p className="text-gray-300 mb-4">
            Cualquier miembro de Fetlife puede sugerir una edición a una entrada existente. Solo:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
            <li>Abre la entrada que deseas sugerir una edición.</li>
            <li>Selecciona el enlace "Sugerir Edición" en la parte inferior de la página.</li>
            <li>Haz ediciones al artículo y añade la justificación detrás de los cambios.</li>
            <li>Envía el formulario.</li>
          </ol>

          <p className="text-gray-300 mb-4">
            Un miembro del equipo de Fetlife revisará tu envío. Otros miembros de Fetlife también 
            pueden comentar en ediciones pendientes. Por favor @ menciona a otros comentaristas 
            si respondes para que reciban una notificación.
          </p>

          <p className="text-gray-300 mb-4">
            Ten en cuenta que cuando una entrada ya tiene una edición sugerida pendiente, 
            necesitarás esperar hasta que esa sea procesada.
          </p>

          <p className="text-gray-300 mb-6">
            Puedes ver todas las ediciones sugeridas por estado (abiertas/aprobadas/cerradas) 
            hechas por todos los miembros aquí.
          </p>

          <p className="text-gray-300 mb-8">
            ¡Gracias por visitar!
          </p>
        </div>

        {/* Quick Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {navigationSections.slice(1, 7).map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                to={section.href}
                className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left group"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-red-400" />
                  <span className="text-gray-300 group-hover:text-white font-medium">
                    {section.name}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-gray-300 ml-auto" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Fetichionario = withFetichionarioLayout(FetichionarioContent);
export default Fetichionario;
