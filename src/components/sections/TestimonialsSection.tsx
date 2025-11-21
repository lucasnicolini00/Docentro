import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const title = t("title");
  const subtitle = t("subtitle");
  const testimonials = t.raw("testimonials");

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Array.isArray(testimonials) &&
            testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
