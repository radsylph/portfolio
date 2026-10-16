import type { Locale, UIStringKey } from './ui';
import { ui } from './ui';

export function useTranslations(locale: Locale) {
	return function t(key: UIStringKey): string {
		return ui[locale][key] ?? ui.en[key];
	};
}

export function formatDate(date: string, locale: Locale): string {
	if (!date) return '';
	// Parse as local midnight so timezone doesn't shift the month on date-only strings.
	const d = new Date(`${date}T00:00:00`);
	if (Number.isNaN(d.getTime())) return date;
	return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(d);
}

export function formatDateRange(
	start: string,
	end: string | undefined,
	locale: Locale,
	presentLabel: string,
): string {
	const startStr = formatDate(start, locale);
	const endStr = end ? formatDate(end, locale) : presentLabel;
	return `${startStr} — ${endStr}`;
}
