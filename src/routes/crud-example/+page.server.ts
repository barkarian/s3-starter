import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions } from '@sveltejs/kit';
import {
	createConfiguration,
	createFormSchema,
	deleteConfiguration,
	findConfigurations,
	removeFormSchema,
	updateConfiguration,
	updateFormSchema
} from './Service';
import { PUBLIC_DEFAULT_LIMIT, PUBLIC_INVALID_FORM_STATUS } from '$env/static/public';

//Configuration Types
//LOADING DATA----------------------------------------------------------------------
export const load: PageServerLoad = async (event) => {
	// Server API:
	const [createForm, updateForm, removeForm] = await Promise.all([
		superValidate(event, createFormSchema),
		superValidate(event, updateFormSchema),
		superValidate(event, removeFormSchema)
	]);

	// Always return { form } in load and form actions.
	const updateFormAction = 'update';
	const removeFormAction = 'delete';
	const createFormAction = 'create';
	//On search configuration Filter must be empty
	const limit = Number(event.url.searchParams.get('limit') ?? PUBLIC_DEFAULT_LIMIT);
	const page = Number(event.url.searchParams.get('page') ?? 1);
	// console.log({
	//     msg: 'Load is running',
	//     limit,
	//     page
	//     // url: event.url
	// })
	let guiPaginationData = await findConfigurations(limit, page, event);
	if (guiPaginationData.error) {
		return fail(400, { error: guiPaginationData.error });
	}
	//TODO add error handling here
	return {
		createForm,
		updateForm,
		removeForm,
		updateFormAction,
		removeFormAction,
		createFormAction,
		configurationData: guiPaginationData
	};
};

//ACTIONS----------------------------------------------------------------------------
export const actions: Actions = {
	create: async (event) => {
		const { data, error, form } = await createConfiguration(event);
		if (error?.status == Number(PUBLIC_INVALID_FORM_STATUS)) {
			return fail(400, { form: form });
		}
		if (data == null || error != null) {
			return message(form, error?.message, {
				status: error?.status || Number(PUBLIC_INVALID_FORM_STATUS)
			});
		}

		// Yep, return { form } here too
		return { form };
	},
	update: async (event) => {
		const { data, error, form } = await updateConfiguration(event);
		if (error?.status == Number(PUBLIC_INVALID_FORM_STATUS)) {
			return fail(400, { form: form });
		}
		if (data == null || error != null) {
			return message(form, error?.message, {
				status: error?.status || Number(PUBLIC_INVALID_FORM_STATUS)
			});
		}

		// Yep, return { form } here too
		return { form };
	},
	delete: async (event) => {
		const { data, error, form } = await deleteConfiguration(event);
		if (error?.status == Number(PUBLIC_INVALID_FORM_STATUS)) {
			return fail(400, { form: form });
		}
		if (data == null || error != null) {
			return message(form, error?.message, {
				status: error?.status || Number(PUBLIC_INVALID_FORM_STATUS)
			});
		}

		// Yep, return { form } here too
		return { form };
	}
};
