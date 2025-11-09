// types/global.d.ts
declare module '*.css' {
	const content: any;
	export default content;
}

declare module '*.scss' {
	const content: any;
	export default content;
}

declare module '*.sass' {
	const content: any;
	export default content;
}

declare module '*.less' {
	const content: any;
	export default content;
}

declare module 'input-otp' {
	export const OTPInput: any;
	export const OTPInputContext: any;
}

declare module 'embla-carousel-react' {
	export const useEmblaCarousel: any;
}
