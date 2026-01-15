"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex h-[60px] items-center justify-between px-6 transition-all duration-700 ease-in-out md:px-12",
                isScrolled
                    ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50"
                    : "bg-transparent border-transparent"
            )}
        >
            {/* Left: Branding */}
            <div className="flex items-center gap-4">
                <span className="text-lg font-bold tracking-tighter text-white">Sony</span>
                <span className={cn(
                    "h-4 w-[1px] bg-white/20 transition-opacity duration-500",
                    isScrolled ? "opacity-100" : "opacity-0"
                )} />
                <span className={cn(
                    "text-sm font-medium tracking-wide text-white/90 transition-all duration-500",
                    isScrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                )}>
                    WH-1000XM6
                </span>
            </div>

            {/* Center: Nav Links */}
            <div className={cn(
                "absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex transition-opacity duration-700 delay-100",
                isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                {["Overview", "Technology", "Noise Cancelling", "Specs"].map((item) => (
                    <a
                        key={item}
                        href="#"
                        className="text-[13px] font-medium text-white/60 transition-colors hover:text-white"
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* Right: CTA */}
            <div className="flex items-center">
                <button className={cn(
                    "group relative overflow-hidden rounded-full bg-white/10 px-5 py-2 text-[13px] font-semibold text-white transition-all hover:bg-white/20",
                    isScrolled ? "bg-gradient-to-r from-sony-blue to-sony-cyan shadow-lg shadow-sony-blue/20 hover:shadow-sony-blue/40 hover:scale-105" : ""
                )}>
                    <span className="relative z-10">{isScrolled ? "Buy Now" : "Pre-order"}</span>
                </button>
            </div>
        </nav>
    );
}
