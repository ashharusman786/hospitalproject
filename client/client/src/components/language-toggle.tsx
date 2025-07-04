import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Languages, Phone } from 'lucide-react';

export default function LanguageToggle() {
  const { t, toggleLanguage } = useTranslation();

  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 bg-medical-teal text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            <Languages className="w-4 h-4" />
            <span>{t('language')}</span>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="tel:+919876543210"
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>{t('emergency')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
