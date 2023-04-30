import type { PageServerLoad } from './$types';
import { ZodError, z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { prismaClient } from '$lib/server/prismaClient';
import { UserRoleEnum } from '$lib/database/auth/userData.type';
import type { Session } from '../../../app';

//Configuration Types
export type GuiData<T> = {
	data?: T;
	error?: {
		status: number;
		message: string;
		errors: any;
	};
};

// Define Create Schema
export const createFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	phone: z.string().min(1)
});

export async function createConfiguration(event: RequestEvent): Promise<GuiData<User>> {
	//VALIDATE FORM
	const requestBody = await event.request.json();
	try {
		const result = createFormSchema.parse(requestBody);
	} catch (err) {
		if (err instanceof ZodError) {
			const { fieldErrors: errors } = err.flatten();
			return {
				error: {
					errors,
					message: 'Form is not valid',
					status: 400
				}
			};
		}
	}
	//FORM TO DTOS
	const configuration: Prisma.UserCreateInput = {
		id: event.locals.session?.user?.id ?? '',
		email: event.locals.session?.user?.email ?? '',
		firstName: requestBody.firstName,
		lastName: requestBody.lastName,
		phone: requestBody.phone,
		totalRevenue: 0,
		userApproved: false
	};
	//API LAYER
	try {
		const createdUser: User = await prismaClient.user.create({
			data: configuration
		});
		await prismaClient.userRole.create({
			data: {
				role: UserRoleEnum.USER,
				userId: createdUser.id
			}
		});
		// const userWRoles = await prismaClient.user.findFirst({
		// 	where: {
		// 		id: createdUser.id
		// 	},
		// 	include: {
		// 		roles: true
		// 	}
		// });
		// console.log({
		// 	msg: 'Old session',
		// 	session: event.locals.session,
		// 	roles: event.locals.session?.user?.roles
		// });

		//await event.locals.getSession();

		// console.log({
		// 	msg: 'New session',
		// 	session: event.locals.session,
		// 	roles: event.locals.session?.user?.roles
		// });
		return { data: createdUser };
	} catch (e) {
		return {
			error: {
				errors: {},
				message: `Something went wrong while trying to create configuration: ${e}`,
				status: 404
			}
		};
	}
}
