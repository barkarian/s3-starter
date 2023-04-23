// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		supabase: SupabaseClient<any>;
		getSession(): Promise<Session | null>;
	}
	interface PageData {
		//session: Session | null;
		session: Session;
	}
	// interface Error {}
	// interface Platform {}
}

export type Session = {
	user?: {
		name?: string;
		email: string;
		image?: string;
		roles: string[];
		meta?: any;
	};
	expires: string;
} | null;
