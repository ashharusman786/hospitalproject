import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import reviewsData from '@/data/reviews.json';

export default function ReviewsSection() {
  const { t } = useTranslation();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 text-text-primary">{t('reviews-title')}</h3>
          <p className="text-xl text-text-secondary">{t('reviews-subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <Card key={review.id} className="bg-gray-50 rounded-2xl p-6 card-hover">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                  <span className="ml-2 text-text-secondary">{review.rating}</span>
                </div>
                <p className="text-text-secondary mb-4">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-medical-teal rounded-full flex items-center justify-center text-white font-semibold">
                    {review.avatar}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-text-secondary">{review.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
