import React from 'react';
import style from './SuccsesModal.module.css';
import { Button } from '../../Shared/Button/Button';
interface ISuccessModal {
	onClose: () => void;
}
export const SuccsesModal: React.FC<ISuccessModal> = ({ onClose }) => {
	return (
		<div className={style.modal}>
			<div className={style.container}>
				<div className={style.top}>
					<div className={style.succses}>Форма успешно отправлена</div>
				</div>
				<div className={style.content}>
					<div className="success"></div>
				</div>
				<Button onClick={onClose} className={style.closeButton} transperent={false}>
					На главную
				</Button>
			</div>
		</div>
	);
};
