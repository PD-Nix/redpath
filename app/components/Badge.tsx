const variantStyles: Record<string, string> = {
  fácil: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
  media: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
  experto: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  plant: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  kit: 'bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200',
  course: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  tool: 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300',
  default: 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300',
};

interface BadgeProps {
  label: string;
  variant?: string;
  className?: string;
}

export function Badge({ label, variant, className = '' }: BadgeProps) {
  const style = variantStyles[variant ?? label.toLowerCase()] ?? variantStyles.default;
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${style} ${className}`}
    >
      {label}
    </span>
  );
}
