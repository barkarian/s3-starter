import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { prismaClient } from '$lib/server/prismaClient';
import { queryStringToObjectOfStrings } from '$lib/server/MapQueryAndObject';
import { PUBLIC_INVALID_FORM_STATUS } from '$env/static/public';

//Configuration Types
export type GuiData<T> = {
	data?: T;
	form: any;
	error?: {
		status: number;
		message: string;
	};
};

//Configuration Types
export type GuiPaginationData<T> = {
	data: T;
	//Pagination or Error
	pagination?: {
		limit: number;
		page: number;
		totalCount: number;
	};
	error?: {
		status: number;
		message: string;
	};
};

// Define Create Schema
export const createFormSchema = z.object({
	email: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	phone: z.string()
});

// Define Update Schema
export const updateFormSchema = z.object({
	id: z.number().int(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	phone: z.string().optional()
});

// Define Remove Schema
export const removeFormSchema = z.object({
	email: z.string()
});

//FiltersQueryParams  - Must have only strings!
export type FiltersQueryParams = {
	id?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	totalRevenueUpperLimit?: string;
	totalRevenueLowerLimit?: string;
	userApproved?: string;
};
//FiltersQueryParams sample
const sampleFiltersQueryParams = {
	id: '1',
	email: '1',
	firstName: '1',
	lastName: '1',
	phone: '1',
	totalRevenueUpperLimit: '1',
	totalRevenueLowerLimit: '1',
	userApproved: '1'
};

//FiltersQueryParams  - Must have only strings!
function constructFilterObject(filterFields: FiltersQueryParams): Prisma.UserWhereInput {
	try {
		const filter: Prisma.UserWhereInput = {};
		filter.totalRevenue = {};

		if (filterFields.totalRevenueUpperLimit) {
			const floatValue = parseFloat(filterFields.totalRevenueUpperLimit);
			filter.totalRevenue = {
				...filter.totalRevenue,
				lt: floatValue
			};
		}

		if (filterFields.totalRevenueLowerLimit) {
			const floatValue = parseFloat(filterFields.totalRevenueLowerLimit);
			filter.totalRevenue = {
				...filter.totalRevenue,
				gt: floatValue
			};
		}

		if (filterFields.email) {
			filter.email = {
				contains: filterFields.email
			};
		}

		if (filterFields.firstName) {
			filter.firstName = {
				contains: filterFields.firstName
			};
		}

		if (filterFields.lastName) {
			filter.lastName = {
				contains: filterFields.lastName
			};
		}

		if (filterFields.phone) {
			filter.phone = {
				contains: filterFields.phone
				// mode: 'insensitive'
			};
		}

		if (filterFields.userApproved) {
			filter.userApproved = {
				equals: filterFields.userApproved === 'true'
			};
		}
		return filter;
	} catch (e) {
		throw "Couldn't construct Prisma Filter";
	}
}

export async function findConfigurations(
	limit: number,
	page: number,
	event: ServerLoadEvent
): Promise<GuiPaginationData<User[]>> {
	//Get valid filter props from queryParams
	const filterQueryParams: FiltersQueryParams = queryStringToObjectOfStrings<FiltersQueryParams>(
		sampleFiltersQueryParams,
		event.url.search
	);
	//Construct filter Object
	const filter: Prisma.UserWhereInput = constructFilterObject(filterQueryParams);
	//API LAYER
	try {
		const users: User[] = await prismaClient.user.findMany({
			where: filter,
			skip: (page - 1) * limit,
			take: limit,
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				phone: true,
				totalRevenue: true,
				userApproved: true
			}
		});
		return {
			data: users,
			pagination: {
				limit,
				page,
				totalCount: await prismaClient.user.count()
			}
		};
	} catch (e) {
		return {
			data: [],
			error: {
				message: 'Something went wrong while loading data ' + e,
				status: 404
			}
		};
	}
}

export async function deleteConfiguration(event: RequestEvent): Promise<GuiData<User>> {
	//VALIDATE FORM
	const form = await superValidate(event, removeFormSchema);
	console.log(form);
	if (!form.valid) {
		return {
			form,
			error: {
				message: 'Form is not valid',
				status: Number(PUBLIC_INVALID_FORM_STATUS)
			}
		};
	}
	//FORM TO DTOS
	const configurationId: Prisma.UserWhereUniqueInput = {
		email: form.data.email
	};
	//API LAYER
	try {
		const deletedUser: User = await prismaClient.user.delete({
			where: configurationId
		});
		return { data: deletedUser, form };
	} catch (e) {
		return {
			form,
			error: {
				message: 'Something went wrong while trying to delete configuration' + `${e}`,
				status: 404
			}
		};
	}
}

export async function updateConfiguration(event: RequestEvent): Promise<GuiData<User>> {
	//VALIDATE FORM
	const form = await superValidate(event, updateFormSchema);
	console.log(form);
	if (!form.valid) {
		return {
			form,
			error: {
				message: 'Form is not valid',
				status: Number(PUBLIC_INVALID_FORM_STATUS)
			}
		};
	}
	//FORM TO DTOS
	const configurationId: Prisma.UserWhereUniqueInput = {
		id: form.data.id
	};
	const configurationUpdate: Prisma.UserUpdateInput = {
		firstName: form.data.firstName,
		lastName: form.data.lastName,
		phone: form.data.phone
	};
	console.log({
		formData: form?.data,
		configurationId,
		configurationUpdate
	});
	//API LAYER
	try {
		const updatedUser: User = await prismaClient.user.update({
			where: configurationId,
			data: configurationUpdate
		});
		return { data: updatedUser, form };
	} catch (e) {
		return {
			form,
			error: {
				message: 'Something went wrong while trying to delete configuration' + `${e}`,
				status: 404
			}
		};
	}
}

export async function createConfiguration(event: RequestEvent): Promise<GuiData<User>> {
	//VALIDATE FORM
	const form = await superValidate(event, updateFormSchema);
	if (!form.valid) {
		return {
			form,
			error: {
				message: 'Form is not valid',
				status: Number(PUBLIC_INVALID_FORM_STATUS)
			}
		};
	}
	//FORM TO DTOS
	const configuration: Prisma.UserCreateInput = {
		email: 'newuser@example.com',
		firstName: 'New',
		lastName: 'User',
		phone: '555-555-5555',
		totalRevenue: 0,
		userApproved: false
	};
	//API LAYER
	try {
		const createdUser: User = await prismaClient.user.create({
			data: configuration
		});
		return { data: createdUser, form };
	} catch (e) {
		return {
			form,
			error: {
				message: `Something went wrong while trying to create configuration: ${e}`,
				status: 404
			}
		};
	}
}
