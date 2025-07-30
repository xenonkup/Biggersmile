"use client";

import { useState, useEffect } from "react";
import { siteInfo } from "../../lib/siteData";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // แสดง header เมื่ออยู่ที่ด้านบนสุด
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
      // ซ่อน header เมื่อเลื่อนลงมากกว่า 150px
      else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      }
      // แสดง header เมื่อเลื่อนขึ้น
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-[#1e335e] text-white py-1 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center gap-4 px-5 md:px-7 h-10">
        <div className="text-center md:text-left">
          <span className="text-sm font-normal leading-tight">
            {siteInfo.clinic.name}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 sm:w-5 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="ml-2 text-sm font-normal whitespace-nowrap">
            {siteInfo.clinic.phone}
          </span>
        </div>
      </div>
    </header>
  );
}