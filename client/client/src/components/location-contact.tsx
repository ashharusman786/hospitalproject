import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ArrowDownRight,
} from "lucide-react";

export default function LocationContact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 text-text-primary">
            {t("contact-title")}
          </h3>
          <p className="text-xl text-text-secondary">{t("contact-subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96">
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!13!1d3651.0977427217185!2d76.7765373!3d23.7816543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzU0LjAiTiA3NsKwNDYnMzUuNSJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              /> */}
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d895.0576175541946!2d83.22167698219027!3d26.18918008058415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991a1da67192b05%3A0x8b48ca93fe9b6c21!2sSamad%20Nursing%20Home!5e0!3m2!1sen!2sin!4v1751469448526!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <CardContent className="p-6">
              <h4 className="text-xl font-bold mb-4">
                {t("hospital-address")}
              </h4>
              <p className="text-text-secondary mb-4 whitespace-pre-line">
                {t("address-english")}
              </p>
              <Button
                asChild
                className="inline-flex items-center space-x-2 bg-medical-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
              >
                <a
                  href="https://g.co/kgs/K9Cjyrm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowDownRight className="w-4 h-4" />
                  <span>{t("get-directions-btn")}</span>
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-white rounded-2xl p-8 shadow-lg">
              <CardContent className="p-0">
                <h4 className="text-2xl font-bold mb-6 text-text-primary">
                  {t("contact-info")}
                </h4>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-teal rounded-full flex items-center justify-center">
                      <Phone className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{t("main-number")}</p>
                      <a
                        href="tel:+9"
                        className="text-medical-teal hover:text-medical-purple transition-colors"
                      >
                        +91 7860120688
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <Phone className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{t("emergency-number")}</p>
                      <a
                        href="tel:+917860120688"
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        +91 7860120688
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{t("whatsapp")}</p>
                      <a
                        href="https://wa.me/917860120688"
                        className="text-green-500 hover:text-green-600 transition-colors"
                      >
                        +91 7860120688
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-purple rounded-full flex items-center justify-center">
                      <Mail className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{t("email")}</p>
                      <a
                        href="mailto:samadnursighome@gmail.com"
                        className="text-medical-purple hover:text-opacity-80 transition-colors"
                      >
                        samadnursighome@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white rounded-2xl p-8 shadow-lg">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold mb-4 text-text-primary">
                  {t("quick-actions")}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    asChild
                    className="bg-green-500 text-white p-4 rounded-xl text-center hover:bg-green-600 transition-colors h-auto"
                  >
                    <a
                      href="https://wa.me/919876543210"
                      className="flex flex-col items-center space-y-2"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-semibold">
                        {t("chat-whatsapp")}
                      </span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="bg-red-500 text-white p-4 rounded-xl text-center hover:bg-red-600 transition-colors h-auto"
                  >
                    <a
                      href="tel:+919876543200"
                      className="flex flex-col items-center space-y-2"
                    >
                      <Phone className="w-6 h-6" />
                      <span className="font-semibold">
                        {t("call-emergency")}
                      </span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
