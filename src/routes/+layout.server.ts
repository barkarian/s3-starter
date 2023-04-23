import type { Session } from '../app';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	//Whatever is loaded here is accessible via the store $page.data.<property>
	//You can access session using this store: $page.data.session
	return {
		session: await event.locals.getSession()
	};
};
