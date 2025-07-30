import Image from "next/image";
import Link from "next/link";
import { services, uiText } from "../../lib/siteData";

export default function OrthodonticServicesPage() {

  return (
    <section className="bg-gradient-to-b bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-[#3B5998] mb-2 sm:mb-3 md:mb-4">
          {uiText.servicesFromDentist}
        </h2>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-[#3B5998] mb-4 sm:mb-6 md:mb-8 relative">
          {uiText.ourExperts}
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-medium text-gray-600 text-center mb-6 sm:mb-8 md:mb-12">
          {uiText.comprehensiveService}
        </p>

        {/* กรอบ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link href={service.link} key={index}>
              <div
                className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full min-h-[320px] md:min-h-[340px] bg-gradient-to-br from-white to-gray-100 hover:from-blue-50 hover:to-white animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* ภาพ */}
                <div className="w-full aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={300}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* หัวข้อ */}
                <h3 className="text-center text-sm sm:text-base md:text-lg font-semibold text-blue-900 mt-3 sm:mt-4 md:mt-5">
                  {service.title}
                </h3>

                {/* คำอธิบาย */}
                <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-3 flex-1 text-center">
                  {service.description}
                </p>

                {/* ปุ่ม */}
                <div className="text-center mt-3 sm:mt-4 md:mt-5">
                  <button className="bg-[#DAEAFB] text-[#3B5998] px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 cursor-pointer">
                    {uiText.readMore}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
