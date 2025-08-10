import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Clock, History } from 'lucide-react';

interface SectionLayoutProps {
  title: string;
  content: React.ReactNode;
  lastUpdated?: string;
  sectionId: string;
  breadcrumbPath?: { name: string; href: string }[];
}

export const SectionLayout: React.FC<SectionLayoutProps> = ({
  title,
  content,
  lastUpdated,
  sectionId,
  breadcrumbPath = []
}) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Link to="/fetichionario" className="hover:text-white transition-colors">
              Fetichionario
            </Link>
            {breadcrumbPath.map((item, index) => (
              <React.Fragment key={index}>
                <span>/</span>
                <Link to={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              </React.Fragment>
            ))}
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>

          {/* Back Button */}
          <div className="mb-6">
            <Link to="/fetichionario">
              <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Fetichionario
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 rounded-lg p-8">
            {/* Header */}
            <div className="border-b border-gray-700 pb-6 mb-8">
              <h1 className="text-4xl font-bold text-red-500 mb-4">{title}</h1>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Sugerir Edición
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-gray-300">
                  <History className="h-4 w-4 mr-2" />
                  Historial
                </Button>
              </div>

              {/* Last Updated */}
              {lastUpdated && (
                <div className="flex items-center text-sm text-gray-400 mt-4">
                  <Clock className="h-4 w-4 mr-2" />
                  Actualizado {lastUpdated}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none">
              {content}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-700 pt-6 mt-8">
              <div className="flex justify-between items-center">
                <Button variant="link" className="text-red-400 hover:text-red-300 p-0">
                  <Edit className="h-4 w-4 mr-2" />
                  Sugerir Edición
                </Button>
                <div className="text-sm text-gray-400">
                  {lastUpdated && `Actualizado ${lastUpdated}`}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation to Other Sections */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Explorar Otras Secciones</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'Consentimiento', href: '/fetichionario/consentimiento' },
                { name: 'Géneros', href: '/fetichionario/generos' },
                { name: 'Orientaciones Sexuales', href: '/fetichionario/orientaciones-sexuales' },
                { name: 'Relaciones', href: '/fetichionario/relaciones' },
                { name: 'Roles', href: '/fetichionario/roles' },
                { name: 'Actividades Kink', href: '/fetichionario/actividades-kink' },
                { name: 'Salud Sexual', href: '/fetichionario/salud-sexual' },
                { name: 'Seguridad', href: '/fetichionario/seguridad' },
              ].map((section) => (
                <Link
                  key={section.href}
                  to={section.href}
                  className={`p-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-sm ${
                    section.href === `/fetichionario/${sectionId}` ? 'bg-red-600 hover:bg-red-500' : ''
                  }`}
                >
                  {section.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
