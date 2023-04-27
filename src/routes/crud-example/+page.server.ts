import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions } from '@sveltejs/kit';
import {
	createConfiguration,
	createFormSchema,
	deleteConfiguration,
	findConfigurations,
	deleteFormSchema,
	updateConfiguration,
	updateFormSchema
} from './Service';
import { PUBLIC_DEFAULT_LIMIT, PUBLIC_INVALID_FORM_STATUS } from '$env/static/public';

//Configuration Types
//LOADING DATA----------------------------------------------------------------------
export const load: PageServerLoad = async (event) => {
	console.log('load is running again:' + event.url);
	// Server API:
	const [createForm, updateForm, deleteForm] = await Promise.all([
		superValidate(event, createFormSchema),
		superValidate(event, updateFormSchema),
		superValidate(event, deleteFormSchema)
	]);

	//On search configuration Filter must be empty
	const limit = Number(event.url.searchParams.get('limit') ?? PUBLIC_DEFAULT_LIMIT);
	const page = Number(event.url.searchParams.get('page') ?? 0);

	let guiPaginationData = await findConfigurations(limit, page, event);
	if (guiPaginationData.error) {
		return fail(400, { error: guiPaginationData.error, createForm, configurationData: [] });
	}
	//TODO add error handling here
	return {
		createForm,
		updateForm,
		deleteForm,
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
		return message(form, 'Successfully created', {
			status: 200,
			valid: true
		});
		// return { form };
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
		return message(form, 'Successfully updated', {
			status: 200,
			valid: true
		});
	},
	delete: async (event) => {
		const { data, error, form } = await deleteConfiguration(event);
		if (error?.status == Number(PUBLIC_INVALID_FORM_STATUS)) {
			return message(form, error?.message, {
				status: error?.status || Number(PUBLIC_INVALID_FORM_STATUS)
			});
		}
		if (data == null || error != null) {
			return message(form, error?.message, {
				status: error?.status || Number(PUBLIC_INVALID_FORM_STATUS)
			});
		}

		// Yep, return { form } here too
		return message(form, 'Successfully deleted', {
			status: 200,
			valid: true
		});
	}
};
