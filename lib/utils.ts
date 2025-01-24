import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: string | Date) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  // Ensure date is valid
  if (isNaN(parsedDate.getTime())) {
    console.warn('Invalid date:', date); // Debugging helper
    return 'Invalid Date';
  }

  // Return consistent format
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}