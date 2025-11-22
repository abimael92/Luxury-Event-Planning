'use client';

import { useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

type Language = 'en' | 'es';

const translations = {
	en: enTranslations,
	es: esTranslations,
};

export function useTranslation() {
	const [language, setLanguage] = useState<Language>('es');

	useEffect(() => {
		const savedLanguage = localStorage.getItem(
			'preferred-language'
		) as Language;
		if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
			setLanguage(savedLanguage);
		}
	}, []);

	const toggleLanguage = () => {
		const newLang = language === 'es' ? 'en' : 'es';
		setLanguage(newLang);
		localStorage.setItem('preferred-language', newLang);
	};

	const t = (key: string): string => {
		const keys = key.split('.');
		let value: any = translations[language];

		for (const k of keys) {
			value = value?.[k];
		}

		return value || key;
	};

	return {
		t,
		language,
		toggleLanguage,
	};
}
