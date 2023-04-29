import { UserRoleEnum, userEnumToString } from '$lib/database/auth/userData.type';
import { getSessionWithRolesAndMeta } from '$lib/server/GetSession';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	//In case of new user
	const session = event.locals.session;
	//New user case
	if (session?.user && session.user.roles.includes(userEnumToString[UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/new-user');
	}
	//Profile Case
	if (session?.user && !session.user.roles.includes(userEnumToString[UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/profile');
	}
	if (session?.user && session.user.roles && session.user.meta) {
		return {
			roles: session.user.roles,
			meta: session.user.meta
		};
	}
};
