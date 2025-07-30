import Image from "next/image";
import Link from "next/link";
import { services, serviceDetails, uiText } from "../../../lib/siteData";

export default function OrthodonticServicesPage() {
  const serviceDetail = serviceDetails['getting-braces'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Dark Blue Background */}
      <header className="bg-[#1e335e] text-white py-6 w-full">
        <div className="container mx-auto px-5">
          <h1 className="text-3xl md:text-4xl font-medium">{serviceDetail.title}</h1>
        </div>
      </header>


      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:max-w-3xl">
        {/* Introduction Text */}
        <div className="py-3">
          <p className="text-xs sm:text-sm leading-relaxed text-c">
            {serviceDetail.introduction}
          </p>
        </div>

        {/* Image Section - Person with Braces */}
        <div className="flex justify-center my-3">
          <Image
            src={serviceDetail.image}
            alt={serviceDetail.imageAlt}
            width={400}
            height={200}
            className="w-full max-w-md h-auto"
          />
        </div>

        {/* Benefits Section with Blue Header */}
        {serviceDetail.benefits && (
          <div className="my-3">
            <div className="bg-[#DAEAFB] text-[#3B5998] py-1 px-3 mb-2">
              <h2 className="text-xs sm:text-sm text-center">{serviceDetail.benefits.title}</h2>
            </div>

            <ol className="list-decimal ml-5 space-y-1 sm:space-y-2">
              {serviceDetail.benefits.items.map((benefit, index) => (
                <li key={index} className="text-xs sm:text-sm font-medium">
                  {benefit.title}
                  <ul className="list-disc ml-4 mt-1">
                    {benefit.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="font-normal text-xs">{detail}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Types of Braces Section with Blue Header */}
        {serviceDetail.types && (
          <div className="my-3">
            <div className="bg-[#DAEAFB] text-[#3B5998] py-1 px-3 mb-2">
              <h2 className="text-xs sm:text-sm text-center">{serviceDetail.types.title}</h2>
            </div>

            {serviceDetail.types.items.map((type, index) => (
              <div
                key={index}
                className={`border ${type.borderColor === 'pink' ? 'border-pink-300' : 'border-gray-300'} rounded p-2 sm:p-3 ${index < serviceDetail.types!.items.length - 1 ? 'mb-3' : ''}`}
              >
                <h3 className="text-xs sm:text-sm font-bold">{type.title}</h3>
                <p className="text-xs my-1"><span className="font-medium">{uiText.characteristics}</span> {type.description}</p>
                <p className="text-xs my-1"><span className="font-medium">{uiText.advantages}</span></p>
                <ul className="list-disc pl-5 text-xs">
                  {type.advantages.map((advantage, advIndex) => (
                    <li key={advIndex}>{advantage}</li>
                  ))}
                </ul>
                {type.duration && (
                  <p className="text-xs mt-1"><span className="font-medium">{uiText.duration}</span> {type.duration}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="py-6 sm:py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
    </div>
  );
}