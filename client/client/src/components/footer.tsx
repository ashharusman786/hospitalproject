import { useTranslation } from '@/hooks/use-translation';
import { Hospital, MapPin, Phone, Mail } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-medical-teal to-medical-purple rounded-xl flex items-center justify-center">
                <Hospital className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('hospital-name')}</h3>
                <p className="text-gray-300">{t('tagline')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {t('footer-description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quick-links')}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav-home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('doctors')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav-doctors')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('timings')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav-timings')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav-gallery')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav-contact')}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact-info')}</h4>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{t('footer-address')}</span>
              </p>
              <p className="text-gray-300 flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 7860120688</span>
              </p>
              <p className="text-gray-300 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@samadnursinghome.com</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            <span>{t('copyright')}</span>
            <span className="mx-2">|</span>
            <span>{t('privacy')}</span>
            <span className="mx-2">|</span>
            <span>{t('terms')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
