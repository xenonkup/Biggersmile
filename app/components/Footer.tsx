import Image from "next/image";
import Link from "next/link";
import { siteInfo } from "../../lib/siteData";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-200 text-black pt-6 sm:pt-8 lg:pt-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* ส่วนหลักของ Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
          {/* โลโก้และชื่อคลินิก */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1">
            <div className="flex flex-col items-center md:items-start mb-4">
              <Image
                src={siteInfo.assets.logo}
                alt="Bigger Smile Dental Clinic Logo"
                width={120}
                height={100}
                className="w-20 sm:w-24 lg:w-32 mb-2"
              />
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#1e335e] mt-2 text-center md:text-left">{siteInfo.clinic.shortName}</h1>
              <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">{siteInfo.clinic.subtitle}</p>
            </div>
          </div>

          {/* ข้อมูลติดต่อ */}
          <div className="text-center md:text-left lg:col-span-2">
            <div className="border-2 border-blue-200 bg-blue-50 p-3 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-sm sm:text-base font-semibold mb-2 text-[#1e335e]">เวลาเปิดทำการ:</h2>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-700">
                <p>{siteInfo.businessHours.weekdays.days}:</p>
                <p>{siteInfo.businessHours.weekdays.hours}</p>
                <p>{siteInfo.businessHours.weekends.days}:</p>
                <p>{siteInfo.businessHours.weekends.hours}</p>
                <p>{siteInfo.businessHours.holidays.days}:</p>
                <p>{siteInfo.businessHours.holidays.hours}</p>
              </div>
            </div>
            <div className="flex items-start justify-center md:justify-start mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1e335e] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {siteInfo.clinic.address}
              </p>
            </div>
          </div>

          {/* เมนู Link */}
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-[#1e335e]">เมนูลิงค์</h4>
            <div className="flex flex-col gap-2">
              {siteInfo.navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-gray-700 hover:text-[#3B5998] transition-colors duration-200 flex items-center justify-center md:justify-start"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ติดต่อเรา */}
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-[#1e335e]">ติดต่อเรา</h4>
            <div className="flex items-center justify-center md:justify-start mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1e335e] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p className="text-xs sm:text-sm text-gray-700">{siteInfo.clinic.phone}</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-3 text-[#1e335e]">Social Media</h4>
            <div className="flex flex-col items-center md:items-start gap-3 mb-4">

              {/* Facebook */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Link href={siteInfo.socialMedia.facebook.url} target="_blank" className="hover:opacity-80 transition-opacity duration-200 flex-shrink-0">
                  <div className="bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                    <Image
                      src={siteInfo.socialMedia.facebook.icon}
                      alt="Facebook"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </Link>
                <p className="text-xs sm:text-sm text-gray-700 flex-1">{siteInfo.socialMedia.facebook.name}</p>
              </div>

              {/* Line */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Link href={siteInfo.socialMedia.line.url} target="_blank" className="hover:opacity-80 transition-opacity duration-200 flex-shrink-0">
                  <div className="bg-green-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                    <Image
                      src={siteInfo.socialMedia.line.icon}
                      alt="Line"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </Link>
                <p className="text-xs sm:text-sm text-[#1e335e] flex-1">{siteInfo.socialMedia.line.name}</p>
              </div>
            </div>
            <div className="flex justify-center md:justify-start">
              <div className="border-2 border-gray-200 rounded-lg p-1 hover:shadow-md transition-shadow duration-300">
                <Image
                  src={siteInfo.assets.qrCode}
                  alt="QR Code"
                  width={60}
                  height={60}
                  className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ลิขสิทธิ์ */}
      <div className="bg-[#1e335e] py-4 text-center">
        <div className="container mx-auto px-4">
          <p className="text-xs sm:text-sm text-white">
            © 2025 Bigger Smile Dental Clinic - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}