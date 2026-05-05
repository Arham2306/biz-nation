import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { GridPattern } from './components/ui/grid-pattern';
import { WaveText } from './components/ui/wave-text';
import { cn } from './lib/utils';

gsap.registerPlugin(ScrollTrigger);
import {
  ArrowUpRight,
  BarChart,
  Target,
  Search,
  Cpu,
  Code2,
  CheckCircle2,
  ArrowRight,
  Zap,
  Menu,
  X,
  Play,
  PenTool,
  Layout,
  ArrowRightCircle
} from 'lucide-react';

// --- Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// --- Data ---
const services = [
  {
    id: "01",
    icon: <BarChart className="w-6 h-6" />,
    title: "Digital Marketing",
    desc: "ROI-driven campaigns that put your brand in front of the right people at the right time.",
    color: "bg-violet-500/10 text-violet-500",
    gradient: "from-violet-500/20 to-transparent"
  },
  {
    id: "02",
    icon: <Target className="w-6 h-6" />,
    title: "Lead Generation",
    desc: "Qualified, ready-to-convert leads delivered directly to your pipeline.",
    color: "bg-indigo-500/10 text-indigo-500",
    gradient: "from-indigo-500/20 to-transparent"
  },
  {
    id: "03",
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Automation",
    desc: "AI agents & CRM integrations that work around the clock so you don't have to.",
    color: "bg-brand-primary/20 text-brand-primary",
    gradient: "from-brand-primary/40 to-transparent"
  },
  {
    id: "04",
    icon: <Search className="w-6 h-6" />,
    title: "SEO & Content",
    desc: "Get found, get clicked, get customers. Dominate search results in your niche.",
    color: "bg-blue-500/10 text-blue-500",
    gradient: "from-blue-500/20 to-transparent"
  },
  {
    id: "05",
    icon: <PenTool className="w-6 h-6" />,
    title: "Branding & Design",
    desc: "Visuals that stop the scroll and tell your story better than words alone.",
    color: "bg-pink-500/10 text-pink-500",
    gradient: "from-pink-500/20 to-transparent"
  },
  {
    id: "06",
    icon: <Layout className="w-6 h-6" />,
    title: "Web Development",
    desc: "Conversion-optimized websites that turn visitors into loyal customers.",
    color: "bg-emerald-500/10 text-emerald-500",
    gradient: "from-emerald-500/20 to-transparent"
  }
];

const testimonialsRow1 = [
  { q: "Biz Nation completely transformed how we generate leads. Within 60 days, our pipeline went from almost empty to overflowing with qualified prospects.", a: "Sarah M.", r: "CEO, TechVenture Group" },
  { q: "The AI automation they built is like having 5 extra employees. It's been a game changer for us.", a: "Marcus V.", r: "Founder, Zenith" },
  { q: "Professional, responsive, and results-obsessed. Biz Nation is the agency we wish we had found years ago.", a: "Nadia K.", r: "Founder, Bloom Wellness" },
  { q: "Their lead gen system is pure fire. We've seen a 400% increase in qualified inquiries.", a: "David K.", r: "VP Sales, CloudScale" }
];

