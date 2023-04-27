// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			session: Session;
		}
		// interface PageData {
		// 	//session: Session | null;
		// 	session: Session;
		// }
		// interface Error {}
		// interface Platform {}
	}
}

export type Session = {
	user?: {
		name?: string;
		email: string;
		image?: string;
		roles: string[];
		meta?: UserMeta;
	};
	expires: string;
} | null;

export type UserMeta = {
	signUpDate: Date;
	chanelManager: Date;
	balance: number;
	freePlan: boolean;
};
