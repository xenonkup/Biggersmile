import Image from "next/image";
import { cureRateContent } from "../../lib/siteData";

export default function CureRatePage() {
  return (
    <section className="py-10 bg-gray-50 pt-28">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B5998]">
          {cureRateContent.title}
        </h2>
        <p className="mt-2 text-gray-600 text-sm sm:text-base md:text-lg max-w-lg">
          {cureRateContent.description}
        </p>
        <div className="mt-6 w-full max-w-3xl rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <Image
            src={cureRateContent.image}
            alt={cureRateContent.imageAlt}
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>
        <div className="mt-6">
          <a
            href={cureRateContent.buttonLink}
            className="bg-[#DAEAFB] text-[#3B5998] px-6 py-3 rounded-lg shadow-md hover:bg-blue-200 transition-colors duration-300"
          >
            {cureRateContent.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
