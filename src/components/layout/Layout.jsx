import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { openLeadModal } = useModal();

  // --- Custom Cursor ---
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorSize = useMotionValue(20);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const cursorS = useSpring(cursorSize, springConfig);
  const cursorOpacity = useMotionValue(0);

  useEffect(() => {
    // --- Lenis Smooth Scroll ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorOpacity.set(1);
    };

    const handleMouseEnterInteractive = () => cursorSize.set(80);
    const handleMouseLeaveInteractive = () => cursorSize.set(20);

    window.addEventListener('mousemove', handleMouseMove);

    const interactables = document.querySelectorAll('button, a, .group');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]); // Re-init on path change to catch new interactables

  // --- GSAP Heading Animations ---
  useGSAP(() => {
    const mobile = window.innerWidth < 768;
    const headings = document.querySelectorAll('h1, h2:not(.no-gsap)');

    headings.forEach((heading) => {
      gsap.fromTo(heading,
        {
          filter: mobile ? 'none' : 'blur(20px)',
          opacity: 0,
          y: mobile ? 30 : 60
        },
        {
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          filter: mobile ? 'none' : 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: mobile ? 0.8 : 1.5,
          ease: 'power3.out'
        }
      );
    });
  }, [pathname]);

  return (
    <div className="bg-[#fafafa] selection:bg-brand-primary selection:text-white min-h-screen">
      {/* --- Custom Follow Circle --- */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorS,
          height: cursorS,
          opacity: cursorOpacity,
          backgroundColor: '#ffffff'
        }}
      />

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500 ${
            isScrolled 
              ? (pathname === '/' 
                  ? 'bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl' 
                  : 'bg-slate-950/80 backdrop-blur-xl border border-slate-800 shadow-2xl') 
              : 'bg-transparent'
          }`}>
            <Link to="/" className="flex items-center gap-3">
              <img src="/BizNation-Main-logo.png" alt="Biz Nation" className="h-8 w-auto" />
              <span className={`font-heading font-extrabold text-xl tracking-tight uppercase transition-colors duration-500 ${pathname === '/' ? 'text-slate-900' : 'text-white'}`}>
                BIZ NATION
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-4 lg:gap-10">
              <Link to="/portfolio" className={`text-sm font-bold transition-colors uppercase tracking-widest ${pathname === '/portfolio' ? 'text-brand-primary' : (pathname === '/' ? 'text-slate-500 hover:text-brand-primary' : 'text-slate-300 hover:text-brand-primary')}`}>
                Portfolio
              </Link>
              {['Services', 'About', 'Process', 'Testimonials'].map((item) => (
                <a key={item} href={`/#${item.toLowerCase()}`} className={`text-sm font-bold transition-colors uppercase tracking-widest ${pathname === '/' ? 'text-slate-500 hover:text-brand-primary' : 'text-slate-300 hover:text-brand-primary'}`}>
                  {item}
                </a>
              ))}
              <button 
                onClick={openLeadModal}
                className={`${pathname === '/' ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'} px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-lg hover:shadow-brand-primary/20 transform hover:-translate-y-0.5 active:scale-95`}
              >
                Strategy Call
              </button>
            </div>

            <button className={`md:hidden p-2 transition-colors ${pathname === '/' ? 'text-slate-900' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              <Link to="/portfolio" className="text-3xl font-heading font-black text-slate-900 uppercase tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>
                Portfolio
              </Link>
              {['Services', 'About', 'Process', 'Testimonials'].map((item) => (
                <a key={item} href={`/#${item.toLowerCase()}`} className="text-3xl font-heading font-black text-slate-900 uppercase tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  openLeadModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-brand-primary text-white py-6 rounded-3xl font-black text-xl uppercase tracking-tighter shadow-2xl shadow-brand-primary/30"
              >
                Get Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      {/* --- Footer --- */}
      <footer className="py-20 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="flex flex-col gap-8 max-w-xs">
            <div className="flex items-center gap-3">
              <img src="/BizNation-Main-logo.png" alt="Biz Nation" className="h-8 w-auto" />
              <span className="font-heading font-black text-2xl tracking-tighter text-slate-900 uppercase">BIZ NATION</span>
            </div>
            <p className="text-sm text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">
              The world's most results-obsessed growth agency. Engineering predictable outcomes for ambitious brands.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-20">
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8">Navigation</p>
              <div className="flex flex-col gap-4">
                <Link to="/portfolio" className="text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-widest">Portfolio</Link>
                {['Services', 'About', 'Process', 'Testimonials'].map(link => (
                  <a key={link} href={`/#${link.toLowerCase()}`} className="text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-widest">{link}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8">Connect</p>
              <div className="flex flex-col gap-4">
                {['LinkedIn', 'X.com', 'Instagram', 'Medium'].map(link => (
                  <a key={link} href="#" className="text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-widest">{link}</a>
                ))}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8">Newsletter</p>
              <div className="flex gap-2">
                <input type="text" placeholder="EMAIL" className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-[10px] font-bold w-full focus:outline-none focus:border-brand-primary transition-colors" />
                <button className="bg-slate-900 text-white px-4 rounded-xl hover:bg-brand-primary transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            © 2026 Biz Nation LLC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
