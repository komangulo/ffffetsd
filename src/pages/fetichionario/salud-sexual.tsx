import { withFetichionarioPage } from './_template';

const SaludSexualContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-300 leading-relaxed">
        La salud sexual es un aspecto fundamental del bienestar general. Esta sección proporciona información 
        sobre diversos aspectos de la salud sexual, incluyendo condiciones comunes, cuidados preventivos y 
        recomendaciones para mantener una vida sexual saludable. Recuerda que esta información no sustituye 
        el consejo médico profesional.
      </p>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Temas de Salud Sexual</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Anorgasmia</h4>
          <p className="text-gray-300 text-sm">
            Dificultad o incapacidad persistente para alcanzar el orgasmo a pesar de una estimulación adecuada. 
            Puede tener causas físicas, psicológicas o una combinación de ambas. Es más común en mujeres pero 
            también puede afectar a los hombres.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Vaginosis Bacteriana</h4>
          <p className="text-gray-300 text-sm">
            Infección vaginal común causada por un desequilibrio en las bacterias naturales de la vagina. 
            Los síntomas incluyen flujo anormal con olor a pescado, picazón y ardor. El tratamiento 
            generalmente incluye antibióticos.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Circuncisión</h4>
          <p className="text-gray-300 text-sm">
            Procedimiento quirúrgico que remueve el prepucio que cubre la cabeza del pene. Puede realizarse 
            por razones religiosas, culturales o médicas. El cuidado posoperatorio adecuado es esencial para 
            prevenir complicaciones.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Endometriosis</h4>
          <p className="text-gray-300 text-sm">
            Condición en la que el tejido que normalmente recubre el útero crece fuera de él, causando dolor 
            pélvico intenso, especialmente durante la menstruación. Puede afectar la fertilidad y la vida 
            sexual de quien la padece.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Función Eréctil</h4>
          <p className="text-gray-300 text-sm">
            Capacidad de lograr y mantener una erección adecuada para la actividad sexual. Los problemas 
            de disfunción eréctil pueden tener causas físicas (como problemas circulatorios) o psicológicas. 
            El tratamiento varía según la causa subyacente.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Menorragia (Períodos Abundantes)</h4>
          <p className="text-gray-300 text-sm">
            Sangrado menstrual excesivo o prolongado que puede interferir con las actividades diarias. Puede 
            estar causado por desequilibrios hormonales, fibromas uterinos u otras afecciones que requieren 
            evaluación médica.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Salud del Suelo Pélvico</h4>
          <p className="text-gray-300 text-sm">
            Conjunto de músculos, ligamentos y tejidos que sostienen los órganos pélvicos. Los ejercicios 
            de Kegel pueden fortalecer estos músculos, mejorando la función sexual y previniendo problemas 
            como la incontinencia urinaria.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Prolapso de Órganos Pélvicos</h4>
          <p className="text-gray-300 text-sm">
            Afección en la que los órganos pélvicos (como la vejiga, útero o recto) descienden hacia la 
            vagina debido al debilitamiento de los músculos del suelo pélvico. Puede causar molestias y 
            requerir tratamiento médico o quirúrgico.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Salud y Cuidado del Pene</h4>
          <p className="text-gray-300 text-sm">
            Incluye higiene adecuada, autoexámenes regulares para detectar bultos o cambios en la piel, 
            y protección durante la actividad sexual. La circuncisión puede afectar la sensibilidad y 
            requiere cuidados específicos.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">ITS / ETS</h4>
          <p className="text-gray-300 text-sm">
            Infecciones de Transmisión Sexual / Enfermedades de Transmisión Sexual. Incluyen VIH, 
            clamidia, gonorrea, sífilis, herpes y VPH. La prevención incluye el uso de preservativos, 
            pruebas regulares y vacunación cuando esté disponible.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Sarna</h4>
          <p className="text-gray-300 text-sm">
            Infección de la piel causada por ácaros que se transmiten por contacto físico cercano, 
            incluyendo el contacto sexual. Causa picazón intensa y erupciones. El tratamiento incluye 
            cremas medicadas y lavado de ropa de cama y toallas.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Salud y Cuidado Testicular</h4>
          <p className="text-gray-300 text-sm">
            Los autoexámenes regulares pueden ayudar a detectar tempranamente el cáncer testicular. 
            También es importante proteger los testículos durante actividades deportivas y mantener una 
            temperatura adecuada para la producción de esperma.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Sequedad Vaginal</h4>
          <p className="text-gray-300 text-sm">
            Falta de lubricación adecuada en la vagina, que puede causar molestias durante las relaciones 
            sexuales. Puede estar relacionada con cambios hormonales, medicamentos o condiciones médicas. 
            Los lubricantes a base de agua pueden ayudar.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Atrofia Vaginal</h4>
          <p className="text-gray-300 text-sm">
            Adelgazamiento, sequedad e inflamación de las paredes vaginales debido a la disminución de 
            estrógenos, común después de la menopausia. Puede causar dolor durante las relaciones sexuales 
            y aumentar el riesgo de infecciones urinarias.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Salud Vascular</h4>
          <p className="text-gray-300 text-sm">
            La salud de los vasos sanguíneos es crucial para la función sexual, especialmente para la 
            erección en los hombres. Factores como la presión arterial alta, el colesterol elevado y el 
            tabaquismo pueden afectar negativamente la función vascular y sexual.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Salud Hormonal</h4>
          <p className="text-gray-300 text-sm">
            Las hormonas como la testosterona, el estrógeno y la progesterona juegan un papel crucial 
            en la salud sexual. Los desequilibrios pueden afectar la libido, la función sexual y la 
            fertilidad en todas las personas.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Salud Mental y Sexualidad</h4>
          <p className="text-gray-300 text-sm">
            La ansiedad, depresión y estrés pueden afectar significativamente la función sexual. Es 
            importante abordar tanto la salud mental como la física para mantener una vida sexual 
            satisfactoria.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <SectionLayout
      title="Salud Sexual"
      content={content}
      sectionId="salud-sexual"
      breadcrumbPath={[
        { name: 'Fetichionario', href: '/fetichionario' },
        { name: 'Salud Sexual', href: '/fetichionario/salud-sexual' }
      ]}
    />
  );
};

const SaludSexualPage = withFetichionarioPage('Salud Sexual')(SaludSexualContent);
export default SaludSexualPage;
