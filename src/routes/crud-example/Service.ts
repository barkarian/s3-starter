import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { prismaClient } from '$lib/server/prismaClient';
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
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	phone: z.string().min(1),
	userApproved: z.boolean()
});

// Define Update Schema
export const updateFormSchema = z.object({
	id: z.number().int(),
	firstName: z.string().min(1).optional(),
	lastName: z.string().min(1).optional(),
	email: z.string().min(1).optional(),
	phone: z.string().min(1).optional(),
	userApproved: z.boolean().optional().default(false)
});

// Define Remove Schema
export const deleteFormSchema = z.object({
	id: z.number().int()
});

//FiltersQueryParams  only for reference in the frontend
export type FiltersQueryParams = {
	email?: string;
	firstName?: string;
	lastName?: string;
};

export async function findConfigurations(
	limit: number,
	page: number,
	event: ServerLoadEvent
): Promise<GuiPaginationData<User[]>> {
	//Construct filter Object
	const filter: Prisma.UserWhereInput = {
		firstName: {
			contains: event.url.searchParams.get('firstName') ?? undefined
		},
		lastName: {
			contains: event.url.searchParams.get('lastName') ?? undefined
		},
		email: {
			contains: event.url.searchParams.get('email') ?? undefined
		}
	};
	//API LAYER
	try {
		const users: User[] = await prismaClient.user.findMany({
			where: filter,
			skip: page * limit,
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
				totalCount: await prismaClient.user.count({ where: filter })
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
	const form = await superValidate(event, deleteFormSchema);
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
		phone: form.data.phone,
		email: form.data.email,
		userApproved: form.data.userApproved
	};
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
	const form = await superValidate(event, createFormSchema);
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
		email: form.data.email,
		firstName: form.data.firstName,
		lastName: form.data.lastName,
		phone: form.data.phone,
		totalRevenue: 0,
		userApproved: form.data.userApproved
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
