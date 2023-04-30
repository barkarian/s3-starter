import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { redirect, type Handle } from '@sveltejs/kit';
import { PUBLIC_GOOGLE_ID } from '$env/static/public';
import { SECRET_ADMIN_EMAIL, SECRET_AUTH_SECRET, SECRET_GOOGLE_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import type { Session, UserMeta } from './app';
import { prismaClient } from '$lib/server/prismaClient';
import { UserRoleEnum } from '$lib/database/auth/userData.type';
import { hasAllRoles } from '$lib/database/auth/authRoles';

export const handle: Handle = sequence(
	SvelteKitAuth(async (event) => {
		const authOptions: SvelteKitAuthConfig = {
			providers: [
				//@ts-ignore
				Google({ clientId: PUBLIC_GOOGLE_ID, clientSecret: SECRET_GOOGLE_SECRET })
			],
			callbacks: {
				async jwt({ token, user }) {
					//When we got a user we check his email retrieve his data from the database and create his token
					//console.log({ msg: 'REVALIDATE TOKEN user must not be empty', token, user });
					if (user) {
						token.id = user?.id ?? token.id;
						//Get user from the database and user roles and meta
						const userFromDb = await prismaClient.user.findFirst({
							include: { roles: true },
							where: {
								id: token.id ?? ''
							}
						});
						//If there's not a user in the database
						if (!userFromDb && user?.email === SECRET_ADMIN_EMAIL) {
							token.roles = [UserRoleEnum.ADMIN];
							token.meta = undefined;
						} else if (!userFromDb) {
							token.roles = [UserRoleEnum.NEW_USER];
							token.meta = undefined;
						}
						//If there's a user in the database ADD-YOUR-BUSINESS LOGIC HERE
						// if (userFromDb) {
						// 	//Construct META DATA
						// 	const userMeta: UserMeta = {
						// 		firstName: userFromDb.firstName,
						// 		lastName: userFromDb.lastName,
						// 		phone: userFromDb.phone,
						// 		userApproved: userFromDb.userApproved
						// 	};
						// 	token.roles = userFromDb.roles.map((role) => role.role);
						// 	token.meta = userMeta;
						// }
					}
					if (token || user) {
						//Get user from the database and user roles and meta
						const userFromDb = await prismaClient.user.findFirst({
							include: { roles: true },
							where: {
								id: token.id ?? ''
							}
						});

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
						session.user.id = token.id;
						session.user.roles = token.roles;
						session.user.meta = token.meta;
					}
					event.locals.session = session;
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
	event.locals.session = session;

	//In case of new user
	if (event.url.pathname.startsWith('/auth-admin')) {
		if (!hasAllRoles(event, [UserRoleEnum.ADMIN])) {
			throw redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}

// type ISODateString = string

// declare module '@auth/core/types' {
// 	interface Session {
// 		user?: {
// 			name?: string | null
// 			email?: string | null
// 			image?: string | null
// 			roles?:string[]| null
// 		  }
// 		  expires: ISODateString
// 	}
// }

// declare module '@auth/core/jwt' {
// 	interface JWT {
// 		name?: string | null;
// 		email?: string | null;
// 		picture?: string | null;
// 		sub?: string;
// 		roles: string[];
// 	}
// }
