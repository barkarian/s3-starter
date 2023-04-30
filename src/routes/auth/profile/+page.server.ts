import { hasAllRoles, hasSession } from '$lib/database/auth/authRoles';
import { UserRoleEnum } from '$lib/database/auth/userData.type';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const session = event.locals.session;
	if (!hasSession(event)) {
		throw redirect(303, '/auth');
	}
	if (hasAllRoles(event, [UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/new-user');
	}
	//Always containing data checked in hasSession
	return {
		roles: session?.user?.roles || [],
		meta: session?.user?.meta || {}
	};
};
