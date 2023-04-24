import type { Session } from '../../app';

export function getSessionWithRolesAndMeta(sessionFromSessionCallback: any): Session {
	if (sessionFromSessionCallback) {
		const session: Session = {
			user: sessionFromSessionCallback.user
				? {
						email: sessionFromSessionCallback?.user?.email,
						image: sessionFromSessionCallback?.user?.image,
						name: sessionFromSessionCallback?.user?.name,
						roles: sessionFromSessionCallback?.user?.roles,
						meta: sessionFromSessionCallback?.user?.meta
				  }
				: undefined,
			expires: sessionFromSessionCallback?.expires
		};
		return session;
	}
	return null;
}
