import { motion, useReducedMotion } from 'framer-motion';

const motionTags = {
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  div: motion.div,
  header: motion.header,
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.34, ease: [0.4, 0, 0.2, 1] },
  },
};

export const Card = ({
  children,
  className = '',
  as: Tag = 'section',
  hoverable = false,
  elevated = false,
  bordered = true,
  responsive = true,
  overflow = 'hidden',
}) => {
  const reduceMotion = useReducedMotion();
  const MotionTag = typeof Tag === 'string' ? motionTags[Tag] || motion.section : motion.div;
  const padding = responsive ? 'p-3 xs:p-4 sm:p-5 lg:p-6' : 'p-4 sm:p-5';
  const radius = 'rounded-lg';
  const overflowClass = overflow === 'visible' ? 'overflow-visible' : 'overflow-hidden';

  return (
    <MotionTag
      variants={cardVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={hoverable && !reduceMotion ? { y: -4, scale: 1.012 } : undefined}
      whileTap={hoverable && !reduceMotion ? { scale: 0.99 } : undefined}
      className={`
        glass-panel min-w-0 ${overflowClass} will-change-transform ${padding}
        ${radius}
        transition-all duration-300 ease-smooth
        ${hoverable ? 'cursor-pointer hover:-translate-y-0.5 hover:border-white/30 hover:shadow-premium-lg hover:shadow-black/30' : ''}
        ${elevated ? 'shadow-premium-lg shadow-black/50' : ''}
        ${bordered ? '' : 'border-none'}
        ${className}
      `}
    >
      {children}
    </MotionTag>
  );
};

export const SectionHeader = ({ title, action, subtitle = null, responsive = true }) => (
  <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="min-w-0 flex-1">
      <h2 className={`${responsive ? 'text-base xs:text-lg sm:text-xl' : 'text-lg'} text-pretty font-bold leading-tight text-white`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`${responsive ? 'text-xs sm:text-sm' : 'text-xs'} mt-1 max-w-prose text-white/62`}>
          {subtitle}
        </p>
      )}
    </div>
    {action && (
      <div className={`${responsive ? 'text-xs sm:text-sm' : 'text-xs'} inline-flex min-h-7 items-center rounded-md border border-cyan-200/16 bg-cyan-200/10 px-2.5 font-semibold text-cyan-100`}>
        {action}
      </div>
    )}
  </div>
);

export const CardGrid = ({ children, columns = 3, responsive = true, className = '' }) => {
  const columnMap = {
    2: responsive ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2',
    3: responsive ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: responsive ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  const colClasses = columnMap[columns] || columnMap[3];

  const gap = responsive ? 'gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6' : 'gap-4 sm:gap-5 lg:gap-6';

  return (
    <div
      className={`
        grid ${colClasses}
        ${gap}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
