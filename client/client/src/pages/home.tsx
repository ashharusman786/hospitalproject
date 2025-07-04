import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import MissionSection from '@/components/mission-section';
import DoctorsDirectory from '@/components/doctors-directory';
import ClinicTimings from '@/components/clinic-timings';
import ImageGallery from '@/components/image-gallery';
import ReviewsSection from '@/components/reviews-section';
import LocationContact from '@/components/location-contact';
import Footer from '@/components/footer';
import LanguageToggle from '@/components/language-toggle';
import AIAssistant from '@/components/ai-assistant';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <LanguageToggle />
      <Navigation />
      <HeroSection />
      <MissionSection />
      <DoctorsDirectory />
      <ClinicTimings />
      <ImageGallery />
      <ReviewsSection />
      <LocationContact />
      <Footer />
      <AIAssistant />
    </div>
  );
}
