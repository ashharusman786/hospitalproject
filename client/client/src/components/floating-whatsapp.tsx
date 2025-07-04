import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingWhatsApp() {
  return (
    <Button
      asChild
      className="floating-btn bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
    >
      <a href="https://wa.me/917860120688" aria-label="Chat on WhatsApp">
        <MessageCircle className="w-6 h-6" />
      </a>
    </Button>
  );
}
