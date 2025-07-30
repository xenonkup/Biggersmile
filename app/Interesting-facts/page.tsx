"use client";
import Image from "next/image";
import Link from "next/link";
import { facts, type Fact } from "../../lib/siteData";

export default function InterestingFactsPage() {
    return (
        <section className="bg-gray-50 min-h-screen">
            {/* ส่วนหัว */}
            <header className="bg-[#1e335e] text-white w-full">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 md:py-8">
                    <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                        สาระน่ารู้
                    </h1>
                </div>
            </header>

            {/* เนื้อหาหลัก */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
                    {facts.map((fact: Fact) => (
                        // passHref คือ prop ที่ใช้ใน <Link> ของ Next.js เพื่อส่ง href ไปยังคอมโพเนนต์ลูกที่ไม่ใช่ <a>
                        <Link key={fact.title} href={fact.path} passHref>
                            <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                                <div className="relative w-full pt-[75%] overflow-hidden rounded-t-xl">
                                    <Image
                                        src={fact.image}
                                        alt={fact.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#3B5998] group-hover:text-[#1e335e] transition-colors line-clamp-2 mb-2">
                                        {fact.title}
                                    </h2>
                                    <div className="mt-auto">
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            📅 {fact.date}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                            ✍️ {fact.author}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}