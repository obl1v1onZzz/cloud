import React, { memo } from 'react';
import styles from './InputFeild.module.css';

interface InterfaceInputField {
	onChange: (event: any, field: string) => void;
	field: string;
	className?: string;
	err?: string;
	placeHolder?: string;
	defaultValue?: string;
	value?: string;
	type?: string;
}
export const InputField: React.FC<InterfaceInputField> = memo(
	({ placeHolder, className, onChange, field, err, defaultValue, value, type }) => {
		return (
			<div className={className}>
				<input
					type={type}
					value={value}
					placeholder={placeHolder}
					defaultValue={defaultValue ?? ''}
					className={styles.inputField}
					onChange={(e) => onChange(e, field)}></input>
				{err && <span style={{ fontSize: '12px' }}>{err}</span>}
			</div>
		);
	}
);
