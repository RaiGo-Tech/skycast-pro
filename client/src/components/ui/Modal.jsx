import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal = ({
  open,
  title,
  children,
  onClose,
  size = 'md',
  closeButton = true,
  backdrop = true,
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {backdrop && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-label="Modal backdrop"
            />
          )}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div
              className={`
                glass-panel w-full ${sizeClasses[size]}
                p-5 sm:p-6 lg:p-8
                border border-white/15
                rounded-xl lg:rounded-2xl
                shadow-2xl shadow-black/50
                backdrop-blur-xl
                max-h-[90vh] overflow-y-auto
              `}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="mb-5 sm:mb-6 flex items-start justify-between gap-4">
                <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white flex-1">
                  {title}
                </h2>
                {closeButton && (
                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label="Close modal"
                  >
                    <FiX className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="text-white/80">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
