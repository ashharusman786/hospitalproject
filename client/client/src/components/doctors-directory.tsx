import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import doctorsData from "@/data/doctors.json";

export default function DoctorsDirectory() {
  const { t } = useTranslation();

  return (
    <section id="doctors" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 text-text-primary">
            {t("doctors-title")}
          </h3>
          <p className="text-xl text-text-secondary">{t("doctors-subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {doctorsData.map((doctor) => (
            <Card
              key={doctor.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover"
            >
              <div
                className="h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url('${doctor.image}')` }}
              />
              <CardContent className="p-8">
                <h4 className="text-2xl font-bold mb-3 text-text-primary">
                  {doctor.name}
                </h4>
                <p className="text-medical-teal font-semibold mb-4 text-lg">
                  {doctor.specialty}
                </p>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${doctor.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center space-x-3 text-medical-purple hover:text-medical-teal transition-colors text-lg font-medium mb-4">
                    <Mail className="w-5 h-5" />
                    <span>{doctor.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${doctor.mobile}`}
                  className="flex items-center space-x-3 text-medical-teal hover:text-medical-purple transition-colors text-lg font-medium"
                >
                  <Phone className="w-5 h-5" />
                  <span>{doctor.mobile}</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
