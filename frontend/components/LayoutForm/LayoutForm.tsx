import { StepView } from '../Shared/StepView/StepView';
import { useActor } from '@xstate/react';
import { IStateSchema, TMachineContext, steps } from '../../../stateMachines/screenMachine';
import { About } from '../Steps/About/About';
import { BaseInfo } from '../Steps/Base/BaseInfo';
import { Advanteges } from '../Steps/Advanteges/Advanteges';
import styles from './LayoutForm.module.css';
import { AnyEventObject, BaseActionObject, Interpreter, ResolveTypegenMeta, ServiceMap, TypegenDisabled } from 'xstate';
import { RootModal } from '../Modal/RootModal';
import { ErrorModal } from '../Modal/ErrorModal/ErrorModal';
import { useCallback } from 'react';
import { SuccsesModal } from '../Modal/SuccsesModal/SuccsesModal';

interface ILayoutForm {
	service: Interpreter<
		TMachineContext,
		any,
		AnyEventObject,
		IStateSchema,
		ResolveTypegenMeta<TypegenDisabled, AnyEventObject, BaseActionObject, ServiceMap>
	>;
}

export const LayoutForm: React.FC<ILayoutForm> = ({ service }) => {
	const [state, send] = useActor(service);
	const { formMachines, formsData } = state.context;
	const errorClose = useCallback(() => {
		send('retry');
	}, [service]);
	const successClose = useCallback(() => {
		send('goMain');
	}, [service]);
	return (
		<div className={styles.container}>
			<StepView className={styles.progress_container} currentStep={state.context.stepsCount}></StepView>
			<div className={styles.active_form}>
				{(() => {
					switch (state.value) {
						case steps.BASE_INFO:
							return <BaseInfo savedData={formsData.baseInfo} actor={formMachines} />;
						case steps.ABOUT:
							return <About savedData={formsData.about} actor={formMachines} />;
						case steps.ADVANTAGES:
							return <Advanteges savedData={formsData.advantages} actor={formMachines} />;
					}
				})()}
				{state.matches('rejected') && (
					<RootModal>
						<ErrorModal onClose={errorClose} errorMessage="wff"></ErrorModal>
					</RootModal>
				)}
				{state.matches('success') && (
					<RootModal>
						<SuccsesModal onClose={successClose}></SuccsesModal>
					</RootModal>
				)}
			</div>
		</div>
	);
};
