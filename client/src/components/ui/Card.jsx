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
}) => {
  const reduceMotion = useReducedMotion();
  const MotionTag = typeof Tag === 'string' ? motionTags[Tag] || motion.section : motion.div;
  const padding = responsive ? 'p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7' : 'p-4 sm:p-5 lg:p-6';
  const radius = responsive ? 'rounded-2xl sm:rounded-2xl md:rounded-3xl' : 'rounded-lg lg:rounded-xl';

  return (
    <MotionTag
      variants={cardVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={hoverable && !reduceMotion ? { y: -4, scale: 1.012 } : undefined}
      whileTap={hoverable && !reduceMotion ? { scale: 0.99 } : undefined}
      className={`
        glass-panel min-w-0 will-change-transform ${padding}
        border border-white/10 ${radius}
        transition-all duration-300 ease-smooth
        ${hoverable ? 'hover:border-white/30 hover:shadow-premium-lg cursor-pointer hover:bg-white/8' : ''}
        ${elevated ? 'shadow-premium-lg shadow-black/50 backdrop-blur-md bg-white/8' : 'backdrop-blur-sm bg-white/5'}
        ${bordered ? '' : 'border-none'}
        ${className}
      `}
    >
      {children}
    </MotionTag>
  );
};

export const SectionHeader = ({ title, action, subtitle = null, responsive = true }) => (
  <div className="mb-3 sm:mb-4 md:mb-5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex-1 min-w-0">
      <h2 className={`${responsive ? 'text-base xs:text-lg sm:text-xl md:text-2xl' : 'text-lg sm:text-xl'} font-bold text-white truncate leading-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`${responsive ? 'text-xs xs:text-xs sm:text-sm md:text-base' : 'text-xs sm:text-sm'} text-white/60 mt-0.5 sm:mt-1`}>
          {subtitle}
        </p>
      )}
    </div>
    {action && (
      <div className={`${responsive ? 'text-xs xs:text-xs sm:text-sm md:text-base' : 'text-xs sm:text-sm'} text-cyan-100 whitespace-nowrap mt-2 sm:mt-0`}>
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
