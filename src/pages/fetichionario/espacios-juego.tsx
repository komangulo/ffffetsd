import { withFetichionarioPage } from './_template';

const EspaciosJuegoContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-300 leading-relaxed">
        En la terminología del kink, un 'espacio de juego' es cualquier área que está reservada o 
        específicamente creada para actividades kink y/o sexuales. Existen muchos tipos y términos 
        para estos espacios, pero el más general ('espacio de juego') se usa comúnmente como un 
        término general para cualquier área diseñada o utilizada específicamente para estas actividades.
      </p>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Tipos de Espacios de Juego</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Cuarto Oscuro / Dark Room</h4>
          <p className="text-gray-300 text-sm">
            Espacio con poca o ninguna iluminación diseñado para juegos que involucran privación 
            sensorial o para crear un ambiente más íntimo. La oscuridad puede intensificar otros 
            sentidos y añadir un elemento de misterio o sorpresa a las interacciones.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Mazmorra / Dungeon</h4>
          <p className="text-gray-300 text-sm">
            Espacio especialmente equipado para juegos BDSM, que puede incluir aparatos de restricción, 
            postes de castigo, jaulas y otros equipos. Las mazmorras pueden ser privadas en hogares 
            o espacios comerciales disponibles para alquiler.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Sala de Juegos / Rumpus Room</h4>
          <p className="text-gray-300 text-sm">
            Un espacio versátil y relajado dentro de un hogar o local, diseñado para actividades 
            lúdicas y sexuales. Suele ser más informal que una mazmorra tradicional y puede incluir 
            muebles cómodos, juguetes y equipamiento básico para juegos.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Dojo de Cuerdas / Rope Dojo</h4>
          <p className="text-gray-300 text-sm">
            Espacio específicamente diseñado para la práctica de shibari, kinbaku u otras formas de 
            ataduras con cuerdas. Suele incluir puntos de anclaje en el techo, colchonetas y espejos 
            para observar las técnicas desde diferentes ángulos.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Salón / Salon</h4>
          <p className="text-gray-300 text-sm">
            Espacio elegante y sofisticado para encuentros sociales con elementos de kink. Puede incluir 
            áreas para demostraciones, socialización y juegos más sutiles. Los salones a menudo tienen 
            un código de vestimenta y normas de comportamiento específicas.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Sala de Exhibición / Showroom</h4>
          <p className="text-gray-300 text-sm">
            Espacio donde las personas pueden realizar demostraciones para una audiencia. Puede incluir 
            plataformas elevadas, iluminación especial y áreas de asientos para espectadores. Ideal para 
            talleres, demostraciones educativas o actuaciones.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Sala de Cine / Cinema Room</h4>
          <p className="text-gray-300 text-sm">
            Espacio equipado con proyector o pantallas grandes para ver películas eróticas o educativas. 
            Puede incluir asientos cómodos, sonido envolvente y control de iluminación para crear una 
            experiencia cinematográfica inmersiva con contenido para adultos.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Sala de Masajes / Massage Room</h4>
          <p className="text-gray-300 text-sm">
            Espacio tranquilo y relajante equipado con camillas de masaje, aceites y música suave. 
            Ideal para juegos de sensación, masajes eróticos o como espacio para el aftercare después 
            de sesiones más intensas.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Sala de Fotografía / Playroom</h4>
          <p className="text-gray-300 text-sm">
            Espacio diseñado específicamente para sesiones de fotografía erótica o artística. Incluye 
            fondos, iluminación profesional y equipamiento para capturar imágenes de alta calidad. 
            Puede incluir diferentes sets temáticos para variar las producciones.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Sala de Meditación / Meditation Room</h4>
          <p className="text-gray-300 text-sm">
            Espacio tranquilo y minimalista diseñado para la relajación, la introspección y la conexión 
            espiritual. Puede incluir cojines de meditación, incienso, iluminación suave y sonidos 
            relajantes. Ideal para prácticas de respiración, meditación tántrica o como espacio de 
            transición después de experiencias intensas.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <SectionLayout
      title="Espacios de Juego"
      content={content}
      sectionId="espacios-juego"
      breadcrumbPath={[
        { name: 'Fetichionario', href: '/fetichionario' },
        { name: 'Espacios de Juego', href: '/fetichionario/espacios-juego' }
      ]}
    />
  );
};

const EspaciosJuegoPage = withFetichionarioPage('Espacios de Juego')(EspaciosJuegoContent);
export default EspaciosJuegoPage;
