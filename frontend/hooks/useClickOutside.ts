import { RefObject, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
	useEffect(() => {
		const handlerClick = (e) => {
			if (ref.current?.contains(e.target)) handler();
		};
		document.addEventListener('mousedown', handlerClick);

		return () => {
			document.removeEventListener('mousedown', handlerClick);
		};
	}, [ref, handler]);
};
