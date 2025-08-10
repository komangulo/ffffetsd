import { withFetichionarioPage } from './_template';

const SeguridadContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-300 leading-relaxed">
        La seguridad en el contexto kink y BDSM es fundamental para garantizar experiencias 
        positivas y consensuadas. Incluye aspectos físicos, emocionales, y de comunicación 
        que deben considerarse antes, durante y después de cualquier actividad.
      </p>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Principios Fundamentales</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-3">SSC</h3>
          <h4 className="text-lg font-medium text-white mb-2">Seguro, Sano y Consensuado</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• <strong>Seguro:</strong> Minimizar riesgos físicos</li>
            <li>• <strong>Sano:</strong> Preservar la salud mental</li>
            <li>• <strong>Consensuado:</strong> Acuerdo informado</li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">RACK</h3>
          <h4 className="text-lg font-medium text-white mb-2">Risk Aware Consensual Kink</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Reconoce que hay riesgos inherentes</li>
            <li>• Enfatiza la conciencia sobre los riesgos</li>
            <li>• Toma decisiones informadas</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Seguridad Física</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Preparación Antes de la Escena</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <strong>Evaluación médica:</strong> Conocer condiciones de salud que podrían 
              afectar ciertas actividades (problemas cardíacos, lesiones previas, medicamentos).
            </li>
            <li>
              <strong>Límites físicos:</strong> Identificar áreas del cuerpo que no deben 
              ser tocadas o impactadas.
            </li>
            <li>
              <strong>Equipo de seguridad:</strong> Tener tijeras EMT, llaves de esposas, 
              botiquín de primeros auxilios cerca.
            </li>
            <li>
              <strong>Ambiente seguro:</strong> Asegurar que el espacio sea apropiado y privado.
            </li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Durante la Actividad</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <strong>Monitoreo constante:</strong> Observar signos de distress, cambios 
              de color en extremidades, problemas respiratorios.
            </li>
            <li>
              <strong>Comunicación continua:</strong> Verificar regularmente el estado 
              de todas las partes involucradas.
            </li>
            <li>
              <strong>Palabras de seguridad:</strong> Sistema claro para comunicar 
              comodidad o necesidad de parar.
            </li>
            <li>
              <strong>Sobriedad:</strong> Evitar alcohol o drogas que puedan afectar 
              el juicio o la percepción del dolor.
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Seguridad Emocional</h2>
      
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Aspectos Psicológicos</h3>
        <ul className="space-y-3 text-gray-300">
          <li>
            <strong>Estado mental:</strong> No participar en actividades intensas cuando 
            se esté emocionalmente vulnerable o en crisis.
          </li>
          <li>
            <strong>Triggers conocidos:</strong> Comunicar traumas pasados o situaciones 
            que podrían causar flashbacks.
          </li>
          <li>
            <strong>Subdrop/Topdrop:</strong> Estar preparado para cambios emocionales 
            después de escenas intensas.
          </li>
          <li>
            <strong>Aftercare emocional:</strong> Planificar cuidados posteriores para 
            procesar la experiencia.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Palabras de Seguridad</h2>
      
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Sistema de Semáforo</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <div>
              <strong className="text-green-400">Verde:</strong>
              <span className="text-gray-300 ml-2">Todo está bien, continuar</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div>
              <strong className="text-yellow-400">Amarillo:</strong>
              <span className="text-gray-300 ml-2">Precaución, reducir intensidad o verificar</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <div>
              <strong className="text-red-400">Rojo:</strong>
              <span className="text-gray-300 ml-2">Parar inmediatamente toda actividad</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Riesgos Específicos por Actividad</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Bondage/Restricción</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Pérdida de circulación</li>
            <li>• Daño nervioso</li>
            <li>• Asfixia accidental</li>
            <li>• Pánico/claustrofobia</li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Impact Play</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Hematomas o cortes</li>
            <li>• Daño a órganos internos</li>
            <li>• Lesiones en articulaciones</li>
            <li>• Impactos en zonas peligrosas (riñones, columna)</li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Temperature Play</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Quemaduras</li>
            <li>• Hipotermia localizada</li>
            <li>• Shock térmico</li>
            <li>• Daño a mucosas sensibles</li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Edge Play</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Lesiones graves o permanentes</li>
            <li>• Riesgo de muerte</li>
            <li>• Trauma psicológico severo</li>
            <li>• Infecciones</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Términos de Seguridad en Escenas</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Aftercare (Cuidados Posteriores)</h4>
          <p className="text-gray-300 text-sm">
            Proceso de atención y cuidado después de una escena para garantizar el bienestar físico y emocional de todos los participantes. Incluye hidratación, contacto físico reconfortante y validación emocional.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">After-Scene Drop (Bajón Post-Escena)</h4>
          <p className="text-gray-300 text-sm">
            Estado emocional bajo que puede ocurrir horas o días después de una escena intensa, causado por la caída de endorfinas. El aftercare adecuado puede ayudar a mitigarlo.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Método del Calamar (Cuttlefish Method)</h4>
          <p className="text-gray-300 text-sm">
            Técnica de comunicación no verbal donde el sumiso sostiene un objeto (como un peluche) que puede soltar si necesita hacer una pausa o detener la escena, útil cuando no puede hablar.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Frenesí del Dominante (Dom Frenzy)</h4>
          <p className="text-gray-300 text-sm">
            Estado de euforia o sobrexcitación en dominantes que puede llevar a ignorar señales de advertencia o límites. Es importante mantenerse consciente y controlado.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Límites Duros (Hard Limits)</h4>
          <p className="text-gray-300 text-sm">
            Actividades que están completamente fuera de los límites y no están abiertas a negociación. Deben ser respetadas en todo momento por todas las partes.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Encuentro por Primera Vez</h4>
          <p className="text-gray-300 text-sm">
            Reunión inicial en un lugar público para conocerse antes de cualquier actividad. Incluye compartir límites, expectativas y verificar referencias cuando sea posible.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Enrojecimiento por Estrés (Redding Out)</h4>
          <p className="text-gray-300 text-sm">
            Reacción fisiológica donde el cuerpo se enrojece debido al estrés o la estimulación intensa. Puede ser una señal para reducir la intensidad.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Verificación de Compatibilidad con Cuerdas</h4>
          <p className="text-gray-300 text-sm">
            Pruebas para asegurar que las cuerdas y nudos no restringen la circulación ni dañan los nervios, especialmente en áreas sensibles como muñecas y tobillos.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Llamada de Seguridad (Safe Call)</h4>
          <p className="text-gray-300 text-sm">
            Acordar que un amigo de confianza llame en un momento determinado para verificar que todo está bien durante un encuentro con alguien nuevo.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Palabras de Seguridad (Safe Words)</h4>
          <p className="text-gray-300 text-sm">
            Términos acordados para comunicar el estado de comodidad durante una escena. El sistema de semáforo (verde/amarillo/rojo) es comúnmente utilizado.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Límites Suaves (Soft Limits)</h4>
          <p className="text-gray-300 text-sm">
            Actividades con las que alguien podría estar dispuesto a experimentar bajo ciertas condiciones, pero que requieren mayor comunicación y precaución.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Frenesí del Sumiso (Sub Frenzy)</h4>
          <p className="text-gray-300 text-sm">
            Estado de euforia en nuevos sumisos que puede llevar a tomar decisiones apresuradas o ignorar señales de alerta. Es importante ir despacio y establecer límites claros.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Subespacio (Subspace)</h4>
          <p className="text-gray-300 text-sm">
            Estado alterado de conciencia que algunos sumisos experimentan durante escenas intensas, caracterizado por la liberación de endorfinas. Requiere monitoreo cuidadoso.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Conciencia del Trauma</h4>
          <p className="text-gray-300 text-sm">
            Reconocimiento de que experiencias pasadas pueden afectar las reacciones durante las escenas. Es importante discutir posibles disparadores y tener un plan para manejarlos.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Evaluación (Vetting)</h4>
          <p className="text-gray-300 text-sm">
            Proceso de verificación de referencias y antecedentes de posibles parejas de juego para asegurar que son seguras, respetuosas y experimentadas.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Caballero Blanco (White Knight)</h4>
          <p className="text-gray-300 text-sm">
            Persona que interviene en una escena sin ser invitada, asumiendo que hay un problema cuando no lo hay. Es importante respetar las dinámicas ajenas a menos que haya un peligro real.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Kit de Seguridad Esencial</h2>
      
      <div className="bg-gray-700 rounded-lg p-6">
        <ul className="space-y-3 text-gray-300">
          <li>
            <strong>Tijeras EMT:</strong> Para cortar cuerdas, cintas o ataduras rápidamente
          </li>
          <li>
            <strong>Llaves de repuesto:</strong> Para esposas, grilletes y otros dispositivos de bloqueo
          </li>
          <li>
            <strong>Botiquín de primeros auxilios:</strong> Vendas, antiséptico, analgésicos
          </li>
          <li>
            <strong>Mantas:</strong> Para combatir el shock o mantener calor
          </li>
          <li>
            <strong>Agua y snacks:</strong> Para rehidratación y estabilización después de la escena
          </li>
          <li>
            <strong>Teléfonos de emergencia:</strong> Contactos médicos y de emergencia
          </li>
        </ul>
      </div>

      <div className="bg-red-900/30 border border-red-600 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold text-red-400 mb-3">Señales de Alarma</h3>
        <p className="text-gray-300 mb-3">
          Busca atención médica inmediata si observas:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>• Pérdida de consciencia</li>
          <li>• Dificultad respiratoria severa</li>
          <li>• Sangrado que no se detiene</li>
          <li>• Entumecimiento persistente</li>
          <li>• Cambios de color extremos en la piel</li>
          <li>• Confusión o desorientación severa</li>
        </ul>
      </div>

      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-3">Recuerda</h3>
        <p className="text-gray-300">
          La seguridad siempre debe ser la prioridad número uno. Es mejor pecar de cauteloso 
          que arriesgarse a lesiones graves. La educación continua, la comunicación abierta 
          y la práctica responsable son las claves para mantener experiencias kink seguras y satisfactorias.
        </p>
      </div>
    </div>
  );

  return (
    <SectionLayout
      title="Seguridad en Escena"
      content={content}
      sectionId="seguridad"
      lastUpdated="hace 4 días"
    />
  );
};

const SeguridadPage = withFetichionarioPage('Seguridad')(SeguridadContent);
export default SeguridadPage;
