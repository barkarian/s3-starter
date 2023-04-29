import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { redirect, type Handle } from '@sveltejs/kit';
import { PUBLIC_GOOGLE_ID } from '$env/static/public';
import { SECRET_ADMIN_EMAIL, SECRET_AUTH_SECRET, SECRET_GOOGLE_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import type { Session, UserMeta } from './app';
import { prismaClient } from '$lib/server/prismaClient';
import { UserRoleEnum, userEnumToString } from '$lib/database/auth/userData.type';

export const handle: Handle = sequence(
	SvelteKitAuth(async (event) => {
		const authOptions: SvelteKitAuthConfig = {
			providers: [
				//@ts-ignore
				Google({ clientId: PUBLIC_GOOGLE_ID, clientSecret: SECRET_GOOGLE_SECRET })
			],
			callbacks: {
				async jwt(jwtCallbackParams: any) {
					console.log({ jwtCallbackParams });
					const { token, user } = jwtCallbackParams;
					//When we got a user we check his email retrieve his data from the database and create his token
					if (user) {
						console.log({ id: user.id });
						//Get user from the database and user roles and meta
						const userFromDb = await prismaClient.user.findFirst({
							include: { roles: true },
							where: {
								id: user.id
							}
						});
						console.log({ user, userFromDb });
						//If there's not a user in the database
						if (!userFromDb && user?.email === SECRET_ADMIN_EMAIL) {
							token.roles = [userEnumToString[UserRoleEnum.ADMIN]];
							token.meta = undefined;
						} else if (!userFromDb) {
							token.roles = [userEnumToString[UserRoleEnum.NEW_USER]];
							token.meta = undefined;
						}
						//If there's a user in the database ADD-YOUR-BUSINESS LOGIC HERE
						if (userFromDb) {
							//Construct META DATA
							const userMeta: UserMeta = {
								firstName: userFromDb.firstName,
								lastName: userFromDb.lastName,
								phone: userFromDb.phone,
								userApproved: userFromDb.userApproved
							};
							token.roles = userFromDb.roles.map((role) => role.role);
							token.meta = userMeta;
						}
					}
					return token;
				},
				session(sessionCallbackParams: any) {
					const { session, token } = sessionCallbackParams;
					if (token && session.user) {
						session.user.roles = token.roles;
						session.user.meta = token.meta;
					}
					return session;
				}
			},
			secret: SECRET_AUTH_SECRET,
			trustHost: true
		};
		return authOptions;
	}),
	authorization
) satisfies Handle;

async function authorization(handleInput: any) {
	const { event, resolve } = handleInput;
	const session: Session = await event.locals.getSession();

	// //In case of new user
	if (event.url.pathname.startsWith('/authenticated-admin')) {
		if (!session || !session.user) {
			throw redirect(303, '/auth');
		}
		if (!session.user.roles.includes(userEnumToString[UserRoleEnum.ADMIN])) {
			throw redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	event.locals.session = session;
	return resolve(event);
}

// declare module '@auth/core/types' {
// 	interface Session {
// 		error?: 'RefreshAccessTokenError';
// 	}
// }

// declare module '@auth/core/jwt' {
// 	interface JWT {
// 		access_token: string;
// 		expires_at: number;
// 		refresh_token: string;
// 		error?: 'RefreshAccessTokenError';
// 	}
// }
