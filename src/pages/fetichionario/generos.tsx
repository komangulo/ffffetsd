import { withFetichionarioPage } from './_template';

const GenerosContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-300 leading-relaxed">
        El género es un concepto complejo y multifacético que abarca la identidad, expresión y 
        experiencia personal de cada individuo. Esta página proporciona una guía comprensiva de 
        los términos de género utilizados en las comunidades BDSM y kink, incluyendo las abreviaciones 
        comunes usadas en perfiles de FetLife y otros espacios.
      </p>

      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-3">Diversidad de Género</h3>
        <p className="text-gray-300">
          Las comunidades kink y BDSM han sido históricamente espacios inclusivos para personas 
          de todas las identidades de género. Esta diversidad enriquece nuestras comunidades y 
          nos recuerda que la expresión de género es tan variada como las personas mismas.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Abreviaciones de Género en Perfiles de FetLife</h2>
      
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <p className="text-gray-300 mb-4">
          Las siguientes abreviaciones son comúnmente utilizadas en perfiles para describir 
          la identidad de género de manera concisa:
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">AG</span>
              <span className="text-gray-300">Agénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Andro</span>
              <span className="text-gray-300">Andrógino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">B</span>
              <span className="text-gray-300">Butch</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">BG</span>
              <span className="text-gray-300">Bigénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">CD/TV</span>
              <span className="text-gray-300">Crossdresser/Travestido</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Cis</span>
              <span className="text-gray-300">Cisgénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Db</span>
              <span className="text-gray-300">Demiboy</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Dg</span>
              <span className="text-gray-300">Demigirl</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">DemiG</span>
              <span className="text-gray-300">Demigénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">F</span>
              <span className="text-gray-300">Femenino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">FEM</span>
              <span className="text-gray-300">Femme</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">FtM</span>
              <span className="text-gray-300">Femenino a Masculino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">GF</span>
              <span className="text-gray-300">Género Fluido</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">GN</span>
              <span className="text-gray-300">Género Neutral</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">GNC</span>
              <span className="text-gray-300">Género No Conforme</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">GQ</span>
              <span className="text-gray-300">Genderqueer</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">IS</span>
              <span className="text-gray-300">Intersexual</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">M</span>
              <span className="text-gray-300">Masculino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Masc</span>
              <span className="text-gray-300">Masculino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">MtF</span>
              <span className="text-gray-300">Masculino a Femenino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">NB</span>
              <span className="text-gray-300">No Binario</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">PG</span>
              <span className="text-gray-300">Pangénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">QG</span>
              <span className="text-gray-300">Cuestionando</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">TG</span>
              <span className="text-gray-300">Transgénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">TM</span>
              <span className="text-gray-300">Hombre Trans</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">TW</span>
              <span className="text-gray-300">Mujer Trans</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">TwoS</span>
              <span className="text-gray-300">Dos Espíritus</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">UoG</span>
              <span className="text-gray-300">Inseguro/a</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">W</span>
              <span className="text-gray-300">Mujer</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Cis</span>
              <span className="text-gray-300">Cisgénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Db</span>
              <span className="text-gray-300">Demichico</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Dg</span>
              <span className="text-gray-300">Demichica</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">DemiG</span>
              <span className="text-gray-300">Demigénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">F</span>
              <span className="text-gray-300">Femenino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">FEM</span>
              <span className="text-gray-300">Femme</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">FtM</span>
              <span className="text-gray-300">Trans - Mujer a Hombre</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">GF</span>
              <span className="text-gray-300">Género Fluido</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">GN</span>
              <span className="text-gray-300">Género Neutro</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">GNC</span>
              <span className="text-gray-300">No Conforme al Género</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">GQ</span>
              <span className="text-gray-300">Género Queer</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">IS</span>
              <span className="text-gray-300">Intersex</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">M</span>
              <span className="text-gray-300">Masculino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">Masc</span>
              <span className="text-gray-300">Masculino</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">MtF</span>
              <span className="text-gray-300">Trans - Hombre a Mujer</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">NB</span>
              <span className="text-gray-300">No Binario</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">PG</span>
              <span className="text-gray-300">Pangénero</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">QG</span>
              <span className="text-gray-300">Cuestionando</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-400 font-mono">TG</span>
              <span className="text-gray-300">Transgénero</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-600">
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-400 font-mono">TM</span>
            <span className="text-gray-300">Hombre Trans</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-400 font-mono">TW</span>
            <span className="text-gray-300">Mujer Trans</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-400 font-mono">TwoS</span>
            <span className="text-gray-300">Dos Espíritus</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-400 font-mono">UoG</span>
            <span className="text-gray-300">Inseguro</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-400 font-mono">W</span>
            <span className="text-gray-300">Mujer</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-400 font-mono">TS</span>
            <span className="text-gray-300">Transexual</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Definiciones de Términos de Género</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Agénero</h4>
          <p className="text-gray-300 text-sm">
            Persona que no se identifica con ningún género o que experimenta una ausencia 
            de identidad de género. También puede referirse a alguien que rechaza el concepto 
            de género por completo.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Andrógino</h4>
          <p className="text-gray-300 text-sm">
            Persona cuya expresión de género combina características tradicionalmente masculinas 
            y femeninas, o que se presenta de manera que su género no es fácilmente identificable.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Bigénero</h4>
          <p className="text-gray-300 text-sm">
            Persona que experimenta dos identidades de género distintas, ya sea simultáneamente 
            o alternando entre ellas. Puede identificarse como hombre y mujer, o cualquier 
            combinación de dos géneros.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Butch</h4>
          <p className="text-gray-300 text-sm">
            Término usado principalmente en comunidades LGBTQ+ para describir una expresión 
            de género masculina, especialmente en personas asignadas como mujeres al nacer. 
            Común en la cultura lésbica.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Cisgénero</h4>
          <p className="text-gray-300 text-sm">
            Persona cuya identidad de género coincide con el sexo asignado al nacer. 
            Es decir, alguien que se identifica como el género que le fue asignado en el nacimiento.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Crossdresser/Travestido</h4>
          <p className="text-gray-300 text-sm">
            Persona que usa ropa asociada con un género diferente al suyo, generalmente 
            para expresión personal, entretenimiento o placer. No necesariamente indica 
            una identidad de género transgénero.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Demigénero</h4>
          <p className="text-gray-300 text-sm">
            Término paraguas que incluye demichico, demichica y otras identidades donde 
            la persona experimenta una conexión parcial con un género en particular, 
            pero no completamente.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Femme</h4>
          <p className="text-gray-300 text-sm">
            Expresión de género femenina que puede ser adoptada por personas de cualquier 
            identidad de género. Celebra la feminidad de manera intencional y a menudo 
            con orgullo político.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Género Fluido</h4>
          <p className="text-gray-300 text-sm">
            Identidad de género que cambia o fluctúa a lo largo del tiempo. Una persona 
            de género fluido puede sentirse más masculina algunos días, más femenina otros, 
            o experimentar otros géneros.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Género No Conforme</h4>
          <p className="text-gray-300 text-sm">
            Persona cuya expresión de género no se ajusta a las expectativas sociales 
            tradicionales para su género asignado. Puede aplicarse a la ropa, comportamiento, 
            o presentación general.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Genderqueer</h4>
          <p className="text-gray-300 text-sm">
            Identidad de género que existe fuera del binario tradicional hombre/mujer. 
            Puede incluir elementos de ambos géneros, ninguno, o géneros completamente 
            diferentes.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Intersex</h4>
          <p className="text-gray-300 text-sm">
            Término que describe a personas nacidas con características sexuales (cromosomas, 
            hormonas, anatomía) que no se ajustan a las definiciones típicas de cuerpos 
            masculinos o femeninos.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">No Binario</h4>
          <p className="text-gray-300 text-sm">
            Término paraguas para identidades de género que no se ajustan exclusivamente 
            a las categorías de hombre o mujer. Incluye muchas identidades diferentes 
            fuera del binario de género.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Pangénero</h4>
          <p className="text-gray-300 text-sm">
            Identidad de género que abarca múltiples géneros o todos los géneros. 
            Una persona pangénero puede experimentar muchas identidades de género 
            simultáneamente o a lo largo del tiempo.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Transgénero</h4>
          <p className="text-gray-300 text-sm">
            Término paraguas para personas cuya identidad de género difiere del sexo 
            asignado al nacer. Incluye hombres trans, mujeres trans, y personas no binarias.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Altersex</h4>
          <p className="text-gray-300 text-sm">
            Término que describe a personas cuya anatomía sexual difiere de lo típicamente 
            masculino o femenino, ya sea por variaciones congénitas o modificaciones corporales.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Anesigénero</h4>
          <p className="text-gray-300 text-sm">
            Identidad de género caracterizada por una sensación de indiferencia hacia el género 
            o dificultad para entender el concepto de género.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Apagénero</h4>
          <p className="text-gray-300 text-sm">
            Identidad de género caracterizada por una falta de conexión con cualquier género 
            o una sensación de neutralidad hacia el mismo.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Femboy/Femboi</h4>
          <p className="text-gray-300 text-sm">
            Término que describe a personas que se identifican como masculinas pero presentan 
            una expresión de género típicamente femenina.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Género Anárquico</h4>
          <p className="text-gray-300 text-sm">
            Rechazo de las estructuras y etiquetas de género tradicionales, 
            a menudo como una declaración política contra el sistema de género binario.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Glitchgender</h4>
          <p className="text-gray-300 text-sm">
            Identidad de género que se siente como un error o fallo técnico, 
            a menudo relacionado con la desconexión entre el género y el cuerpo.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Neogénero</h4>
          <p className="text-gray-300 text-sm">
            Término paraguas para identidades de género que son relativamente nuevas 
            o que se apartan de las categorías tradicionales de género.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Poligénero</h4>
          <p className="text-gray-300 text-sm">
            Identidad de género que abarca múltiples géneros simultáneamente, 
            aunque no necesariamente todos los géneros.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Tomboy</h4>
          <p className="text-gray-300 text-sm">
            Término que describe a personas que se identifican como femeninas pero presentan 
            una expresión de género típicamente masculina.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Xenogénero</h4>
          <p className="text-gray-300 text-sm">
            Término que describe identidades de género que no se relacionan con los conceptos 
            tradicionales de masculinidad, feminidad o neutralidad, sino que se definen por 
            características únicas o metáforas.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Dos Espíritus (Two-Spirit)</h4>
          <p className="text-gray-300 text-sm">
            Término específico de las culturas indígenas norteamericanas que describe 
            a personas que cumplen un rol de género tradicional de ambos espíritus 
            masculino y femenino. Es un término cultural específico con significado espiritual.
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Xenogénero</h4>
          <p className="text-gray-300 text-sm">
            Identidades de género que no pueden ser descritas en términos de masculinidad 
            o feminidad tradicionales. A menudo se describen usando metáforas, conceptos 
            abstractos, o elementos de la naturaleza.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-400 mt-8 mb-4">Términos Adicionales</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Genderfae</h5>
            <p className="text-gray-300 text-xs">Género fluido que nunca incluye masculinidad</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Genderfaun</h5>
            <p className="text-gray-300 text-xs">Género fluido que nunca incluye feminidad</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Genderflux</h5>
            <p className="text-gray-300 text-xs">Intensidad del género que fluctúa</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Genderfuck</h5>
            <p className="text-gray-300 text-xs">Rechazo intencional de las normas de género</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Multigénero</h5>
            <p className="text-gray-300 text-xs">Experimentar múltiples géneros simultáneamente</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Neogénero</h5>
            <p className="text-gray-300 text-xs">Géneros nuevos o únicos creados recientemente</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Paraboy/Paragirl</h5>
            <p className="text-gray-300 text-xs">Conexión parcial con chico/chica</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Polygénero</h5>
            <p className="text-gray-300 text-xs">Experimentar muchos géneros, pero no todos</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Transfeminino</h5>
            <p className="text-gray-300 text-xs">Movimiento hacia la feminidad desde otro género</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">Transmasculino</h5>
            <p className="text-gray-300 text-xs">Movimiento hacia la masculinidad desde otro género</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">XXY</h5>
            <p className="text-gray-300 text-xs">Condición cromosómica intersex (Síndrome de Klinefelter)</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <h5 className="font-semibold text-white text-sm">DemiFemme</h5>
            <p className="text-gray-300 text-xs">Conexión parcial con la feminidad</p>
          </div>
        </div>
      </div>

      <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold text-purple-400 mb-3">Respeto y Terminología</h3>
        <p className="text-gray-300 mb-3">
          Es importante recordar que los términos de género son personales y pueden significar 
          cosas diferentes para diferentes personas. Siempre es apropiado preguntar los 
          pronombres preferidos y respetar cómo cada persona se identifica.
        </p>
        <p className="text-gray-300">
          En las comunidades BDSM y kink, la diversidad de género es celebrada y respetada. 
          Estos términos nos ayudan a comunicarnos de manera más inclusiva y precisa sobre 
          nuestras identidades y experiencias.
        </p>
      </div>

      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-3">Evolución del Lenguaje</h3>
        <p className="text-gray-300">
          El lenguaje de género está en constante evolución. Nuevos términos emergen regularmente 
          para describir experiencias que antes no tenían palabras. Esta lista no es exhaustiva 
          y continuará creciendo conforme nuestra comprensión del género se expande.
        </p>
      </div>
    </div>
  );

  return (
    <SectionLayout
      title="Géneros"
      content={content}
      sectionId="generos"
      lastUpdated="hace 2 días"
    />
  );
};

const GenerosPage = withFetichionarioPage('Géneros')(GenerosContent);
export default GenerosPage;
