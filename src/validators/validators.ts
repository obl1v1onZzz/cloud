import { IFormFieldValidationResult } from '../../stateMachines/formValidationMachines/MachineFactory';
// all lang?????
const onlyLettersAndNumbers = /^[\p{L}\p{N}]+$/gu;
const onlyLetters = /^[\p{L}]+$/gu;
export const textAreaRegExp = /[\p{L}\p{RGI_Emoji}\p{N}\p{M}\p{P}\p{S}]/gv;

export const nickNameValidator = (value: any): IFormFieldValidationResult => {
	if (typeof value !== 'string' || value.length > 10 || value.length < 5)
		return {
			result: false,
			errorMessage: 'Nickname max length 30',
		};
	if (!value.match(onlyLettersAndNumbers)?.length) {
		return {
			result: false,
			errorMessage: 'Nickname allowed only letters and numbers',
		};
	}
	return {
		result: true,
	};
};
export const nameValidator = (value: any): IFormFieldValidationResult => {
	if (typeof value !== 'string' || value.length > 50 || value.length < 5)
		return {
			result: false,
			errorMessage: 'Name max length 30 and min 5',
		};
	if (!value.match(onlyLetters)?.length) {
		return {
			result: false,
			errorMessage: 'Name allowed only letters',
		};
	}
	return {
		result: true,
	};
};

export const surnameValidator = (value: any): IFormFieldValidationResult => {
	if (typeof value !== 'string' || value.length > 50 || value.length < 5)
		return {
			result: false,
			errorMessage: 'Surname max length 30',
		};
	if (!value.match(onlyLetters)?.length) {
		return {
			result: false,
			errorMessage: 'Surname allowed only letters',
		};
	}
	return {
		result: true,
	};
};
export const phoneValidator = (value: string): IFormFieldValidationResult => {
	debugger;
	const allowedChars = new RegExp(/[\p{Nd}]+&/gv);
	if (value.match(allowedChars)?.length === 11) {
		return {
			result: false,
			errorMessage: 'Phone allowed only numbers',
		};
	}
	return {
		result: true,
	};
};
export const emailValidator = (value: string): IFormFieldValidationResult => {
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		return {
			result: false,
			errorMessage: 'Invalid e-mail',
		};
	}
	return {
		result: true,
	};
};
export const validateCheck = (value: any): IFormFieldValidationResult => {
	if (!value) return { result: false, errorMessage: 'select  options' };
	return {
		result: true,
	};
};
export const advantegesFieldValidator = (value: string): IFormFieldValidationResult => {
	if (value.length > 100) {
		return {
			result: false,
			errorMessage: 'max len 100',
		};
	}
	return {
		result: true,
	};
};

export const checkBoxValidator = (value: any): IFormFieldValidationResult => {
	return { result: true };
};

export const textAreaValidator = (value: string): IFormFieldValidationResult => {
	const matched = value.match(textAreaRegExp);
	if (!matched) return { result: false, errorMessage: 'min len 10' };
	if (matched?.length > 200) {
		return {
			result: false,
			errorMessage: 'Max length 200',
		};
	}
	return { result: true };
};
