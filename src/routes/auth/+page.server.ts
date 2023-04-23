import type {PageServerLoad} from "./$types";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    //In case of new user
    const session = await event.locals.getSession();
    //New user case
    if (session?.user && session.user["roles"].includes('new-user')) {
        throw redirect(303, '/auth/new-user');
    }
    //Profile Case
    if (session?.user && !session.user["roles"].includes('new-user')) {
        throw redirect(303, '/auth/profile');
    }
    return
};