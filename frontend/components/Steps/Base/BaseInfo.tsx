import { ActorRefWithDeprecatedState } from 'xstate';
import { FormMachineContext, IEvents } from '../../../../stateMachines/formValidationMachines/MachineFactory';
import { useActorForm } from '../../../hooks/useMachineForms';
import { InputField } from '../../Shared/Forms/InputField/InputField';
import styles from './BaseInfo.module.css';
import React from 'react';
import { ButtonsLayout } from '../../Shared/Forms/ButtonsLayout/ButtonsLayout';

interface IBaseInfo {
	actor: ActorRefWithDeprecatedState<FormMachineContext, IEvents, any, any>;
	savedData: any;
}
enum FIELDS {
	NICKNAME = 'Nickname',
	NAME = 'Name',
	SURNAME = 'Surname',
}

export const BaseInfo: React.FC<IBaseInfo> = ({ actor, savedData }) => {
	const { state, onChange, send, getValidationError } = useActorForm(actor);
	console.log(savedData);
	return (
		<div>
			{Object.values(FIELDS).map((e) => {
				return (
					<div key={e} className={styles.field}>
						<div className={styles.fieldName}>{e}</div>
						<InputField
							err={getValidationError(e)}
							className={styles.wrapper}
							field={e}
							onChange={onChange}></InputField>
						<div className={styles.tip}>Tip</div>
					</div>
				);
			})}

			<div className={styles.selectContainer}>
				<select
					onChange={(e) => {
						onChange(e, 'Select');
					}}
					className={styles.select}
					name=""
					id="">
					<option value="man">Man</option>
					<option value="woman">Woman</option>
					<option value="notValid" disabled selected hidden>
						Не выбрано
					</option>
				</select>
			</div>

			<ButtonsLayout send={send} className={styles.buttons} />
		</div>
	);
};
