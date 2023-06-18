import React, { useState } from 'react';
import style from './About.module.css';
import { ActorRefWithDeprecatedState } from 'xstate';
import { FormMachineContext, IEvents } from '../../../../stateMachines/formValidationMachines/MachineFactory';
import { useActorForm } from '../../../hooks/useMachineForms';
import { ButtonsLayout } from '../../Shared/Forms/ButtonsLayout/ButtonsLayout';
import { textAreaRegExp } from '../../../../src/validators/validators';
interface IAbout {
	actor: ActorRefWithDeprecatedState<FormMachineContext, IEvents, any, any>;
	savedData: any;
}
export const About: React.FC<IAbout> = ({ actor, savedData }) => {
	const { state, onChange, send, getValidationError } = useActorForm(actor);
	const [value, setValue] = useState(0);
	const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value.match(textAreaRegExp)?.length;
		if (!text) setValue(0);
		if (text) {
			setValue(text);
		}
		onChange(e, 'textArea');
	};
	return (
		<div>
			<div className={style.text_area_container}>
				<label className={style.label} htmlFor="about">
					About
				</label>
				<textarea
					onChange={changeHandler}
					placeholder="SomeText"
					className={style.textArea}
					name="about"></textarea>
				<div>Symbols {value}</div>
			</div>
			<ButtonsLayout send={send} className={style.buttons}></ButtonsLayout>
		</div>
	);
};
