import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import FetichesPage from "./pages/fetiches";
import Roles from "./pages/Roles";
import Fetichionario from "./pages/fetichionario";
import ConsentimientoPage from "./pages/fetichionario/consentimiento";
import RolesPage from "./pages/fetichionario/roles";
import ActividadesKinkPage from "./pages/fetichionario/actividades-kink";
import SeguridadPage from "./pages/fetichionario/seguridad";
import TuKinkNoEsMiKinkPage from "./pages/fetichionario/tu-kink-no-es-mi-kink";
import GenerosPage from "./pages/fetichionario/generos";
import OrientacionesSexualesPage from "./pages/fetichionario/orientaciones-sexuales";
import OrientacionesRomanticasPage from "./pages/fetichionario/orientaciones-romanticas";
import RelacionesPage from "./pages/fetichionario/relaciones";
import ActividadesSexualesPage from "./pages/fetichionario/actividades-sexuales";
import JuguetesEquipamientoPage from "./pages/fetichionario/juguetes-equipamiento";
import EspaciosJuegoPage from "./pages/fetichionario/espacios-juego";
import EventosPage from "./pages/fetichionario/eventos";
import SaludSexualPage from "./pages/fetichionario/salud-sexual";
import SaludMentalPage from "./pages/fetichionario/salud-mental";
import RecursosSeguridadPage from "./pages/fetichionario/recursos-seguridad";
import GlosarioPage from "./pages/fetichionario/glosario";
import AbreviacionesPage from "./pages/fetichionario/abreviaciones";
import LicenciaPage from "./pages/fetichionario/licencia";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:id" element={<GroupDetail />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/fetiches" element={<FetichesPage />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/fetichionario" element={<Fetichionario />} />
      <Route path="/fetichionario/consentimiento" element={<ConsentimientoPage />} />
      <Route path="/fetichionario/roles" element={<Navigate to="/roles" replace />} />
      <Route path="/fetichionario/actividades-kink" element={<ActividadesKinkPage />} />
      <Route path="/fetichionario/seguridad" element={<SeguridadPage />} />
      <Route path="/fetichionario/tu-kink-no-es-mi-kink" element={<TuKinkNoEsMiKinkPage />} />
      <Route path="/fetichionario/generos" element={<GenerosPage />} />
      <Route path="/fetichionario/orientaciones-sexuales" element={<OrientacionesSexualesPage />} />
      <Route path="/fetichionario/orientaciones-romanticas" element={<OrientacionesRomanticasPage />} />
      <Route path="/fetichionario/relaciones" element={<RelacionesPage />} />
      <Route path="/fetichionario/actividades-sexuales" element={<ActividadesSexualesPage />} />
      <Route path="/fetichionario/juguetes-equipamiento" element={<JuguetesEquipamientoPage />} />
      <Route path="/fetichionario/espacios-juego" element={<EspaciosJuegoPage />} />
      <Route path="/fetichionario/eventos" element={<EventosPage />} />
      <Route path="/fetichionario/salud-sexual" element={<SaludSexualPage />} />
      <Route path="/fetichionario/salud-mental" element={<SaludMentalPage />} />
      <Route path="/fetichionario/recursos-seguridad" element={<RecursosSeguridadPage />} />
      <Route path="/fetichionario/glosario" element={<GlosarioPage />} />
      <Route path="/fetichionario/abreviaciones" element={<AbreviacionesPage />} />
      <Route path="/fetichionario/licencia" element={<LicenciaPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
