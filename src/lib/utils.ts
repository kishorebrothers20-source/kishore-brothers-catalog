import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRxStatus(status: string): string {
  switch (status) {
    case 'PRESCRIPTION_ONLY':
      return 'Rx Only';
    case 'OVER_THE_COUNTER':
      return 'OTC / Non-Rx';
    case 'HOSPITAL_USE_ONLY':
      return 'Hospital / ICU Only';
    default:
      return status;
  }
}
