import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { WaveText } from '../components/ui/wave-text';
import { cn } from '../lib/utils';
import { ArrowUpRight, Zap, ArrowRight, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = ({ project, index, total }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="h-screen flex items-center justify-center sticky top-0 overflow-hidden"
    >
      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full max-w-6xl aspect-[4/5.2] sm:aspect-[3/2] lg:aspect-[16/9] mx-4 sm:mx-6 rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-slate-900 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.4)] group"
      >
        {/* Background Image with Parallax */}
        <motion.div style={{ y }} className="absolute inset-0 scale-125">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          {/* Universal high-contrast overlays */}
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 p-8 sm:p-12 lg:p-20 flex flex-col justify-end">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 whitespace-nowrap"
              >
                <span className="text-[9px] sm:text-[11px] font-black text-brand-primary uppercase tracking-[0.2em] sm:tracking-[0.4em] drop-shadow-md">{project.category}</span>
                <div className="h-px w-6 sm:w-12 bg-white/20" />
                <span className="text-[9px] sm:text-[11px] font-black text-slate-200 uppercase tracking-[0.2em] sm:tracking-[0.4em] drop-shadow-md">Project {project.id}/{total}</span>
              </motion.div>
              
              <h2 className="text-2xl sm:text-5xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter mb-4 sm:mb-8 leading-[0.95] sm:leading-none">
                {project.title}
              </h2>
              
              <p className="hidden sm:block text-sm sm:text-lg text-slate-300 max-w-xl font-medium leading-relaxed mb-6 sm:mb-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Result</span>
                  <span className="text-xl sm:text-2xl font-black text-brand-primary uppercase tracking-tighter">{project.result}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Impact</span>
                  <span className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter">Market Leader</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button className="w-12 h-12 sm:w-24 sm:h-24 rounded-full bg-white text-slate-950 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl group/btn overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-primary scale-0 group-hover/btn:scale-100 transition-transform duration-500 rounded-full" />
                <ArrowUpRight className="w-5 h-5 sm:w-10 sm:h-10 relative z-10 group-hover/btn:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Badge - Back to top-right as content is now at bottom */}
        <div className="absolute top-8 right-8 sm:top-12 sm:right-12">
          <Zap className="w-5 h-5 sm:w-8 sm:h-8 text-brand-primary fill-current animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef(null);

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* --- Intro Section --- */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-[10px] mb-4 sm:mb-8 block">Asber Consultants Archive</span>
          <h1 className="text-4xl sm:text-7xl lg:text-9xl font-heading font-black text-white tracking-tighter leading-[0.9] uppercase mb-8 sm:mb-12">
            <WaveText text="The Result" /><br />
            <WaveText text="Engine." className="text-gradient" />
          </h1>
          <p className="text-slate-400 text-xl max-w-xl mx-auto font-medium leading-relaxed mb-12">
            A curated selection of high-performance transformations across AI, Marketing, and Branding.
          </p>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Scroll to Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-brand-primary to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- Stacking Projects --- */}
      <div className="relative">
        {portfolioData.map((project, i) => (
          <ProjectSection 
            key={project.id} 
            project={project} 
            index={i} 
            total={portfolioData.length} 
          />
        ))}
      </div>

      {/* --- Infinite Logo Marquee --- */}
      <section className="py-40 bg-slate-950 border-t border-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">
            <WaveText text="Trusted by the " />
            <WaveText text="Fearless." className="text-brand-primary" />
          </h2>
        </div>
        
        <div className="flex overflow-hidden group py-10">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center whitespace-nowrap"
          >
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center gap-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 sm:p-3 grayscale hover:grayscale-0 transition-all">
                   <img src="/Asber-Consultants-logo.png" alt="Client" className="w-full opacity-50" />
                </div>
                <span className="text-2xl sm:text-4xl font-black text-white/20 uppercase tracking-tighter hover:text-white transition-colors duration-500">CLIENT_PARTNER_{i}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={`dup-${i}`} className="flex items-center gap-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 sm:p-3 grayscale hover:grayscale-0 transition-all">
                   <img src="/Asber-Consultants-logo.png" alt="Client" className="w-full opacity-50" />
                </div>
                <span className="text-2xl sm:text-4xl font-black text-white/20 uppercase tracking-tighter hover:text-white transition-colors duration-500">CLIENT_PARTNER_{i}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="h-screen flex items-center justify-center bg-white text-slate-950 rounded-t-[5rem] relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
        <div className="text-center px-6">
          <h2 className="text-3xl sm:text-6xl lg:text-9xl font-heading font-black tracking-tighter leading-[0.85] uppercase mb-8 sm:mb-12">
            <WaveText text="Ready for Your" /><br />
            <WaveText text="Transformation?" className="text-brand-primary italic" />
          </h2>
          <button className="group relative bg-slate-950 text-white px-8 py-6 sm:px-12 sm:py-8 rounded-[2rem] sm:rounded-[3rem] font-black text-lg sm:text-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
            <div className="absolute inset-0 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-3 sm:gap-4 uppercase tracking-tighter">
              Get Started Now
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
