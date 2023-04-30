import { hasAllRoles, hasSession } from '$lib/database/auth/authRoles.js';
import { UserRoleEnum } from '$lib/database/auth/userData.type.js';
import { json, redirect } from '@sveltejs/kit';
import { createConfiguration } from './Service.js';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	if (!hasSession(event)) {
		throw redirect(302, '/auth');
	}
	if (!hasAllRoles(event, [UserRoleEnum.NEW_USER])) {
		throw redirect(302, '/auth');
	}
	const response = createConfiguration(event);
	return json(response);
}
