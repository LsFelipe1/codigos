import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import ProtectedRoute from "../src/pages/admin/components/protectedRoute";

import Page from "./pages/public/page";
import Login from "../src/pages/auth/login";
import NewsletterBlog from "./pages/public/routes/newspage";
import RequestAll from "./pages/public/routes/requestpage";
import OpenedNews from "../components/UI/news/openedNews";
import AdminLayout from "./pages/admin/adminLayout";
import Dashboard from "./pages/admin/dashboard";
import RequestsList from "./pages/admin/requests/requests";
import Posts from "./pages/admin/blog/posts";
import NewRequest from "./pages/admin/requests/newrequests";
import RequestDetails from "./pages/admin/requests/requestdetails";
import NewPost from "./pages/admin/blog/newposts";
import Settings from "./pages/admin/settings/settings";
import OpenedRequest from "../components/UI/request/openedRequest";
import AboutPage from "./pages/public/routes/aboutme";
import EditPost from "./pages/admin/requests/editPost";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Page />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/noticias" element={<NewsletterBlog />} />
          <Route path="/noticias/:id" element={<OpenedNews />} />
          <Route path="/pedidos" element={<RequestAll />} />
          <Route path="/pedidos/:id" element={<OpenedRequest />} />

          {/* Autenticação */}
          <Route path="/login" element={<Login />} />

          {/* Área Administrativa Protegida */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="pedidos" element={<RequestsList />} />
              <Route path="pedidos/novo" element={<NewRequest />} />
              <Route path="pedidos/:id" element={<RequestDetails />} />
              <Route path="blog" element={<Posts />} />
              <Route path="blog/novo" element={<NewPost />} />
              <Route path="blog/:id" element={<EditPost />} />
              <Route path="configuracoes" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}