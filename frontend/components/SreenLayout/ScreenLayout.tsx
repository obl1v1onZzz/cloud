import React, { useCallback, useState } from 'react';
import { ActorRefWithDeprecatedState } from 'xstate';
import { FormMachineContext, IEvents } from '../../../stateMachines/formValidationMachines/MachineFactory';
import { useActorForm } from '../../hooks/useMachineForms';
import { SocialLink } from '../Shared/SocialLink/SocialLink';
import styles from './Main.module.css';
import { Button } from '../Shared/Button/Button';
import { InputField } from '../Shared/Forms/InputField/InputField';
interface IProps {
	service: ActorRefWithDeprecatedState<FormMachineContext, IEvents, any, any>;
	savedData: any;
}
export const ScreenLayout: React.FC<IProps> = ({ service, savedData }) => {
	const { onChange, getValidationError, send, state } = useActorForm(service);
	const [value, setValue] = useState('');
	const onClick = useCallback(() => {
		send('submit');
	}, [send]);
	console.log(savedData);
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data: string = e.target.value;
		if (!data) setValue(data);
		const a = data.replace(/[^\d]/g, '');
		onChange(e, 'phone');
		if (a.length <= 1) {
			return setValue(`+${a}`);
		}
		if (a.length <= 4) {
			return setValue(`+${a.slice(0, 1)} (${a.slice(1)}`);
		}
		if (a.length < 5) {
			return setValue(`+${a.slice(0, 1)} (${a.slice(1, 4)})`);
		}
		if (a.length < 8) {
			return setValue(`+${a.slice(0, 1)} (${a.slice(1, 4)}) ${a.slice(4)}`);
		}
		if (a.length < 10) {
			return setValue(`+${a.slice(0, 1)} (${a.slice(1, 4)}) ${a.slice(4, 7)}-${a.slice(7, 10)}`);
		}
		setValue(`+${a.slice(0, 1)} (${a.slice(1, 4)}) ${a.slice(4, 7)}-${a.slice(7, 9)}-${a.slice(9, 11)}`);
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.aboutme}>
				<div className={styles.avatar}>
					<span className={styles.in}>АИ</span>
				</div>
				<div className={styles.content}>
					<div className={styles.fullName}>Иван Иванов</div>
					<div className={styles.social_links}>
						<SocialLink
							className={styles.container}
							placeHolder="Telegram"
							link="https://web.telegram.org/"></SocialLink>
						<SocialLink
							className={styles.container}
							placeHolder="Github"
							link="https://web.telegram.org/"></SocialLink>
						<SocialLink
							className={styles.container}
							placeHolder="Resume"
							link="https://web.telegram.org/"></SocialLink>
					</div>
				</div>
			</div>
			<div className={styles.divider}></div>
			<div className={styles.about_me_data}>
				<label className={styles.label} htmlFor="number">
					Номер телефона
				</label>
				<InputField
					type="tel"
					err={getValidationError('phone')}
					field="phone"
					placeHolder="7 (999) 999-99-99"
					value={value}
					onChange={onChangeHandler}></InputField>
				<label className={styles.label} htmlFor="number">
					Email
				</label>
				<InputField
					placeHolder="tim.jennings@example.com"
					err={getValidationError('email')}
					onChange={onChange}
					field="email"></InputField>
			</div>
			<Button onClick={onClick} transperent={false}>
				Далее
			</Button>
		</div>
	);
};
