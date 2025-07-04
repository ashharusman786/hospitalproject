import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Hospital, Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function Navigation() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-medical-teal to-medical-purple rounded-xl flex items-center justify-center">
              <Hospital className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                {t("hospital-name")}
              </h1>
              <p className="text-sm text-text-secondary">{t("tagline")}</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => handleNavClick("home")}
              className="text-text-primary hover:text-medical-teal transition-colors"
            >
              {t("nav-home")}
            </button>
            <button
              onClick={() => handleNavClick("doctors")}
              className="text-text-primary hover:text-medical-teal transition-colors"
            >
              {t("nav-doctors")}
            </button>
            <button
              onClick={() => handleNavClick("timings")}
              className="text-text-primary hover:text-medical-teal transition-colors"
            >
              {t("nav-timings")}
            </button>
            <button
              onClick={() => handleNavClick("gallery")}
              className="text-text-primary hover:text-medical-teal transition-colors"
            >
              {t("nav-gallery")}
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-text-primary hover:text-medical-teal transition-colors"
            >
              {t("nav-contact")}
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="text-xl" />
            ) : (
              <Menu className="text-xl" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <button
              onClick={() => handleNavClick("home")}
              className="block py-2 text-text-primary hover:text-medical-teal w-full text-left"
            >
              {t("nav-home")}
            </button>
            <button
              onClick={() => handleNavClick("doctors")}
              className="block py-2 text-text-primary hover:text-medical-teal w-full text-left"
            >
              {t("nav-doctors")}
            </button>
            <button
              onClick={() => handleNavClick("timings")}
              className="block py-2 text-text-primary hover:text-medical-teal w-full text-left"
            >
              {t("nav-timings")}
            </button>
            <button
              onClick={() => handleNavClick("gallery")}
              className="block py-2 text-text-primary hover:text-medical-teal w-full text-left"
            >
              {t("nav-gallery")}
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="block py-2 text-text-primary hover:text-medical-teal w-full text-left"
            >
              {t("nav-contact")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
