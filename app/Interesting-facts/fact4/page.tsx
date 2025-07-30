import Image from 'next/image'
import { factDetails } from "../../../lib/siteData";

export default function Fact4Page() {
  const factDetail = factDetails["fact4"];
    return (
        <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
            {/* ส่วนหัว */}
            <header className="text-left mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3B5998] mt-2">
                {factDetail.title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                by {factDetail.author} | {factDetail.date}
                </p>
            </header>

            {/* รูปภาพ */}
            <section className="mb-6">
                <div className="w-full max-h-[700px] overflow-hidden rounded-lg">
                    <Image
                        src={factDetail.image}
                        alt={factDetail.imageAlt}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* เนื้อหา */}
            <section className="space-y-4 text-base sm:text-lg">
                {factDetail.content.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </section>
        </div>
    </div>
    )
}