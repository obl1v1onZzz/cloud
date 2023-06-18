import React, { ReactElement } from 'react';
import { ICheckBox } from './CheckBox/CheckBox';
import style from './CheckBoxGroup.module.css';
interface ICheckboxGroup {
	children: ReactElement<ICheckBox> | Array<ReactElement<ICheckBox>>;
	className?: string;
	label: string;
}
export const CheckBoxGroup: React.FC<ICheckboxGroup> = ({ label, children, className }) => {
	return (
		<div className={className ?? ''}>
			<label className={style.label}>{label}</label>
			{children}
		</div>
	);
};
