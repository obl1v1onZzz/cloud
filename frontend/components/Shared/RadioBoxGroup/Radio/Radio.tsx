import React from 'react';
import style from './Radio.module.css';

export interface IRadioBox {
	value: string;
	name?: string;
}
export const Radio: React.FC<IRadioBox> = ({ value, name }) => {
	return (
		<label className={style.container}>
			{value}
			<input name={name} type="radio" />
			<span className={style.checkmark}></span>
		</label>
	);
};
