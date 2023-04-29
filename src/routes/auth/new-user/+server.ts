import { hasAllRoles } from '$lib/database/auth/authRoles.js';
import { UserRoleEnum } from '$lib/database/auth/userData.type.js';
import { json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
	if (!event.locals.session || !event.locals.session?.user) {
		throw redirect(302, '/auth');
	}
	if (!hasAllRoles(event.locals.session?.user?.roles, [UserRoleEnum.NEW_USER])) {
		throw redirect(302, '/auth');
	}
	const { a, b } = await event.request.json();
	return json(a + b);
}
