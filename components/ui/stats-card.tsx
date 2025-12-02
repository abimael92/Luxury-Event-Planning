'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
	title: string;
	value: string;
	icon: LucideIcon;
	trend?: string;
	trendUp?: boolean;
	color?: 'primary' | 'secondary' | 'accent' | 'success';
	gradient?: string;
	description?: string;
}

const COLOR_MAP = {
	primary: {
		bg: 'bg-blue-50 border-blue-100',
		trend: 'text-blue-600',
	},
	secondary: {
		bg: 'bg-green-50 border-green-100',
		trend: 'text-green-600',
	},
	accent: {
		bg: 'bg-purple-50 border-purple-100',
		trend: 'text-purple-600',
	},
	success: {
		bg: 'bg-orange-50 border-orange-100',
		trend: 'text-orange-600',
	},
} as const;

export function StatsCard({
	title,
	value,
	icon: Icon,
	trend,
	trendUp = true,
	color = 'primary',
	gradient = 'from-blue-500 to-cyan-500',
	description,
}: StatsCardProps): React.JSX.Element {
	const { bg, trend: trendColor } = COLOR_MAP[color];

	return (
		<div
			className={`bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 p-6 ${bg}`}
		>
			<div className="flex justify-between">
				<p className="text-sm font-medium text-gray-600">{title}</p>

				<div
					className={`p-2 rounded-lg bg-gradient-to-br shadow-sm ${gradient}`}
				>
					<Icon className="h-4 w-4 text-white" />
				</div>
			</div>

			<h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
				{value}
			</h3>

			{description && (
				<p className="text-xs text-gray-500 mt-1">{description}</p>
			)}

			{trend && (
				<div className={`mt-3 flex items-center gap-1 text-sm font-medium ${trendColor}`}>
					<svg
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						{trendUp ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 12l5-5 5 5m-5-5v12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 12l-5 5-5-5m5 5V5"
							/>
						)}
					</svg>

					<span>{trend}</span>
				</div>
			)}
		</div>
	);
}
