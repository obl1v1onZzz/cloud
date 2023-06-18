import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = (ref: RefObject<HTMLDivElement>, handler: () => void) => {
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
