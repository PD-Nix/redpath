const variantStyles: Record<string, string> = {
  fácil: 'bg-emerald-100 text-emerald-800',
  media: 'bg-amber-100 text-amber-800',
  experto: 'bg-red-100 text-red-800',
  plant: 'bg-green-100 text-green-800',
  kit: 'bg-violet-100 text-violet-800',
  course: 'bg-blue-100 text-blue-800',
  tool: 'bg-stone-100 text-stone-700',
  default: 'bg-stone-100 text-stone-700',
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
