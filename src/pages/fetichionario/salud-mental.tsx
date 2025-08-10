import { withFetichionarioPage } from './_template';

const SaludMentalContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-300 leading-relaxed">
        La salud mental es un componente fundamental del bienestar general que afecta cómo pensamos, 
        sentimos y actuamos. Esta sección explora diversos aspectos de la salud mental, ofreciendo 
        información y recursos para comprender mejor estas condiciones y promover el autocuidado. 
        Recuerda que buscar ayuda profesional es un signo de fortaleza, no de debilidad.
      </p>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Temas de Salud Mental</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Condiciones y Trastornos</h4>
          <p className="text-gray-300 text-sm">
            Abarca una amplia gama de condiciones que afectan el estado de ánimo, el pensamiento y 
            el comportamiento. Incluye depresión, trastornos de ansiedad, trastorno bipolar, 
            esquizofrenia y trastornos de la personalidad. El diagnóstico y tratamiento tempranos 
            pueden marcar una diferencia significativa en la calidad de vida.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Limerencia</h4>
          <p className="text-gray-300 text-sm">
            Estado mental involuntario de intenso deseo romántico por otra persona, acompañado de 
            pensamientos obsesivos y dependencia emocional. A diferencia del amor maduro, la 
            limerencia puede ser abrumadora y afectar negativamente el bienestar emocional cuando 
            no es correspondida.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Hombres y Salud Mental</h4>
          <p className="text-gray-300 text-sm">
            Los hombres a menudo enfrentan presiones sociales para suprimir emociones y mostrarse 
            fuertes, lo que puede llevar a tasas más altas de problemas no diagnosticados. Es 
            crucial desafiar los estereotipos de género y fomentar la expresión emocional 
            saludable y la búsqueda de ayuda cuando sea necesario.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Neurodivergencia</h4>
          <p className="text-gray-300 text-sm">
            Término que describe variaciones naturales en el cerebro humano, incluyendo el autismo, 
            TDAH, dislexia y otras condiciones. La neurodiversidad reconoce estas diferencias 
            como variaciones naturales en lugar de deficiencias, promoviendo la aceptación y los 
            ajustes razonables en lugar de la "cura".
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Autolesión</h4>
          <p className="text-gray-300 text-sm">
            Comportamiento en el que una persona se hace daño a sí misma como forma de afrontar 
            emociones abrumadoras, dolor emocional o sentimientos de entumecimiento. No es un 
            intento de suicidio, sino un mecanismo de afrontamiento poco saludable que requiere 
            comprensión y apoyo profesional.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Pensamientos Suicidas</h4>
          <p className="text-gray-300 text-sm">
            Pensamientos sobre quitarse la vida o desear estar muerto. Son una señal de que 
            alguien está experimentando un dolor emocional abrumador. Es fundamental tomar 
            estos pensamientos en serio y buscar ayuda profesional inmediata. No hay que 
            tener miedo de hablar abiertamente sobre el suicidio con alguien que podría estar 
            en riesgo.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Ansiedad y Estrés</h4>
          <p className="text-gray-300 text-sm">
            Respuestas naturales ante situaciones desafiantes, pero cuando se vuelven crónicos 
            o abrumadores, pueden afectar significativamente la calidad de vida. Las técnicas 
            de manejo del estrés, la terapia y, en algunos casos, la medicación pueden ser 
            herramientas efectivas para el tratamiento.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Depresión</h4>
          <p className="text-gray-300 text-sm">
            Trastorno del estado de ánimo que causa sentimientos persistentes de tristeza y 
            pérdida de interés. A diferencia de la tristeza normal, la depresión puede durar 
            semanas o meses y afectar la capacidad de funcionar en la vida diaria. El tratamiento 
            puede incluir terapia, medicación y cambios en el estilo de vida.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Trastornos Alimenticios</h4>
          <p className="text-gray-300 text-sm">
            Condiciones graves relacionadas con conductas alimentarias persistentes que afectan 
            negativamente la salud, las emociones y la capacidad de funcionar en áreas importantes 
            de la vida. Incluyen anorexia nerviosa, bulimia nerviosa y trastorno por atracón. 
            Requieren atención profesional especializada.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Trastorno de Estrés Postraumático (TEPT)</h4>
          <p className="text-gray-300 text-sm">
            Trastorno de salud mental desencadenado por experimentar o presenciar un evento 
            traumático. Los síntomas pueden incluir reviviscencias, pesadillas, ansiedad 
            severa y pensamientos incontrolables sobre el evento. El tratamiento puede incluir 
            terapia y medicación.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Trastorno Bipolar</h4>
          <p className="text-gray-300 text-sm">
            Trastorno que causa cambios extremos en el estado de ánimo que incluyen altos 
            emocionales (manía o hipomanía) y bajos (depresión). Estos cambios de humor pueden 
            afectar el sueño, la energía, el juicio, el comportamiento y la capacidad de 
            pensar con claridad.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Trastorno Obsesivo-Compulsivo (TOC)</h4>
          <p className="text-gray-300 text-sm">
            Trastorno caracterizado por patrones de pensamientos no deseados (obsesiones) que 
            llevan a comportamientos repetitivos (compulsiones). Estas obsesiones y compulsiones 
            interfieren con las actividades diarias y causan angustia significativa.
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-bold text-red-400 mb-3">Recursos de Ayuda</h3>
        <p className="text-gray-300 mb-2">
          Si tú o alguien que conoces está lidiando con problemas de salud mental, recuerda que no estás solo. 
          Hay ayuda disponible:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
          <li>Línea de Prevención del Suicidio: 988 (España) o el número de emergencia local</li>
          <li>Consulta con un profesional de salud mental</li>
          <li>Habla con tu médico de cabecera</li>
          <li>Busca grupos de apoyo en tu comunidad</li>
          <li>Acude a servicios de urgencias en caso de crisis</li>
        </ul>
      </div>
    </div>
  );

  return (
    <SectionLayout
      title="Salud Mental"
      content={content}
      sectionId="salud-mental"
      breadcrumbPath={[
        { name: 'Fetichionario', href: '/fetichionario' },
        { name: 'Salud Mental', href: '/fetichionario/salud-mental' }
      ]}
    />
  );
};

const SaludMentalPage = withFetichionarioPage('Salud Mental')(SaludMentalContent);
export default SaludMentalPage;
