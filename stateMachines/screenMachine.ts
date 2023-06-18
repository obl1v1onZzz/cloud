import { AnyEventObject, assign, createMachine, spawn } from 'xstate';
import { submitForm } from '../src/request/request';
import { aboutScreen, advantegesMachineForm, baseInfoMachineForm, mainScreen } from './formValidationMachines/Factory';

export enum steps {
	BASE_INFO = 'baseInfo',
	ADVANTAGES = 'advantages',
	ABOUT = 'about',
}
const mainPage = 'main';
export interface IStateSchema {
	value: string;
	context: TMachineContext;
	states: {
		[steps.ABOUT]: {};
		[steps.ADVANTAGES]: {};
		[steps.BASE_INFO]: {};
		[mainPage]: {};
		loadingModal: {};
		rejected: {};
		success: {};
	};
}

export type TMachineContext = {
	stepsCount: number;
	path: string;
	formsData: any;
	formMachines: any;
};
const increaseCountStep = (context: TMachineContext) => {
	return context.stepsCount + 1;
};
const decreaseCountStep = (context: TMachineContext) => {
	return context.stepsCount - 1;
};
export const initialStepForm = steps.BASE_INFO;
export const mainScreenMachine = createMachine<TMachineContext, AnyEventObject, IStateSchema>({
	id: 'main-screen',
	initial: 'main',
	context: {
		stepsCount: 1,
		path: '/',
		formsData: {
			[steps.ABOUT]: {},
			[steps.BASE_INFO]: {},
			[steps.ADVANTAGES]: {},
			[mainPage]: {},
		},
		formMachines: {},
	},
	states: {
		[mainPage]: {
			entry: [
				'changePage',
				assign({
					path: '/',
					formMachines: () => {
						return spawn(mainScreen);
					},
				}),
			],
			on: {
				nextStep: {
					actions: assign({
						formsData: (_, event) => {
							return {
								[mainPage]: event.formsData,
							};
						},
					}),
					target: 'baseInfo',
				},
			},
		},
		[steps.ABOUT]: {
			entry: [
				assign({
					formMachines: () => {
						return spawn(aboutScreen);
					},
				}),
			],
			on: {
				nextStep: { target: 'loadingModal' },
				forwadStep: { target: 'advantages', actions: assign({ stepsCount: decreaseCountStep }) },
			},
		},
		[steps.ADVANTAGES]: {
			entry: [
				assign({
					formMachines: () => {
						return spawn(advantegesMachineForm);
					},
				}),
			],
			on: {
				nextStep: {
					target: 'about',
					actions: assign({ stepsCount: increaseCountStep }),
				},
				forwadStep: { target: 'baseInfo', actions: assign({ stepsCount: decreaseCountStep }) },
			},
		},
		[steps.BASE_INFO]: {
			entry: [
				'changePage',
				assign({
					path: '/create',
					formMachines: () => {
						return spawn(baseInfoMachineForm);
					},
				}),
			],
			on: {
				forwadStep: {
					target: 'main',
					actions: assign({
						formsData: (_, event) => {
							return {
								[steps.BASE_INFO]: event.formsData,
							};
						},
					}),
				},
				nextStep: {
					target: 'advantages',
					actions: assign({
						stepsCount: increaseCountStep,
						formsData: (_, event) => {
							return {
								[steps.BASE_INFO]: event.formsData,
							};
						},
					}),
				},
			},
		},
		loadingModal: {
			invoke: {
				id: 'loadingForm',
				src: (ctx) => submitForm(ctx.formsData),
				onDone: {
					target: 'success',
				},
				onError: {
					target: 'rejected',
				},
			},
		},
		success: {
			on: {
				goMain: {
					target: 'main',
				},
			},
		},
		rejected: {
			on: {
				retry: 'about',
			},
		},
	},
});
