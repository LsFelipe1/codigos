import RequestPage from "../../../components/UI/request/requestPage";
import WhatsAppButton from "../../../components/UI/whatsappButton";
import Dashboard from "../public/components/dashboard";
import Footer from "../public/components/footer";
import Header from "../public/components/header";
import Landing from "../public/components/landing";
import Newsletter from "../public/components/news";
import AboutPage from "./routes/aboutme";

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col bg-(--paper)">
      {/* Header Fixo/Sticky */}
      <Header />

      {/* Seções Principais da Landing Page */}
      <main className="flex-1">
        <Landing />
        <AboutPage />
        <Dashboard />
        <Newsletter />
        <RequestPage />
      </main>

      {/* Footer e Botão Flutuante de Contato */}
      <Footer />
      <WhatsAppButton phoneNumber="5581999999999" />
    </div>
  );
}