import { useTranslation } from '@/hooks/use-translation';
import { Heart, Award, Users } from 'lucide-react';

export default function MissionSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-8 text-text-primary">{t('mission-title')}</h3>
          <p className="text-xl text-text-secondary mb-12 leading-relaxed">
            {t('mission-text')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl glassmorphism gradient-overlay">
              <div className="w-16 h-16 bg-medical-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{t('value-compassion')}</h4>
              <p className="text-text-secondary">{t('value-compassion-desc')}</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl glassmorphism gradient-overlay">
              <div className="w-16 h-16 bg-medical-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{t('value-excellence')}</h4>
              <p className="text-text-secondary">{t('value-excellence-desc')}</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl glassmorphism gradient-overlay">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white text-2xl" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{t('value-community')}</h4>
              <p className="text-text-secondary">{t('value-community-desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
