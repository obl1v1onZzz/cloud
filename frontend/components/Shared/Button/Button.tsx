import React, { memo } from 'react';
import style from './Button.module.css';
interface IButton {
	onClick: () => void;
	transperent: boolean;
	className?: string;
	children: React.ReactNode;
}
export const Button: React.FC<IButton> = memo(({ onClick, transperent, className, children }) => {
	return (
		<div className={className}>
			<button
				onClick={onClick}
				className={`${style.button} ${transperent ? style.buttonTransperent : style.buttonSubmit}`}>
				{children}
			</button>
		</div>
	);
});
