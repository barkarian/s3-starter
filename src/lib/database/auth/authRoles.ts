import type { Prisma, UserRole } from '@prisma/client';
import { prismaClient as prisma } from '$lib/server/prismaClient';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { Session } from '../../../app';

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

export async function getUserRolesFromSession(session: Session): Promise<string[]> {
	return session?.user?.roles ?? [];
}

type HasAllRolesSettings = {
	event: RequestEvent;
	requiredRoles: string[];
	failure_redirect: string;
};

export function hasAllRoles(event: RequestEvent, requiredRoles: string[]) {
	if (!event.locals.session || !event.locals.session?.user) {
		return false;
	}
	return requiredRoles.every((role) => event.locals.session?.user?.roles.includes(role));
}

export function hasSession(event: RequestEvent) {
	return event.locals.session && event.locals.session?.user;
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
