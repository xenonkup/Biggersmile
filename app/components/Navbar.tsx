"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
    { title: "หน้าหลัก", href: "/" },
    { title: "บริการของเรา", href: "/services" },
    { title: "อัตราการรักษา", href: "/cure-rate" },
    { title: "สาระน่ารู้", href: "/Interesting-facts" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // โหลดค่าเริ่มต้นจาก sessionStorage เมื่อ mount เท่านั้น
    useEffect(() => {
        const savedMenuState = sessionStorage.getItem("menuOpen");
        if (savedMenuState) {
            setIsMenuOpen(JSON.parse(savedMenuState));
        }
    }, []); // ไม่มี dependency รันแค่ครั้งแรก

    // อัปเดต activeSection เมื่อ pathname เปลี่ยน
    useEffect(() => {
        const currentSection = menuItems.find((item) => item.href === pathname);
        setActiveSection(currentSection ? currentSection.href : "/");
    }, [pathname]);

    // Scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // แสดง navbar เมื่ออยู่ที่ด้านบนสุด
            if (currentScrollY < 50) {
                setIsVisible(true);
            }
            // ซ่อน navbar เมื่อเลื่อนลงมากกว่า 150px
            else if (currentScrollY > lastScrollY && currentScrollY > 150) {
                setIsVisible(false);
            }
            // แสดง navbar เมื่อเลื่อนขึ้น
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // อัปเดต sessionStorage และ handleClickOutside
    useEffect(() => {
        sessionStorage.setItem("menuOpen", JSON.stringify(isMenuOpen));

        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav
            ref={navRef}
            className={`fixed left-0 w-full z-40 bg-white shadow-lg transition-all duration-300 ease-in-out ${isVisible ? 'top-10 translate-y-0' : 'top-0 -translate-y-full'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/assets/Logo/logo.png"
                                alt="Bigger Smile Logo"
                                width={80}
                                height={80}
                                priority
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
                            />
                            <span className="ml-2 text-lg sm:text-xl font-semibold text-gray-800 hidden sm:block">
                                Bigger Smile
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
                        <div className="flex space-x-1 lg:space-x-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors duration-200 
                    ${activeSection === item.href
                                            ? "text-[#1e335e] bg-blue-50"
                                            : "text-gray-700 hover:text-[#3B5998] hover:bg-blue-50"
                                        }`}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="https://www.facebook.com/biggersm"
                            className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 mr-1"
                            >
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9304 5.90625 14.2146 5.90625C15.3088 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1922C13.95 8.5625 13.5625 9.33334 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z" />
                            </svg>
                            ติดต่อเรา
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#1e335e] hover:text-[#1e335e] hover:bg-blue-50 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">เปิดเมนูหลัก</span>
                            <svg
                                className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                id="mobile-menu"
                style={{ zIndex: 1000 }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 shadow-lg">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === item.href
                                ? "bg-blue-100 text-[#1e335e]"
                                : "text-[#1e335e] hover:bg-blue-50 hover:text-blue-600"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.title}
                        </Link>
                    ))}
                    <Link
                        href="https://www.facebook.com/biggersm"
                        className="flex items-center justify-center w-full px-3 py-2 mt-4 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 mr-1"
                        >
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9304 5.90625 14.2146 5.90625C15.3088 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1922C13.95 8.5625 13.5625 9.33334 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z" />
                        </svg>
                        ติดต่อเรา
                    </Link>
                </div>
            </div>
        </nav>
    );
}