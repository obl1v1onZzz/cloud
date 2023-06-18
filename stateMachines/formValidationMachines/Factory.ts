import { Advanteges } from './../../frontend/components/Steps/Advanteges/Advanteges';
import {
	checkBoxValidator,
	emailValidator,
	nameValidator,
	nickNameValidator,
	phoneValidator,
	surnameValidator,
	textAreaValidator,
	validateCheck,
} from '../../src/validators/validators';
import { FormMachineContext, formMachineFactory } from './MachineFactory';

export enum BASE_INFO_FIELDS {
	NICKNAME = 'Nickname',
	NAME = 'Name',
	SURNAME = 'Surname',
	SELECT = 'Select',
}

export const baseInfoMachineForm = formMachineFactory([
	{
		field: BASE_INFO_FIELDS.NICKNAME,
		validator: nickNameValidator,
	},
	{
		field: BASE_INFO_FIELDS.NAME,
		validator: nameValidator,
	},
	{
		field: BASE_INFO_FIELDS.SURNAME,
		validator: surnameValidator,
	},
	{
		field: BASE_INFO_FIELDS.SELECT,
		validator: validateCheck,
	},
]);

//initial fields
export enum ADVANTEGES_FIELDS {
	ADV1 = 'adv_1',
	ADV2 = 'adv_2',
	ADV3 = 'adv_3',
	CHECKBOX = 'checkbox',
}

export const advantegesMachineForm = formMachineFactory([
	{
		field: ADVANTEGES_FIELDS.ADV1,
		validator: nickNameValidator,
	},
	{
		field: ADVANTEGES_FIELDS.ADV2,
		validator: nickNameValidator,
	},
	{
		field: ADVANTEGES_FIELDS.ADV3,
		validator: nickNameValidator,
	},
	{
		field: ADVANTEGES_FIELDS.CHECKBOX,
		validator: checkBoxValidator,
	},
]);
export const getAdvantegesNewFieldName = (ctx: FormMachineContext) => {
	const lastField = ctx.fields
		.filter((el) => {
			return el.field.startsWith('adv');
		})
		.slice(-1);
	if (lastField.length === 0) return ADVANTEGES_FIELDS.ADV1;
	const lastID = lastField[0].field.split('_')[1];
	return `adv_${Number(lastID) + 1}`;
};

export enum MAIN_SCREEN_FIELDS {
	PHONE = 'phone',
	EMAIL = 'email',
}

export const mainScreen = formMachineFactory([
	{
		field: MAIN_SCREEN_FIELDS.EMAIL,
		validator: emailValidator,
	},
	{
		field: MAIN_SCREEN_FIELDS.PHONE,
		validator: phoneValidator,
	},
]);

export const aboutScreen = formMachineFactory([
	{
		field: 'textArea',
		validator: textAreaValidator,
	},
]);
