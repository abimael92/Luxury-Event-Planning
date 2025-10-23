// hooks/use-toast.ts
import { toast as sonnerToast } from 'sonner';

export function useToast() {
	return {
		toast: ({ title, description, variant = 'default' }: any) => {
			if (variant === 'destructive') {
				sonnerToast.error(title, { description });
			} else if (variant === 'success') {
				sonnerToast.success(title, { description });
			} else {
				sonnerToast(title, { description });
			}
		},
		dismiss: sonnerToast.dismiss,
	};
}
