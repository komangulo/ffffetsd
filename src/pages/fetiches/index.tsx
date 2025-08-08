import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Heart, Flame, List, X } from 'lucide-react';
import { ALL_FETISHES } from '@/data/fetishes';

type Fetish = {
  id: string;
  name: string;
  description?: string;
  popularity?: number;
};

// Función para obtener fetiches populares (en un caso real, esto vendría de la API)
const getPopularFetishes = (): Fetish[] => {
  // Simular popularidad basada en la longitud del nombre (solo para ejemplo)
  return [...ALL_FETISHES]
    .sort((a, b) => (b.popularity || b.name.length) - (a.popularity || a.name.length))
    .slice(0, 20);
};

export default function FetichesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [randomFetishes, setRandomFetishes] = useState<Fetish[]>([]);
  const [popularFetishes, setPopularFetishes] = useState<Fetish[]>([]);
  const [alphabeticalFetishes, setAlphabeticalFetishes] = useState<{[key: string]: Fetish[]}>({});
  const [selectedFetish, setSelectedFetish] = useState<Fetish | null>(null);
  
  // Inicializar fetiches al cargar el componente
  useEffect(() => {
    console.log('Cargando fetiches...');
    console.log('Total de fetiches cargados:', ALL_FETISHES.length);
    
    // Obtener fetiches aleatorios
    const shuffled = [...ALL_FETISHES].sort(() => 0.5 - Math.random());
    const randomFetishes = shuffled.slice(0, 20);
    console.log('Fetiches aleatorios:', randomFetishes);
    setRandomFetishes(randomFetishes);
    
    // Obtener fetiches populares
    const popular = getPopularFetishes();
    console.log('Fetiches populares:', popular);
    setPopularFetishes(popular);
    
    // Agrupar fetiches por letra inicial
    const groups: {[key: string]: Fetish[]} = {};
    ALL_FETISHES.forEach(fetish => {
      const firstLetter = fetish.name[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(fetish);
    });
    console.log('Grupos alfabéticos:', Object.keys(groups));
    setAlphabeticalFetishes(groups);
    
  }, []);
  
  // Filtrar fetiches basados en la búsqueda
  const filteredFetishes = searchQuery 
    ? ALL_FETISHES.filter(fetish =>
        fetish.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado y descripción principal */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Descubre tus kinks</h1>
          <p className="text-lg text-muted-foreground mb-2">
            Descubre cuáles son tus gustos
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-2">
            Bondage, spanking, tirones de pelo, ay madre...
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300">
            ¿Quieres añadir varios fetiches al perfil? <span className="font-semibold text-primary">Añádelos aquí</span>
          </p>
        </div>
        {/* Buscador */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Explorar Fetiches</h2>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar fetiches..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="random" className="flex items-center gap-2">
              <Heart className="h-4 w-4" /> Aleatorios
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center gap-2">
              <Flame className="h-4 w-4" /> Populares
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <List className="h-4 w-4" /> Todos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="random">
            <h3 className="text-2xl font-bold mb-4 text-primary">Fetiches aleatorios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {randomFetishes.map((fetish) => (
                <FetishCard key={fetish.id} fetish={fetish} onViewMore={() => setSelectedFetish(fetish)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <h3 className="text-2xl font-bold mb-4 text-primary">Más populares</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularFetishes.map((fetish) => (
                <FetishCard key={fetish.id} fetish={fetish} onViewMore={() => setSelectedFetish(fetish)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <h3 className="text-2xl font-bold mb-4 text-primary">Lista de fetiches</h3>
            {searchQuery ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFetishes.map((fetish) => (
                  <FetishCard key={fetish.id} fetish={fetish} onViewMore={() => setSelectedFetish(fetish)} />
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(alphabeticalFetishes).sort().map(([letter, fetishes]) => (
                  <div key={letter} className="mb-8">
                    <h4 className="text-xl font-bold mb-4 text-primary border-b pb-2">{letter}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {fetishes.map((fetish) => (
                        <div
                          key={fetish.id}
                          className="p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                          onClick={() => setSearchQuery(fetish.name)}
                        >
                          {fetish.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Modal para mostrar descripción */}
        {selectedFetish && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedFetish.name}</h3>
                <button
                  onClick={() => setSelectedFetish(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {selectedFetish.description ? (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedFetish.description}
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  Descripción no disponible para este fetiche.
                </p>
              )}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setSelectedFetish(null)}
                  variant="outline"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function FetishCard({ fetish, onViewMore }: { fetish: Fetish; onViewMore: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{fetish.name}</h3>
        {fetish.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {fetish.description.substring(0, 100)}...
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {fetish.popularity ? `${fetish.popularity} seguidores` : 'Explorar'}
          </span>
          <Button variant="outline" size="sm" onClick={onViewMore}>
            Ver más
          </Button>
        </div>
      </div>
    </div>
  );
}
