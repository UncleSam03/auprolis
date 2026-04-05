import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(val) {
	if (!val && val !== 0) return 'P0';
	const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val;
	if (isNaN(num)) return 'P0';
	// Botswana Pula formatting
	return new Intl.NumberFormat('en-BW', { 
		style: 'currency', 
		currency: 'BWP', 
		maximumFractionDigits: 0 
	}).format(num).replace('BWP', 'P');
}