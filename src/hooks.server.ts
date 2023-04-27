import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { redirect, type Handle } from '@sveltejs/kit';
import { PUBLIC_GOOGLE_ID } from '$env/static/public';
import { SECRET_ADMIN_EMAIL, SECRET_AUTH_SECRET, SECRET_GOOGLE_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import type { Session } from './app';

export const handle: Handle = sequence(
	SvelteKitAuth(async (event) => {
		const authOptions: SvelteKitAuthConfig = {
			providers: [
				//@ts-ignore
				Google({ clientId: PUBLIC_GOOGLE_ID, clientSecret: SECRET_GOOGLE_SECRET })
			],
			callbacks: {
				async jwt(jwtCallbackParams: any) {
					const { token, user } = jwtCallbackParams;
					//When we got a user we check his email retrieve his data from the database and create his token
					if (user) {
						//Get user from the database and user roles and meta
						//TODO...
						//Dummy user retrieved
						const userFromDb = {
							userEmail: 'thodorisbarkas@gmail.com',
							roles: ['new-user'],
							meta: {
								name: 'aaa',
								surname: 'aaaaaaa'
							}
						};

						if (!userFromDb) {
							//!!!
							//If the user is not existing we don't have to add a new-user to the database
							//A good practive for my case is to ask the user for any of your application specific user related data first
							//After that you can insert him in the database and refresh his token
							token['roles'] = ['new-user'];
							token['meta'] = undefined;
						} else if (user?.email === SECRET_ADMIN_EMAIL) {
							token['roles'] = ['admin'];
							token['meta'] = {};
						} else {
							token['roles'] = userFromDb['roles'];
							token['meta'] = userFromDb['meta'];
						}
					}
					return token;
				},
				session(sessionCallbackParams: any) {
					const { session, token } = sessionCallbackParams;
					if (token && session.user) {
						session.user['roles'] = token['roles'];
						session.user['meta'] = token['meta'];
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
		if (!session.user['roles'].includes('admin')) {
			throw redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	event.locals.session = session;
	return resolve(event);
}
