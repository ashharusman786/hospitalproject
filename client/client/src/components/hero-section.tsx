import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { UserRound, MapPin } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero-title')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            {t('hero-subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('doctors')}
              className="btn-tetradic px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center space-x-2"
            >
              <UserRound className="w-5 h-5" />
              <span>{t('view-doctors')}</span>
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all inline-flex items-center justify-center space-x-2"
            >
              <MapPin className="w-5 h-5" />
              <span>{t('get-directions')}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