const testimonialsRow2 = [
  { q: "The branding they did for us captures exactly who we are. Our conversion rates are up 40%.", a: "Elena P.", r: "Director, Solara" },
  { q: "The AI call agent they set up for us handles 300+ inquiries a week. We've freed up our entire sales team to close instead of chase.", a: "James R.", r: "Director, Premier Realty Co." },
  { q: "The transition to AI-powered sales was seamless. Our team is now 3x more productive.", a: "Liam O.", r: "CEO, Streamline" },
  { q: "Biz Nation is the growth partner every ambitious brand needs in 2026.", a: "Sofia T.", r: "COO, Horizon" }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    // --- GSAP Setup ---

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

    // Sync ScrollTrigger with Lenis
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

    // --- Scroll Handler ---
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // --- Mouse Move Handler ---
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorOpacity.set(1);
    };

    const handleMouseEnterInteractive = () => cursorSize.set(80);
    const handleMouseLeaveInteractive = () => cursorSize.set(20);

    window.addEventListener('mousemove', handleMouseMove);

    // Add hover listeners to all interactive elements
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
  }, []);

  // --- GSAP Heading Animations (lighter on mobile) ---
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
  }, []);

  return (
    <div className="bg-[#fafafa] selection:bg-brand-primary selection:text-white">

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
          <div className={`flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500 ${isScrolled ? 'bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-lg shadow-slate-200/20' : 'bg-transparent'}`}>
            <div className="flex items-center gap-3">
              <img src="/logo_v2.png" alt="Biz Nation" className="h-8 w-auto" />
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 uppercase">BIZ NATION</span>
            </div>

            <div className="hidden md:flex items-center gap-10">
              {['Services', 'About', 'Process', 'Testimonials'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-slate-600 hover:text-brand-primary transition-colors uppercase tracking-widest">
                  {item}
                </a>
              ))}
              <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-primary transition-all shadow-lg hover:shadow-brand-primary/20 transform hover:-translate-y-0.5 active:scale-95">
                Strategy Call
              </button>
            </div>

            <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
              {['Services', 'About', 'Process', 'Testimonials'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-3xl font-heading font-black text-slate-900 uppercase tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <button className="bg-brand-primary text-white py-6 rounded-3xl font-black text-xl uppercase tracking-tighter shadow-2xl shadow-brand-primary/30">
                Get Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 overflow-hidden min-h-[85vh] flex items-center">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
          ]}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-50",
          )}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1200px] h-[300px] md:h-[600px] bg-gradient-to-b from-brand-primary/10 to-transparent rounded-full blur-[80px] md:blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              className="lg:col-span-7 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-xl shadow-slate-200/50 border border-slate-100 text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></span>
                Growth Engineered
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-4xl sm:text-6xl lg:text-8xl font-heading font-black leading-[1.1] sm:leading-[1] text-slate-900 mb-6 sm:mb-8 tracking-tighter uppercase">
                <WaveText text="Grow " />
                <WaveText text="Smarter." className="text-slate-500" /><br />
                <WaveText text="Scale Fast." className="text-gradient" />
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg lg:text-xl text-slate-500 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Biz Nation LLC helps ambitious businesses dominate their market with cutting-edge digital marketing, AI-powered automation, and precision lead generation — all under one roof.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start">
                <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 sm:px-12 sm:py-6 rounded-[2rem] font-black text-base sm:text-lg hover:bg-brand-primary transition-all shadow-2xl hover:shadow-brand-primary/30 flex items-center justify-center gap-3 group uppercase tracking-tight">
                  Start Growth
                  <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto group px-8 py-4 sm:px-12 sm:py-6 rounded-[2rem] font-black text-base sm:text-lg text-slate-900 hover:bg-white hover:shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-tight">
                  Learn More
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.p variants={fadeIn} className="mt-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2">
                <span>Trusted by 100+ businesses across industries</span>
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                <span>No long-term lock-in</span>
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                <span>Results in 30 days or less</span>
              </motion.p>
            </motion.div>

            <motion.div
              className="lg:col-span-5 relative"
              style={{ y: heroY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative z-10 rounded-3xl sm:rounded-[3rem] overflow-hidden border-4 sm:border-8 border-white shadow-[0_64px_96px_-16px_rgba(0,0,0,0.15)] group">
                <img src="/hero_v2.png" alt="Premium AI Visualization" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Stats Counter --- */}
      <section className="bg-slate-950 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Businesses Served", value: "100+", d: "Across startups, SMBs, and brands" },
              { label: "Average ROI", value: "3x", d: "Delivered within the first 90 days" },
              { label: "Client Retention", value: "98%", d: "Our results speak for themselves" },
              { label: "Core Services", value: "7", d: "Every growth lever you need" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3">{stat.label}</p>
                <h4 className="text-5xl font-heading font-black text-white tracking-tighter">{stat.value}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="section-padding bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-slate-900 mb-6 sm:mb-8 tracking-tighter leading-[1] sm:leading-[0.95] uppercase">
                <WaveText text="Engineering " />
                <WaveText text="Predictable" className="text-slate-500 italic" />
                <WaveText text=" Outcomes." />
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 font-medium">
                At Biz Nation LLC, we believe every business — whether a scrappy startup or a scaling enterprise — deserves the tools, strategy, and execution power of a world-class growth team. We listen, we understand, and we build solutions that convert real audiences into real revenue.
              </p>
              <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 inline-flex">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=biz${i}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Trusted by Founders</p>
                  <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">500+ Scaling Success Stories</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-brand-primary/5 blur-[100px] -z-10"></div>
              <div className="space-y-6 pt-12">
                <div className="p-8 rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/30 border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-500 mb-6 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-violet-500/10">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Strategy</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Custom roadmaps tailored to your unique goals.</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/30 border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-indigo-500/10">
                    <Cpu className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">AI Edge</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Human creativity met with cutting-edge tech.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 rounded-[2.5rem] bg-slate-950 shadow-2xl shadow-slate-900/20 border border-slate-800 group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-brand-primary/20">
                    <Zap className="w-7 h-7 fill-current" />
                  </div>
                  <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Execution</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">End-to-end management from launch to scale.</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/30 border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-500 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-cyan-500/10">
                    <BarChart className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Real Data</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Transparent dashboards. Real business impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section className="py-16 md:py-32 bg-slate-950 overflow-hidden relative border-t border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.05),transparent)] pointer-events-none hidden md:block"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center lg:text-left">
            <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Why Biz Nation</span>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-[1] uppercase">
              <WaveText text="The Growth" /><br />
              <WaveText text="Edge You Need." className="text-brand-primary" />
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Interactive Accordions */}
            <div className="space-y-4">
              {(() => {
                const [activeIndex, setActiveIndex] = useState(0);
                return [
                  { id: "01", t: "Tailor-Made Strategies", d: "No cookie-cutter playbooks. Every solution is built around your specific business goals, audience, and competitive landscape.", icon: <Target className="w-5 h-5" /> },
                  { id: "02", t: "ROI-First Mentality", d: "Every campaign, funnel, and automation we build is tied directly to a measurable business outcome. Your growth is our KPI.", icon: <BarChart className="w-5 h-5" /> },
                  { id: "03", t: "End-to-End Execution", d: "From strategy and creative to launch and optimisation — we handle everything, so you can focus on running your business.", icon: <Play className="w-5 h-5 fill-current" /> },
                  { id: "04", t: "AI-Powered Edge", d: "We combine human creativity with cutting-edge AI tools to deliver faster results, smarter targeting, and automated growth systems.", icon: <Cpu className="w-5 h-5" /> },
                  { id: "05", t: "Transparent Reporting", d: "Real dashboards. Real numbers. No fluff. You always know exactly what your investment is doing.", icon: <BarChart className="w-5 h-5" /> }
                ].map((item, i) => {
                  const isOpen = activeIndex === i;
                  return (
                    <motion.div 
                      key={i} 
                      whileHover={!isOpen ? { x: 10, backgroundColor: "rgba(255,255,255,0.02)" } : {}}
                      className={`rounded-3xl border transition-all duration-500 overflow-hidden cursor-pointer ${isOpen ? 'bg-white/5 border-brand-primary/30' : 'border-white/5'}`}
                      onClick={() => setActiveIndex(isOpen ? -1 : i)}
                    >
                      <div className="w-full p-5 md:p-8 flex items-center justify-between text-left">
                        <div className="flex items-center gap-6">
                          <span className={`text-xs font-black transition-colors ${isOpen ? 'text-brand-primary' : 'text-slate-600'}`}>{item.id}</span>
                          <h4 className={`text-base sm:text-xl md:text-2xl font-black uppercase tracking-tighter transition-colors ${isOpen ? 'text-white' : 'text-slate-400'}`}>{item.t}</h4>
                        </div>
                        <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 bg-brand-primary text-white border-brand-primary' : 'text-slate-500'}`}>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-5 pb-5 pl-12 md:px-8 md:pb-8 md:pl-20">
                              <p className="text-slate-400 leading-relaxed font-medium text-sm sm:text-base md:text-lg">
                                {item.d}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                });
              })()}
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                <img src="/hero_v2.png" alt="Edge Visual" className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                
                {/* Floating Aesthetic Element */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 right-10 p-8 rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white">
                      <Zap className="w-6 h-6 fill-current" />
                    </div>
                    <span className="text-xl font-black text-white uppercase tracking-tighter">Precision Driven</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 2 }} className="h-full bg-brand-primary" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section (Creative Balanced Grid) --- */}
      <section id="services" className="section-padding bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-primary/5 rounded-full blur-[80px] md:blur-[150px] -z-0"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-3xl">
              <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Capabilities</span>
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-black tracking-tighter leading-[1] sm:leading-[0.9] uppercase">
                <WaveText text="Everything your" /><br />
                <WaveText text="business needs to win." className="text-slate-700 italic text-2xl sm:text-4xl lg:text-5xl lowercase" />
              </h2>
            </div>
            <button className="flex items-center gap-4 text-[10px] font-black text-slate-500 hover:text-white transition-all group uppercase tracking-[0.3em]">
              Explore Full Stack
              <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-brand-primary transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group overflow-hidden rounded-3xl sm:rounded-[3rem] transition-all duration-700 bg-slate-900 border border-slate-800 p-6 sm:p-12 flex flex-col justify-between min-h-[300px] sm:h-[420px] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]`}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6`}>
                    {s.icon}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 uppercase tracking-tighter group-hover:text-brand-primary transition-colors duration-500 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                    {s.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-10 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest group-hover:text-slate-500 transition-colors">Learn More</span>
                  <div className={`w-12 h-12 rounded-full border border-slate-800 text-slate-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500`}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute top-12 right-12 text-slate-800/10 font-black text-7xl group-hover:text-brand-primary/5 transition-colors pointer-events-none">
                  {s.id}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Process Section --- */}
      <section id="process" className="section-padding bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-4xl sm:text-5xl lg:text-8xl font-heading font-black text-slate-900 tracking-tighter mb-8 leading-[1] sm:leading-[0.9] uppercase">
              <WaveText text="How " />
              <WaveText text="We Scale" className="text-slate-500" /><br />
              <WaveText text="Your Revenue." />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Discover & Strategise", d: "We dive deep into your business, your market, and your goals to design a custom growth roadmap.", icon: <Search className="w-6 h-6" /> },
              { n: "02", t: "Build & Launch", d: "Our team executes with precision — from creatives and copy to tech stacks and automations.", icon: <Cpu className="w-6 h-6" /> },
              { n: "03", t: "Optimise & Scale", d: "We track every metric, learn every insight, and relentlessly improve until your results compound.", icon: <BarChart className="w-6 h-6" /> }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative p-12 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
              >
                {/* Background Ghost Number */}
                <div className="absolute -top-10 -right-10 text-[12rem] font-black text-slate-100/50 group-hover:text-brand-primary/5 transition-colors duration-700 pointer-events-none italic">
                  {step.n}
                </div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-10 text-slate-900 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                    {step.icon}
                  </div>
                  
                  <span className="text-brand-primary font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Step {step.n}</span>
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter leading-tight">
                    {step.t}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {step.d}
                  </p>
                </div>

                {/* Progress Indicator Line (Aesthetic) */}
                <div className="absolute bottom-0 left-0 h-1.5 bg-brand-primary/10 w-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 2, delay: 0.5 + i * 0.3 }}
                    className="h-full bg-brand-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section id="testimonials" className="py-32 bg-slate-950 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent)] pointer-events-none hidden md:block"></div>
        
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
          <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Social Proof</span>
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-heading font-black text-white tracking-tighter mb-8 leading-[1] uppercase">
            <WaveText text="What " />
            <WaveText text="The Visionaries" className="text-brand-primary" /><br />
            <WaveText text="Are Saying." />
          </h2>
        </div>

        <div className="flex flex-col gap-8 relative z-10">
          {/* Row 1: Moving Left */}
          <div className="flex overflow-hidden group">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
                <div key={i} className="inline-block w-[300px] sm:w-[400px] p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-900/50 border border-slate-800 md:backdrop-blur-xl hover:border-brand-primary/50 transition-all duration-500">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(star => <Zap key={star} className="w-4 h-4 text-brand-primary fill-current" />)}
                  </div>
                  <p className="text-lg text-white leading-relaxed font-medium mb-8 whitespace-normal italic">"{t.q}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden border border-slate-700">
                      <img src={`https://i.pravatar.cc/150?u=biz${i}`} alt={t.a} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="text-sm font-black text-white uppercase tracking-tighter leading-none mb-1">{t.a}</h5>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.r}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Moving Right */}
          <div className="flex overflow-hidden group">
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
                <div key={i} className="inline-block w-[300px] sm:w-[400px] p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-900/50 border border-slate-800 md:backdrop-blur-xl hover:border-brand-primary/50 transition-all duration-500">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(star => <Zap key={star} className="w-4 h-4 text-brand-primary fill-current" />)}
                  </div>
                  <p className="text-lg text-white leading-relaxed font-medium mb-8 whitespace-normal italic">"{t.q}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden border border-slate-700">
                      <img src={`https://i.pravatar.cc/150?u=biz${i + 20}`} alt={t.a} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="text-sm font-black text-white uppercase tracking-tighter leading-none mb-1">{t.a}</h5>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.r}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl sm:rounded-[5rem] bg-slate-950 p-8 sm:p-12 lg:p-32 overflow-hidden text-center group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-brand-primary/20 rounded-full blur-[80px] md:blur-[150px] -z-0 group-hover:bg-brand-primary/30 transition-all duration-[2000ms]"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="text-brand-primary font-black tracking-[0.5em] uppercase text-xs mb-10 block">Ready to Scale?</span>
              <h2 className="text-4xl sm:text-6xl lg:text-9xl font-heading font-black text-white tracking-[calc(-0.05em)] leading-[1] sm:leading-[0.85] mb-8 sm:mb-12 uppercase">
                <WaveText text="Build an " /><br />
                <WaveText text="Empire." className="text-gradient" />
              </h2>
              <p className="text-xl lg:text-2xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium">
                Book your free 30-minute strategy call today. No commitment. No jargon. Just clarity.
              </p>
              <button className="bg-white text-slate-950 px-8 py-4 sm:px-16 sm:py-8 rounded-[2rem] sm:rounded-[3rem] font-black text-lg sm:text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-brand-primary/40 flex items-center justify-center gap-4 sm:gap-6 mx-auto group uppercase tracking-tighter">
                Get My Free Strategy Call
                <ArrowRightCircle className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-rotate-45 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="flex flex-col gap-8 max-w-xs">
            <div className="flex items-center gap-3">
              <img src="/logo_v2.png" alt="Biz Nation" className="h-8 w-auto" />
              <span className="font-heading font-black text-2xl tracking-tighter text-slate-900 uppercase">BIZ NATION</span>
            </div>
            <p className="text-sm text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">
              The world's most results-obsessed growth agency. Engineering predictable outcomes for ambitious brands.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8">Navigation</p>
              <div className="flex flex-col gap-4">
                {['Services', 'About', 'Process', 'Testimonials'].map(link => (
                  <a key={link} href="#" className="text-xs font-bold text-slate-400 hover:text-brand-primary transition-colors uppercase tracking-widest">{link}</a>
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
