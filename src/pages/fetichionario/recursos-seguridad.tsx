import { withFetichionarioPage } from './_template';

const RecursosSeguridadContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-300 leading-relaxed">
        Esta sección proporciona recursos esenciales de seguridad para situaciones de emergencia y apoyo. 
        Si tú o alguien que conoces está en peligro, por favor busca ayuda de inmediato. 
        Recuerda que pedir ayuda es un acto de valentía y autocuidado.
      </p>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Recursos de Seguridad</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Violencia de Pareja</h3>
          <p className="text-gray-300 mb-4">
            La violencia de pareja incluye abuso físico, emocional, sexual o financiero en una relación íntima. 
            No tiene que ser físico para ser grave.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Señales de Alerta:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Control excesivo sobre tus actividades o amistades</li>
              <li>Celos y acusaciones constantes</li>
              <li>Amenazas o intimidación</li>
              <li>Daño a tus pertenencias</li>
              <li>Presión para actividades sexuales no deseadas</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-blue-400 mb-2">Recursos en España:</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>016</strong> - Atención a víctimas de violencia de género (24/7, gratuito, no deja rastro en factura)</li>
              <li>• <strong>016</strong> - WhatsApp: 600 000 016</li>
              <li>• <strong>Email:</strong> 016-online@igualdad.gob.es</li>
              <li>• App <strong>Libres</strong> del Ministerio de Igualdad</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Secuestro</h3>
          <p className="text-gray-300 mb-4">
            El secuestro es un delito grave que implica la privación ilegal de libertad. 
            Es importante estar atento a señales de peligro y saber cómo reaccionar.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Medidas de Prevención:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Informa a alguien de confianza sobre tus planes y horarios</li>
              <li>Evita compartir información personal con desconocidos</li>
              <li>Confía en tu instinto si una situación parece sospechosa</li>
              <li>Ten siempre cargado tu teléfono móvil</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-blue-400 mb-2">En caso de emergencia:</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>112</strong> - Emergencias en España</li>
              <li>• <strong>091</strong> - Policía Nacional</li>
              <li>• <strong>062</strong> - Guardia Civil</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Trata de Personas</h3>
          <p className="text-gray-300 mb-4">
            La trata de personas es una forma de esclavitud moderna que implica la explotación de personas 
            mediante fuerza, fraude o coacción con fines de explotación sexual, trabajos forzados o extracción de órganos.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Señales de Trata:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Control sobre documentos de identidad</li>
              <li>Deudas inesperadas o excesivas</li>
              <li>Horarios de trabajo excesivos sin pago adecuado</li>
              <li>Restricciones de movimiento o comunicación</li>
              <li>Signos de abuso físico o emocional</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-blue-400 mb-2">Recursos:</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>900 10 50 90</strong> - Fundación ANAR (Ayuda a Niños y Adolescentes en Riesgo)</li>
              <li>• <strong>900 19 10 10</strong> - Proyecto Esperanza (Atención a mujeres víctimas de trata)</li>
              <li>• <strong>900 100 009</strong> - Cáritas Española</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recursos para Sobrevivientes de Agresión Sexual</h3>
          <p className="text-gray-300 mb-4">
            Si has sufrido una agresión sexual, recuerda que no es tu culpa y que hay ayuda disponible. 
            Tienes derecho a recibir apoyo y justicia.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Pasos Inmediatos:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
              <li>Busca un lugar seguro</li>
              <li>No te duches ni cambies de ropa (importante para pruebas forenses)</li>
              <li>Busca atención médica inmediatamente</li>
              <li>Considera denunciar a las autoridades</li>
              <li>Busca apoyo emocional</li>
            </ol>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-blue-400 mb-2">Recursos en España:</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>016</strong> - Violencia de género (también para agresiones sexuales)</li>
              <li>• <strong>900 19 10 10</strong> - Fundación ANAR (menores de edad)</li>
              <li>• <strong>900 200 999</strong> - Fundación Mujeres</li>
              <li>• <strong>900 58 08 88</strong> - Asociación de Asistencia a Mujeres Violadas (24h)</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Apoyo para la Salud Mental</h3>
          <p className="text-gray-300 mb-4">
            El impacto emocional de situaciones traumáticas puede ser profundo. 
            Es importante buscar ayuda profesional para el procesamiento y la recuperación.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Recursos de Apoyo:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Terapia psicológica especializada en trauma</li>
              <li>Grupos de apoyo para sobrevivientes</li>
              <li>Líneas de ayuda en crisis</li>
              <li>Servicios sociales</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-blue-400 mb-2">Contactos:</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>024</strong> - Prevención del suicidio (24/7)</li>
              <li>• <strong>717 003 717</strong> - Teléfono de la Esperanza</li>
              <li>• <strong>900 124 365</strong> - Asociación Española de Ayuda contra la Drogadicción</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Seguridad Digital</h3>
          <p className="text-gray-300 mb-4">
            La seguridad en línea es crucial para proteger tu privacidad y prevenir el acoso digital, 
            el robo de identidad y otras formas de violencia en línea.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">Consejos de Seguridad Digital:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              <li>Usa contraseñas fuertes y diferentes para cada cuenta</li>
              <li>Habilita la autenticación de dos factores</li>
              <li>Ten cuidado con la información personal que compartes en línea</li>
              <li>Revisa y ajusta regularmente la configuración de privacidad</li>
              <li>No compartas imágenes íntimas sin consentimiento explícito</li>
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-blue-400 mb-2">Recursos:</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>017</strong> - Línea de ayuda en ciberseguridad (INCIBE)</li>
              <li>• <strong>www.osi.es</strong> - Oficina de Seguridad del Internauta</li>
              <li>• <strong>www.is4k.es</strong> - Internet Segura for Kids</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-bold text-red-400 mb-3">Recordatorio Importante</h3>
        <p className="text-gray-300 mb-4">
          Si estás en peligro inminente, llama al <strong>112</strong> (emergencias en España) o al número de emergencia de tu país.
        </p>
        <p className="text-gray-300">
          Recuerda que pedir ayuda es un acto de valentía. No estás solo/a, y hay personas y organizaciones 
          dispuestas a apoyarte sin juzgarte.
        </p>
      </div>
    </div>
  );
};

const RecursosSeguridadPage = withFetichionarioPage('Recursos de Seguridad')(RecursosSeguridadContent);
export default RecursosSeguridadPage;
