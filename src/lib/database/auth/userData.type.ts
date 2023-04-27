export enum UserRoleEnum {
	ADMIN = 'admin',
	NEW_USER = 'new-user',
	USER = 'user'
}

export const userEnumToString = {
	[UserRoleEnum.ADMIN]: 'admin',
	[UserRoleEnum.NEW_USER]: 'new-user',
	[UserRoleEnum.USER]: 'user'
};
