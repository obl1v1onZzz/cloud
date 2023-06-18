import React, { useEffect, useRef } from 'react';
import style from './ErrorModal.module.css';
import { Button } from '../../Shared/Button/Button';
import { useClickOutside } from '../../../hooks/useClickOutside';
interface ResultModal {
	errorMessage?: string;
	onClose: () => void;
}
export const ErrorModal: React.FC<ResultModal> = ({ errorMessage, onClose }) => {
	let ref = React.useRef<HTMLInputElement>(null);
	useClickOutside(ref, onClose);
	return (
		<div ref={ref} className={style.modal}>
			<div className={style.container}>
				<div className={style.top}>
					<div className="error">Ошибка</div>
					<button onClick={onClose} className={style.closeModal}>
						X
					</button>
				</div>
				<div className={style.content}>
					<div className="err_icon"></div>
					{errorMessage}
				</div>
				<Button onClick={onClose} className={style.closeButton} transperent={false}>
					Закрыть
				</Button>
			</div>
		</div>
	);
};
