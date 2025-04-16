import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import DentistProfile from "./pages/DentistProfile";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/auth/Login";

// Initialize i18n
import "./i18n/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/search" element={<Layout><Search /></Layout>} />
            <Route path="/dentists/:id" element={<Layout><DentistProfile /></Layout>} />
            <Route path="/booking/:dentistId/:procedureId" element={<Layout><BookingPage /></Layout>} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />

            {/* Catch-all route */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
