import React, { ReactElement } from 'react';
import { IRadioBox } from './Radio/Radio';
import style from './RadioBoxGroup.module.css';
interface IRadioBoxGroup {
	children: ReactElement<IRadioBox> | Array<ReactElement<IRadioBox>>;
	className?: string;
	label: string;
}
export const RadioBoxGroup: React.FC<IRadioBoxGroup> = ({ label, children, className }) => {
	return (
		<div className={className ?? ''}>
			<label className={style.label}>{label}</label>
			{React.Children.map(children, (e) => {
				return React.cloneElement(e, {
					name: label,
				});
			})}
		</div>
	);
};
