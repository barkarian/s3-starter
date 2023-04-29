import { hasAllRoles } from '$lib/database/auth/authRoles';
import { UserRoleEnum } from '$lib/database/auth/userData.type';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const session = event.locals.session;
	if (!session || !session.user) {
		throw redirect(303, '/auth');
	}
	if (!hasAllRoles(session.user.roles, [UserRoleEnum.NEW_USER])) {
		throw redirect(303, '/auth/profile');
	}
	if (session?.user && session.user.roles) {
		return {
			roles: session.user.roles,
			meta: session.user.meta
		};
	}
	return;
};
