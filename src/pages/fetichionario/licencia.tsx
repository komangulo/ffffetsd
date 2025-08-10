import { withFetichionarioPage } from './_template';

const LicenciaContent = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Términos de Uso del Fetichionario</h2>
        
        <p className="text-gray-300 mb-6">
          El Fetichionario es un recurso educativo que crece gracias a las contribuciones de nuestra comunidad. 
          Está diseñado para ser accesible para todos, incluso para quienes no son miembros de Nexus Kin Connect, 
          pero el uso del contenido está sujeto a los siguientes términos.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Uso No Comercial / Educativo</h3>
          
          <p className="text-gray-300 mb-4">
            Tienes libertad para:
          </p>
          
          <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
            <li>Copiar, compartir y redistribuir partes del material del Fetichionario en cualquier medio o formato.</li>
            <li>Adaptar, transformar y remezclar el material del Fetichionario para cualquier propósito.</li>
          </ul>
          
          <p className="text-gray-300 font-semibold mb-2">Bajo las siguientes condiciones:</p>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-white mb-2">Atribución</h4>
            <p className="text-gray-300 text-sm">
              Debes dar el crédito correspondiente y atribuir la fuente como "Fetichionario de Nexus Kin Connect". 
              Para contenido en línea, preferimos que incluyas un enlace a la página de origen.
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-white mb-2">Sin respaldo implícito</h4>
            <p className="text-gray-300 text-sm">
              No puedes sugerir de ninguna manera que Nexus Kin Connect respalda tu uso del material o te respalda a ti.
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-white mb-2">Indicar cambios</h4>
            <p className="text-gray-300 text-sm">
              Si modificas el material, debes indicar que se han realizado cambios y describir dichas modificaciones.
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Sin restricciones adicionales</h4>
            <p className="text-gray-300 text-sm">
              No puedes aplicar términos legales o restricciones tecnológicas que restrinjan a otros de hacer cualquier cosa 
              que esta licencia permita.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Uso Comercial</h3>
          
          <div className="bg-red-900 bg-opacity-30 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-200 font-semibold">
              No está permitido utilizar ningún material del Fetichionario con fines comerciales sin el consentimiento 
              expreso por escrito de Nexus Kin Connect.
            </p>
          </div>
          
          <p className="text-gray-300">
            Para solicitar permiso para uso comercial, por favor contáctanos a través de los canales oficiales de Nexus Kin Connect.
          </p>
        </div>

        <div className="bg-yellow-900 bg-opacity-30 border-l-4 border-yellow-500 p-4">
          <h4 className="font-semibold text-yellow-300 mb-2">Exención de responsabilidad</h4>
          <p className="text-yellow-200 text-sm">
            El Fetichionario se proporciona "tal cual" sin garantías de ningún tipo, expresas o implícitas. 
            Nexus Kin Connect no se hace responsable de los daños que puedan surgir del uso de esta información. 
            La información proporcionada no sustituye el asesoramiento profesional.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">Fuente y Reconocimientos</h3>
          <p className="text-gray-400 text-sm">
            Este recurso está inspirado en el Kinktionary de FetLife y otras fuentes de la comunidad BDSM. 
            Agradecemos a todos los colaboradores que han contribuido a hacer del Fetichionario un recurso valioso 
            para la comunidad.
          </p>
          
          <p className="text-gray-500 text-xs mt-4">
            Última actualización: 10 de agosto de 2025
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <SectionLayout
      title="Licencia"
      content={content}
      sectionId="licencia"
      breadcrumbPath={[
        { name: 'Fetichionario', href: '/fetichionario' },
        { name: 'Licencia', href: '/fetichionario/licencia' }
      ]}
    />
  );
};

const LicenciaPage = withFetichionarioPage('Licencia')(LicenciaContent);
export default LicenciaPage;
