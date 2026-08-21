import { Badge } from '@/components/ui/Badge';
import { Pill, Syringe, Droplet, Layers } from 'lucide-react';

interface DosageBadgeProps {
  name: string;
  className?: string;
}

export function DosageBadge({ name, className }: DosageBadgeProps) {
  const getIcon = (dosageName: string) => {
    const lower = dosageName.toLowerCase();
    if (lower.includes('injectable') || lower.includes('vial') || lower.includes('ampoule')) {
      return <Syringe className="w-3 h-3 text-sky-600 dark:text-sky-400" />;
    }
    if (lower.includes('infusion') || lower.includes('liquid') || lower.includes('suspension')) {
      return <Droplet className="w-3 h-3 text-teal-600 dark:text-teal-400" />;
    }
    if (lower.includes('capsule')) {
      return <Layers className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
    }
    return <Pill className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
  };

  return (
    <Badge variant="outline" className={className}>
      {getIcon(name)}
      <span>{name}</span>
    </Badge>
  );
}
