import type { Prisma, UserRole } from '@prisma/client';
import { prismaClient as prisma } from '$lib/server/prismaClient';

// 2. Function to add one or more roles to a user (without duplicates)
export async function addUserRoles(userId: number, newRoles: string[]): Promise<void> {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: { roles: true }
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

// 3. Function to remove one or more roles from a user
export async function removeUserRoles(userId: number, rolesToRemove: string[]): Promise<void> {
	await prisma.userRole.deleteMany({
		where: {
			userId,
			role: {
				in: rolesToRemove
			}
		}
	});
}

export async function getUserRoles(userId: number): Promise<string[]> {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: { roles: true }
	});

	if (!user) {
		throw new Error(`User with ID ${userId} not found.`);
	}

	return user.roles.map((userRole: UserRole) => userRole.role);
}
