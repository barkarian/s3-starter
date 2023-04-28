import type { Prisma, UserRole } from '@prisma/client';
import { prismaClient as prisma } from '$lib/server/prismaClient';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export async function addUserRoles(userId: string, newRoles: string[]): Promise<void> {
	const user = await prisma.user.findUnique({
		include: { roles: true },
		where: { id: userId }
	});

	if (!user) {
		throw new Error(`User with ID ${userId} not found.`);
	}

	const existingRoles = user.roles.map((role) => role.role);
	const rolesToAdd = newRoles.filter((role) => !existingRoles.includes(role));

	await prisma.userRole.createMany({
		data: rolesToAdd.map((role) => ({ userId, role }))
	});
}

export async function removeUserRoles(userId: string, rolesToRemove: string[]): Promise<void> {
	await prisma.userRole.deleteMany({
		where: {
			userId,
			role: {
				in: rolesToRemove
			}
		}
	});
}

export async function getUserRoles(userId: string): Promise<string[]> {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: { roles: true }
	});

	if (!user) {
		throw new Error(`User with ID ${userId} not found.`);
	}

	return user.roles.map((userRole: UserRole) => userRole.role);
}

export function hasAllRoles(userRoles: string[], requiredRoles: string[]) {
	return requiredRoles.every((role) => userRoles.includes(role));
}

export async function revalidateTokenAndCheckUserHasAllRoles(
	event: RequestEvent,
	requiredRoles: string[]
) {
	await event.locals.getSession();
	if (!event.locals.session || !event.locals.session.user) throw redirect(303, '/auth');
	const userRoles = event.locals.session.user.roles;
	return requiredRoles.every((role) => userRoles.includes(role));
}
