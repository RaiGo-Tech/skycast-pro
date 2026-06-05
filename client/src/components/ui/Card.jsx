export const Card = ({
  children,
  className = '',
  as: Tag = 'section',
  hoverable = false,
  elevated = false,
  bordered = true,
  responsive = true,
}) => {
  const padding = responsive ? 'p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7' : 'p-4 sm:p-5 lg:p-6';
  const radius = responsive ? 'rounded-2xl sm:rounded-2xl md:rounded-3xl' : 'rounded-lg lg:rounded-xl';

  return (
    <Tag
      className={`
        glass-panel min-w-0 ${padding}
        border border-white/10 ${radius}
        transition-all duration-300 ease-smooth
        ${hoverable ? 'hover:border-white/30 hover:shadow-premium-lg hover:scale-[1.01] cursor-pointer hover:bg-white/8' : ''}
        ${elevated ? 'shadow-premium-lg shadow-black/50 backdrop-blur-md bg-white/8' : 'backdrop-blur-sm bg-white/5'}
        ${bordered ? '' : 'border-none'}
        ${className}
      `}
    >
      {children}
    </Tag>
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
  const colClasses = responsive
    ? `grid-cols-1 xs:grid-cols-${columns === 3 ? '1' : '1'} sm:grid-cols-2 md:grid-cols-${columns === 3 ? '2' : '2'} lg:grid-cols-${columns}`
    : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`;

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
