import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useRef } from "react";

export default function ImageGallery() {
  const { t } = useTranslation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Hospital Reception",
      title: t("reception"),
    },
    {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Patient Room",
      title: t("patient-room"),
    },
    {
      src: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Medical Equipment",
      title: t("equipment"),
    },
    {
      src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Laboratory",
      title: t("laboratory"),
    },
    {
      src: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Pharmacy",
      title: t("pharmacy"),
    },
    {
      src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Waiting Area",
      title: t("waiting-area"),
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("loaded");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const images = document.querySelectorAll(".lazy-load");
    images.forEach((image) => {
      observerRef.current?.observe(image);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <section id="gallery" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 text-text-primary">
            {t("gallery-title")}
          </h3>
          <p className="text-xl text-text-secondary">{t("gallery-subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg card-hover"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover lazy-load"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="text-lg font-semibold">{image.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
