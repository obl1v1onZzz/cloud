import { assign, createMachine, sendParent } from 'xstate';

enum STATES {
	DATA_ENTRY = 'dataEntry',
	DATA_ENTRY_ERROR = 'dataEntryError',
	DATA_ENTRY_SUCCESS = 'dataEntrySuccess',
	DATA_ENTRY_SUBMIT = 'dataEntrySubmit',
}
enum EVENTS {
	INPUT_DATA = 'inputData',
	SUBMIT = 'submit',
	GO_BACK = 'goBack',
	ADD_NEW_FIELD = 'addNewField',
	REMOVE_FIELD = 'removeField',
	ADD_SUBFIELD = 'addSubFIeld',
}

export interface IFormFieldValidationResult {
	result: boolean;
	errorMessage?: string;
}

export type IEvents =
	| {
			type: 'inputData';
			data: {
				value: string;
				field: string;
			};
	  }
	| {
			type: 'focusOut';
			data: {
				value: string;
				field: string;
			};
	  }
	| {
			type: 'submit';
			data: {
				value: string;
				field: string;
			};
	  }
	| {
			type: 'goBack';
			data: {
				value: string;
				field: string;
			};
	  }
	| {
			type: 'addNewField';
			validator: (value: any) => IFormFieldValidationResult;
			field: string;
	  }
	| {
			type: 'removeField';
			field: string;
	  }
	| {
			type: 'addSubField';
			field: string;
			subField: IField;
	  };

export interface IField {
	field: string;
	validator: (value: string) => IFormFieldValidationResult;
}
export interface IFieldWithSubFields extends IField {
	subFields: IField[];
}
export type FormMachineContext = {
	data: any;
	dataErrors: any;
	fields: IField[];
	validated: boolean;
};

const addNewField = (ctx: FormMachineContext, event: IEvents) => {
	if (event.type === EVENTS.ADD_NEW_FIELD) {
		ctx.fields.push({
			field: event.field,
			validator: event.validator,
		});
		return ctx.fields;
	}
	return ctx.fields;
};
const deleteField = (ctx: FormMachineContext, event: IEvents) => {
	if (event.type == EVENTS.REMOVE_FIELD) {
		return ctx.fields.filter((field, i) => field.field !== event.field);
	}
	return ctx.fields;
};
const setField = (ctx: FormMachineContext, event: IEvents) => {
	if (event.type === EVENTS.INPUT_DATA) {
		ctx.validated = false;
		ctx.data[event.data.field] = event.data.value;
		delete ctx.dataErrors[event.data.field];
	}
};
const normalizeFields = (ctx: FormMachineContext, event: IEvents) => {
	if (event.type === EVENTS.REMOVE_FIELD) {
		delete ctx.data[event.field];
		return ctx.data;
	}
	return ctx.data;
};
const validateFields = (ctx: FormMachineContext, event: IEvents) => {
	return ctx.fields.reduce((acc, el) => {
		const userData = ctx.data[el.field];
		if (el.validator(userData).result) return true && acc;
		ctx.dataErrors[el.field] = el.validator(userData);
		return false && acc;
	}, true);
};

export const formMachineFactory = (fields: IField[]) => {
	return createMachine<FormMachineContext, IEvents>({
		id: 'form',
		initial: STATES.DATA_ENTRY,
		context: {
			data: {},
			dataErrors: {},
			fields,
			validated: false,
		},
		states: {
			[STATES.DATA_ENTRY]: {
				on: {
					[EVENTS.ADD_NEW_FIELD]: {
						actions: [
							assign({
								fields: addNewField,
							}),
						],
					},
					[EVENTS.REMOVE_FIELD]: {
						actions: [
							assign({
								fields: deleteField,
								data: normalizeFields,
							}),
						],
					},
					[EVENTS.GO_BACK]: {
						actions: sendParent((ctx) => ({
							type: 'forwadStep',
							formsData: ctx.data,
						})),
					},
					[EVENTS.INPUT_DATA]: {
						actions: (ctx, event) => setField(ctx, event),
					},
					[EVENTS.SUBMIT]: [
						{
							cond: (ctx, event) => {
								return !validateFields(ctx, event);
							},
							target: STATES.DATA_ENTRY_ERROR,
						},
						{
							actions: sendParent((ctx) => ({
								type: 'nextStep',
								formsData: ctx.data,
							})),

							target: STATES.DATA_ENTRY_SUBMIT,
						},
					],
				},
			},
			[STATES.DATA_ENTRY_ERROR]: {
				on: {
					[EVENTS.GO_BACK]: {
						actions: sendParent((ctx) => ({
							type: 'forwadStep',
							formsData: ctx.data,
						})),
					},
					[EVENTS.INPUT_DATA]: {
						actions: (ctx, event) => setField(ctx, event),
						target: STATES.DATA_ENTRY,
					},
				},
			},

			[STATES.DATA_ENTRY_SUCCESS]: {
				on: {
					[EVENTS.GO_BACK]: {
						actions: sendParent((ctx) => ({
							type: 'forwadStep',
							formsData: ctx.data,
						})),
					},
					[EVENTS.INPUT_DATA]: { target: STATES.DATA_ENTRY },
					[EVENTS.SUBMIT]: {
						actions: (ctx) => (ctx.validated = true),
						target: STATES.DATA_ENTRY_SUBMIT,
					},
				},
			},
			[STATES.DATA_ENTRY_SUBMIT]: {
				type: 'final',
			},
		},
	});
};
