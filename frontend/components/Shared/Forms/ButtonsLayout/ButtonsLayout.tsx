import React from 'react';
import { Button } from '../../Button/Button';
import { Sender } from 'xstate';
import { IEvents } from '../../../../../stateMachines/formValidationMachines/MachineFactory';

interface IButtonsLayout {
	send: Sender<IEvents>;
	className: string;
}
export const ButtonsLayout: React.FC<IButtonsLayout> = ({ send, className }) => {
	return (
		<div className={className}>
			<Button
				transperent={true}
				onClick={() => {
					send('goBack');
				}}>
				Назад
			</Button>
			<Button
				transperent={false}
				onClick={() => {
					send('submit');
				}}>
				Далее
			</Button>
		</div>
	);
};
