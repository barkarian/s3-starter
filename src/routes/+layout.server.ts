import { getUserRolesFromSession } from '$lib/database/auth/authRoles';
import { getSessionWithRolesAndMeta } from '$lib/server/GetSession';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	//Whatever is loaded here is accessible via the store $page.data.<property>
	//You can access session using this store: $page.data.session

	return {
		session: event.locals.session,
		roles: getUserRolesFromSession(event.locals.session)
	};
};
