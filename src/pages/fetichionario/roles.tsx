import { withFetichionarioPage } from './_template';

const RolesContent = () => {
  const roles = [
    // Roles Principales
    {
      category: 'Roles Principales',
      items: [
        { name: 'Dominante (Dom/Domme)', description: 'Persona que toma el control y la responsabilidad en una escena o relación de poder.' },
        { name: 'Sumiso (Sub)', description: 'Persona que entrega el control y sigue las directrices del dominante.' },
        { name: 'Switch', description: 'Persona que disfruta tanto del rol dominante como del sumiso.' },
        { name: 'Slave (Esclavo/a)', description: 'Forma más intensa de sumisión, generalmente en relaciones a largo plazo.' },
        { name: 'Master/Mistress', description: 'Dominante que tiene una relación de propiedad con un esclavo/a.' },
        { name: 'Top/Bottom', description: 'Roles específicos para actividades físicas. El "top" realiza la acción, el "bottom" la recibe.' },
      ]
    },
    
    // Crianza y Cuidado
    {
      category: 'Crianza y Cuidado',
      items: [
        { name: 'Daddy/Mommy', description: 'Figura de autoridad cariñosa en dinámicas de cuidado (CGL, DDLG, MDLB).' },
        { name: 'Little/Middle', description: 'Persona que adopta un rol más joven o juguetón en dinámicas de age play.' },
        { name: 'Caregiver', description: 'Persona que proporciona cuidado y atención en dinámicas de cuidado.' },
        { name: 'Adult Baby (AB)', description: 'Persona que adopta el rol de un bebé en dinámicas ABDL.' },
        { name: 'Diaper Lover (DL)', description: 'Persona que disfruta usar pañales, con o sin componente de age play.' },
      ]
    },
    
    // Pet Play
    {
      category: 'Pet Play',
      items: [
        { name: 'Pet', description: 'Persona que adopta características y comportamientos animales.' },
        { name: 'Handler/Owner', description: 'Cuidador o dueño en dinámicas de pet play.' },
        { name: 'Puppy', description: 'Mascota que adopta características de perro.' },
        { name: 'Kitten', description: 'Mascota que adopta características de gato.' },
        { name: 'Pony', description: 'Mascota que adopta características de caballo, a menudo en entrenamiento de arrastre.' },
      ]
    },
    
    // Juego de Rol
    {
      category: 'Juego de Rol',
      items: [
        { name: 'Brat', description: 'Sumiso que disfruta ser desafiante o travieso para provocar una respuesta del dominante.' },
        { name: 'Brat Tamer', description: 'Dominante que disfruta de domar y corregir el comportamiento de un brat.' },
        { name: 'Primal', description: 'Persona que disfruta de dinámicas instintivas y de caza/presa.' },
        { name: 'Prey', description: 'Rol de presa en dinámicas de caza/primal.' },
        { name: 'Hunter', description: 'Rol de cazador en dinámicas primales.' },
      ]
    },
    
    // Servicio
    {
      category: 'Servicio',
      items: [
        { name: 'Service Top', description: 'Persona que realiza acciones dominantes como un servicio al sumiso.' },
        { name: 'Service Sub', description: 'Persona sumisa que disfruta servir o complacer.' },
        { name: 'Service Bottom', description: 'Persona que recibe como un servicio al dominante.' },
        { name: 'Slave', description: 'Persona en un rol de servicio completo, a menudo con énfasis en la obediencia.' },
        { name: 'Maid/Butler', description: 'Persona que sirve en un rol doméstico o de mayordomía.' },
      ]
    },
    
    // Exhibición y Observación
    {
      category: 'Exhibición y Observación',
      items: [
        { name: 'Exhibitionist', description: 'Persona que disfruta ser vista.' },
        { name: 'Voyeur', description: 'Persona que disfruta observar.' },
        { name: 'Show-Off', description: 'Persona que disfruta exhibirse para otros.' },
        { name: 'Performer', description: 'Persona que disfruta actuar o realizar para una audiencia.' },
      ]
    },
    
    // Juego Sensorial
    {
      category: 'Juego Sensorial',
      items: [
        { name: 'Sensation Seeker', description: 'Persona que busca experiencias sensoriales intensas.' },
        { name: 'Sensation Giver', description: 'Persona que proporciona experiencias sensoriales.' },
        { name: 'Sensory Deprivation Enthusiast', description: 'Persona que disfruta de la privación sensorial.' },
        { name: 'Sensory Overload Enthusiast', description: 'Persona que disfruta de la sobrecarga sensorial.' },
      ]
    },
    
    // Fantasía y Rol
    {
      category: 'Fantasía y Rol',
      items: [
        { name: 'Vampire', description: 'Persona que adopta el rol de vampiro en juegos de rol.' },
        { name: 'Werewolf', description: 'Persona que adopta el rol de hombre lobo en juegos de rol.' },
        { name: 'Fairy', description: 'Persona que adopta el rol de hada en juegos de rol.' },
        { name: 'Elf', description: 'Persona que adopta el rol de elfo en juegos de rol.' },
        { name: 'Demon', description: 'Persona que adopta el rol de demonio en juegos de rol.' },
        { name: 'Angel', description: 'Persona que adopta el rol de ángel en juegos de rol.' },
      ]
    },
    
    // Personajes de Rol
    {
      category: 'Personajes de Rol',
      items: [
        { name: 'Nurse/Doctor', description: 'Persona que adopta el rol de enfermera o doctor en juegos de rol médicos.' },
        { name: 'Teacher/Student', description: 'Persona que adopta el rol de profesor o estudiante en juegos de rol académicos.' },
        { name: 'Cop/Criminal', description: 'Persona que adopta el rol de policía o criminal en juegos de rol de persecución.' },
        { name: 'Royalty/Subject', description: 'Persona que adopta el rol de realeza o súbdito en juegos de rol de la corte.' },
      ]
    },
    
    // Profesionales de Kink
    {
      category: 'Profesionales de Kink',
      items: [
        { name: 'Professional Dominant', description: 'Persona que ofrece servicios profesionales de dominación.' },
        { name: 'Professional Submissive', description: 'Persona que ofrece servicios profesionales de sumisión.' },
        { name: 'Rigger Professional', description: 'Persona que ofrece servicios profesionales de ataduras.' },
        { name: 'Sensation Top Professional', description: 'Persona que ofrece experiencias sensoriales profesionales.' },
      ]
    },
  ];

  const content = (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Roles en BDSM y Kink</h1>
        <p className="text-lg text-gray-300">
          En el contexto del BDSM y kink, los roles se refieren a las dinámicas de poder 
          y las posiciones que las personas adoptan durante sus interacciones. Estos roles 
          pueden ser fluidos y cambiar según la situación, la pareja o las preferencias personales.
        </p>
      </div>

      <div className="bg-green-900/30 border border-green-600 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-400 mb-3">Sobre los Roles</h2>
        <p className="text-gray-300">
          Los roles pueden variar ampliamente y a menudo se superponen. Muchas personas disfrutan de múltiples roles 
          en diferentes contextos o con diferentes parejas. La comunicación abierta y el consentimiento son fundamentales 
          para explorar estos roles de manera segura y satisfactoria.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Roles Principales</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-3">Dominante (Dom/Domme)</h3>
          <p className="text-gray-300 mb-3">
            Persona que toma el control y la responsabilidad en una escena o relación de poder.
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>• Establece reglas y límites</li>
            <li>• Guía la escena</li>
            <li>• Responsable del bienestar del sumiso</li>
            <li>• Toma decisiones durante la escena</li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">Sumiso (Sub)</h3>
          <p className="text-gray-300 mb-3">
            Persona que entrega el control y sigue las directrices del dominante.
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>• Acepta la autoridad del dominante</li>
            <li>• Sigue instrucciones y reglas</li>
            <li>• Comunica límites y necesidades</li>
            <li>• Confía en el dominante</li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Switch</h3>
          <p className="text-gray-300 mb-3">
            Persona que disfruta tanto del rol dominante como del sumiso.
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>• Alterna entre dominancia y sumisión</li>
            <li>• Adaptable según la pareja</li>
            <li>• Comprende ambas perspectivas</li>
            <li>• Versátil en sus preferencias</li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-3">Slave (Esclavo/a)</h3>
          <p className="text-gray-300 mb-3">
            Forma más intensa de sumisión, generalmente en relaciones a largo plazo.
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>• Entrega de control más completa</li>
            <li>• Relación de propiedad consensuada</li>
            <li>• Protocolo más estricto</li>
            <li>• Compromiso a largo plazo</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Roles Especializados</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Master/Mistress</h4>
          <p className="text-gray-300 text-sm">
            Dominante que tiene una relación de propiedad con un esclavo/a. Implica un alto 
            nivel de responsabilidad y compromiso.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Top/Bottom</h4>
          <p className="text-gray-300 text-sm">
            Roles más específicos a actividades físicas. El "top" es quien realiza la acción, 
            el "bottom" quien la recibe.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Brat/Brat Tamer</h4>
          <p className="text-gray-300 text-sm">
            Dinámicas donde el sumiso es desafiante (brat) y el dominante disfruta "domando" 
            ese comportamiento rebelde.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Daddy/Mommy - Little</h4>
          <p className="text-gray-300 text-sm">
            Dinámicas de cuidado donde una persona adopta un rol protector y la otra un rol 
            más dependiente o infantil (age play).
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Pet/Handler</h4>
          <p className="text-gray-300 text-sm">
            Dinámicas donde una persona adopta características animales (pet) y la otra actúa 
            como cuidador/entrenador.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Conceptos Importantes</h2>
      
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Flexibilidad de Roles</h3>
        <p className="text-gray-300 mb-4">
          Los roles no son identidades fijas. Muchas personas:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>• Cambian de rol según la pareja o situación</li>
          <li>• Experimentan con diferentes dinámicas</li>
          <li>• Evolucionan en sus preferencias con el tiempo</li>
          <li>• Pueden no identificarse con ningún rol específico</li>
        </ul>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-white mb-4">Comunicación de Roles</h3>
        <p className="text-gray-300">
          Es esencial comunicar claramente los roles preferidos, límites dentro de esos roles, 
          y cómo se manifestarán en la relación o escena específica. No hay que asumir que 
          todos interpretan los roles de la misma manera.
        </p>
      </div>

      <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold text-yellow-400 mb-3">Nota Importante</h3>
        <p className="text-gray-300">
          Los roles en BDSM son consensuados y limitados al contexto sexual/kink. 
          No reflejan necesariamente la personalidad o las preferencias de poder 
          en la vida cotidiana de las personas.
        </p>
      </div>
    </div>
  );

  return (
    <SectionLayout
      title="Roles"
      content={content}
      sectionId="roles"
      lastUpdated="hace 1 semana"
    />
  );
};

const RolesPage = withFetichionarioPage('Roles')(RolesContent);
export default RolesPage;
