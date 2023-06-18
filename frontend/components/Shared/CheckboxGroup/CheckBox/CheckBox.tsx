import React from 'react';
import style from './CheckBox.module.css';

export interface ICheckBox {
	value: string;
}
export const CheckBox: React.FC<ICheckBox> = ({ value }) => {
	return (
		<label className={style.container}>
			{value}
			<input type="checkbox" />
			<span className={style.checkmark}></span>
		</label>
	);
};
