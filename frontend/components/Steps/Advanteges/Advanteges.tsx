import React from 'react';
import { InputField } from '../../Shared/Forms/InputField/InputField';
import { useActorForm } from '../../../hooks/useMachineForms';
import styles from './style.module.css';
import { surnameValidator } from '../../../../src/validators/validators';
import { getAdvantegesNewFieldName } from '../../../../stateMachines/formValidationMachines/Factory';
import { FormMachineContext, IEvents } from '../../../../stateMachines/formValidationMachines/MachineFactory';
import { ActorRefWithDeprecatedState } from 'xstate';
import { CheckBoxGroup } from '../../Shared/CheckboxGroup/CheckboxGroup';
import { CheckBox } from '../../Shared/CheckboxGroup/CheckBox/CheckBox';
import { RadioBoxGroup } from '../../Shared/RadioBoxGroup/RadioBoxGroup';
import { Radio } from '../../Shared/RadioBoxGroup/Radio/Radio';
import { ButtonsLayout } from '../../Shared/Forms/ButtonsLayout/ButtonsLayout';
interface IAdvanteges {
	actor: ActorRefWithDeprecatedState<FormMachineContext, IEvents, any, any>;
	savedData: any;
}
export const Advanteges: React.FC<IAdvanteges> = ({ actor, savedData }) => {
	const { state, send, onChange, getValidationError } = useActorForm(actor);
	const { fields } = state.context;

	const deleteField = (field: string) => {
		send({
			type: 'removeField',
			field,
		});
	};
	return (
		<div>
			<div className={styles.fieldName}>Advantages</div>
			{fields.map((e) => {
				if (e.field.startsWith('adv'))
					return (
						<div key={e.field} className={styles.advantages}>
							<InputField
								className={styles.container}
								field={e.field}
								onChange={onChange}
								err={getValidationError(e.field)}></InputField>
							<button
								onClick={() => {
									deleteField(e.field);
								}}
								className={styles.deleteField}></button>
						</div>
					);
			})}
			<button
				onClick={() => {
					send({
						type: 'addNewField',
						field: getAdvantegesNewFieldName(state.context),
						validator: surnameValidator,
					});
				}}
				className={styles.btnNewField}></button>
			<CheckBoxGroup label="Checkbox group" className={styles.checkboxGroup}>
				<CheckBox value="1"></CheckBox>
				<CheckBox value="2"></CheckBox>
				<CheckBox value="3"></CheckBox>
			</CheckBoxGroup>

			<RadioBoxGroup className={styles.radioGroup} label="Radio group">
				<Radio value="1"></Radio>
				<Radio value="2"></Radio>
				<Radio value="3"></Radio>
			</RadioBoxGroup>
			<ButtonsLayout send={send} className={styles.buttons} />
		</div>
	);
};
