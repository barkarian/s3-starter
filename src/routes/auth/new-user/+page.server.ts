import type {PageServerLoad} from "./$types";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.getSession();
    if (!session || !session.user) {
        throw redirect(303, '/auth');
    }
    if (!session.user["roles"].includes('new-user')) {
        throw redirect(303, '/');
    }
    return
};