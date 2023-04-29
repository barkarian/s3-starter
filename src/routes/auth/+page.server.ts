import { getSessionWithRolesAndMeta } from '$lib/server/GetSession';
import { hasAllRoles } from '$lib/database/auth/authRoles';
import { UserRoleEnum } from '$lib/database/auth/userData.type';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	//In case of new user
	const session = event.locals.session;
	if (!session?.user) return;
	//New user case
	if (hasAllRoles(session.user.roles, [UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/new-user');
	}
	//Profile Case
	if (!hasAllRoles(session.user.roles, [UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/profile');
	}
	if (session.user.roles && session.user.meta) {
		return {
			roles: session.user.roles,
			meta: session.user.meta
		};
	}
};
