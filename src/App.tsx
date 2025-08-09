import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import FetichesPage from "./pages/fetiches";
import Roles from "./pages/Roles";
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
