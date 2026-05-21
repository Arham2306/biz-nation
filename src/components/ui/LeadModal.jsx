import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { LeadForm } from './LeadForm';

export function LeadModal() {
  const { isLeadModalOpen, closeLeadModal } = useModal();

  return (
    <AnimatePresence>
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            onClick={closeLeadModal}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-full overflow-y-auto rounded-[2.5rem] bg-slate-950 border border-slate-800 shadow-[0_64px_96px_-16px_rgba(0,0,0,0.5)] hide-scrollbar"
          >
            <div className="p-8 sm:p-10 relative overflow-hidden group">
              {/* Abstract background for the form */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-50"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all duration-1000"></div>
              
              <button 
                onClick={closeLeadModal}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <LeadForm />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
