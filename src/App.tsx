import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

import Shop from "@/pages/shop";
import Home from "@/pages/home";
import GiftsPage from "@/pages/gift";
import CustomBuilder from "@/pages/custom";
import BlogPage from "@/pages/blog";
import DeliverPage from "@/pages/delivery";
import CareGuidePage from "@/pages/careGuide";
import ContactPage from "@/pages/contact";
import FaqPage from "@/pages/FAQ";
import AuthPage from "@/pages/auth";
import ForgotPasswordPage from "@/pages/forgot-password";
import ResetPasswordPage from "@/pages/reset-password";
import DashboardPage from "@/pages/dashboard";
import AdminLayout from "@/pages/admin"
import Settings from "@/pages/adminSetting"

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      <Navbar />

      <main>
        <Routes>        
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/gifts" element={<GiftsPage />} />
          <Route path="/custom" element={<CustomBuilder />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/delivery" element={<DeliverPage />} />
          <Route path="/care-guide" element={<CareGuidePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/settings" element={<Settings />} />
  
        </Routes> 
      </main>

      <Footer />
    </div>
  );
}