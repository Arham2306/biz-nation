import React, { useState } from 'react';
import { User, Phone, Mail, Zap, ChevronDown, CheckCircle2 } from 'lucide-react';

const serviceOptions = [
  "Digital Marketing",
  "Lead Generation",
  "AI Automation",
  "SEO & Content",
  "Branding & Design",
  "Web Development"
];

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await fetch('https://formspree.io/f/mlgvjzev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          setFormError(data.errors.map(error => error.message).join(', '));
        } else {
          setFormError('Oops! There was a problem submitting your form');
        }
      }
    } catch (error) {
      setFormError('Oops! There was a problem submitting your form');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tighter mb-4">
          Audit Requested!
        </h3>
        <p className="text-slate-400 font-medium text-sm leading-relaxed">
          Thank you for reaching out. Our growth team will review your details and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tighter mb-2">
        Secure Your Strategy
      </h3>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-8">
        Limited slots available for this month.
      </p>

      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative group/input">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/input:text-brand-primary transition-colors" />
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              placeholder="FULL NAME" 
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-12 py-4 text-[10px] font-black text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all uppercase tracking-widest"
            />
          </div>
          <div className="relative group/input">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/input:text-brand-primary transition-colors" />
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="PHONE NUMBER" 
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-12 py-4 text-[10px] font-black text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all uppercase tracking-widest"
            />
          </div>
        </div>

        <div className="relative group/input">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/input:text-brand-primary transition-colors" />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
            placeholder="EMAIL ADDRESS" 
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-12 py-4 text-[10px] font-black text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all uppercase tracking-widest"
          />
        </div>

        <div className="relative group/input">
          <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/input:text-brand-primary transition-colors" />
          <select 
            name="service"
            value={formData.service}
            onChange={handleFormChange}
            required
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-12 py-4 text-[10px] font-black text-white appearance-none focus:outline-none focus:border-brand-primary transition-all uppercase tracking-widest cursor-pointer"
          >
            <option value="" disabled>SELECT SERVICE</option>
            {serviceOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
        </div>

        <div className="relative">
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleFormChange}
            required
            placeholder="HOW CAN WE HELP?" 
            rows="3"
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 text-[10px] font-black text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all uppercase tracking-widest resize-none"
          ></textarea>
        </div>
        
        {formError && (
          <p className="text-red-400 text-xs font-bold text-center mt-2">{formError}</p>
        )}

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/30 hover:bg-white hover:text-slate-950 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:hover:bg-brand-primary disabled:hover:text-white disabled:transform-none"
        >
          {isSubmitting ? 'PROCESSING...' : 'REQUEST FREE AUDIT'}
        </button>

        <p className="text-[8px] text-center text-slate-700 font-bold uppercase tracking-widest mt-4">
          By submitting, you agree to our terms & privacy policy.
        </p>
      </form>
    </>
  );
}
