import { Navbar } from "@/components/Navbar";
import { ScrollSequence } from "@/components/ScrollSequence";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-sony-black">
      <Navbar />
      <ScrollSequence />

      <footer className="relative z-10 py-24 border-t border-white/5 bg-black text-center">
        <div className="mb-8 opacity-50">
          <span className="text-2xl font-bold tracking-tighter text-white">Sony</span>
        </div>
        <div className="flex justify-center gap-8 mb-8 text-sm text-white/40">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Sales Policy</a>
          <a href="#" className="hover:text-white transition-colors">Site Map</a>
        </div>
        <p className="text-xs text-white/20">
          &copy; 2026 Sony Electronics Inc. All rights reserved. Design Concept.
        </p>
      </footer>
    </main>
  );
}
