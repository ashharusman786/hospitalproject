import { useTranslation } from "@/hooks/use-translation";
import { useHospitalStatus } from "@/hooks/use-hospital-status";
import { Card, CardContent } from "@/components/ui/card";
import doctorsData from "@/data/doctors.json";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  registration: boolean;
  email: string;
  mobile: string;
  image: string;
  morningHours: string;
  eveningHours: string;
  days: string[];
  isAvailable: boolean;
};

export default function ClinicTimings() {
  const { t } = useTranslation();
  const isHospitalOpen = useHospitalStatus();

  const useDoctorAvailability = (doctor: Doctor): boolean => {
    const today = new Date();
    const todayName = today.toLocaleDateString("en-US", { weekday: "long" });

    if (!doctor.days.includes(todayName)) return false;

    const parseTime = (timeStr: string): number => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const nowMinutes = today.getHours() * 60 + today.getMinutes();

    const checkSlot = (slot?: string) => {
      if (!slot) return false;
      const [start, end] = slot.split(" - ");
      return parseTime(start) <= nowMinutes && nowMinutes <= parseTime(end);
    };

    return checkSlot(doctor.morningHours) || checkSlot(doctor.eveningHours);
  };

  return (
    <section id="timings" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 text-text-primary">
            {t("timings-title")}
          </h3>
          <p className="text-xl text-text-secondary">{t("timings-subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* General Hospital Hours */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-6 text-white">
                {t("hospital-hours")}
              </h4>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12">
                <div className="bg-white bg-opacity-10 rounded-xl p-4 min-w-[200px]">
                  <p className="text-lg font-semibold text-gray-200 mb-2">
                    {t("weekdays")}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    8:00 AM - 10:00 PM
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 min-w-[200px]">
                  <p className="text-lg font-semibold text-gray-200 mb-2">
                    {t("sunday")}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <span
                  className={`inline-block px-6 py-3 rounded-full font-bold text-lg ${
                    isHospitalOpen
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-red-600 text-white shadow-lg"
                  }`}
                >
                  {isHospitalOpen ? t("open-now") : t("closed-now")}
                </span>
              </div>
            </div>
          </div>

          {/* Doctor-wise Timings */}
          <div className="grid md:grid-cols-2 gap-8">
            {doctorsData.slice(0, 2).map((doctor) => {
              const isAvailable = useDoctorAvailability(doctor);
              const doctorImagePath = `/images/doctors/${doctor.image}`;

              return (
                <Card
                  key={doctor.id}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center text-center">
                      <h5 className="text-2xl font-bold mb-2 text-text-primary">
                        {doctor.name}
                      </h5>
                      <p className="text-md text-text-secondary mb-4">
                        {doctor.specialty}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {doctor.morningHours && (
                        <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                          <span className="text-lg font-medium text-text-secondary">
                            {t("morning")}
                          </span>
                          <span className="font-bold text-lg text-text-primary">
                            {doctor.morningHours}
                          </span>
                        </div>
                      )}
                      {doctor.eveningHours && (
                        <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                          <span className="text-lg font-medium text-text-secondary">
                            {t("evening")}
                          </span>
                          <span className="font-bold text-lg text-text-primary">
                            {doctor.eveningHours}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 text-center">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          isAvailable
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                      >
                        {isAvailable
                          ? "Available Now"
                          : "Currently Unavailable"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
