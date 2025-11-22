'use client';

import { useState, useEffect } from 'react';

type Language = 'en' | 'es';
type Translations = Record<string, any>;

const translations: Record<Language, Translations> = {
	en: {
		auth: {
			welcome: 'Welcome to Planora',
			description: 'Join our luxury event planning community',
			resetPassword: 'Reset Password',
			resetDescription: 'Enter your email to reset your password',
			tabs: {
				login: 'Sign In',
				register: 'Client',
				vendor: 'Vendor',
			},
		},
	},
	es: {
		auth: {
			welcome: 'Bienvenido a Planora',
			description:
				'Únete a nuestra comunidad de planificación de eventos de lujo',
			resetPassword: 'Restablecer Contraseña',
			resetDescription: 'Ingresa tu email para restablecer tu contraseña',
			tabs: {
				login: 'Iniciar Sesión',
				register: 'Cliente',
				vendor: 'Proveedor',
			},
		},
	},
};

export function useTranslation() {
	const [language, setLanguage] = useState<Language>('es'); // Spanish as default

	// Load language preference from localStorage on mount
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
