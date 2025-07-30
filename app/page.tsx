"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { services, promotions, homepageContent } from "../lib/siteData";

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <main className="min-h-screen pt-28">
        <section className="container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto">
            <Image
              src={homepageContent.banner.image}
              alt={homepageContent.banner.alt}
              width={1200}
              height={500}
              priority
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* ส่วนของบริการ */}
        <section className="py-6 sm:py-8 md:py-12 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-[#3B5998] mb-2 sm:mb-3 md:mb-4">
              {homepageContent.servicesSection.title}
            </h2>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-[#3B5998] mb-4 sm:mb-6 md:mb-8">
              {homepageContent.servicesSection.subtitle}
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-600 text-center mb-6 sm:mb-8 md:mb-12">
              {homepageContent.servicesSection.description}
            </p>

            {/* กรอบ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {services.map((service, index) => (
                <Link href={service.link} key={index}>
                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 flex flex-col h-full min-h-[320px] md:min-h-[340px]">
                    <div className="w-full aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={300}
                        height={225}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <h3 className="text-center text-sm sm:text-base md:text-lg font-semibold text-blue-900 mt-3 sm:mt-4 md:mt-5">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3 line-clamp-3 flex-1 text-center">
                      {service.description}
                    </p>
                    <div className="text-center mt-3 sm:mt-4 md:mt-5">
                      <button className="bg-[#DAEAFB] text-[#3B5998] px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-200 transition-colors duration-300">
                        อ่านต่อ
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* บิ๊กเกอร์สไมล์ยินดีต้อนรับ */}
        <section className="py-6 sm:py-8 md:py-12 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 md:gap-12">
              <div className="w-full sm:w-1/2">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-blue-800 mb-4 sm:mb-6 md:mb-8">
                  {homepageContent.welcomeSection.title}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                  {homepageContent.welcomeSection.description1}
                </p>
                <p className="text-gray-700 text-sm sm:text-base mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                  {homepageContent.welcomeSection.description2}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {homepageContent.welcomeSection.buttons.map((button, index) => (
                    <Link
                      key={index}
                      href={button.link}
                      className={`inline-block font-medium py-2 px-4 rounded-lg text-center w-full sm:w-auto transition-colors duration-300 ${button.style === 'facebook'
                        ? 'bg-[#DAEAFB] hover:bg-blue-200 text-[#3B5998]'
                        : 'bg-[#56CE2B] hover:bg-green-500 text-white'
                        }`}
                    >
                      {button.text}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={homepageContent.welcomeSection.image}
                    alt={homepageContent.welcomeSection.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promotion */}
        <section className="py-6 sm:py-8 md:py-12 bg-gray-50 text-center">
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1e335e]">
              {homepageContent.promotionSection.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">{homepageContent.promotionSection.subtitle}</p>
          </div>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {promotions.map((promotion, index) => (
                <div
                  key={index}
                  className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(promotion.image)}
                >
                  <div className="w-full h-40 sm:h-48 md:h-64 lg:h-80 overflow-hidden">
                    <Image
                      src={promotion.image}
                      alt={`Promotion ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-fill hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox แสดงรูปภาพขยายใหญ่ */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-3xl w-full p-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Selected"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  className="absolute top-5 right-4 bg-white/80 hover:bg-white text-black rounded-full p-2 w-10 transition-colors duration-200"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google Map */}
        <section className="py-6 sm:py-8 md:py-12 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={homepageContent.mapSection.embedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}