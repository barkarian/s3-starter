import { getSessionWithRolesAndMeta } from '$lib/server/GetSession';
import { hasAllRoles, hasSession } from '$lib/database/auth/authRoles';
import { UserRoleEnum } from '$lib/database/auth/userData.type';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	//In case of new user
	const session = event.locals.session;
	console.log(session);
	if (!hasSession(event)) return {};
	//New user case
	if (hasAllRoles(event, [UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/new-user');
	}
	//Profile Case
	if (!hasAllRoles(event, [UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/profile');
	}
	//Always containing data checked in hasSession
	return {
		roles: session?.user?.roles || [],
		meta: session?.user?.meta || {}
	};
};
