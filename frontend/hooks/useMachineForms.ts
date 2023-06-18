import { useActor } from '@xstate/react';
import { ActorRefWithDeprecatedState } from 'xstate';
import { FormMachineContext, IEvents } from '../../stateMachines/formValidationMachines/MachineFactory';
export const useActorForm = (machine: ActorRefWithDeprecatedState<FormMachineContext, IEvents, any, any>) => {
	const [state, send] = useActor(machine);
	const onChange = (event: any, field: string) => {
		send({
			type: 'inputData',
			data: {
				field,
				value: event.target.value,
			},
		});
	};

	const getValidationError = (field: string) => {
		const err = state.context.dataErrors[field];
		if (!err) return '';
		if (!err.errorMessage) return 'SomeError';
		return err.errorMessage;
	};
	return {
		state,
		onChange,
		getValidationError,
		send,
	};
};
