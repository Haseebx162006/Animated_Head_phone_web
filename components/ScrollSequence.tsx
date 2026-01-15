"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const TOTAL_FRAMES = 240;

export function ScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Load images
    useEffect(() => {
        let mounted = true;
        const loadImages = async () => {
            const loaded: HTMLImageElement[] = [];
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                const str = i.toString().padStart(3, "0");
                img.src = `/sequence/ezgif-frame-${str}.jpg`;
                await new Promise<void>((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                });
                if (!mounted) return;
                loaded.push(img);
                setLoadingProgress((i / TOTAL_FRAMES) * 100);
            }
            setImages(loaded);
        };
        loadImages();
        return () => { mounted = false; };
    }, []);

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    // Handle Resize & Init Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            // Set physical dimensions
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            // Logical Scale
            ctx.scale(dpr, dpr);

            // Quality Settings
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // Re-render immediately to avoid flash
            const currentFrame = Math.floor(frameIndex.get());
            renderCanvas(currentFrame);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial setup

        return () => window.removeEventListener("resize", handleResize);
    }, [images]); // Re-run when images might be ready, though renderCanvas handles missing images gracefully

    const renderCanvas = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        // Safety checks
        if (!canvas || !ctx || images.length === 0) return;

        let img = images[Math.min(TOTAL_FRAMES - 1, Math.floor(index))];
        if (!img) img = images[0]; // Fallback
        if (!img) return;

        const logicalWidth = window.innerWidth;
        const logicalHeight = window.innerHeight;

        // Calculate Cover/Contain Logic
        const hRatio = logicalWidth / img.width;
        const vRatio = logicalHeight / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (logicalWidth - img.width * ratio) / 2;
        const centerShift_y = (logicalHeight - img.height * ratio) / 2;

        // Clear and Draw
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, logicalWidth, logicalHeight);

        // Apply Sharpening Filter
        ctx.save();
        try {
            ctx.filter = "contrast(1.1) saturate(1.1)";
        } catch (e) {
            // Fallback for browsers not supporting context filter
        }

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
        ctx.restore();
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        requestAnimationFrame(() => renderCanvas(latest));
    });

    // Opacity Logic
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
    const engineeringOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const ncOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
    const soundOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
    const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);

    return (
        <div ref={containerRef} className="relative h-[800vh] bg-sony-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="h-full w-full" />

                {images.length < TOTAL_FRAMES && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-sony-black text-white/50 z-50">
                        <p className="mb-2 text-sm font-medium">Loading Experience</p>
                        <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full bg-sony-blue transition-all duration-100"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 pointer-events-none">
                    {/* Hero */}
                    <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="text-6xl font-bold tracking-tighter text-white md:text-8xl lg:text-9xl mb-4 bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                            Sony WH-1000XM6
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-white/70 tracking-wide">
                            Silence, perfected.
                        </p>
                    </motion.div>

                    {/* Engineering */}
                    <motion.div style={{ opacity: engineeringOpacity }} className="absolute inset-0 flex items-center p-8 md:p-24">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Precision-engineered <br /><span className="text-sony-blue">for silence.</span>
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed">
                                Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity. Every component is tuned for balance.
                            </p>
                        </div>
                    </motion.div>

                    {/* Noise Cancelling (Right Aligned) */}
                    <motion.div style={{ opacity: ncOpacity }} className="absolute inset-0 flex items-center justify-end p-8 md:p-24">
                        <div className="max-w-xl text-right">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Adaptive noise cancelling, <br /><span className="text-sony-cyan">redefined.</span>
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed">
                                Multi-microphone array listens in every direction. Real-time noise analysis adjusts to your environment instantly.
                            </p>
                        </div>
                    </motion.div>

                    {/* Sound (Left/Center) */}
                    <motion.div style={{ opacity: soundOpacity }} className="absolute inset-0 flex items-center justify-center p-8 text-center p-8">
                        <div className="max-w-2xl bg-black/40 backdrop-blur-sm p-12 rounded-3xl border border-white/5">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Immersive, <br />lifelike sound.
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed">
                                AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
                            </p>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div style={{ opacity: ctaOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-auto">
                        <h2 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight">
                            Hear everything.<br />Feel nothing else.
                        </h2>
                        <div className="flex flex-col gap-4 items-center">
                            <button className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-200 transition-colors shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]">
                                Experience WH-1000XM6
                            </button>
                            <a href="#" className="text-white/60 hover:text-white transition-colors">View Full Specs</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
