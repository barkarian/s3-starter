export enum UserRoleEnum {
	ADMIN = 'admin',
	NEW_USER = 'new-user',
	USER = 'user'
}

export const userRoleEnumValues = Object.values(UserRoleEnum).filter(
	(value) => typeof value === 'string'
);
