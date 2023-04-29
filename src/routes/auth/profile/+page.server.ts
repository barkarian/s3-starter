import { UserRoleEnum, userEnumToString } from '$lib/database/auth/userData.type';
import { getSessionWithRolesAndMeta } from '$lib/server/GetSession';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const session = event.locals.session;
	if (!session || !session.user) {
		throw redirect(303, '/auth');
	}
	if (session.user.roles.includes(userEnumToString[UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/new-user');
	}
	if (session?.user && session.user.roles) {
		return {
			roles: session.user.roles,
			meta: session.user.meta
		};
	}
	return;
};
